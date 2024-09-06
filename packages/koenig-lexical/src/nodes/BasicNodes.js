import {ImageNode} from './ImageNode';
import {LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {MentionNode} from './MentionNode.js';
import {TKNode} from '@tryghost/kg-default-nodes';

const BASIC_NODES = [
    ListNode,
    ListItemNode,
    TKNode,
    ImageNode,
    LinkNode,
    MentionNode
];

export default BASIC_NODES;
