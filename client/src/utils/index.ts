import { type Subject, type GraphNode, type GraphEdge } from "@/types";

export const COLOR_NAMES = ["Ca 1", "Ca 2", "Ca 3", "Ca 4", "Ca 5"];

export function buildGraph(subjects: Subject[]): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const adjacencyMap: { [key: string]: Set<string> } = {};

  // Initialize nodes and adjacency map
  subjects.forEach((subject, index) => {
    const angle = (2 * Math.PI * index) / subjects.length;
    const radius = 150;
    const centerX = 300;
    const centerY = 200;

    nodes.push({
      id: subject.id,
      name: subject.name,
      degree: 0,
      color: null,
      position: {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      },
      neighbors: [],
    });
    adjacencyMap[subject.id] = new Set();
  });

  // Build edges based on shared students
  for (let i = 0; i < subjects.length; i++) {
    for (let j = i + 1; j < subjects.length; j++) {
      const subject1 = subjects[i];
      const subject2 = subjects[j];

      const sharedStudents = subject1.students.filter((student) =>
        subject2.students.includes(student),
      );

      if (sharedStudents.length > 0) {
        edges.push({
          from: subject1.id,
          to: subject2.id,
          students: sharedStudents,
        });

        adjacencyMap[subject1.id].add(subject2.id);
        adjacencyMap[subject2.id].add(subject1.id);
      }
    }
  }

  // Update degrees and neighbors
  nodes.forEach((node) => {
    node.neighbors = Array.from(adjacencyMap[node.id]);
    node.degree = node.neighbors.length;
  });

  return { nodes, edges };
}
