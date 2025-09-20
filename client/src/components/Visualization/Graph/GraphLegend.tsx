import React from "react";
import { DEFAULT_COLORS } from "@/data";

const GraphLegend: React.FC = () => {
  const legendItems = [
    {
      color: "bg-white",
      border: "border-gray-900",
      label: "Chưa được tô màu",
    },
    {
      color: "#CC5500",
      border: "border-gray-900",
      label: "Đỉnh đang được chọn",
    },
    {
      color: DEFAULT_COLORS[0],
      border: "border-gray-800",
      label: "Ca thi 1",
    },
    {
      color: DEFAULT_COLORS[1],
      border: "border-gray-800",
      label: "Ca thi 2",
    },
    {
      color: DEFAULT_COLORS[2],
      border: "border-gray-800",
      label: "Ca thi 3",
    },
    {
      color: DEFAULT_COLORS[3],
      border: "border-gray-800",
      label: "Ca thi 4",
    },
    {
      color: DEFAULT_COLORS[4],
      border: "border-gray-800",
      label: "Ca thi 5",
    },
  ];

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-2 text-gray-700">Chú thích:</h4>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border-2 ${item.border}`}
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphLegend;
