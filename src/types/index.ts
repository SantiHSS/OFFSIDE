export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export type QuestionCategory = 'historia' | 'jugadores' | 'clubes' | 'mundiales';

export interface GameState {
  currentQuestion: number;
  score: number;
  questions: Question[];
  timeLeft: number;
  gameMode: 'normal' | 'daily';
  isGameOver: boolean;
  answers: (number | null)[];
}

export interface PlayerStats {
  totalGames: number;
  totalScore: number;
  bestScore: number;
  averageScore: number;
  correctAnswers: number;
  totalQuestions: number;
  lastPlayedDate: string;
  dailyStreak: number;
}

