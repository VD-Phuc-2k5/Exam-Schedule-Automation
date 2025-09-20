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
