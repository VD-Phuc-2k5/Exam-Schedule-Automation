import React from "react";
import DegreeChanges from "./DegreeChanges";
import { type AlgorithmStep } from "@/types";

interface CurrentStepDisplayProps {
  step: AlgorithmStep;
  currentIndex: number;
  totalSteps: number;
}

const CurrentStepDisplay: React.FC<CurrentStepDisplayProps> = ({
  step,
  currentIndex,
  totalSteps,
}) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-blue-800">
            Bước {step.stepNumber}
          </h4>
          <p className="text-blue-700 mt-1">{step.description}</p>
        </div>
        <div className="text-sm text-blue-600 font-medium">
          {currentIndex + 1} / {totalSteps}
        </div>
      </div>

      {step.degreeChanges && (
        <DegreeChanges degreeChanges={step.degreeChanges} />
      )}
    </div>
  );
};

export default CurrentStepDisplay;
