import {ImageNode} from './ImageNode';
import {LinkNode} from '@lexical/link';
import {ListItemNode, ListNode} from '@lexical/list';
import {TKNode} from '@tryghost/kg-default-nodes';

const BASIC_NODES = [
    ListNode,
    ListItemNode,
    TKNode,
    ImageNode,
    LinkNode
];

export default BASIC_NODES;
