import { useState, useEffect, useCallback, useMemo } from "react";
import TheorySection from "@/components/TheorySection";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navigation";
import DataInput from "@/components/DataInput";
import GraphVisualization from "@/components/Visualization/Graph";
import AlgorithmSteps from "@/components/Visualization/Algorithm";
import ResultSummary from "@/components/ResultSummary";
import {
  type TabType,
  type Subject,
  type Student,
  type GraphEdge,
  type GraphNode,
  type AlgorithmStep,
} from "@/types";
import { DEFAULT_SUBJECTS, DEFAULT_STUDENTS } from "@/data";
import { buildGraph, generateColoringSteps } from "@/utils";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("theory");
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);
  const [originalNodes, setOriginalNodes] = useState<GraphNode[]>([]);
  const [originalEdges, setOriginalEdges] = useState<GraphEdge[]>([]);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Update original graph when data changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildGraph(subjects);
    setOriginalNodes(newNodes);
    setOriginalEdges(newEdges);
    setSteps(generateColoringSteps(newNodes));
    setCurrentStepIndex(0);
    setIsRunning(false);
  }, [subjects, students]);

  // Calculate current graph state based on steps up to currentStepIndex
  const currentGraphState = useMemo(() => {
    if (currentStepIndex === 0) {
      return {
        nodes: originalNodes,
        edges: originalEdges,
        selectedNode: null,
      };
    }

    const nodes = [...originalNodes];
    let selectedNode: string | null = null;

    // Apply all steps up to currentStepIndex (exclusive for step 0, inclusive for others)
    const stepsToApply = currentStepIndex;
    for (let i = 0; i < stepsToApply && i < steps.length; i++) {
      const step = steps[i];

      if (step.action === "select" && step.nodeId) {
        selectedNode = step.nodeId;
      } else if (step.action === "color" && step.nodeId && step.color) {
        const nodeIndex = nodes.findIndex((n) => n.id === step.nodeId);
        if (nodeIndex !== -1) {
          nodes[nodeIndex] = { ...nodes[nodeIndex], color: step.color };
        }
        // Clear selection after coloring
        if (selectedNode === step.nodeId) {
          selectedNode = null;
        }
      } else if (step.action === "reduce_degree" && step.degreeChanges) {
        Object.entries(step.degreeChanges).forEach(([nodeId, newDegree]) => {
          const nodeIndex = nodes.findIndex((n) => n.id === nodeId);
          if (nodeIndex !== -1) {
            nodes[nodeIndex] = {
              ...nodes[nodeIndex],
              degree: newDegree,
            };
          }
        });
      } else if (step.action === "complete") {
        selectedNode = null;
      }
    }

    return {
      nodes,
      edges: originalEdges,
      selectedNode,
    };
  }, [originalNodes, originalEdges, steps, currentStepIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isRunning && currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, currentStepIndex, steps.length]);

  const handleStart = useCallback(() => {
    if (currentStepIndex < steps.length) {
      setIsRunning(true);
    }
  }, [currentStepIndex, steps.length]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setIsRunning(false);
    }
  }, [currentStepIndex, steps.length]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setIsRunning(false);
    }
  }, [currentStepIndex]);

  const handleReset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsRunning(false);
  }, []);

  const handleStepSelect = useCallback(
    (index: number) => {
      // Allow selecting any valid step index (0 to steps.length)
      if (index >= 0 && index <= steps.length) {
        setCurrentStepIndex(index);
        setIsRunning(false);
      }
    },
    [steps.length],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Ly thuyet */}
        <div className="space-y-8">
          {activeTab === "theory" && <TheorySection />}
        </div>

        {/* Du lieu */}
        {activeTab === "data" && (
          <DataInput
            subjects={subjects}
            students={students}
            onSubjectsChange={setSubjects}
            onStudentsChange={setStudents}
          />
        )}

        {/* Do thi */}
        {activeTab === "visualization" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <GraphVisualization
              nodes={currentGraphState.nodes}
              edges={currentGraphState.edges}
              selectedNode={currentGraphState.selectedNode}
            />

            <AlgorithmSteps
              steps={steps}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onStepSelect={handleStepSelect}
            />
          </div>
        )}

        {/* Ket qua */}
        {activeTab === "results" && (
          <ResultSummary
            nodes={currentGraphState.nodes}
            subjects={subjects}
            students={students}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
