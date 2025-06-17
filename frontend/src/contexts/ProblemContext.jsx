import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProblemStore } from '../store/useProblemStore';
import { useAuthStore } from '../store/useAuthStore';

const ProblemContext = createContext();

export const useProblemContext = () => {
  const context = useContext(ProblemContext);
  if (!context) {
    throw new Error('useProblemContext must be used within a ProblemProvider');
  }
  return context;
};

export const ProblemProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { authUser } = useAuthStore();
  const problemStore = useProblemStore();

  // Initialize data when user is authenticated
  useEffect(() => {
    const initializeData = async () => {
      if (authUser && !isInitialized) {
        try {
          console.log('🚀 Initializing problem data...');
          await Promise.all([
            problemStore.getProblems(),
            problemStore.getSolvedProblems()
          ]);
          setIsInitialized(true);
          console.log('✅ Problem data initialized');
        } catch (error) {
          console.error('❌ Failed to initialize problem data:', error);
        }
      }
    };

    initializeData();
  }, [authUser, isInitialized, problemStore]);

  // Enhanced context value with additional utilities
  const contextValue = {
    ...problemStore,
    isInitialized,
    
    // Optimized navigation methods
    navigateToProblems: async () => {
      // Pre-load problems if not cached
      if (problemStore.problems.length === 0) {
        await problemStore.getProblems();
      }
    },
    
    navigateToProblem: async (problemId) => {
      // Pre-load specific problem if not cached
      const problem = problemStore.problems.find(p => p.id === problemId);
      if (!problem) {
        await problemStore.getProblemById(problemId);
      } else {
        problemStore.setProblem(problem);
      }
    },
    
    // Smart refresh methods
    refreshIfStale: async () => {
      const shouldRefreshProblems = !problemStore.isCacheValid('problems-list');
      const shouldRefreshSolved = !problemStore.isCacheValid('solved-problems');
      
      if (shouldRefreshProblems || shouldRefreshSolved) {
        console.log('🔄 Refreshing stale data...');
        await Promise.all([
          shouldRefreshProblems && problemStore.getProblems(true),
          shouldRefreshSolved && problemStore.getSolvedProblems(true)
        ].filter(Boolean));
      }
    },
    
    // Problem status utilities
    isProblemSolved: (problemId) => {
      return problemStore.solvedProblems.some(
        p => p.id === problemId || p.problemId === problemId
      );
    },
    
    getSolvedCount: () => {
      return problemStore.solvedProblems.length;
    },
    
    getProblemsCount: () => {
      return problemStore.problems.length;
    },
    
    // Filter utilities
    getFilteredProblems: (filters = {}) => {
      let filtered = [...problemStore.problems];
      
      if (filters.difficulty) {
        filtered = filtered.filter(p => p.difficulty === filters.difficulty);
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(p => 
          filters.tags.some(tag => p.tags?.includes(tag))
        );
      }
      
      if (filters.solved !== undefined) {
        filtered = filtered.filter(p => {
          const isSolved = problemStore.solvedProblems.some(
            sp => sp.id === p.id || sp.problemId === p.id
          );
          return filters.solved ? isSolved : !isSolved;
        });
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
        );
      }
      
      return filtered;
    }
  };

  return (
    <ProblemContext.Provider value={contextValue}>
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemContext; 