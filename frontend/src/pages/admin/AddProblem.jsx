import React from "react";
import ProblemForm from "../../components/ProblemForm";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

const AddProblem = () => {
  return (
    <div className="bg-[#101010] dashboard-container min-h-screen mx-auto">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Sidebar />
        <Link to="/dashboard">
          <button className="text-white/80 hover:text-white transition-all duration-300 ease-in-out cursor-pointer mt-4 mb-6">
            🡰 Back
          </button>
        </Link>
        <h1 className="text-white text-center neue-med text-3xl">
          Add problem
        </h1>
        <ProblemForm />
      </div>
    </div>
  );
};

export default AddProblem;