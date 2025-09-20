import { type Subject, type Student } from "@/types";

export const DEFAULT_SUBJECTS: Subject[] = [
  { id: "1", name: "Toán cao cấp", students: ["SV1", "SV2", "SV3", "SV4"] },
  { id: "2", name: "Vật lý đại cương", students: ["SV2", "SV3", "SV5", "SV6"] },
  { id: "3", name: "Lập trình C++", students: ["SV1", "SV4", "SV7", "SV8"] },
  { id: "4", name: "Cơ sở dữ liệu", students: ["SV3", "SV5", "SV7", "SV9"] },
  { id: "5", name: "Mạng máy tính", students: ["SV2", "SV6", "SV8", "SV10"] },
];

export const DEFAULT_STUDENTS: Student[] = [
  { id: "SV1", name: "Nguyễn Văn A", subjects: ["1", "3"] },
  { id: "SV2", name: "Trần Thị B", subjects: ["1", "2", "5"] },
  { id: "SV3", name: "Lê Văn C", subjects: ["1", "2", "4"] },
  { id: "SV4", name: "Phạm Thị D", subjects: ["1", "3"] },
  { id: "SV5", name: "Hoàng Văn E", subjects: ["2", "4"] },
  { id: "SV6", name: "Ngô Thị F", subjects: ["2", "5"] },
  { id: "SV7", name: "Đặng Văn G", subjects: ["3", "4"] },
  { id: "SV8", name: "Vũ Thị H", subjects: ["3", "5"] },
  { id: "SV9", name: "Bùi Văn I", subjects: ["4"] },
  { id: "SV10", name: "Mai Thị K", subjects: ["5"] },
];

export const DEFAULT_COLORS = [
  "#4ECDC4",
  "#FF6B6B",
  "#A8A2D3",
  "#FFD93D",
  "#2C3E50",
];
