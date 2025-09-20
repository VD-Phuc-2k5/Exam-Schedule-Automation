import { useState } from "react";
import TheorySection from "@/components/TheorySection";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import Navigation from "@/components/Shared/Navigation";
import DataInput from "@/components/DataInput";
import { type TabType, type Subject, type Student } from "@/types";
import { DEFAULT_SUBJECTS, DEFAULT_STUDENTS } from "@/data";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("theory");
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);
  const [students, setStudents] = useState<Student[]>(DEFAULT_STUDENTS);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Ly thuyet */}
        <div className="space-y-8">
          {activeTab === "theory" && <TheorySection />}
        </div>

        {/* Du lieu */}
        {activeTab === "data" && (
          <DataInput
            subjects={subjects}
            students={students}
            onSubjectsChange={setSubjects}
            onStudentsChange={setStudents}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
