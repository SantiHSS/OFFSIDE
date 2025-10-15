import { useState, useEffect } from 'react';
import { PlayerStats } from '@/types';

// Simple localStorage hook - easier to understand
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  // Load from localStorage when component mounts
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setValue(JSON.parse(saved));
      }
    } catch (error) {
      console.log('Error loading from localStorage:', error);
    }
  }, [key]);

  // Save to localStorage whenever value changes
  const setStoredValue = (newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.log('Error saving to localStorage:', error);
    }
  };

  return [value, setStoredValue] as const;
}

// Simple player stats hook
export function usePlayerStats() {
  const initialStats: PlayerStats = {
    totalGames: 0,
    totalScore: 0,
    bestScore: 0,
    averageScore: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    lastPlayedDate: '',
    dailyStreak: 0
  };

  const [stats, setStats] = useLocalStorage<PlayerStats>('player-stats', initialStats);

  const updateStats = (gameScore: number, correctCount: number, totalQuestions: number) => {
    const newStats = {
      totalGames: stats.totalGames + 1,
      totalScore: stats.totalScore + gameScore,
      bestScore: gameScore > stats.bestScore ? gameScore : stats.bestScore,
      averageScore: Math.round((stats.totalScore + gameScore) / (stats.totalGames + 1)),
      correctAnswers: stats.correctAnswers + correctCount,
      totalQuestions: stats.totalQuestions + totalQuestions,
      lastPlayedDate: new Date().toISOString().split('T')[0],
      dailyStreak: stats.dailyStreak
    };
    setStats(newStats);
  };

  const resetStats = () => {
    setStats(initialStats);
  };

  return { stats, updateStats, resetStats };
}

// Simple daily quiz tracking
export function useDailyQuiz() {
  const today = new Date().toISOString().split('T')[0];
  const [completedToday, setCompletedToday] = useLocalStorage<boolean>(`daily-quiz-${today}`, false);

  const markAsCompleted = () => {
    setCompletedToday(true);
  };

  return {
    isCompleted: completedToday,
    markAsCompleted
  };
}
