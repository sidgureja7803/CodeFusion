import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const realProblems = [
  {
    title: "Add Two Numbers",
    description: "Given 2 numbers add them up",
    difficulty: "EASY",
    tags: ["maths", "numbers"],
    companyTags: []
  },
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "EASY",
    tags: ["array", "hash-table"],
    companyTags: ["Amazon", "Google"]
  },
  {
    title: "Maximum Subarray",
    description: "Given an integer array nums, find the contiguous subarray with the largest sum, and return its sum.",
    difficulty: "MEDIUM",
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    companyTags: ["Amazon", "Microsoft", "Bloomberg"]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit.",
    difficulty: "EASY",
    tags: ["array", "dynamic-programming"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Contains Duplicate",
    description: "Given an integer array nums, return true if any value appears at least twice in the array.",
    difficulty: "EASY",
    tags: ["array", "hash-table", "sorting"],
    companyTags: ["Amazon", "Apple"]
  },
  {
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "EASY",
    tags: ["string", "stack"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    difficulty: "EASY",
    tags: ["linked-list", "recursion"],
    companyTags: ["Amazon", "Microsoft", "Apple"]
  },
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.",
    difficulty: "EASY",
    tags: ["array", "binary-search"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Reverse String",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    difficulty: "EASY",
    tags: ["string", "two-pointers"],
    companyTags: ["Amazon", "Google"]
  },
  {
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
    difficulty: "EASY",
    tags: ["math", "dynamic-programming", "memoization"],
    companyTags: ["Amazon", "Google", "Adobe"]
  },
  {
    title: "Linked List Cycle",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    difficulty: "EASY",
    tags: ["hash-table", "linked-list", "two-pointers"],
    companyTags: ["Amazon", "Microsoft", "Yahoo"]
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place.",
    difficulty: "EASY",
    tags: ["array", "two-pointers"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    title: "Plus One",
    description: "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer.",
    difficulty: "EASY",
    tags: ["array", "math"],
    companyTags: ["Google", "Amazon"]
  },
  {
    title: "Single Number",
    description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    difficulty: "EASY",
    tags: ["array", "bit-manipulation"],
    companyTags: ["Amazon", "Google", "Airbnb"]
  },
  {
    title: "Happy Number",
    description: "Write an algorithm to determine if a number n is happy.",
    difficulty: "EASY",
    tags: ["hash-table", "math", "two-pointers"],
    companyTags: ["Amazon", "Google", "Uber"]
  },
  {
    title: "3Sum",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    difficulty: "MEDIUM",
    tags: ["array", "two-pointers", "sorting"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "MEDIUM",
    tags: ["hash-table", "string", "sliding-window"],
    companyTags: ["Amazon", "Microsoft", "Google"]
  },
  {
    title: "Container With Most Water",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
    difficulty: "MEDIUM",
    tags: ["array", "two-pointers", "greedy"],
    companyTags: ["Amazon", "Facebook", "Google"]
  },
  {
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    difficulty: "MEDIUM",
    tags: ["array", "hash-table", "string", "sorting"],
    companyTags: ["Amazon", "Facebook", "Uber"]
  },
  {
    title: "Valid Sudoku",
    description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules.",
    difficulty: "MEDIUM",
    tags: ["array", "hash-table", "matrix"],
    companyTags: ["Amazon", "Apple", "Snapchat"]
  },
  {
    title: "Product of Array Except Self",
    description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    difficulty: "MEDIUM",
    tags: ["array", "prefix-sum"],
    companyTags: ["Amazon", "Facebook", "Microsoft"]
  },
  {
    title: "Top K Frequent Elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements.",
    difficulty: "MEDIUM",
    tags: ["array", "hash-table", "divide-and-conquer", "sorting", "heap"],
    companyTags: ["Amazon", "Facebook", "Google"]
  },
  {
    title: "Daily Temperatures",
    description: "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    difficulty: "MEDIUM",
    tags: ["array", "stack", "monotonic-stack"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Search in Rotated Sorted Array",
    description: "There is an integer array nums sorted in ascending order (with distinct values). Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    difficulty: "MEDIUM",
    tags: ["array", "binary-search"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array.",
    difficulty: "MEDIUM",
    tags: ["array", "binary-search"],
    companyTags: ["Amazon", "Google", "Microsoft"]
  },
  {
    title: "Longest Palindromic Substring",
    description: "Given a string s, return the longest palindromic substring in s.",
    difficulty: "MEDIUM",
    tags: ["string", "dynamic-programming"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Palindromic Substrings",
    description: "Given a string s, return the number of palindromic substrings in it.",
    difficulty: "MEDIUM",
    tags: ["string", "dynamic-programming"],
    companyTags: ["Amazon", "Facebook", "Microsoft"]
  },
  {
    title: "House Robber",
    description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed.",
    difficulty: "MEDIUM",
    tags: ["array", "dynamic-programming"],
    companyTags: ["Amazon", "Google", "LinkedIn"]
  },
  {
    title: "Coin Change",
    description: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.",
    difficulty: "MEDIUM",
    tags: ["array", "dynamic-programming", "breadth-first-search"],
    companyTags: ["Amazon", "Google", "Uber"]
  },
  {
    title: "Longest Increasing Subsequence",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "MEDIUM",
    tags: ["array", "binary-search", "dynamic-programming"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    difficulty: "MEDIUM",
    tags: ["array", "sorting"],
    companyTags: ["Amazon", "Facebook", "Google"]
  },
  {
    title: "Insert Interval",
    description: "You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval.",
    difficulty: "MEDIUM",
    tags: ["array"],
    companyTags: ["Amazon", "Facebook", "Google"]
  },
  {
    title: "Word Break",
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    difficulty: "MEDIUM",
    tags: ["hash-table", "string", "dynamic-programming", "trie"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Combination Sum",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
    difficulty: "MEDIUM",
    tags: ["array", "backtracking"],
    companyTags: ["Amazon", "Uber", "Snapchat"]
  },
  {
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all the possible permutations.",
    difficulty: "MEDIUM",
    tags: ["array", "backtracking"],
    companyTags: ["Amazon", "Microsoft", "LinkedIn"]
  },
  {
    title: "Subsets",
    description: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
    difficulty: "MEDIUM",
    tags: ["array", "backtracking", "bit-manipulation"],
    companyTags: ["Amazon", "Facebook", "Google"]
  },
  {
    title: "Word Search",
    description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
    difficulty: "MEDIUM",
    tags: ["array", "backtracking", "matrix"],
    companyTags: ["Amazon", "Microsoft", "Facebook"]
  },
  {
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    difficulty: "MEDIUM",
    tags: ["array", "depth-first-search", "breadth-first-search", "union-find", "matrix"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Alien Dictionary",
    description: "There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.",
    difficulty: "HARD",
    tags: ["array", "string", "depth-first-search", "breadth-first-search", "graph", "topological-sort"],
    companyTags: ["Amazon", "Google", "Facebook"]
  },
  {
    title: "Trapping Rain Water",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "HARD",
    tags: ["array", "two-pointers", "dynamic-programming", "stack", "monotonic-stack"],
    companyTags: ["Amazon", "Google", "Facebook"]
  }
];

function generateProblem(problemData, index) {
  const problemNumber = String(index + 1).padStart(3, '0');
  const problemId = `problem-${problemNumber}`;
  
  return {
    id: problemId,
    title: problemData.title,
    description: problemData.description,
    difficulty: problemData.difficulty,
    tags: problemData.tags,
    companyTags: problemData.companyTags,
    userId: "system",
    examples: {
      JAVA: {
        input: "5",
        output: "5",
        explanation: `Example for ${problemData.title}`
      },
      PYTHON: {
        input: "5",
        output: "5", 
        explanation: `Example for ${problemData.title}`
      },
      JAVASCRIPT: {
        input: "5",
        output: "5",
        explanation: `Example for ${problemData.title}`
      }
    },
    constraints: "1 <= n <= 1000",
    hints: ["Think about the optimal approach"],
    editorial: "Detailed solution explanation available",
    testcases: [
      { input: "5", output: "5" },
      { input: "10", output: "10" },
      { input: "1", output: "1" }
    ],
    codeSnippets: {
      JAVA: `import java.util.Scanner;

public class Main {
    public static int solve(int n) {
        // Write your code here
        return n;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(solve(n));
    }
}`,
      PYTHON: `def solve(n):
    # Write your code here
    return n

n = int(input())
print(solve(n))`,
      JAVASCRIPT: `const fs = require('fs');

function solve(n) {
    // Write your code here
    return n;
}

const input = fs.readFileSync(0, 'utf-8').trim();
const n = parseInt(input);
console.log(solve(n));`
    },
    referenceSolutions: {
      JAVA: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(n);
    }
}`,
      PYTHON: `n = int(input())
print(n)`,
      JAVASCRIPT: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
const n = parseInt(input);
console.log(n);`
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    solvedBy: []
  };
}

// Generate 40 problems
const problems = realProblems.map((problemData, index) => generateProblem(problemData, index));

// Write to file
const outputPath = path.join(__dirname, '../data/problems.json');
fs.writeFileSync(outputPath, JSON.stringify(problems, null, 2));

console.log(`Generated ${problems.length} problems and saved to ${outputPath}`); 