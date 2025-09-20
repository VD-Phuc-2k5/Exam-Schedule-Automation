import React from "react";

interface SuccessSummaryProps {
  uniqueColorsCount: number;
}

const SuccessSummary: React.FC<SuccessSummaryProps> = ({
  uniqueColorsCount,
}) => (
  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
    <h4 className="font-semibold text-green-800 mb-2">
      Kết quả xếp lịch các ca thi
    </h4>
    <div className="text-sm text-green-700">
      <p>• Thuật toán đã phân bổ thành công {uniqueColorsCount} ca thi</p>
    </div>
  </div>
);

export default SuccessSummary;
