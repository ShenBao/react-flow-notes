import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type FitViewOptions,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
  type OnNodeDrag,
  type NodeTypes,
  type DefaultEdgeOptions,
  EdgeTypes,
} from '@xyflow/react';
import "@xyflow/react/dist/style.css";

import NumberNode from './NumberNode';
import TextNode from './TextNode';
import CustomEdge from './CustomEdge';
 
const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1', number: '123', }, position: { x: 5, y: 5 },  },
  { id: '2', data: { label: 'Node 2', text: 'text' }, position: { x: 5, y: 100}, },
];
 
const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];
 
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};
 
const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};
 
const nodeTypes: NodeTypes = {
  num: NumberNode,
  txt: TextNode,
};

const edgeTypes: EdgeTypes = {
  MyCustomEdge: CustomEdge
}

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};
 
function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
 
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );
 
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
    }}>

    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeDrag={onNodeDrag}
      fitView
      fitViewOptions={fitViewOptions}
      defaultEdgeOptions={defaultEdgeOptions}
    />
    </div>
  );
}

export default Flow;