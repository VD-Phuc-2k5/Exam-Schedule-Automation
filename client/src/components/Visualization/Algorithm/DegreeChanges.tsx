import React from "react";

interface DegreeChangesProps {
  degreeChanges: Record<string, number>;
}

const DegreeChanges: React.FC<DegreeChangesProps> = ({ degreeChanges }) => {
  return (
    <div className="mt-3 text-sm">
      <p className="font-medium text-blue-800 mb-2">Thay đổi bậc đỉnh:</p>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(degreeChanges).map(([nodeId, newDegree]) => (
          <span
            key={nodeId}
            className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs"
          >
            Đỉnh {nodeId}: {newDegree}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DegreeChanges;
