import React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { type Student } from "@/types";
import StatCard from "./StatCard";

interface SummaryStatsProps {
  uniqueColorsCount: number;
  coloredNodesCount: number;
  students: Student[];
}

const SummaryStats: React.FC<SummaryStatsProps> = ({
  uniqueColorsCount,
  coloredNodesCount,
  students,
}) => (
  <div className="grid grid-cols-3 gap-4 mb-6">
    <StatCard
      icon={Calendar}
      value={uniqueColorsCount}
      label="Ca thi cần thiết"
      bgColor="bg-blue-50"
      iconColor="text-blue-600"
      textColor="text-blue-800"
    />
    <StatCard
      icon={Clock}
      value={coloredNodesCount}
      label="Môn đã xếp lịch"
      bgColor="bg-green-50"
      iconColor="text-green-600"
      textColor="text-green-800"
    />
    <StatCard
      icon={Users}
      value={students.length}
      label="Sinh viên tham gia"
      bgColor="bg-purple-50"
      iconColor="text-purple-600"
      textColor="text-purple-800"
    />
  </div>
);

export default SummaryStats;
