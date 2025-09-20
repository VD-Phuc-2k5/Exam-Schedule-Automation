export type TabType = "theory" | "data" | "visualization" | "results";

export interface Subject {
  id: string;
  name: string;
  students: string[];
}

export interface Student {
  id: string;
  name: string;
  subjects: string[];
}

export interface GraphNode {
  id: string;
  name: string;
  degree: number;
  color: string | null;
  position: { x: number; y: number };
  neighbors: string[];
  availableColors: string[];
}

export interface GraphEdge {
  from: string;
  to: string;
  students: string[];
}

export interface AlgorithmStep {
  stepNumber: number;
  description: string;
  nodeId: string | null;
  action: "select" | "color" | "reduce_degree" | "remove_color" | "complete";
  color?: string;
  degreeChanges?: { [key: string]: number };
  removedColor?: string;
  usedColorsCount?: number;
  affectedNodes?: string[];
}
