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

export interface AppState {
  activeTab: TabType;
  subjects: Subject[];
  students: Student[];
  originalNodes: GraphNode[];
  originalEdges: GraphEdge[];
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isRunning: boolean;
}

export type AppAction =
  | { type: "SET_ACTIVE_TAB"; payload: TabType }
  | { type: "SET_SUBJECTS"; payload: Subject[] }
  | { type: "SET_STUDENTS"; payload: Student[] }
  | {
      type: "SET_GRAPH_DATA";
      payload: {
        nodes: GraphNode[];
        edges: GraphEdge[];
        steps: AlgorithmStep[];
      };
    }
  | { type: "START_ANIMATION" }
  | { type: "PAUSE_ANIMATION" }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "RESET_ANIMATION" }
  | { type: "SET_STEP_INDEX"; payload: number };

export interface AnimationProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isRunning: boolean;
  canStart: boolean;
  canNext: boolean;
  canPrevious: boolean;
  canReset: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStepSelect: (index: number) => void;
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNode: string | null;
}
