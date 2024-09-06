import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {$createMentionNode, MentionNode} from '../nodes/MentionNode.js';
import {$getNodeByKey} from 'lexical';
import {
    LexicalTypeaheadMenuPlugin,
    MenuOption,
    useBasicTypeaheadTriggerMatch
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import {useCallback, useEffect, useMemo} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

const PUNCTUATION =
    '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';

const DocumentMentionsRegex = {
    NAME,
    PUNCTUATION
};

const PUNC = DocumentMentionsRegex.PUNCTUATION;

const TRIGGERS = ['@'].join('');

// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = '[^' + TRIGGERS + PUNC + '\\s]';

// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS =
    '(?:' +
    '\\.[ |$]|' + // E.g. "r. " in "Mr. Smith"
    ' |' + // E.g. " " in "Josh Duck"
    '[' +
    PUNC +
    ']|' + // E.g. "-' in "Salier-Hellendag"
    ')';

const LENGTH_LIMIT = 75;

const AtSignMentionsRegex = new RegExp(
    '(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    VALID_JOINS +
    '){0,' +
    LENGTH_LIMIT +
    '})' +
    ')$',
);

// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;

// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp(
    '(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    '){0,' +
    ALIAS_LENGTH_LIMIT +
    '})' +
    ')$',
);

// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;

function checkForAtSignMentions(text, minMatchLength) {
    let match = AtSignMentionsRegex.exec(text);

    if (match === null) {
        match = AtSignMentionsRegexAliasRegex.exec(text);
    }
    if (match !== null) {
        // The strategy ignores leading whitespace but we need to know it's
        // length to add it to the leadOffset
        const maybeLeadingWhitespace = match[1];

        const matchingString = match[3];
        if (matchingString.length >= minMatchLength) {
            return {
                leadOffset: match.index + maybeLeadingWhitespace.length,
                matchingString,
                replaceableString: match[2]
            };
        }
    }
    return null;
}

function getPossibleQueryMatch(text) {
    return checkForAtSignMentions(text, 1);
}

class MentionTypeaheadOption extends MenuOption {
    constructor(option, picture) {
        super(option);
        this.option = option;
        this.picture = picture;
    }
}

function MentionsTypeaheadMenuItem({
    index,
    isSelected,
    onClick,
    onMouseEnter,
    option
}) {
    let className = 'item';
    if (isSelected) {
        className += ' selected';
    }
    return (
        <li
            key={option.uuid}
            ref={option.setRefElement}
            aria-selected={isSelected}
            className={className}
            id={'typeahead-item-' + index}
            role="option"
            tabIndex={-1}
            onClick={onClick}
            onMouseEnter={onMouseEnter}>
            <span className="text">{option.fullName}</span>
        </li>
    );
}

export default function MentionsPlugin({onSearch, onSelect, onRemove, data}) {
    const [editor] = useLexicalComposerContext();

    const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch('/', {
        minLength: 0
    });

    useEffect(() => {
        const mentionNodeList = new Map();

        if (!editor.hasNodes([MentionNode])) {
            throw new Error('MentionsPlugin: MentionNode not registered on editor');
        }

        return editor.registerMutationListener(MentionNode, (nodeMutations) => {
            for (const [nodeKey, mutation] of nodeMutations) {
                if (mutation === 'created') {
                    editor.update(() => {
                        const mentionNode = $getNodeByKey(nodeKey);
                        mentionNodeList.set(nodeKey, mentionNode);
                        onSelect(mentionNode);
                    });
                } else if (mutation === 'destroyed') {
                    const mentionNode = mentionNodeList.get(nodeKey);
                    if (mentionNode !== undefined) {
                        mentionNodeList.delete(nodeKey);
                        onRemove(mentionNode);
                    }
                }
            }
        });
    }, [editor]);

    const options = useMemo(
        () => data
            ?.map(
                result => new MentionTypeaheadOption(result, <i className="icon user" />),
            )
            .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
        [data],
    );

    const onSelectOption = useCallback(
        (selectedOption, nodeToReplace, closeMenu) => {
            editor.update(() => {
                const mentionNode = $createMentionNode(selectedOption.option.uuid, selectedOption.option.fullName);
                if (nodeToReplace) {
                    nodeToReplace.replace(mentionNode);
                }
                mentionNode.select();
                closeMenu();
            });
        },
        [editor],
    );

    const checkForMentionMatch = useCallback(
        (text) => {
            const slashMatch = checkForSlashTriggerMatch(text, editor);
            if (slashMatch !== null) {
                return null;
            }
            return getPossibleQueryMatch(text);
        },
        [checkForSlashTriggerMatch, editor],
    );

    return (
        <LexicalTypeaheadMenuPlugin
            menuRenderFn={(
                anchorElementRef,
                {selectedIndex, selectOptionAndCleanUp, setHighlightedIndex},
            ) => (anchorElementRef.current && data?.length
                ? ReactDOM.createPortal(
                    <div className="typeahead-popover mentions-menu">
                        <ul>
                            {options.map((option, i) => (
                                <MentionsTypeaheadMenuItem
                                    key={option.option.uuid}
                                    index={i}
                                    isSelected={selectedIndex === i}
                                    option={option.option}
                                    onClick={() => {
                                        setHighlightedIndex(i);
                                        selectOptionAndCleanUp(option);
                                    }}
                                    onMouseEnter={() => {
                                        setHighlightedIndex(i);
                                    }}
                                />
                            ))}
                        </ul>
                    </div>,
                    anchorElementRef.current,
                )
                : null)
            }
            options={options}
            triggerFn={checkForMentionMatch}
            onQueryChange={onSearch ? onSearch : () => {}}
            onSelectOption={onSelectOption}
        />
    );
}

