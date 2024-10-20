import {LinkNode} from '@lexical/link';
import {MentionNode} from './MentionNode.js';
import {TKNode} from '@tryghost/kg-default-nodes';

const MINIMAL_NODES = [
    LinkNode,
    TKNode,
    MentionNode
];

export default MINIMAL_NODES;
