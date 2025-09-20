import { Palette, FileText, BarChart3 } from "lucide-react";
import { type TabType } from "../../types";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (activeTab: TabType) => void;
}

function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: "theory" as const, label: "Lý thuyết", icon: FileText },
    { id: "data" as const, label: "Dữ liệu", icon: BarChart3 },
    { id: "visualization" as const, label: "Thuật toán", icon: Palette },
    { id: "results" as const, label: "Kết quả", icon: BarChart3 },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-lg shadow-lg p-1 flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Navigation;
