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
}

export interface GraphEdge {
  from: string;
  to: string;
  students: string[];
}
