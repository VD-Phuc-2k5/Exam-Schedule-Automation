import React from "react";
import { type GraphNode, type GraphEdge } from "@/types";
import GraphSVG from "./GraphSVG";
import GraphLegend from "./GraphLegend";

interface Props {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: string | null;
}

const GraphVisualization: React.FC<Props> = ({
  nodes,
  edges,
  selectedNode,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Biểu diễn đồ thị
      </h3>
      <GraphSVG nodes={nodes} edges={edges} selectedNode={selectedNode} />
      <GraphLegend />
    </div>
  );
};

export default GraphVisualization;
