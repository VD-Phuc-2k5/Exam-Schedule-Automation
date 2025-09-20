import { type GraphNode } from "@/types";

export const useNodeStyles = (selectedNode: string | null) => {
  const getNodeColor = (node: GraphNode): string => {
    if (selectedNode === node.id) {
      return "#FFD700";
    }
    return node.color || "#ffffff";
  };

  const getNodeStroke = (node: GraphNode): string => {
    if (selectedNode === node.id) {
      return "#FF6B35";
    }
    return node.color ? "#1F2937" : "#6B7280";
  };

  const getNodeStrokeWidth = (node: GraphNode): number => {
    return selectedNode === node.id ? 3 : 2;
  };

  const getNodeTransform = (node: GraphNode): string => {
    return selectedNode === node.id ? "scale(1.1)" : "scale(1)";
  };

  const getNodeFilter = (node: GraphNode): string => {
    return selectedNode === node.id
      ? "drop-shadow(0 0 10px rgba(255, 107, 53, 0.5))"
      : "none";
  };

  return {
    getNodeColor,
    getNodeStroke,
    getNodeStrokeWidth,
    getNodeTransform,
    getNodeFilter,
  };
};
