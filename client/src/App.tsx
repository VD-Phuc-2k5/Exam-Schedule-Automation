import { useState, useEffect, useCallback } from "react";
import TheorySection from "@/components/TheorySection";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navigation";
import DataInput from "@/components/DataInput";
import GraphVisualization from "@/components/Visualization/Graph";
import AlgorithmSteps from "./components/Visualization/Algorithm";
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
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Update graph when data changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildGraph(subjects);
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
    setSteps(generateColoringSteps(newNodes));
    setCurrentStepIndex(0);
    setIsRunning(false);
  }, [subjects, students]);

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

  // Apply step to graph
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const step = steps[currentStepIndex];

      setNodes((prevNodes) => {
        const newNodes = [...prevNodes];

        if (step.action === "select" && step.nodeId) {
          setSelectedNode(step.nodeId);
        } else if (step.action === "color" && step.nodeId && step.color) {
          const nodeIndex = newNodes.findIndex((n) => n.id === step.nodeId);
          if (nodeIndex !== -1) {
            newNodes[nodeIndex] = { ...newNodes[nodeIndex], color: step.color };
          }
          setSelectedNode(null);
        } else if (step.action === "reduce_degree" && step.degreeChanges) {
          Object.entries(step.degreeChanges).forEach(([nodeId, newDegree]) => {
            const nodeIndex = newNodes.findIndex((n) => n.id === nodeId);
            if (nodeIndex !== -1) {
              newNodes[nodeIndex] = {
                ...newNodes[nodeIndex],
                degree: newDegree,
              };
            }
          });
        } else if (step.action === "complete") {
          setSelectedNode(null);
          setIsRunning(false);
        }

        return newNodes;
      });
    }
  }, [currentStepIndex, steps]);

  const handleStart = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setIsRunning(true);
      if (currentStepIndex === 0) {
        setCurrentStepIndex(0);
      }
    }
  }, [currentStepIndex, steps.length]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setIsRunning(false);
    }
  }, [currentStepIndex, steps.length]);

  const handleReset = useCallback(() => {
    // Completely rebuild graph and steps from scratch
    const { nodes: resetNodes, edges: resetEdges } = buildGraph(subjects);
    setNodes(resetNodes);
    setEdges(resetEdges);
    setSteps(generateColoringSteps(resetNodes));
    setCurrentStepIndex(0);
    setIsRunning(false);
    setSelectedNode(null);
  }, [subjects]);

  const handleStepSelect = useCallback((index: number) => {
    setCurrentStepIndex(index);
    setIsRunning(false);
  }, []);

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
              nodes={nodes}
              edges={edges}
              selectedNode={selectedNode}
            />

            <AlgorithmSteps
              steps={steps}
              currentStepIndex={currentStepIndex}
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onNext={handleNext}
              onStepSelect={handleStepSelect}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
