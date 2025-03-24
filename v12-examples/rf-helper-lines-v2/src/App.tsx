import { useCallback, useRef, useState } from "react";
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

import { useHelperLines } from "./helper-lines/useHelperLines";

// const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

// this example shows how to implement helper lines within React Flow
// usage: drag nodes around to see them snap and align with other nodes boundaries
function ReactFlowPro() {
  // const {
  //   HelperLines,
  //   handleHelperLines,
  //   helperLineHorizontal,
  //   helperLineVertical,
  // } = useHelperLines();

  const containerRef = useRef<HTMLDivElement>(null);

  // TODO: 需改为响应式的
  const { clientWidth, clientHeight } = containerRef?.current || {};

  console.log('clientWidth, clientHeight:', clientWidth, clientHeight);

  const { rebuildIndex, updateHelperLines, HelperLines } = useHelperLines({
    width: clientWidth,
    height:  clientHeight,
  });

  // const {
  //   screenToFlowPosition,
  //   setNodes,
  //   setEdges,
  //   getEdges,
  //   getEdge,
  //   getNodes,
  // } = useReactFlow();

  const customApplyNodeChanges = useCallback(
    (changes: NodeChange[], nodes: Node[]): Node[] => {
      const debouncedFunction = debounce(() => {
        // handleHelperLines(changes, getNodes());
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
        rfInstance.setNodes((nodes) => {
          const updatedChanges = updateHelperLines(changes, nodes);
          return customApplyNodeChanges(changes, nodes);
        });
      }
    },
    [rfInstance, customApplyNodeChanges]
  );

  const onNodeDragStop = useCallback(
    async (event: any, node: Node) => {
      rebuildIndex(defaultNodes);
    },
    [defaultNodes]
  );

  return (
    <div ref={containerRef} style={{width: "100%", height: "100%"}}>
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        onNodesChange={onNodesChange}
        fitView
        elevateEdgesOnSelect
        elevateNodesOnSelect
        onNodeDragStop={onNodeDragStop}
      >
        <Background />
        <Controls />
        <HelperLines />
      </ReactFlow>
    </div>
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
