import React from "react";
import {
  type TabType,
  type Subject,
  type Student,
  type AnimationProps,
  type GraphState,
} from "@/types";
import TheorySection from "@/components/TheorySection";
import DataInput from "@/components/DataInput";
import VisualizationTab from "@/components/VisualizationTab";
import ResultSummary from "@/components/ResultSummary";

interface TabContentProps {
  activeTab: TabType;
  subjects: Subject[];
  students: Student[];
  onSubjectsChange: (subjects: Subject[]) => void;
  onStudentsChange: (students: Student[]) => void;
  graphState: GraphState;
  animationProps: AnimationProps;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  subjects,
  students,
  onSubjectsChange,
  onStudentsChange,
  graphState,
  animationProps,
}) => {
  switch (activeTab) {
    case "theory":
      return <TheorySection />;

    case "data":
      return (
        <DataInput
          subjects={subjects}
          students={students}
          onSubjectsChange={onSubjectsChange}
          onStudentsChange={onStudentsChange}
        />
      );

    case "visualization":
      return (
        <VisualizationTab
          graphState={graphState}
          animationProps={animationProps}
        />
      );

    case "results":
      return (
        <ResultSummary
          nodes={graphState.nodes}
          subjects={subjects}
          students={students}
        />
      );

    default:
      return null;
  }
};

export default TabContent;
