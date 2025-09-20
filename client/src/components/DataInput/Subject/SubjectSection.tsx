import React from "react";
import { type Subject } from "@/types";
import SubjectInput from "./SubjectInput";
import SubjectList from "./SubjectList";

interface SubjectsSectionProps {
  subjects: Subject[];
  onAddSubject: (name: string) => void;
  onRemoveSubject: (id: string) => void;
}

const SubjectsSection: React.FC<SubjectsSectionProps> = ({
  subjects,
  onAddSubject,
  onRemoveSubject,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Môn học (Tối đa 5)
      </h3>
      <SubjectInput subjects={subjects} onAddSubject={onAddSubject} />
      <SubjectList subjects={subjects} onRemoveSubject={onRemoveSubject} />
    </div>
  );
};

export default SubjectsSection;
