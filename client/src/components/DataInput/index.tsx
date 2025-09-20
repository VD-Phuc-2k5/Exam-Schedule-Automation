import React, { useReducer } from "react";
import { RotateCcw } from "lucide-react";
import { type Subject, type Student } from "@/types";
import {
  dataReducer,
  type DataState,
} from "@/components/DataInput/dataReducer";
import { DEFAULT_SUBJECTS, DEFAULT_STUDENTS } from "@/data";
import SubjectsSection from "@/components/DataInput/Subject/SubjectSection";
import StudentsSection from "@/components/DataInput/Student/StudentSection";

interface Props {
  subjects: Subject[];
  students: Student[];
  onSubjectsChange: (subjects: Subject[]) => void;
  onStudentsChange: (students: Student[]) => void;
}

const DataInput: React.FC<Props> = ({
  subjects,
  students,
  onSubjectsChange,
  onStudentsChange,
}) => {
  const initialState: DataState = { subjects, students };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  React.useEffect(() => {
    onSubjectsChange(state.subjects);
    onStudentsChange(state.students);
  }, [state.subjects, state.students, onSubjectsChange, onStudentsChange]);

  const handleAddSubject = (name: string) => {
    dispatch({ type: "ADD_SUBJECT", payload: { name } });
  };

  const handleRemoveSubject = (id: string) => {
    dispatch({ type: "REMOVE_SUBJECT", payload: { id } });
  };

  const handleAddStudent = (name: string) => {
    dispatch({ type: "ADD_STUDENT", payload: { name } });
  };

  const handleRemoveStudent = (id: string) => {
    dispatch({ type: "REMOVE_STUDENT", payload: { id } });
  };

  const handleToggleStudentSubject = (studentId: string, subjectId: string) => {
    dispatch({
      type: "TOGGLE_STUDENT_SUBJECT",
      payload: { studentId, subjectId },
    });
  };

  const handleResetToDefault = () => {
    dispatch({
      type: "RESET_TO_DEFAULT",
      payload: { subjects: DEFAULT_SUBJECTS, students: DEFAULT_STUDENTS },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý dữ liệu</h2>
        <button
          onClick={handleResetToDefault}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Dữ liệu mẫu
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SubjectsSection
          subjects={state.subjects}
          onAddSubject={handleAddSubject}
          onRemoveSubject={handleRemoveSubject}
        />

        <StudentsSection
          students={state.students}
          subjects={state.subjects}
          onAddStudent={handleAddStudent}
          onRemoveStudent={handleRemoveStudent}
          onToggleStudentSubject={handleToggleStudentSubject}
        />
      </div>
    </div>
  );
};

export default DataInput;
