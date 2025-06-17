import { useCallback, useEffect, useRef } from 'react';
import { useProblemStore } from '../store/useProblemStore';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Custom hook for intelligent problem caching and navigation
 * Implements industry best practices for data fetching and caching
 */
export const useProblemCache = () => {
  const { authUser } = useAuthStore();
  const problemStore = useProblemStore();
  const prefetchTimeoutRef = useRef(null);

  // Prefetch problems on mount if authenticated
  useEffect(() => {
    if (authUser && problemStore.problems.length === 0) {
      problemStore.getProblems();
    }
  }, [authUser, problemStore]);

  // Smart navigation to problems list
  const navigateToProblems = useCallback(async () => {
    // If cache is empty or stale, fetch fresh data
    if (problemStore.problems.length === 0 || !problemStore.isCacheValid('problems-list')) {
      return await problemStore.getProblems(true);
    }
    
    // Return cached data immediately
    return problemStore.problems;
  }, [problemStore]);

  // Smart navigation to individual problem
  const navigateToProblem = useCallback(async (problemId) => {
    // Check if problem is already loaded
    if (problemStore.problem?.id === problemId) {
      return problemStore.problem;
    }

    // Look for problem in the problems list cache
    const cachedProblem = problemStore.problems.find(p => p.id === problemId);
    if (cachedProblem) {
      problemStore.setProblem(cachedProblem);
      return cachedProblem;
    }

    // Fetch from API if not in cache
    return await problemStore.getProblemById(problemId);
  }, [problemStore]);

  // Prefetch problem data for better UX
  const prefetchProblem = useCallback((problemId, delay = 100) => {
    // Clear any existing timeout
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
    }

    // Set a delayed prefetch to avoid unnecessary requests
    prefetchTimeoutRef.current = setTimeout(() => {
      const problem = problemStore.problems.find(p => p.id === problemId);
      if (!problem) {
        problemStore.getProblemById(problemId);
      }
    }, delay);
  }, [problemStore]);

  // Cancel any pending prefetches
  const cancelPrefetch = useCallback(() => {
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
      prefetchTimeoutRef.current = null;
    }
  }, []);

  // Refresh data if stale
  const refreshIfStale = useCallback(async () => {
    const promises = [];
    
    if (!problemStore.isCacheValid('problems-list')) {
      promises.push(problemStore.getProblems(true));
    }
    
    if (!problemStore.isCacheValid('solved-problems')) {
      promises.push(problemStore.getSolvedProblems(true));
    }

    if (promises.length > 0) {
      console.log('🔄 Refreshing stale problem data...');
      await Promise.all(promises);
    }
  }, [problemStore]);

  // Get problem status utilities
  const getProblemStatus = useCallback((problemId) => {
    const isSolved = problemStore.solvedProblems.some(
      p => p.id === problemId || p.problemId === problemId
    );
    
    const problem = problemStore.problems.find(p => p.id === problemId);
    
    return {
      isSolved,
      difficulty: problem?.difficulty,
      tags: problem?.tags || [],
      title: problem?.title,
    };
  }, [problemStore.problems, problemStore.solvedProblems]);

  // Mark problem as solved and update cache
  const markProblemSolved = useCallback((problemId) => {
    problemStore.markProblemAsSolved(problemId);
    
    // Also refresh solved problems to sync with server
    problemStore.getSolvedProblems(true);
  }, [problemStore]);

  // Cache statistics for debugging
  const getCacheStats = useCallback(() => {
    return {
      problemsCount: problemStore.problems.length,
      solvedCount: problemStore.solvedProblems.length,
      currentProblem: problemStore.problem?.id,
      lastFetched: problemStore.lastFetched,
      cacheValid: {
        problems: problemStore.isCacheValid('problems-list'),
        solved: problemStore.isCacheValid('solved-problems'),
      },
    };
  }, [problemStore]);

  // Clear cache when user logs out
  useEffect(() => {
    if (!authUser) {
      problemStore.clearCache();
    }
  }, [authUser, problemStore]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (prefetchTimeoutRef.current) {
        clearTimeout(prefetchTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Navigation methods
    navigateToProblems,
    navigateToProblem,
    
    // Prefetching
    prefetchProblem,
    cancelPrefetch,
    
    // Data management
    refreshIfStale,
    markProblemSolved,
    
    // Utilities
    getProblemStatus,
    getCacheStats,
    
    // Store access
    ...problemStore,
  };
};

export default useProblemCache;