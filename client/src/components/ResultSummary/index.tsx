import React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { type GraphNode, type Subject, type Student } from "@/types";
import { DEFAULT_COLORS } from "@/data";

interface Props {
  nodes: GraphNode[];
  subjects: Subject[];
  students: Student[];
}

const ResultSummary: React.FC<Props> = ({ nodes, subjects, students }) => {
  const coloredNodes = nodes.filter((node) => node.color !== null);
  const uniqueColors = [...new Set(coloredNodes.map((node) => node.color))];

  const getExamSchedule = () => {
    const schedule: { [color: string]: GraphNode[] } = {};
    coloredNodes.forEach((node) => {
      if (node.color && !schedule[node.color]) {
        schedule[node.color] = [];
      }
      if (node.color) {
        schedule[node.color].push(node);
      }
    });
    return schedule;
  };

  const schedule = getExamSchedule();

  const getConflictCount = (subjectId: string): number => {
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

  if (coloredNodes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Kết quả xếp lịch
        </h3>
        <p className="text-gray-600">
          Chạy thuật toán để xem kết quả xếp lịch thi.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Kết quả xếp lịch thi
      </h3>

      {/* Summary Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-800">
            {uniqueColors.length}
          </div>
          <div className="text-sm text-blue-600">Ca thi cần thiết</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-800">
            {coloredNodes.length}
          </div>
          <div className="text-sm text-green-600">Môn đã xếp lịch</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-800">
            {students.length}
          </div>
          <div className="text-sm text-purple-600">Sinh viên tham gia</div>
        </div>
      </div>

      {/* Exam Schedule */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-700">
          Lịch thi chi tiết:
        </h4>

        {Object.entries(schedule).map(([color, examNodes]) => {
          const colorIndex = DEFAULT_COLORS.indexOf(color);
          const colorName = DEFAULT_COLORS[colorIndex];

          return (
            <div key={color} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div
                  className="w-4 h-4 rounded-full mr-3 border border-gray-400"
                  style={{ backgroundColor: color }}
                />
                <h5 className="font-semibold text-gray-800">{colorName}</h5>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {examNodes.map((node) => {
                  const subject = subjects.find((s) => s.id === node.id);
                  const conflictCount = getConflictCount(node.id);

                  return (
                    <div key={node.id} className="bg-gray-50 p-3 rounded">
                      <div className="font-medium text-gray-800">
                        {node.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Sinh viên: {subject?.students.length || 0}</div>
                        <div>Xung đột: {conflictCount} môn</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">
          Kết quả xếp lịch các ca thi
        </h4>
        <div className="text-sm text-green-700">
          <p>• Thuật toán đã phân bổ thành công {uniqueColors.length} ca thi</p>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
