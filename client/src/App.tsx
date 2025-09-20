import { useEffect, useCallback, useMemo } from "react";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navigation";
import TabContent from "@/components/TabContent";
import { buildGraph, generateColoringSteps } from "@/utils";
import { useAppReducer } from "@/hooks/useAppReducer";
import { useGraphState } from "@/hooks/useGraphState";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { type AnimationProps } from "@/types";

function App() {
  const [state, dispatch] = useAppReducer();

  const {
    activeTab,
    subjects,
    students,
    originalNodes,
    originalEdges,
    steps,
    currentStepIndex,
    isRunning,
  } = state;

  // Update graph when data changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildGraph(subjects);
    const newSteps = generateColoringSteps(newNodes);

    dispatch({
      type: "SET_GRAPH_DATA",
      payload: { nodes: newNodes, edges: newEdges, steps: newSteps },
    });
  }, [dispatch, subjects, students]);

  // Calculate current graph state
  const graphState = useGraphState(
    originalNodes,
    originalEdges,
    steps,
    currentStepIndex,
  );

  // Animation handlers
  const handleStart = useCallback(() => {
    dispatch({ type: "START_ANIMATION" });
  }, [dispatch]);

  const handlePause = useCallback(() => {
    dispatch({ type: "PAUSE_ANIMATION" });
  }, [dispatch]);

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, [dispatch]);

  const handlePrevious = useCallback(() => {
    dispatch({ type: "PREVIOUS_STEP" });
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_ANIMATION" });
  }, [dispatch]);

  const handleStepSelect = useCallback(
    (index: number) => {
      dispatch({ type: "SET_STEP_INDEX", payload: index });
    },
    [dispatch],
  );

  const handleComplete = useCallback(() => {
    dispatch({ type: "PAUSE_ANIMATION" });
  }, [dispatch]);

  // Auto-play functionality with improved control
  useAutoPlay(
    isRunning,
    currentStepIndex,
    steps.length,
    handleNext,
    handleComplete,
  );

  // Data handlers
  const handleSubjectsChange = useCallback(
    (newSubjects: typeof subjects) => {
      dispatch({ type: "SET_SUBJECTS", payload: newSubjects });
    },
    [dispatch],
  );

  const handleStudentsChange = useCallback(
    (newStudents: typeof students) => {
      dispatch({ type: "SET_STUDENTS", payload: newStudents });
    },
    [dispatch],
  );

  const handleTabChange = useCallback(
    (tab: typeof activeTab) => {
      dispatch({ type: "SET_ACTIVE_TAB", payload: tab });
    },
    [dispatch],
  );

  // Create animation props with proper interface
  const animationProps: AnimationProps = useMemo(
    () => ({
      steps,
      currentStepIndex,
      isRunning,
      canStart: !isRunning && currentStepIndex < steps.length,
      canNext: currentStepIndex < steps.length,
      canPrevious: currentStepIndex > 0,
      canReset: currentStepIndex > 0,
      onStart: handleStart,
      onPause: handlePause,
      onReset: handleReset,
      onNext: handleNext,
      onPrevious: handlePrevious,
      onStepSelect: handleStepSelect,
    }),
    [
      steps,
      currentStepIndex,
      isRunning,
      handleStart,
      handlePause,
      handleReset,
      handleNext,
      handlePrevious,
      handleStepSelect,
    ],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="space-y-8">
          <TabContent
            activeTab={activeTab}
            subjects={subjects}
            students={students}
            onSubjectsChange={handleSubjectsChange}
            onStudentsChange={handleStudentsChange}
            graphState={graphState}
            animationProps={animationProps}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
