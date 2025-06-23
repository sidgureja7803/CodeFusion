import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

// Cache configuration
const CACHE_KEY = "codefusion-problems";
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const PROBLEMS_CACHE_KEY = "problems-list";
const SOLVED_PROBLEMS_CACHE_KEY = "solved-problems";

export const useProblemStore = create(
  persist(
    (set, get) => ({
      // State
      problems: [],
      problem: null,
      solvedProblems: [],
      isProblemLoading: false,
      isProblemsLoading: false,
      
      // Cache metadata
      lastFetched: {
        problems: null,
        solvedProblems: null,
      },
      
      // Cache helper functions
      isCacheValid: (cacheType) => {
        const state = get();
        const lastFetch = state.lastFetched[cacheType];
        if (!lastFetch) return false;
        return Date.now() - lastFetch < CACHE_EXPIRY;
      },

      // Enhanced getProblems with intelligent caching and filtering
      getProblems: async (options = {}, forceRefresh = false) => {
        const state = get();
        
        // Create cache key based on options
        const optionsKey = JSON.stringify(options);
        const cacheKey = `${PROBLEMS_CACHE_KEY}-${optionsKey}`;
        
        // Return cached data if valid and not forcing refresh
        if (!forceRefresh && state.problems.length > 0 && !options.page && state.isCacheValid(PROBLEMS_CACHE_KEY)) {
          console.log("📦 Using cached problems data");
          return state.problems;
        }

        set({ isProblemsLoading: true });
        try {
          console.log("🌐 Fetching problems from API with options:", options);
          
          // Build query parameters
          const params = new URLSearchParams();
          if (options.page) params.append('page', options.page);
          if (options.limit) params.append('limit', options.limit);
          if (options.difficulty) params.append('difficulty', options.difficulty);
          if (options.search) params.append('search', options.search);
          if (options.company) params.append('company', options.company);
          if (options.topic) params.append('topic', options.topic);
          if (options.source) params.append('source', options.source);
          
          const queryString = params.toString();
          const url = `/problems/get-all-problems${queryString ? `?${queryString}` : ''}`;
          
          const response = await axiosInstance.get(url);
          
          // For paginated requests, don't override the main problems cache
          if (options.page) {
            return {
              problems: response.data.problems,
              pagination: response.data.pagination
            };
          }
          
          set({ 
            problems: response.data.problems,
            lastFetched: {
              ...state.lastFetched,
              [PROBLEMS_CACHE_KEY]: Date.now()
            }
          });
          
          console.log(`✅ Fetched ${response.data.problems.length} problems`);
          return response.data.problems;
        } catch (error) {
          console.error("❌ Failed to fetch problems:", error);
          Toast.error("Failed to fetch problems");
          throw error;
        } finally {
          set({ isProblemsLoading: false });
        }
      },

      // Enhanced getProblemById with caching
      getProblemById: async (id, forceRefresh = false) => {
        const state = get();
        
        // Check if problem exists in cache
        if (!forceRefresh && state.problem?.id === id) {
          console.log(`📦 Using cached problem data for ID: ${id}`);
          return state.problem;
        }

        // Check if problem exists in problems list
        if (!forceRefresh && state.problems.length > 0) {
          const cachedProblem = state.problems.find(p => p.id === id);
          if (cachedProblem) {
            console.log(`📦 Found problem in problems cache: ${id}`);
            set({ problem: cachedProblem });
            return cachedProblem;
          }
        }

        set({ isProblemLoading: true });
        try {
          console.log(`🌐 Fetching problem from API: ${id}`);
          const response = await axiosInstance.get(`/problems/get-problem/${id}`);
          
          set({ problem: response.data.problem });
          
          // Also update the problems list if it exists
          const updatedProblems = state.problems.map(p => 
            p.id === id ? response.data.problem : p
          );
          
          if (updatedProblems.some(p => p.id === id)) {
            set({ problems: updatedProblems });
          }
          
          return response.data.problem;
        } catch (error) {
          console.error(`❌ Failed to fetch problem ${id}:`, error);
          Toast.error("Failed to fetch problem");
          throw error;
        } finally {
          set({ isProblemLoading: false });
        }
      },

      // Enhanced getSolvedProblems with caching
      getSolvedProblems: async (forceRefresh = false) => {
        const state = get();
        
        // Return cached data if valid and not forcing refresh
        if (!forceRefresh && state.solvedProblems.length > 0 && state.isCacheValid(SOLVED_PROBLEMS_CACHE_KEY)) {
          console.log("📦 Using cached solved problems data");
          return state.solvedProblems;
        }

        set({ isProblemsLoading: true });
        try {
          console.log("🌐 Fetching solved problems from API");
          const response = await axiosInstance.get(`/problems/get-solved-problems`);
          
          set({ 
            solvedProblems: response.data.problems,
            lastFetched: {
              ...state.lastFetched,
              [SOLVED_PROBLEMS_CACHE_KEY]: Date.now()
            }
          });
          
          return response.data.problems;
        } catch (error) {
          console.error("❌ Failed to fetch solved problems:", error);
          Toast.error("Failed to fetch solved problems");
          throw error;
        } finally {
          set({ isProblemsLoading: false });
        }
      },

      // Set current problem (for navigation without API call)
      setProblem: (problem) => {
        set({ problem });
        console.log(`📍 Current problem set: ${problem?.title}`);
      },

      // Legacy method for backward compatibility
      getSolvedProblemByUser: async () => {
        try {
          const res = await axiosInstance.get("/problems/get-solved-problems");
          console.log("Solved problems:", res.data);
          set({ solvedProblems: res.data.data || res.data.problems || [] });
        } catch (error) {
          console.log("Error getting solved problems", error);
          Toast.error("Error getting solved problems");
        }
      },

      // Mark problem as solved (when user submits solution)
      markProblemAsSolved: (problemId) => {
        const state = get();
        
        // Add to solved problems if not already there
        const isAlreadySolved = state.solvedProblems.some(p => p.id === problemId || p.problemId === problemId);
        if (!isAlreadySolved) {
          set({ 
            solvedProblems: [...state.solvedProblems, { problemId, solvedAt: new Date() }]
          });
        }

        // Update the problem in the problems list
        const updatedProblems = state.problems.map(p => {
          if (p.id === problemId) {
            return {
              ...p,
              solvedBy: p.solvedBy ? [{ userId: 'current' }, ...p.solvedBy] : [{ userId: 'current' }]
            };
          }
          return p;
        });
        
        set({ problems: updatedProblems });
        
        console.log(`🎉 Problem ${problemId} marked as solved`);
      },

      // Cache management functions
      invalidateCache: (cacheType = 'all') => {
        const state = get();
        if (cacheType === 'all') {
          set({
            lastFetched: {
              problems: null,
              solvedProblems: null,
            }
          });
          console.log("🗑️ All caches invalidated");
        } else {
          set({
            lastFetched: {
              ...state.lastFetched,
              [cacheType]: null
            }
          });
          console.log(`🗑️ Cache invalidated: ${cacheType}`);
        }
      },

      clearCache: () => {
        set({
          problems: [],
          problem: null,
          solvedProblems: [],
          lastFetched: {
            problems: null,
            solvedProblems: null,
          }
        });
        console.log("🧹 All problem data cleared");
      },

      // Refresh all data
      refreshAllData: async () => {
        const state = get();
        await Promise.all([
          state.getProblems(true),
          state.getSolvedProblems(true)
        ]);
        console.log("🔄 All problem data refreshed");
      },
    }),
    {
      name: CACHE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Only persist essential data, not loading states
      partialize: (state) => ({
        problems: state.problems,
        problem: state.problem,
        solvedProblems: state.solvedProblems,
        lastFetched: state.lastFetched,
      }),
      // Migrate old data structure if needed
      version: 1,
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration logic for older versions
          return {
            ...persistedState,
            lastFetched: {
              problems: null,
              solvedProblems: null,
            },
          };
        }
        return persistedState;
      },
    }
  )
);
