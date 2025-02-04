import type { Node, NodeProps } from '@xyflow/react';
 
type NumberNode = Node<{ text: string }, 'number'>;
 
export default function NumberNode({ data }: NodeProps<NumberNode>) {
  return <div>A special number: {data.text}</div>;
}