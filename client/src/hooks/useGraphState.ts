import { useMemo } from "react";
import {
  type GraphNode,
  type GraphEdge,
  type AlgorithmStep,
  type GraphState,
} from "@/types";

export function useGraphState(
  originalNodes: GraphNode[],
  originalEdges: GraphEdge[],
  steps: AlgorithmStep[],
  currentStepIndex: number,
): GraphState {
  return useMemo(() => {
    if (currentStepIndex === 0) {
      return {
        nodes: originalNodes,
        edges: originalEdges,
        selectedNode: null,
      };
    }

    const nodes = [...originalNodes];
    let selectedNode: string | null = null;

    // Apply all steps up to currentStepIndex
    for (let i = 0; i < currentStepIndex && i < steps.length; i++) {
      const step = steps[i];

      switch (step.action) {
        case "select":
          if (step.nodeId) selectedNode = step.nodeId;
          break;

        case "color":
          if (step.nodeId && step.color) {
            const nodeIndex = nodes.findIndex((n) => n.id === step.nodeId);
            if (nodeIndex !== -1) {
              nodes[nodeIndex] = { ...nodes[nodeIndex], color: step.color };
            }
            if (selectedNode === step.nodeId) {
              selectedNode = null;
            }
          }
          break;

        case "reduce_degree":
          if (step.degreeChanges) {
            Object.entries(step.degreeChanges).forEach(
              ([nodeId, newDegree]) => {
                const nodeIndex = nodes.findIndex((n) => n.id === nodeId);
                if (nodeIndex !== -1) {
                  nodes[nodeIndex] = { ...nodes[nodeIndex], degree: newDegree };
                }
              },
            );
          }
          break;

        case "complete":
          selectedNode = null;
          break;
      }
    }

    return { nodes, edges: originalEdges, selectedNode };
  }, [originalNodes, originalEdges, steps, currentStepIndex]);
}
