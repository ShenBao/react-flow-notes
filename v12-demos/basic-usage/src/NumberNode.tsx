import type { Node, NodeProps } from "@xyflow/react";

// type NumberNode = Node<{ number: number }, 'number'>;

type NumberNodeData = { number: number };
type NumberNode = Node<NumberNodeData, "number">;

export default function NumberNode({ data }: NodeProps<NumberNode>) {
  return <div>A special number: {data.number}</div>;
}
