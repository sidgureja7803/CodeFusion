import React, { useEffect, useMemo, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { axiosInstance } from "../libs/axios";
import { Toast } from "../store/useToastStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useThemeStore } from "../store/useThemeStore";
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
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

// Sample problem data for another type of question
const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const ProblemForm = ({ isEditing = false, problemData = null }) => {
  const [sampleType, setSampleType] = useState("DP");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const { theme } = useThemeStore();

  // Initialize form with problem data if in edit mode
  const defaultValues = useMemo(() => {
    if (isEditing && problemData) {
      return {
        ...problemData,
        // Ensure all required fields exist
        testcases: problemData.testcases || [{ input: "", output: "" }],
        tags: problemData.tags || [""],
        companyTags: problemData.companyTags || [],
        examples: problemData.examples || {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippets: problemData.codeSnippets || {
          JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
          PYTHON: "def solution():\n    # Write your code here\n    pass",
          JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
        },
        referenceSolutions: problemData.referenceSolutions || {
          JAVASCRIPT: "// Add your reference solution here",
          PYTHON: "# Add your reference solution here",
          JAVA: "// Add your reference solution here",
        },
      };
    }
    // Default values for create mode
    return {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    };
  }, [isEditing, problemData]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const getEditorTheme = () => {
    return theme === "light" ? "vs-light" : "vs-dark";
  };

  useEffect(() => {
    if (isEditing && problemData) {
      reset(defaultValues);
    }
  }, [isEditing, problemData, reset, defaultValues]);

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: companyTagFields,
    append: appendCompanyTag,
    remove: removeCompanyTag,
    replace: replaceCompanyTags,
  } = useFieldArray({
    control,
    name: "companyTags",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const handleAIGenerated = useCallback(
    (generatedProblem) => {
      try {
        console.log("Received AI generated problem:", generatedProblem);

        // Ensure all required fields are present
        const formattedProblem = {
          ...generatedProblem,
          // Format tags as array
          tags: Array.isArray(generatedProblem.tags)
            ? generatedProblem.tags
            : [generatedProblem.tags],

          // Ensure testcases array
          testcases: Array.isArray(generatedProblem.testcases)
            ? generatedProblem.testcases
            : [],

          // Ensure all required nested objects exist
          examples: {
            JAVASCRIPT: generatedProblem.examples?.JAVASCRIPT || {
              input: "",
              output: "",
              explanation: "",
            },
            PYTHON: generatedProblem.examples?.PYTHON || {
              input: "",
              output: "",
              explanation: "",
            },
            JAVA: generatedProblem.examples?.JAVA || {
              input: "",
              output: "",
              explanation: "",
            },
          },

          codeSnippets: {
            JAVASCRIPT: generatedProblem.codeSnippets?.JAVASCRIPT || "",
            PYTHON: generatedProblem.codeSnippets?.PYTHON || "",
            JAVA: generatedProblem.codeSnippets?.JAVA || "",
          },

          referenceSolutions: {
            JAVASCRIPT: generatedProblem.referenceSolutions?.JAVASCRIPT || "",
            PYTHON: generatedProblem.referenceSolutions?.PYTHON || "",
            JAVA: generatedProblem.referenceSolutions?.JAVA || "",
          },
        };

        console.log("Formatted problem data:", formattedProblem);

        // Reset form with formatted data
        reset(formattedProblem);

        // Update field arrays
        replaceTags(formattedProblem.tags);
        replaceTestCases(formattedProblem.testcases);

        // Close the modal
        setIsAIModalOpen(false);
      } catch (error) {
        console.error("Error formatting AI generated problem:", error);
        Toast.error("Error loading AI generated problem");
      }
    },
    [reset, replaceTags, replaceTestCases, setIsAIModalOpen]
  );

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      let response;

      if (isEditing) {
        response = await axiosInstance.put(
          `/problems/update-problem/${problemData.id}`,
          data
        );
        Toast.success(response.data.message || "Problem updated successfully!");
      } else {
        response = await axiosInstance.post("/problems/create-problem", data);
        Toast.success(response.data.message || "Problem created successfully!");
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} problem:`,
        error
      );
      Toast.error(
        error.response?.data?.message ||
          `Error ${isEditing ? "updating" : "creating"} problem`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;

    // Replace the tags and test cases arrays
    replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestCases(sampleData.testcases.map((tc) => tc));

    // Reset the form with sample data
    reset(sampleData);
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="prob-form-container">
      <div className="prob-form-card">
        <div className="prob-form-header">
          <div className="flex gap-4 justify-between items-center w-full">
            <div className="flex gap-2">
              <button
                type="button"
                className={`prob-btn ${
                  sampleType === "DP" ? "prob-btn-primary" : ""
                }`}
                onClick={() => setSampleType("DP")}
              >
                DP Problem
              </button>
              <button
                type="button"
                className={`prob-btn ${
                  sampleType === "string" ? "prob-btn-primary" : ""
                }`}
                onClick={() => setSampleType("string")}
              >
                String Problem
              </button>
              <button
                type="button"
                className="prob-btn prob-btn-primary"
                onClick={loadSampleData}
              >
                <Download size={16} /> Load Sample
              </button>
            </div>
            {/* <button
              type="button"
              className=" relative ai-btn"
              onClick={() => setIsAIModalOpen(true)}
            >
              <img
                className="w-12 absolute left-0 brightness-125 ai-logo"
                src={aiorb}
                alt=""
              />
              <span className="ml-8">AI [Experimental]</span>
            </button> */}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Information */}
          <div className="prob-section-card">
            <div className="prob-grid">
              <div className="prob-field-group">
                <label className="prob-input-label">Title</label>
                <input
                  type="text"
                  className="prob-input border-2 border-gray-300"
                  {...register("title")}
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <div className="prob-error">{errors.title.message}</div>
                )}
              </div>

              <div className="prob-field-group">
                <label className="prob-input-label">Description</label>
                <textarea
                  className="prob-input prob-textarea"
                  {...register("description")}
                  placeholder="Enter problem description"
                />
                {errors.description && (
                  <div className="prob-error">{errors.description.message}</div>
                )}
              </div>

              <div className="prob-field-group">
                <label className="prob-input-label">Difficulty</label>
                <select
                  className="prob-input prob-select"
                  {...register("difficulty")}
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <div className="prob-error">{errors.difficulty.message}</div>
                )}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="prob-section-card">
            <div className="prob-flex prob-flex-between">
              <h3 className="prob-section-title">
                <BookOpen size={20} /> Tags
              </h3>
              <button
                type="button"
                className="prob-btn prob-btn-primary"
                onClick={() => appendTag("")}
              >
                <Plus size={16} /> Add Tag
              </button>
            </div>
            <div className="prob-grid prob-grid-3">
              {tagFields.map((field, index) => (
                <div key={field.id} className="prob-flex prob-flex-gap">
                  <input
                    type="text"
                    className="prob-input"
                    {...register(`tags.${index}`)}
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                    className="prob-btn prob-btn-danger"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            {errors.tags && (
              <div className="prob-error">{errors.tags.message}</div>
            )}
          </div>
          {/* Company Tags */}
          <div className="prob-section-card">
            <div className="prob-flex prob-flex-between">
              <h3 className="prob-section-title">
                <Briefcase size={20} /> Company Tags
              </h3>
              <button
                type="button"
                className="prob-btn prob-btn-primary"
                onClick={() => appendCompanyTag("")}
              >
                <Plus size={16} /> Add Company
              </button>
            </div>
            <div className="prob-grid prob-grid-3">
              {companyTagFields.map((field, index) => (
                <div key={field.id} className="prob-flex prob-flex-gap">
                  <input
                    type="text"
                    className="prob-input"
                    {...register(`companyTags.${index}`)}
                    placeholder="Enter company name"
                  />
                  <button
                    type="button"
                    className="prob-btn prob-btn-danger"
                    onClick={() => removeCompanyTag(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Test Cases */}
          <div className="prob-section-card">
            <div className="prob-flex prob-flex-between">
              <h3 className="prob-section-title">
                <CheckCircle2 size={20} /> Test Cases
              </h3>
              <button
                type="button"
                className="prob-btn prob-btn-primary"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                <Plus size={16} /> Add Test Case
              </button>
            </div>
            <div className="prob-field-group">
              {testCaseFields.map((field, index) => (
                <div key={field.id} className="prob-inner-card">
                  <div className="prob-flex prob-flex-between">
                    <h4 className="prob-section-title">
                      Test Case #{index + 1}
                    </h4>
                    <button
                      type="button"
                      className="prob-btn prob-btn-danger"
                      onClick={() => removeTestCase(index)}
                      disabled={testCaseFields.length === 1}
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                  <div className="prob-grid prob-grid-2">
                    <div className="prob-field-group">
                      <label className="prob-input-label">Input</label>
                      <textarea
                        className="prob-input prob-textarea"
                        {...register(`testcases.${index}.input`)}
                        placeholder="Enter test case input"
                      />
                      {errors.testcases?.[index]?.input && (
                        <div className="prob-error">
                          {errors.testcases[index].input.message}
                        </div>
                      )}
                    </div>
                    <div className="prob-field-group">
                      <label className="prob-input-label">
                        Expected Output
                      </label>
                      <textarea
                        className="prob-input prob-textarea"
                        {...register(`testcases.${index}.output`)}
                        placeholder="Enter expected output"
                      />
                      {errors.testcases?.[index]?.output && (
                        <div className="prob-error">
                          {errors.testcases[index].output.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.testcases && !Array.isArray(errors.testcases) && (
              <div className="prob-error">{errors.testcases.message}</div>
            )}
          </div>

          {/* Code Editor Sections */}
          {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
            <div key={language} className="prob-section-card">
              <h3 className="prob-section-title">
                <Code2 size={20} /> {language}
              </h3>

              {/* Starter Code */}
              <div className="prob-inner-card">
                <h4 className="prob-section-title">Starter Code Template</h4>
                <div className="prob-editor-container">
                  <Controller
                    name={`codeSnippets.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="300px"
                        language={language.toLowerCase()}
                        theme={getEditorTheme()}
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                </div>
                {errors.codeSnippets?.[language] && (
                  <div className="prob-error">
                    {errors.codeSnippets[language].message}
                  </div>
                )}
              </div>

              {/* Reference Solution */}
              <div className="prob-inner-card">
                <h4 className="prob-section-title">
                  <CheckCircle2 size={16} className="text-success" /> Reference
                  Solution
                </h4>
                <div className="prob-editor-container">
                  <Controller
                    name={`referenceSolutions.${language}`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="300px"
                        language={language.toLowerCase()}
                        theme={getEditorTheme()}
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                </div>
                {errors.referenceSolutions?.[language] && (
                  <div className="prob-error">
                    {errors.referenceSolutions[language].message}
                  </div>
                )}
              </div>

              {/* Examples */}
              <div className="prob-inner-card">
                <h4 className="prob-section-title">Example</h4>
                <div className="prob-grid prob-grid-2">
                  <div className="prob-field-group">
                    <label className="prob-input-label">Input</label>
                    <textarea
                      className="prob-input prob-textarea"
                      {...register(`examples.${language}.input`)}
                      placeholder="Example input"
                    />
                    {errors.examples?.[language]?.input && (
                      <div className="prob-error">
                        {errors.examples[language].input.message}
                      </div>
                    )}
                  </div>
                  <div className="prob-field-group">
                    <label className="prob-input-label">Output</label>
                    <textarea
                      className="prob-input prob-textarea"
                      {...register(`examples.${language}.output`)}
                      placeholder="Example output"
                    />
                    {errors.examples?.[language]?.output && (
                      <div className="prob-error">
                        {errors.examples[language].output.message}
                      </div>
                    )}
                  </div>
                  <div className="prob-field-group">
                    <label className="prob-input-label">Explanation</label>
                    <textarea
                      className="prob-input prob-textarea"
                      {...register(`examples.${language}.explanation`)}
                      placeholder="Explain the example"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Information */}
          <div className="prob-section-card">
            <h3 className="prob-section-title">
              <Lightbulb size={20} /> Additional Information
            </h3>
            <div className="prob-grid">
              <div className="prob-field-group">
                <label className="prob-input-label">Constraints</label>
                <textarea
                  className="prob-input prob-textarea"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
                {errors.constraints && (
                  <div className="prob-error">{errors.constraints.message}</div>
                )}
              </div>
              <div className="prob-field-group">
                <label className="prob-input-label">Hints (Optional)</label>
                <textarea
                  className="prob-input prob-textarea"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div className="prob-field-group">
                <label className="prob-input-label">Editorial (Optional)</label>
                <textarea
                  className="prob-input prob-textarea"
                  {...register("editorial")}
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button type="submit" className="prob-btn prob-btn-primary">
              {isEditing ? "Update Problem" : "Create Problem"}
            </button>
          </div>
        </form>
      </div>

      <AIProblemGeneratorModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onProblemGenerated={handleAIGenerated}
      />
    </div>
  );
};
export default ProblemForm;
