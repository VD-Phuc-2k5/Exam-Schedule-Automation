import React from "react";
import { X } from "lucide-react";
import { type Subject } from "@/types";

interface SubjectListProps {
  subjects: Subject[];
  onRemoveSubject: (id: string) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  onRemoveSubject,
}) => {
  return (
    <div className="space-y-2">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <span className="font-medium">{subject.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {subject.students.length} sinh viên
            </span>
            <button
              onClick={() => onRemoveSubject(subject.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
