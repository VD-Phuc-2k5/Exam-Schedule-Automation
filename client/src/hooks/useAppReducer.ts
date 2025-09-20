import { useReducer } from "react";
import { type AppState, type AppAction } from "@/types";
import { DEFAULT_SUBJECTS, DEFAULT_STUDENTS } from "@/data";

const initialState: AppState = {
  activeTab: "theory",
  subjects: DEFAULT_SUBJECTS,
  students: DEFAULT_STUDENTS,
  originalNodes: [],
  originalEdges: [],
  steps: [],
  currentStepIndex: 0,
  isRunning: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "SET_SUBJECTS":
      return { ...state, subjects: action.payload };

    case "SET_STUDENTS":
      return { ...state, students: action.payload };

    case "SET_GRAPH_DATA":
      return {
        ...state,
        originalNodes: action.payload.nodes,
        originalEdges: action.payload.edges,
        steps: action.payload.steps,
        currentStepIndex: 0,
        isRunning: false,
      };

    case "START_ANIMATION":
      return state.currentStepIndex < state.steps.length
        ? { ...state, isRunning: true }
        : state;

    case "PAUSE_ANIMATION":
      return { ...state, isRunning: false };

    case "NEXT_STEP":
      if (state.currentStepIndex < state.steps.length) {
        const newStepIndex = state.currentStepIndex + 1;
        const shouldKeepRunning =
          state.isRunning && newStepIndex < state.steps.length;
        return {
          ...state,
          currentStepIndex: newStepIndex,
          isRunning: shouldKeepRunning,
        };
      }
      return { ...state, isRunning: false };

    case "PREVIOUS_STEP":
      return state.currentStepIndex > 0
        ? {
            ...state,
            currentStepIndex: state.currentStepIndex - 1,
            isRunning: false,
          }
        : state;

    case "RESET_ANIMATION":
      return { ...state, currentStepIndex: 0, isRunning: false };

    case "SET_STEP_INDEX":
      return action.payload >= 0 && action.payload <= state.steps.length
        ? { ...state, currentStepIndex: action.payload, isRunning: false }
        : state;

    default:
      return state;
  }
}

export function useAppReducer() {
  return useReducer(appReducer, initialState);
}
