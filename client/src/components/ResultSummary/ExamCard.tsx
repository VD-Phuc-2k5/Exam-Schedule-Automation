import React from "react";
import { type GraphNode, type Subject } from "@/types";

interface ExamCardProps {
  node: GraphNode;
  subject: Subject | undefined;
  conflictCount: number;
}

const ExamCard: React.FC<ExamCardProps> = ({
  node,
  subject,
  conflictCount,
}) => (
  <div className="bg-gray-50 p-3 rounded">
    <div className="font-medium text-gray-800">{node.name}</div>
    <div className="text-sm text-gray-600 mt-1">
      <div>Sinh viên: {subject?.students.length || 0}</div>
      <div>Xung đột: {conflictCount} môn</div>
    </div>
  </div>
);

export default ExamCard;
