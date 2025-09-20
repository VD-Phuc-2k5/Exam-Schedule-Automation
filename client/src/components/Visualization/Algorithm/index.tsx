import React from "react";
import { Play, RotateCcw, SkipForward, Pause } from "lucide-react";
import { type AlgorithmStep } from "@/types";

interface Props {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
}

const AlgorithmSteps: React.FC<Props> = ({
  steps,
  currentStepIndex,
  isRunning,
  onStart,
  onPause,
  onReset,
  onNext,
  onStepSelect,
}) => {
  const currentStep = steps[currentStepIndex];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Các bước thuật toán
      </h3>

      {/* Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={isRunning ? onPause : onStart}
          disabled={currentStepIndex >= steps.length - 1}
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
          disabled={currentStepIndex >= steps.length - 1}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Bước tiếp theo
        </button>

        <button
          onClick={onReset}
          disabled={currentStepIndex === 0}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Đặt lại
        </button>
      </div>

      {/* Current Step Display */}
      {currentStep && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-blue-800">
                Bước {currentStep.stepNumber}
              </h4>
              <p className="text-blue-700 mt-1">{currentStep.description}</p>
            </div>
            <div className="text-sm text-blue-600 font-medium">
              {currentStepIndex + 1} / {steps.length}
            </div>
          </div>

          {currentStep.degreeChanges && (
            <div className="mt-3 text-sm">
              <p className="font-medium text-blue-800 mb-2">
                Thay đổi bậc đỉnh:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(currentStep.degreeChanges).map(
                  ([nodeId, newDegree]) => (
                    <span
                      key={nodeId}
                      className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs"
                    >
                      Đỉnh {nodeId}: {newDegree}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            onClick={() => onStepSelect(index)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              index === currentStepIndex
                ? "bg-blue-100 border border-blue-300"
                : index < currentStepIndex
                  ? "bg-green-50 border border-green-200"
                  : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-medium ${
                  index === currentStepIndex
                    ? "text-blue-800"
                    : index < currentStepIndex
                      ? "text-green-800"
                      : "text-gray-700"
                }`}
              >
                Bước {step.stepNumber}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  index === currentStepIndex
                    ? "bg-blue-200 text-blue-800"
                    : index < currentStepIndex
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.action === "select"
                  ? "Chọn"
                  : step.action === "color"
                    ? "Tô màu"
                    : step.action === "reduce_degree"
                      ? "Giảm bậc"
                      : "Hoàn thành"}
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
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Tiến độ</span>
          <span>
            {Math.round((currentStepIndex / (steps.length - 1)) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSteps;
