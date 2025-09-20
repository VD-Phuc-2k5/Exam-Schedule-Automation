import React from "react";
import ControlButtons from "./ControlButtons";
import CurrentStepDisplay from "./CurrentStepDisplay";
import StepsList from "./StepsList";
import ProgressBar from "./ProgressBar";
import { type AlgorithmStep } from "@/types";

interface AlgorithmStepsProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onStepSelect: (index: number) => void;
}

const AlgorithmSteps: React.FC<AlgorithmStepsProps> = ({
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

  if (!steps.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Các bước thuật toán
        </h3>
        <p className="text-gray-500">
          Không có bước thuật toán nào để hiển thị.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Các bước thuật toán
      </h3>

      <ControlButtons
        isRunning={isRunning}
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        onStart={onStart}
        onPause={onPause}
        onReset={onReset}
        onNext={onNext}
      />

      {currentStep && (
        <CurrentStepDisplay
          step={currentStep}
          currentIndex={currentStepIndex}
          totalSteps={steps.length}
        />
      )}

      <StepsList
        steps={steps}
        currentStepIndex={currentStepIndex}
        onStepSelect={onStepSelect}
      />

      <ProgressBar currentStep={currentStepIndex} totalSteps={steps.length} />
    </div>
  );
};

export default AlgorithmSteps;
