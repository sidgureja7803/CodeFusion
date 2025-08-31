// Sample DP Problem
const sampledpData = {
  title: "Climbing Stairs",
  description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Recursion"],
  companyTags: ["Amazon", "Google", "Apple"],
  constraints: "1 <= n <= 45",
  hints: "Think about the base cases. What if n=1 or n=2?",
  editorial: "This problem can be solved using dynamic programming. We define dp[i] as the number of ways to climb to the i-th step. The recurrence relation is dp[i] = dp[i-1] + dp[i-2].",
  testcases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "let n = 3;",
      output: "3",
      explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step; 2. 1 step + 2 steps; 3. 2 steps + 1 step",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step; 2. 1 step + 2 steps; 3. 2 steps + 1 step",
    },
    JAVA: {
      input: "int n = 3;",
      output: "3",
      explanation: "There are three ways to climb to the top: 1. 1 step + 1 step + 1 step; 2. 1 step + 2 steps; 3. 2 steps + 1 step",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}`,
    PYTHON: `class Solution:
    def climbStairs(self, n: int) -> int:
        # Write your code here
        pass`,
    JAVA: `class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      // Sample test case
      System.out.println(new Main().climbStairs(3));
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
let dp = new Array(n + 1).fill(0);
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

// Add readline for dynamic input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter number of steps: ', (n) => {
  console.log(climbStairs(parseInt(n)));
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
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
    n = int(input("Enter number of steps: "))
    solution = Solution()
    print(solution.climbStairs(n))`,
    JAVA: `import java.util.Scanner;

public class Main {
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
      System.out.print("Enter number of steps: ");
      int n = scanner.nextInt();
      Main solution = new Main();
      System.out.println(solution.climbStairs(n));
      scanner.close();
  }
}`
  }
};
