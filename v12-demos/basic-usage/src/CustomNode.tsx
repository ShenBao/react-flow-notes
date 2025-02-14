import type { Node, NodeProps } from '@xyflow/react';

type NumberNode = Node<{ number: number; type: 'number' }, 'number'>;
type TextNode = Node<{ text: string; type: 'text' }, 'text'>;

type AppNode = NumberNode | TextNode;

export default function CustomNode({ data }: NodeProps<AppNode>) {
  if (data.type === 'number') {
    return <div>A special number: {data.number}</div>;
  }

  return <div>A special text: {data.text}</div>;
}