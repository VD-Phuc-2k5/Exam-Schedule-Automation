import { useMemo } from "react";
import { type GraphNode, type Subject, type ExamSchedule } from "@/types";

export const useExamSchedule = (nodes: GraphNode[], subjects: Subject[]) => {
  const coloredNodes = useMemo(
    () => nodes.filter((node) => node.color !== null),
    [nodes],
  );

  const uniqueColors = useMemo(
    () => [...new Set(coloredNodes.map((node) => node.color))],
    [coloredNodes],
  );

  const schedule = useMemo(() => {
    const schedule: ExamSchedule = {};
    coloredNodes.forEach((node) => {
      if (node.color && !schedule[node.color]) {
        schedule[node.color] = [];
      }
      if (node.color) {
        schedule[node.color].push(node);
      }
    });
    return schedule;
  }, [coloredNodes]);

  const getConflictCount = useMemo(() => {
    return (subjectId: string): number => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (!subject) return 0;

      let conflicts = 0;
      subjects.forEach((otherSubject) => {
        if (otherSubject.id !== subjectId) {
          const sharedStudents = subject.students.filter((studentId) =>
            otherSubject.students.includes(studentId),
          );
          if (sharedStudents.length > 0) {
            conflicts++;
          }
        }
      });
      return conflicts;
    };
  }, [subjects]);

  return {
    coloredNodes,
    uniqueColors,
    schedule,
    getConflictCount,
  };
};
