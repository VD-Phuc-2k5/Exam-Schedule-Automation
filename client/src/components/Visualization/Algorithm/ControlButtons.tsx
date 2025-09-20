import React from "react";
import { Play, RotateCcw, SkipForward, Pause } from "lucide-react";

interface ControlButtonsProps {
  isRunning: boolean;
  currentStepIndex: number;
  totalSteps: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  isRunning,
  currentStepIndex,
  totalSteps,
  onStart,
  onPause,
  onReset,
  onNext,
}) => {
  const isLastStep = currentStepIndex >= totalSteps - 1;
  const isFirstStep = currentStepIndex === 0;

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={isRunning ? onPause : onStart}
        disabled={isLastStep}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isRunning ? (
          <Pause className="w-4 h-4 mr-2" />
        ) : (
          <Play className="w-4 h-4 mr-2" />
        )}
        {isRunning ? "Tạm dừng" : "Chạy tự động"}
      </button>

      <button
        onClick={onNext}
        disabled={isLastStep}
        className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <SkipForward className="w-4 h-4 mr-2" />
        Bước tiếp theo
      </button>

      <button
        onClick={onReset}
        disabled={isFirstStep}
        className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Đặt lại
      </button>
    </div>
  );
};

export default ControlButtons;
