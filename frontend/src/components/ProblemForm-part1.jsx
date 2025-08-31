import React, { useEffect, useMemo, useCallback, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Editor from "@monaco-editor/react";
import { axiosInstance } from "../libs/axios";
import { Toast } from "../store/useToastStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useThemeStore } from "../store/useThemeStore";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import AIProblemGeneratorModal from "./AIProblemGeneratorModal";
import {
  Plus,
  Trash2,
  Code2,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Briefcase,
  Download,
  Save,
  ArrowLeft,
  FileText,
  Tag,
  Building,
  Braces,
  PlusCircle
} from "lucide-react";
import "../styles/ProblemForm.css";
// Using CSS-based AI icon instead of batman image
import aiorb from "../assets/images/ai-orb.webp";
import aiorb2 from "../assets/images/ai-orb2.webp";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  companyTags: z.array(z.string()).optional(),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testcases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java code snippet is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});
