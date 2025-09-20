import React from "react";
import { type Student, type Subject } from "@/types";
import StudentInput from "./StudentInput";
import StudentList from "./StudentList";

interface StudentsSectionProps {
  students: Student[];
  subjects: Subject[];
  onAddStudent: (name: string) => void;
  onRemoveStudent: (id: string) => void;
  onToggleStudentSubject: (studentId: string, subjectId: string) => void;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({
  students,
  subjects,
  onAddStudent,
  onRemoveStudent,
  onToggleStudentSubject,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Sinh viên (Tối đa 10)
      </h3>
      <StudentInput students={students} onAddStudent={onAddStudent} />
      <StudentList
        students={students}
        subjects={subjects}
        onRemoveStudent={onRemoveStudent}
        onToggleStudentSubject={onToggleStudentSubject}
      />
    </div>
  );
};

export default StudentsSection;
