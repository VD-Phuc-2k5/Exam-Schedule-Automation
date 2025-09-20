import {
  type Subject,
  type GraphNode,
  type GraphEdge,
  type AlgorithmStep,
} from "@/types";
import { DEFAULT_COLORS } from "@/data";

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
      availableColors: [...DEFAULT_COLORS],
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

export function generateColoringSteps(nodes: GraphNode[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const workingNodes = nodes.map((node) => ({
    ...node,
    neighbors: [...node.neighbors],
    availableColors: [...DEFAULT_COLORS],
  }));

  const usedColors = new Set<string>();
  let stepNumber = 1;

  while (workingNodes.some((node) => node.color === null)) {
    // Tìm đỉnh chưa tô màu có bậc cao nhất
    const uncoloredNodes = workingNodes.filter((node) => node.color === null);
    const maxDegree = Math.max(...uncoloredNodes.map((node) => node.degree));
    const targetNode = uncoloredNodes.find(
      (node) => node.degree === maxDegree,
    )!;

    // Bước chọn đỉnh
    steps.push({
      stepNumber: stepNumber++,
      description: `Chọn đỉnh "${targetNode.name}" có bậc cao nhất (bậc = ${targetNode.degree})`,
      nodeId: targetNode.id,
      action: "select",
    });

    // Tìm màu khả dụng từ danh sách màu có thể tô của đỉnh này
    let assignedColor = "";

    // Ưu tiên sử dụng màu đã tồn tại nếu có thể
    for (const color of DEFAULT_COLORS) {
      if (targetNode.availableColors.includes(color)) {
        assignedColor = color;
        if (!usedColors.has(color)) {
          usedColors.add(color);
        }
        break;
      }
    }

    // Tô màu cho đỉnh được chọn
    targetNode.color = assignedColor;

    steps.push({
      stepNumber: stepNumber++,
      description: `Tô màu cho đỉnh "${targetNode.name}" bằng màu ${assignedColor}`,
      nodeId: targetNode.id,
      action: "color",
      color: assignedColor,
    });

    // Loại bỏ màu này khỏi danh sách màu khả dụng của tất cả đỉnh kề chưa tô màu
    const affectedNeighbors: string[] = [];
    targetNode.neighbors.forEach((neighborId) => {
      const neighbor = workingNodes.find((n) => n.id === neighborId);
      if (neighbor && neighbor.color === null) {
        const colorIndex = neighbor.availableColors.indexOf(assignedColor);
        if (colorIndex > -1) {
          neighbor.availableColors.splice(colorIndex, 1);
          affectedNeighbors.push(neighbor.name);
        }
      }
    });

    if (affectedNeighbors.length > 0) {
      steps.push({
        stepNumber: stepNumber++,
        description: `Loại bỏ màu ${assignedColor} khỏi danh sách màu khả dụng của các đỉnh kề: ${affectedNeighbors.join(", ")}`,
        nodeId: null,
        action: "remove_color",
        removedColor: assignedColor,
        affectedNodes: affectedNeighbors,
      });
    }

    // Giảm bậc của các đỉnh kề chưa tô màu
    const degreeChanges: { [key: string]: number } = {};
    targetNode.neighbors.forEach((neighborId) => {
      const neighbor = workingNodes.find((n) => n.id === neighborId);
      if (neighbor && neighbor.color === null) {
        neighbor.degree--;
        neighbor.neighbors = neighbor.neighbors.filter(
          (id) => id !== targetNode.id,
        );
        degreeChanges[neighborId] = neighbor.degree;
      }
    });

    if (Object.keys(degreeChanges).length > 0) {
      steps.push({
        stepNumber: stepNumber++,
        description: `Giảm bậc các đỉnh kề chưa tô màu với "${targetNode.name}"`,
        nodeId: null,
        action: "reduce_degree",
        degreeChanges,
      });
    }
  }

  steps.push({
    stepNumber: stepNumber,
    description: `Hoàn thành thuật toán tô màu đồ thị (sử dụng ${usedColors.size} màu)`,
    nodeId: null,
    action: "complete",
    usedColorsCount: usedColors.size,
  });

  return steps;
}
