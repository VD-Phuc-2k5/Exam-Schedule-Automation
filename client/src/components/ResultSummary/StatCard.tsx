import React from "react";
import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  bgColor,
  iconColor,
  textColor,
}) => (
  <div className={`${bgColor} p-4 rounded-lg text-center`}>
    <Icon className={`w-8 h-8 ${iconColor} mx-auto mb-2`} />
    <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    <div className={`text-sm ${iconColor}`}>{label}</div>
  </div>
);

export default StatCard;
