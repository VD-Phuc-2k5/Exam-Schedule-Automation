import React from "react";
import { type AnimationProps, type GraphState } from "@/types";
import GraphVisualization from "@/components/Visualization/Graph";
import AlgorithmSteps from "@/components/Visualization/Algorithm";

interface VisualizationTabProps {
  graphState: GraphState;
  animationProps: AnimationProps;
}

const VisualizationTab: React.FC<VisualizationTabProps> = ({
  graphState,
  animationProps,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <GraphVisualization
        nodes={graphState.nodes}
        edges={graphState.edges}
        selectedNode={graphState.selectedNode}
      />

      <AlgorithmSteps
        steps={animationProps.steps}
        currentStepIndex={animationProps.currentStepIndex}
        isRunning={animationProps.isRunning}
        onStart={animationProps.onStart}
        onPause={animationProps.onPause}
        onReset={animationProps.onReset}
        onNext={animationProps.onNext}
        onPrevious={animationProps.onPrevious}
        onStepSelect={animationProps.onStepSelect}
      />
    </div>
  );
};

export default VisualizationTab;
