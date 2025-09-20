import React from "react";
import { type GraphNode, type Subject, type Student } from "@/types";
import { useExamSchedule } from "@/hooks/useExamSchedule";
import EmptyState from "./EmptyState";
import SummaryStats from "./SummaryStats";
import ExamSlot from "./ExamSlot";
import SuccessSummary from "./SuccessSummary";

interface Props {
  nodes: GraphNode[];
  subjects: Subject[];
  students: Student[];
}

const ResultSummary: React.FC<Props> = ({ nodes, subjects, students }) => {
  const { coloredNodes, uniqueColors, schedule, getConflictCount } =
    useExamSchedule(nodes, subjects);

  if (coloredNodes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Kết quả xếp lịch thi
      </h3>

      <SummaryStats
        uniqueColorsCount={uniqueColors.length}
        coloredNodesCount={coloredNodes.length}
        students={students}
      />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">
          Lịch thi chi tiết:
        </h4>

        {Object.entries(schedule).map(([color, examNodes]) => (
          <ExamSlot
            key={color}
            color={color}
            examNodes={examNodes}
            subjects={subjects}
            getConflictCount={getConflictCount}
          />
        ))}
      </div>

      <SuccessSummary uniqueColorsCount={uniqueColors.length} />
    </div>
  );
};

export default ResultSummary;
