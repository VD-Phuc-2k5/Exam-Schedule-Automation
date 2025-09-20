import React, { useState } from "react";
import { Plus } from "lucide-react";
import { type Student } from "@/types";

interface StudentInputProps {
  students: Student[];
  onAddStudent: (name: string) => void;
}

const StudentInput: React.FC<StudentInputProps> = ({
  students,
  onAddStudent,
}) => {
  const [newStudentName, setNewStudentName] = useState("");

  const handleAdd = () => {
    if (newStudentName.trim() && students.length < 10) {
      onAddStudent(newStudentName.trim());
      setNewStudentName("");
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
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Tên sinh viên..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={students.length >= 10}
      />
      <button
        onClick={handleAdd}
        disabled={students.length >= 10 || !newStudentName.trim()}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default StudentInput;
