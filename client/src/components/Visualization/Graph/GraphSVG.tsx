import React, { useRef } from "react";
import {
  type GraphNode as GraphNodeType,
  type GraphEdge as GraphEdgeType,
} from "@/types";
import GraphNode from "./GraphNode";
import GraphEdge from "./GraphEdge";
import { useNodeStyles } from "@/hooks/useNodeStyles";

interface Props {
  nodes: GraphNodeType[];
  edges: GraphEdgeType[];
  selectedNode: string | null;
}

const GraphSVG: React.FC<Props> = ({ nodes, edges, selectedNode }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const {
    getNodeColor,
    getNodeStroke,
    getNodeStrokeWidth,
    getNodeTransform,
    getNodeFilter,
  } = useNodeStyles(selectedNode);

  return (
    <svg
      ref={svgRef}
      width="600"
      height="400"
      className="border border-gray-200 rounded-lg mx-auto block"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Render Edges */}
      {edges.map((edge, index) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        return (
          <GraphEdge
            key={index}
            edge={edge}
            fromNode={fromNode}
            toNode={toNode}
          />
        );
      })}

      {/* Render Nodes */}
      {nodes.map((node) => (
        <GraphNode
          key={node.id}
          node={node}
          color={getNodeColor(node)}
          stroke={getNodeStroke(node)}
          strokeWidth={getNodeStrokeWidth(node)}
          transform={getNodeTransform(node)}
          filter={getNodeFilter(node)}
        />
      ))}
    </svg>
  );
};

export default GraphSVG;
