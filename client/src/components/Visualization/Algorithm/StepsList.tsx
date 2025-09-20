import React from "react";
import StepItem from "./StepItem";
import { type AlgorithmStep } from "@/types";

interface StepsListProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
}

const StepsList: React.FC<StepsListProps> = ({
  steps,
  currentStepIndex,
  onStepSelect,
}) => {
  return (
    <div className="space-y-2 max-h-60 overflow-y-auto">
      {steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          index={index}
          currentStepIndex={currentStepIndex}
          onStepSelect={onStepSelect}
        />
      ))}
    </div>
  );
};

export default StepsList;
