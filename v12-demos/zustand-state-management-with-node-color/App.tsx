import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import useStore from './store';
import ColorChooserNode from './ColorChooserNode';

const nodeTypes = { colorChooser: ColorChooserNode };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    />
  );
}

export default Flow;
