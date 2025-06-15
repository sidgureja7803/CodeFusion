import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProblemForm from "../components/ProblemForm";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "../components/Loader";
import { Toast } from "../store/useToastStore";
import { ArrowLeft } from "lucide-react";

const EditProblem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProblem = async () => {
      try {
        await getProblemById(id);
        setIsLoading(false);
      } catch (error) {
        Toast.error("Failed to load problem");
        navigate("/dashboard");
      }
    };

    loadProblem();
  }, [id, getProblemById, navigate]);

  if (isLoading || isProblemLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#101010] dashboard-container min-h-screen mx-auto">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Sidebar />
        <div className="mt-4 mb-6">
          <Link
            to="/dashboard"
            className="text-white/80 hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-white text-center neue-med text-3xl">
            Edit Problem
          </h1>
        </div>
        <ProblemForm isEditing={true} problemData={problem} />
      </div>
    </div>
  );
};

export default EditProblem;