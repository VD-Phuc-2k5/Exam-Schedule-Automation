import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Tiến độ</span>
        <span>{progressPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
