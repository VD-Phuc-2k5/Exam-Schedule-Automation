import React from "react";
import { X } from "lucide-react";
import { type Student, type Subject } from "@/types";

interface StudentListProps {
  students: Student[];
  subjects: Subject[];
  onRemoveStudent: (id: string) => void;
  onToggleStudentSubject: (studentId: string, subjectId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  subjects,
  onRemoveStudent,
  onToggleStudentSubject,
}) => {
  return (
    <div className="space-y-2">
      {students.map((student) => (
        <div key={student.id} className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{student.name}</span>
            <button
              onClick={() => onRemoveStudent(student.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => onToggleStudentSubject(student.id, subject.id)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  student.subjects.includes(subject.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
