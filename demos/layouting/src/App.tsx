import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import { initialNodes, initialEdges } from "./nodes-edges";
import "@xyflow/react/dist/style.css";
const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
};

function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}

export default App;
