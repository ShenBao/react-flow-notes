import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  Controls,
  Node,
  ProOptions,
  applyNodeChanges,
  OnNodesChange,
  NodeChange,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { debounce } from "lodash";

import {
  nodes as defaultNodes,
  edges as defaultEdges,
} from "./initialElements";

import { useHelperLines } from "./HelperLines/useHelperLines";

// const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

// this example shows how to implement helper lines within React Flow
// usage: drag nodes around to see them snap and align with other nodes boundaries
function ReactFlowPro() {
  const {
    HelperLines,
    handleHelperLines,
    helperLineHorizontal,
    helperLineVertical,
  } = useHelperLines();

  const {
    screenToFlowPosition,
    setNodes,
    setEdges,
    getEdges,
    getEdge,
    getNodes,
  } = useReactFlow();

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      const debouncedFunction = debounce(() => {
        handleHelperLines(changes, getNodes());
      }, 1); // 100ms delay

      debouncedFunction();

      return applyNodeChanges(changes, nodes);
    },
    []
  );

  const rfInstance = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      if (rfInstance) {
        rfInstance.setNodes((nodes) => customApplyNodeChanges(changes, nodes));
      }
    },
    [rfInstance, customApplyNodeChanges]
  );

  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      onNodesChange={onNodesChange}
      // proOptions={proOptions}
      fitView
      elevateEdgesOnSelect
      elevateNodesOnSelect
    >
      <Background />
      <Controls />
      <HelperLines
        horizontal={helperLineHorizontal}
        vertical={helperLineVertical}
      />
    </ReactFlow>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
