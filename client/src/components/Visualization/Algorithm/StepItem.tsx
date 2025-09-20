import React from "react";
import { type AlgorithmStep } from "@/types";

interface StepItemProps {
  step: AlgorithmStep;
  index: number;
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
}

const getActionLabel = (action: string): string => {
  const actionLabels = {
    select: "Chọn",
    color: "Tô màu",
    reduce_degree: "Giảm bậc",
    remove_color: "Loại bỏ màu đã tô",
    complete: "Hoàn thành",
  };
  return actionLabels[action as keyof typeof actionLabels] || action;
};

const getStepStyles = (index: number, currentStepIndex: number) => {
  if (index === currentStepIndex) {
    return {
      container: "bg-blue-100 border border-blue-300",
      text: "text-blue-800",
      badge: "bg-blue-200 text-blue-800",
    };
  } else if (index < currentStepIndex) {
    return {
      container: "bg-green-50 border border-green-200",
      text: "text-green-800",
      badge: "bg-green-200 text-green-800",
    };
  } else {
    return {
      container: "bg-gray-50 border border-gray-200 hover:bg-gray-100",
      text: "text-gray-700",
      badge: "bg-gray-200 text-gray-600",
    };
  }
};

const StepItem: React.FC<StepItemProps> = ({
  step,
  index,
  currentStepIndex,
  onStepSelect,
}) => {
  const styles = getStepStyles(index, currentStepIndex);
  const actionLabel = getActionLabel(step.action);

  return (
    <div
      onClick={() => onStepSelect(index)}
      className={`p-3 rounded-lg cursor-pointer transition-colors ${styles.container}`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-medium ${styles.text}`}>
          Bước {step.stepNumber}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${styles.badge}`}>
          {actionLabel}
        </span>
      </div>
      <p
        className={`text-sm mt-1 ${
          index <= currentStepIndex ? "text-gray-700" : "text-gray-500"
        }`}
      >
        {step.description}
      </p>
    </div>
  );
};

export default StepItem;
