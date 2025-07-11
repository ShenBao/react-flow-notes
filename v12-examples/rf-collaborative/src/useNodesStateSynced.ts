import { useCallback, useEffect, useState } from "react";
import {
  type Node,
  type OnNodesChange,
  applyNodeChanges,
  getConnectedEdges,
} from "@xyflow/react";

import ydoc from "./ydoc";
import { edgesMap } from "./useEdgesStateSynced";

// We are using nodesMap as the one source of truth for the nodes.
// This means that we are doing all changes to the nodes in the map object.
// Whenever the map changes, we update the nodes state.
export const nodesMap = ydoc.getMap<Node>("nodes");

function useNodesStateSynced(): [
  Node[],
  React.Dispatch<React.SetStateAction<Node[]>>,
  OnNodesChange
] {
  const [nodes, setNodes] = useState<Node[]>([]);

  const setNodesSynced = useCallback(
    (nodesOrUpdater: React.SetStateAction<Node[]>) => {
      const seen = new Set<string>();
      const next =
        typeof nodesOrUpdater === "function"
          ? nodesOrUpdater([...nodesMap.values()])
          : nodesOrUpdater;

      for (const node of next) {
        seen.add(node.id);
        nodesMap.set(node.id, node);
      }

      for (const node of nodesMap.values()) {
        if (!seen.has(node.id)) {
          nodesMap.delete(node.id);
        }
      }
    },
    []
  );

  // The onNodesChange callback updates nodesMap.
  // When the changes are applied to the map, the observer will be triggered and updates the nodes state.
  const onNodesChanges: OnNodesChange = useCallback((changes) => {
    const nodes = Array.from(nodesMap.values());
    const nextNodes = applyNodeChanges(changes, nodes);

    for (const change of changes) {
      if (change.type === "add" || change.type === "reset") {
        nodesMap.set(change.item.id, change.item);
      } else if (change.type === "remove" && nodesMap.has(change.id)) {
        const deletedNode = nodesMap.get(change.id)!;
        const connectedEdges = getConnectedEdges(
          [deletedNode],
          [...edgesMap.values()]
        );

        nodesMap.delete(change.id);

        for (const edge of connectedEdges) {
          edgesMap.delete(edge.id);
        }
      } else {
        nodesMap.set(change.id, nextNodes.find((n) => n.id === change.id)!);
      }
    }
  }, []);

  // here we are observing the nodesMap and updating the nodes state whenever the map changes.
  useEffect(() => {
    const observer = () => {
      setNodes(Array.from(nodesMap.values()));
    };

    setNodes(Array.from(nodesMap.values()));
    nodesMap.observe(observer);

    return () => nodesMap.unobserve(observer);
  }, [setNodes]);

  return [nodes, setNodesSynced, onNodesChanges];
}

export default useNodesStateSynced;
