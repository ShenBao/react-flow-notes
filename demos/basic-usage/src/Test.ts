import type { Node, BuiltInNode, BuiltInEdge } from '@xyflow/react';
 
import NumberNode from './NumberNode';
 
type NumberNodeData = { number: number };
type NumberNode = Node<NumberNodeData, "number">;

export type CustomNodeType = BuiltInNode | NumberNode;
export type CustomEdgeType = BuiltInEdge;