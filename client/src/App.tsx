import { useState, useEffect } from "react";
import TheorySection from "@/components/TheorySection";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navigation";
import DataInput from "@/components/DataInput";
import GraphVisualization from "@/components/Visualization/Graph";
import {
  type TabType,
  type Subject,
  type Student,
  type GraphEdge,
  type GraphNode,
} from "@/types";
import { DEFAULT_SUBJECTS, DEFAULT_STUDENTS } from "@/data";
import { buildGraph } from "@/utils";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("theory");
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Update graph when data changes
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildGraph(subjects);
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
  }, [subjects, students]);

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
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
