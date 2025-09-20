import React from "react";
import { type GraphNode as GraphNodeType } from "@/types";

interface Props {
  node: GraphNodeType;
  color: string;
  stroke: string;
  strokeWidth: number;
  transform: string;
  filter: string;
}

const GraphNode: React.FC<Props> = ({
  node,
  color,
  stroke,
  strokeWidth,
  transform,
  filter,
}) => {
  return (
    <g className="transition-all duration-500 ease-in-out">
      <circle
        cx={node.position.x}
        cy={node.position.y}
        r="30"
        fill={color}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className="transition-all duration-500 ease-in-out"
        style={{
          transform,
          transformOrigin: `${node.position.x}px ${node.position.y}px`,
          filter,
        }}
      />
      <text
        x={node.position.x}
        y={node.position.y + 5}
        fill={node.color ? "#FFFFFF" : "#1F2937"}
        fontSize="8"
        textAnchor="middle"
        className="pointer-events-none font-medium"
        style={{
          textShadow: node.color ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {node.name}
      </text>
      <text
        x={node.position.x}
        y={node.position.y - 45}
        fill="#374151"
        fontSize="12"
        textAnchor="middle"
        className="pointer-events-none font-bold"
      >
        Bậc: {node.degree}
      </text>
    </g>
  );
};

export default GraphNode;
