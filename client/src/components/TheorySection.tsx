import React from "react";
import { BookOpen, Target, CheckCircle } from "lucide-react";

const TheorySection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          Lý thuyết thuật toán
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">
              Xây dựng bài toán
            </h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>• Đỉnh:</strong> Mỗi môn học là một đỉnh trong đồ thị
            </p>
            <p>
              <strong>• Cạnh:</strong> Hai đỉnh được xem là kề nhau khi có ít
              nhất một sinh viên đăng ký cả hai môn học
            </p>
            <p>
              <strong>• Màu:</strong> Mỗi màu đại diện cho một ca thi
            </p>
            <p>
              <strong>• Mục tiêu:</strong> Tô màu tất cả đỉnh sao cho hai đỉnh
              kề nhau không cùng màu (sinh viên đăng ký chung hai môn học A, B
              thì phải thi hai ca khác nhau)
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Cách giải</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Bước 1:</strong> Chọn đỉnh có bậc cao nhất
            </p>
            <p>
              <strong>Bước 2:</strong> Tô màu cho đỉnh có bậc cao nhất
            </p>
            <p>
              <strong>Bước 3:</strong> Giảm bậc của các đỉnh kề nhau
            </p>
            <p>
              <strong>Bước 4:</strong> Lặp lại cho đến khi tô hết tất cả đỉnh
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-700">Kết luận</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>• Ưu điểm:</strong> Thuật toán greedy đơn giản, hiệu quả
            </p>
            <p>
              <strong>• Nhược điểm:</strong> Thuật toán trở nên phức tạp hơn khi
              thêm ràng buộc mỗi ca thi có n phòng thi và mỗi phòng thi lại có
              thể chứa được m sinh viên cho mỗi ca.
            </p>
            <p>
              <strong>• Độ phức tạp:</strong> O(V²) với V là số đỉnh
            </p>
            <p>
              <strong>• Ứng dụng:</strong> Xếp lịch thi, phân ca làm việc, phân
              bổ tài nguyên
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheorySection;
