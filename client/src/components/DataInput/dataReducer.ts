import { type Subject, type Student } from "@/types";

export interface DataState {
  subjects: Subject[];
  students: Student[];
}

export type DataAction =
  | { type: "ADD_SUBJECT"; payload: { name: string } }
  | { type: "REMOVE_SUBJECT"; payload: { id: string } }
  | { type: "ADD_STUDENT"; payload: { name: string } }
  | { type: "REMOVE_STUDENT"; payload: { id: string } }
  | {
      type: "TOGGLE_STUDENT_SUBJECT";
      payload: { studentId: string; subjectId: string };
    }
  | {
      type: "RESET_TO_DEFAULT";
      payload: { subjects: Subject[]; students: Student[] };
    };

export const dataReducer = (
  state: DataState,
  action: DataAction,
): DataState => {
  switch (action.type) {
    case "ADD_SUBJECT": {
      if (state.subjects.length >= 5) return state;

      const newSubject: Subject = {
        id: Date.now().toString(),
        name: action.payload.name.trim(),
        students: [],
      };

      return {
        ...state,
        subjects: [...state.subjects, newSubject],
      };
    }

    case "REMOVE_SUBJECT": {
      const updatedSubjects = state.subjects.filter(
        (s) => s.id !== action.payload.id,
      );
      const updatedStudents = state.students.map((student) => ({
        ...student,
        subjects: student.subjects.filter(
          (subId) => subId !== action.payload.id,
        ),
      }));

      return {
        subjects: updatedSubjects,
        students: updatedStudents,
      };
    }

    case "ADD_STUDENT": {
      if (state.students.length >= 10) return state;

      const newStudent: Student = {
        id: Date.now().toString(),
        name: action.payload.name.trim(),
        subjects: [],
      };

      return {
        ...state,
        students: [...state.students, newStudent],
      };
    }

    case "REMOVE_STUDENT": {
      const updatedStudents = state.students.filter(
        (s) => s.id !== action.payload.id,
      );
      const updatedSubjects = state.subjects.map((subject) => ({
        ...subject,
        students: subject.students.filter(
          (stuId) => stuId !== action.payload.id,
        ),
      }));

      return {
        subjects: updatedSubjects,
        students: updatedStudents,
      };
    }

    case "TOGGLE_STUDENT_SUBJECT": {
      const { studentId, subjectId } = action.payload;

      const updatedStudents = state.students.map((student) => {
        if (student.id === studentId) {
          const hasSubject = student.subjects.includes(subjectId);
          return {
            ...student,
            subjects: hasSubject
              ? student.subjects.filter((id) => id !== subjectId)
              : [...student.subjects, subjectId],
          };
        }
        return student;
      });

      const updatedSubjects = state.subjects.map((subject) => {
        if (subject.id === subjectId) {
          const student = updatedStudents.find((s) => s.id === studentId);
          const hasStudent = student?.subjects.includes(subjectId);
          return {
            ...subject,
            students: hasStudent
              ? [
                  ...subject.students.filter((id) => id !== studentId),
                  studentId,
                ]
              : subject.students.filter((id) => id !== studentId),
          };
        }
        return subject;
      });

      return {
        subjects: updatedSubjects,
        students: updatedStudents,
      };
    }

    case "RESET_TO_DEFAULT": {
      return {
        subjects: action.payload.subjects,
        students: action.payload.students,
      };
    }

    default:
      return state;
  }
};
