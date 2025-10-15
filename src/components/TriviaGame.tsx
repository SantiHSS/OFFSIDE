'use client';

import { useState, useEffect } from 'react';
import { Question, GameState } from '@/types';
import { getRandomQuestions, getDailyQuestions } from '@/data/questions';
import { usePlayerStats, useDailyQuiz } from '@/hooks/useLocalStorage';

interface TriviaGameProps {
  mode: 'normal' | 'daily';
  onBack?: () => void;
}

const TriviaGame: React.FC<TriviaGameProps> = ({ mode, onBack }) => {
  const { stats, updateStats } = usePlayerStats();
  const { isCompleted, markAsCompleted } = useDailyQuiz();
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    questions: [],
    timeLeft: 30,
    gameMode: mode,
    isGameOver: false,
    answers: []
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.timeLeft > 0 && !gameState.isGameOver && !isAnswered) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [gameState.timeLeft, gameState.isGameOver, isAnswered]);

  const initializeGame = () => {
    if (mode === 'daily' && isCompleted) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return;
    }

    const questions = mode === 'daily' 
      ? getDailyQuestions(new Date().toISOString().split('T')[0])
      : getRandomQuestions(10);

    setGameState({
      currentQuestion: 0,
      score: 0,
      questions,
      timeLeft: 30,
      gameMode: mode,
      isGameOver: false,
      answers: new Array(questions.length).fill(null)
    });
    
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswered(false);
  };

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowResult(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const currentQ = gameState.questions[gameState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + currentQ.points
      }));
    }

    const newAnswers = [...gameState.answers];
    newAnswers[gameState.currentQuestion] = answerIndex;
    setGameState(prev => ({ ...prev, answers: newAnswers }));
    
    setShowResult(true);
    
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    const nextIndex = gameState.currentQuestion + 1;
    
    if (nextIndex >= gameState.questions.length) {
      endGame();
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestion: nextIndex,
        timeLeft: 30
      }));
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswered(false);
    }
  };

  const endGame = () => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
    
    const correctCount = gameState.answers.filter((answer, index) => 
      answer === gameState.questions[index]?.correctAnswer
    ).length;
    
    updateStats(gameState.score, correctCount, gameState.questions.length);
    
    if (mode === 'daily') {
      markAsCompleted();
    }
  };

  if (gameState.isGameOver) {
    return (
      <GameResults 
        score={gameState.score}
        correctAnswers={gameState.answers.filter((answer, index) => 
          answer === gameState.questions[index]?.correctAnswer
        ).length}
        totalQuestions={gameState.questions.length}
        onRestart={initializeGame}
        onBack={onBack}
        mode={mode}
        stats={stats}
        isDaily={mode === 'daily'}
        isTodayCompleted={mode === 'daily' && isCompleted}
      />
    );
  }

  if (gameState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-yellow-400 relative overflow-hidden flex items-center justify-center">
        {/* Futuristic Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="text-center text-yellow-400 relative z-10">
          <div className="w-32 h-32 border-4 border-yellow-400 border-t-transparent animate-spin mx-auto mb-6"></div>
          <p className="text-xl font-mono uppercase tracking-wide">[CARGANDO_BASE_DE_DATOS...]</p>
          <div className="mt-4 text-sm text-yellow-300 font-mono">INICIALIZANDO_SISTEMA...</div>
          
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="mt-8 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-6 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 uppercase tracking-wide font-mono"
            >
              [VOLVER_AL_MENU]
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestion];
  const progress = ((gameState.currentQuestion + 1) / gameState.questions.length) * 100;

  return (
    <div className="min-h-screen bg-black text-yellow-400 relative overflow-hidden">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Futuristic Header with Back Button */}
        <div className="mb-8">
          {/* Back Button */}
          {onBack && (
            <div className="mb-4">
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 text-yellow-400 font-bold py-2 px-4 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 uppercase tracking-wide font-mono text-sm"
              >
                {'[<< MENU]'}
              </button>
            </div>
          )}
          
          <div className="text-center">
            <h1 className="text-5xl font-bold text-yellow-400 mb-4 uppercase tracking-wide">
              ⚽📈 Zona de Práctica
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm">
              {mode === 'daily' ? (
                <div className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-mono uppercase">
                  <span>[D]</span>
                  <span>MODO_DIARIO</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-mono uppercase">
                  <span>[T]</span>
                  <span>ENTRENAMIENTO</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Futuristic Progress Bar */}
        <div className="w-full bg-black border-2 border-yellow-400 mb-8 relative overflow-hidden">
          <div className="h-4 w-full relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/5"></div>
            
            {/* Progress fill */}
            <div 
              className="bg-yellow-400 h-full transition-all duration-500 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated edge */}
              <div className="absolute right-0 top-0 w-1 h-full bg-yellow-300 animate-pulse"></div>
            </div>
            
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <span className="text-xs font-mono text-yellow-400 bg-black/50 px-1">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Futuristic Game Info */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-black border-2 border-yellow-400 p-4 text-center relative">
            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400"></div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">{gameState.score}</div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide font-mono">SCORE</div>
          </div>
          
          <div className="bg-black border-2 border-yellow-400 p-4 text-center relative">
            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400"></div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">
              {gameState.currentQuestion + 1}/{gameState.questions.length}
            </div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide font-mono">QUESTION</div>
          </div>
          
          <div className="bg-black border-2 border-yellow-400 p-4 text-center relative">
            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400"></div>
            <div className={gameState.timeLeft <= 10 
              ? "text-3xl font-bold text-red-400 animate-pulse font-mono" 
              : "text-3xl font-bold text-yellow-400 font-mono"
            }>
              {gameState.timeLeft}s
            </div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide font-mono">TIME</div>
          </div>
        </div>

        {/* Futuristic Question Card */}
        <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 p-6 mb-6 relative">
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400"></div>
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400"></div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {/* Category Badge */}
            <span className={`inline-block px-3 py-1 text-xs font-semibold border-2 ${
              currentQuestion.category === 'mundiales' ? 'bg-orange-600/20 text-orange-400 border-orange-400/50' :
              currentQuestion.category === 'jugadores' ? 'bg-blue-600/20 text-blue-400 border-blue-400/50' :
              currentQuestion.category === 'clubes' ? 'bg-purple-600/20 text-purple-400 border-purple-400/50' :
              'bg-white/10 text-white border-white/50'
            }`}>
              {currentQuestion.category.toUpperCase()}
            </span>
            
            {/* Difficulty Badge */}
            <span className={`inline-block px-3 py-1 text-xs font-bold font-mono border-2 ${
              currentQuestion.difficulty === 'easy' ? 'bg-green-600/10 text-green-300 border-green-400/50' :
              currentQuestion.difficulty === 'medium' ? 'bg-yellow-600/10 text-yellow-300 border-yellow-400/60' :
              'bg-red-600/10 text-red-300 border-red-400/50'
            }`}>
              [{currentQuestion.difficulty.toUpperCase()}]
            </span>
            
            {/* Points */}
            <span className="inline-block px-3 py-1 bg-black border-2 border-yellow-400 text-yellow-400 text-xs font-bold font-mono">
              +{currentQuestion.points} PTS
            </span>
          </div>
          
          <h2 className="text-xl font-semibold mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`p-4 rounded-lg text-left border-2 ${
                  // Different styles based on answer state - softened for theme
                  isAnswered && selectedAnswer === index && index === currentQuestion.correctAnswer ? 'bg-green-600/20 border-green-400/60 text-green-300' :
                  isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer ? 'bg-red-600/20 border-red-400/60 text-red-300' :
                  isAnswered && selectedAnswer !== index && index === currentQuestion.correctAnswer ? 'bg-green-600/10 border-green-400/40 text-green-400' :
                  !isAnswered ? 'bg-gray-800 border-gray-600 hover:bg-yellow-400/10 hover:border-yellow-400 text-white' :
                  'bg-gray-800/50 border-gray-600 text-gray-300'
                } ${isAnswered ? 'cursor-not-allowed' : ''}`}
              >
                <span className="font-semibold text-yellow-400 mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Result Feedback */}
        {showResult && selectedAnswer !== null && (
          <div className={`text-center py-4 border-2 mb-4 font-mono ${
            selectedAnswer === currentQuestion.correctAnswer 
              ? 'bg-green-600/10 text-green-300 border-green-400/30' 
              : 'bg-red-600/10 text-red-300 border-red-400/30'
          }`}>
            {selectedAnswer === currentQuestion.correctAnswer 
              ? `¡Correcto! +${currentQuestion.points} puntos` 
              : `Incorrecto. La respuesta era: ${currentQuestion.options[currentQuestion.correctAnswer]}`
            }
          </div>
        )}
      </div>
    </div>
  );
};

// Game Results Component
interface GameResultsProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  onBack?: () => void;
  mode: 'normal' | 'daily';
  stats: any;
  isDaily: boolean;
  isTodayCompleted: boolean;
}

const GameResults: React.FC<GameResultsProps> = ({ 
  score, 
  correctAnswers, 
  totalQuestions, 
  onRestart,
  onBack, 
  mode, 
  stats,
  isDaily,
  isTodayCompleted
}) => {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-black text-yellow-400 relative overflow-hidden flex items-center justify-center">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 p-8 max-w-lg w-full mx-4 relative z-10">
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-yellow-400"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-yellow-400"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-yellow-400"></div>
        
        <div className="text-center">
          <div className="text-6xl mb-4 text-yellow-400">[✓]</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 uppercase tracking-wide font-mono">
            {isDaily ? '[QUIZ_DIARIO_COMPLETADO]' : '[SESION_TERMINADA]'}
          </h2>
          <div className="h-1 w-32 bg-yellow-400 mx-auto mb-6"></div>
          
          <div className="space-y-6 mb-8">
            <div className="bg-black border-2 border-yellow-400 p-6 relative">
              <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400"></div>
              <div className="text-3xl font-bold text-yellow-400 font-mono">{score}</div>
              <div className="text-sm text-yellow-300 uppercase tracking-wide font-mono mt-2">SCORE_TOTAL</div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black border-2 border-yellow-400 p-4 relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400"></div>
                <div className="text-2xl font-bold text-yellow-400 font-mono">{correctAnswers}</div>
                <div className="text-xs text-yellow-300 uppercase tracking-wide font-mono mt-2">CORRECT</div>
              </div>
              <div className="bg-black border-2 border-yellow-400 p-4 relative">
                <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-400"></div>
                <div className="text-2xl font-bold text-yellow-400 font-mono">{accuracy}%</div>
                <div className="text-xs text-yellow-300 uppercase tracking-wide font-mono mt-2">ACCURACY</div>
              </div>
            </div>

            <div className="bg-black border-2 border-yellow-400/50 p-4 font-mono text-sm">
              <div className="text-center text-yellow-400 uppercase tracking-wide mb-3">[DATABASE_INFO]</div>
              <div className="flex justify-between border-b border-yellow-400/20 pb-1 mb-2">
                <span className="text-yellow-300">MAX_SCORE:</span>
                <span className="text-yellow-400">{stats.bestScore}</span>
              </div>
              <div className="flex justify-between border-b border-yellow-400/20 pb-1 mb-2">
                <span className="text-yellow-300">TOTAL_GAMES:</span>
                <span className="text-yellow-400">{stats.totalGames}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300">AVG_SCORE:</span>
                <span className="text-yellow-400">{stats.averageScore}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {isDaily && isTodayCompleted ? (
              <div className="text-center text-yellow-400 mb-2">
                <div className="bg-black border-2 border-yellow-400/50 p-4">
                  <div className="text-3xl mb-2 text-yellow-400">[STANDBY]</div>
                  <p className="text-sm font-mono uppercase tracking-wide">REINICIO_SISTEMA: 24:00:00</p>
                </div>
              </div>
            ) : (
              <button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-6 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 uppercase tracking-wide font-mono"
              >
                {isDaily ? '[MODO_NORMAL]' : '[NUEVA_SESION]'}
              </button>
            )}
            
            {/* Back to Menu Button */}
            {onBack && (
              <button
                onClick={onBack}
                className="w-full bg-gradient-to-r from-black via-yellow-500/5 to-black border-2 border-yellow-400/50 text-yellow-300 font-bold py-3 px-6 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 uppercase tracking-wide font-mono text-sm"
              >
                [VOLVER_AL_MENU_PRINCIPAL]
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;