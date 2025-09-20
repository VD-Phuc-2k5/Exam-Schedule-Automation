import React, { useState } from "react";
import { Plus } from "lucide-react";
import { type Subject } from "@/types";

interface SubjectInputProps {
  subjects: Subject[];
  onAddSubject: (name: string) => void;
}

const SubjectInput: React.FC<SubjectInputProps> = ({
  subjects,
  onAddSubject,
}) => {
  const [newSubjectName, setNewSubjectName] = useState("");

  const handleAdd = () => {
    if (newSubjectName.trim() && subjects.length < 5) {
      onAddSubject(newSubjectName.trim());
      setNewSubjectName("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={newSubjectName}
        onChange={(e) => setNewSubjectName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Tên môn học..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={subjects.length >= 5}
      />
      <button
        onClick={handleAdd}
        disabled={subjects.length >= 5 || !newSubjectName.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SubjectInput;
