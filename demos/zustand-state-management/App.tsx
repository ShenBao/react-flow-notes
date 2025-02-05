import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import useStore from './store';

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
  const updateNodeColor = useStore((s) => s.updateNodeColor);

  return (
   <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
    <button style={{
      position: 'fixed',
      left: 20,
      top: 20
    }} onClick={() => updateNodeColor('1', 'red')} >node to red</button>;
</>
  );
}

export default Flow;
