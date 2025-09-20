import React from "react";
import { type GraphNode, type Subject } from "@/types";
import { DEFAULT_COLORS } from "@/data";
import ExamCard from "./ExamCard";

interface ExamSlotProps {
  color: string;
  examNodes: GraphNode[];
  subjects: Subject[];
  getConflictCount: (subjectId: string) => number;
}

const ExamSlot: React.FC<ExamSlotProps> = ({
  color,
  examNodes,
  subjects,
  getConflictCount,
}) => {
  const colorIndex = DEFAULT_COLORS.indexOf(color);
  const colorName = DEFAULT_COLORS[colorIndex];

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div
          className="w-4 h-4 rounded-full mr-3 border border-gray-400"
          style={{ backgroundColor: color }}
        />
        <h5 className="font-semibold text-gray-800">{colorName}</h5>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {examNodes.map((node) => {
          const subject = subjects.find((s) => s.id === node.id);
          const conflictCount = getConflictCount(node.id);

          return (
            <ExamCard
              key={node.id}
              node={node}
              subject={subject}
              conflictCount={conflictCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExamSlot;
