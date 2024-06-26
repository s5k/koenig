import FloatingToolbar from '../../components/ui/FloatingToolbar';
import FormatToolbar from './FormatToolbar';
import React from 'react';
import {$getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, DELETE_CHARACTER_COMMAND} from 'lexical';
import {LinkActionToolbar} from './LinkActionToolbar.jsx';
import {SnippetActionToolbar} from './SnippetActionToolbar';
import {debounce} from 'lodash-es';
import {mergeRegister} from '@lexical/utils';

// don't show the toolbar until the mouse has moved a certain distance,
// avoids accidental toolbar display when clicking buttons that select content
const MOUSE_MOVE_THRESHOLD = 5;

export const toolbarItemTypes = {
    snippet: 'snippet',
    link: 'link',
    text: 'text'
};

export function FloatingFormatToolbar({
    editor,
    anchorElem,
    href,
    isSnippetsEnabled,
    toolbarItemType,
    setToolbarItemType,
    selectionRangeRect,
    hiddenFormats = []
}) {
    const toolbarRef = React.useRef(null);
    const [arrowStyles, setArrowStyles] = React.useState(null);

    const updateArrowStyles = React.useCallback(() => {
        const styles = getArrowPositionStyles({ref: toolbarRef, selectionRangeRect});
        setArrowStyles(styles);
    }, [selectionRangeRect]);

    // toolbar opacity is 0 by default
    // shouldn't display until selection via mouse is complete to avoid toolbar re-positioning while dragging
    const showToolbarIfHidden = React.useCallback((e) => {
        if (toolbarItemType && toolbarRef.current?.style.opacity === '0') {
            toolbarRef.current.style.opacity = '1';
            updateArrowStyles();
        }
    }, [toolbarItemType, updateArrowStyles]);

    // TODO: Arrow not updating position on selection change (select all)

    React.useEffect(() => {
        const toggle = (e) => {
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    const selectedNodeMatchesTarget = selection.getNodes().find((node) => {
                        const element = editor.getElementByKey(node.getKey());
                        return element && (element.contains(e.target) || e.target.contains(element));
                    });

                    if (selectedNodeMatchesTarget) {
                        showToolbarIfHidden(e);
                    }
                }
            });
        };

        document.addEventListener('mouseup', toggle); // desktop
        document.addEventListener('touchend', toggle); // mobile

        return () => {
            document.removeEventListener('mouseup', toggle); // desktop
            document.removeEventListener('touchend', toggle); // mobile
        };
    }, [editor, showToolbarIfHidden]);

    // clear out toolbar when use removes selected content
    React.useEffect(() => {
        return mergeRegister(
            editor.registerCommand(
                DELETE_CHARACTER_COMMAND,
                () => {
                    setToolbarItemType(null);
                    return false;
                },
                COMMAND_PRIORITY_LOW
            )
        );
    }, [editor, setToolbarItemType]);

    React.useEffect(() => {
        let initialPosition = null;

        const onMouseMove = (e) => {
            // ignore drag events
            if (e?.buttons > 0) {
                return;
            }

            // avoid toggling toolbar until mouse has moved a certain distance
            if (!initialPosition) {
                initialPosition = {x: e.clientX, y: e.clientY};
            }

            const distanceMoved = Math.sqrt(
                Math.pow(e.clientX - initialPosition.x, 2) +
                Math.pow(e.clientY - initialPosition.y, 2)
            );

            if (distanceMoved < MOUSE_MOVE_THRESHOLD) {
                return;
            }

            // reset initial position after threshold is met
            initialPosition = null;

            // should not show floating toolbar when we don't have a text selection
            editor.getEditorState().read(() => {
                const selection = $getSelection();
                if (selection === null || !$isRangeSelection(selection)) {
                    return;
                }
                if (selection.getTextContent() !== null) {
                    showToolbarIfHidden();
                }
            });
        };
        const debouncedOnMouseMove = debounce(onMouseMove, 10);
        document.addEventListener('mousemove', debouncedOnMouseMove);
        return () => {
            document.removeEventListener('mousemove', debouncedOnMouseMove);
        };
    }, [editor, showToolbarIfHidden]);

    const handleActionToolbarClose = () => {
        setToolbarItemType(null);
    };

    const isSnippetToolbar = toolbarItemTypes.snippet === toolbarItemType;
    const isLinkToolbar = toolbarItemTypes.link === toolbarItemType;
    const isTextToolbar = toolbarItemTypes.text === toolbarItemType;

    return (
        <FloatingToolbar
            anchorElem={anchorElem}
            // toolbar opacity is 0 by default
            // shouldn't display until selection via mouse is complete to avoid toolbar re-positioning while dragging
            controlOpacity={!isTextToolbar}
            editor={editor}
            isVisible={!!toolbarItemType}
            shouldReposition={toolbarItemType !== toolbarItemTypes.text} // format toolbar shouldn't reposition when applying formats
            toolbarRef={toolbarRef}
            onReposition={updateArrowStyles}
        >
            {isSnippetToolbar && (
                <SnippetActionToolbar
                    arrowStyles={arrowStyles}
                    onClose={handleActionToolbarClose}
                />
            )}

            {isLinkToolbar && (
                <LinkActionToolbar
                    arrowStyles={arrowStyles}
                    href={href}
                    onClose={handleActionToolbarClose}
                />
            )}
            {isTextToolbar && (
                <FormatToolbar
                    arrowStyles={arrowStyles}
                    editor={editor}
                    hiddenFormats={hiddenFormats}
                    isLinkSelected={!!href}
                    isSnippetsEnabled={isSnippetsEnabled}
                    onLinkClick={() => setToolbarItemType(toolbarItemTypes.link)}
                    onSnippetClick={() => setToolbarItemType(toolbarItemTypes.snippet)}
                />
            )}
        </FloatingToolbar>
    );
}

function getArrowPositionStyles({ref, selectionRangeRect}) {
    const ARROW_WIDTH = 8;

    if (!ref.current || !selectionRangeRect) {
        return {};
    }
    const selectionLeft = selectionRangeRect.left;
    const toolbarRect = ref.current.getClientRects()[0];
    const toolbarLeft = toolbarRect.left;
    const arrowLeftPosition = (selectionLeft - toolbarLeft) + selectionRangeRect?.width / 2 - ARROW_WIDTH;
    const max = toolbarRect.width - (ARROW_WIDTH * 3);
    const min = ARROW_WIDTH / 2;

    if (arrowLeftPosition > max) {
        return {left: `${max}px`};
    }

    if (arrowLeftPosition < min) {
        return {left: `${min}px`};
    }

    return ({left: `${Math.round(arrowLeftPosition)}px`});
}
