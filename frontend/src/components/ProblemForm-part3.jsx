// Sample String Problem
const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\nThe string consists of ASCII characters.",
  companyTags: ["Facebook", "Microsoft", "Amazon"],
  testcases: [
    {
      input: '"A man, a plan, a canal: Panama"',
      output: "true",
    },
    {
      input: '"race a car"',
      output: "false",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 'let s = "A man, a plan, a canal: Panama";',
      output: "true",
      explanation:
        '"amanaplanacanalpanama" is a palindrome after converting to lowercase and removing non-alphanumeric characters.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "True",
      explanation:
        '"amanaplanacanalpanama" is a palindrome after converting to lowercase and removing non-alphanumeric characters.',
    },
    JAVA: {
      input: 'String s = "A man, a plan, a canal: Panama";',
      output: "true",
      explanation:
        '"amanaplanacanalpanama" is a palindrome after converting to lowercase and removing non-alphanumeric characters.',
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
  
  // Example usage
  console.log(isPalindrome("A man, a plan, a canal: Panama"));`,
    PYTHON: `class Solution:
  def isPalindrome(self, s: str) -> bool:
      # Write your code here
      pass
  
  # Example usage
  if __name__ == "__main__":
      print(Solution().isPalindrome("A man, a plan, a canal: Panama"))`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        System.out.println(isPalindrome(input));
        scanner.close();
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Two-pointer approach
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
    output: process.stdout
  });

  rl.question('Enter a string: ', (input) => {
    console.log(isPalindrome(input));
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Filter out non-alphanumeric characters and convert to lowercase
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
if __name__ == "__main__":
      s = input("Enter a string: ")
      solution = Solution()
      print(solution.isPalindrome(s))`,
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
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        System.out.println(isPalindrome(input));
        scanner.close();
    }
}`,
  },
};

// Main ProblemForm component
const ProblemForm = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [sampleType, setSampleType] = useState("DP");
  const [isEditing, setIsEditing] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [problemId, setProblemId] = useState(null);

  // Initialize form with problem data if in edit mode
  const defaultValues = useMemo(() => {
    if (isEditing && problemData) {
      return {
        ...problemData,
        // Ensure all required fields exist
        testcases: problemData.testcases || [{ input: "", output: "" }],
        tags: problemData.tags || [""],
        companyTags: problemData.companyTags || [""],
        examples: problemData.examples || {
          JAVASCRIPT: { input: "", output: "", explanation: "" },
          PYTHON: { input: "", output: "", explanation: "" },
          JAVA: { input: "", output: "", explanation: "" },
        },
        codeSnippets: problemData.codeSnippets || {
          JAVASCRIPT: "",
          PYTHON: "",
          JAVA: "",
        },
        referenceSolutions: problemData.referenceSolutions || {
          JAVASCRIPT: "",
          PYTHON: "",
          JAVA: "",
        },
      };
    }
    // Default values for create mode
    return {
      testcases: [{ input: "", output: "" }],
      tags: [""],
      companyTags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "",
        PYTHON: "",
        JAVA: "",
      },
      referenceSolutions: {
        JAVASCRIPT: "",
        PYTHON: "",
        JAVA: "",
      },
    };
  }, [isEditing, problemData]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues,
  });

  const getEditorTheme = () => {
    return theme === "light" ? "vs-light" : "vs-dark";
  };
