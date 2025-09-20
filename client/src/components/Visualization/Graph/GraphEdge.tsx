import React from "react";
import { type GraphNode, type GraphEdge as GraphEdgeType } from "@/types";

interface Props {
  edge: GraphEdgeType;
  fromNode: GraphNode;
  toNode: GraphNode;
}

const GraphEdge: React.FC<Props> = ({ edge, fromNode, toNode }) => {
  const midX = (fromNode.position.x + toNode.position.x) / 2;
  const midY = (fromNode.position.y + toNode.position.y) / 2 - 5;

  return (
    <g>
      <line
        x1={fromNode.position.x}
        y1={fromNode.position.y}
        x2={toNode.position.x}
        y2={toNode.position.y}
        stroke="#6B7280"
        strokeWidth="2"
        className="transition-all duration-300"
      />
      <text
        x={midX}
        y={midY}
        fill="#4B5563"
        fontSize="10"
        textAnchor="middle"
        className="pointer-events-none"
      >
        {edge.students.length}
      </text>
    </g>
  );
};

export default GraphEdge;
