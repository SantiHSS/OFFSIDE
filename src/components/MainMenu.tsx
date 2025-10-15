'use client';

import { useState } from 'react';
import { usePlayerStats, useDailyQuiz } from '@/hooks/useLocalStorage';
import TriviaGame from './TriviaGame';

type GameMode = 'menu' | 'normal' | 'daily' | 'stats';

const MainMenu = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('menu');
  const { stats, resetStats } = usePlayerStats();
  const { isCompleted } = useDailyQuiz();

  if (currentMode === 'normal') {
    return <TriviaGame mode="normal" onBack={() => setCurrentMode('menu')} />;
  }

  if (currentMode === 'daily') {
    return <TriviaGame mode="daily" onBack={() => setCurrentMode('menu')} />;
  }

  if (currentMode === 'stats') {
    return <StatsScreen stats={stats} onBack={() => setCurrentMode('menu')} onReset={resetStats} />;
  }

  const todayCompleted = isCompleted;

  return (
    <div className="min-h-screen bg-black text-yellow-400 relative overflow-hidden">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(yellow 1px, transparent 1px), linear-gradient(90deg, yellow 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Futuristic Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 filter drop-shadow-lg">⚽🥇🥈🥉</div>
          <h1 className="text-6xl font-bold text-yellow-400 mb-2 tracking-wide uppercase">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              Offside!
            </span>
          </h1>
          <div className="h-1 w-32 bg-yellow-400 mx-auto mb-4"></div>
          <p className="text-lg text-yellow-300 mb-4 font-light">{'>> QUE TANTO SABES DE FUTBOL <<'}</p>
          <div className="text-sm text-yellow-500 font-mono">
            [PREGUNTAS_FUTBOL.exe] - INICIANDO...
          </div>
        </div>

        {/* Futuristic Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 rounded-none border-2 border-yellow-400 p-6 text-center relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400"></div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.bestScore}</div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide mt-1">MAX_SCORE</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 rounded-none border-2 border-yellow-400 p-6 text-center relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400"></div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.totalGames}</div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide mt-1">SESSIONS</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 rounded-none border-2 border-yellow-400 p-6 text-center relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400"></div>
            <div className="text-3xl font-bold text-yellow-400 font-mono">
              {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
            </div>
            <div className="text-xs text-yellow-300 uppercase tracking-wide mt-1">ACCURACY</div>
          </div>
        </div>

        {/* Futuristic Game Modes */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Daily Quiz */}
          <button
            onClick={() => setCurrentMode('daily')}
            disabled={todayCompleted}
            className={todayCompleted 
              ? 'w-full p-6 bg-black/50 border-2 border-yellow-600/30 cursor-not-allowed opacity-50 relative' 
              : 'w-full p-6 bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 relative'
            }
          >
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className={`text-4xl ${todayCompleted ? 'text-yellow-600' : 'text-yellow-400'}`}>
                  {todayCompleted ? '[✓]' : '[◉]'}
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-2 uppercase tracking-wide ${todayCompleted ? 'text-yellow-600' : 'text-yellow-400'}`}>
                    {todayCompleted ? '> QUIZ DIARIO COMPLETADO' : '> QUIZ DIARIO ACTIVO'}
                  </h3>
                  <p className={`text-sm font-mono ${todayCompleted ? 'text-yellow-600' : 'text-yellow-300'}`}>
                    {todayCompleted 
                      ? 'REINICIO: 24:00:00 - STANDBY...' 
                      : 'PROTOCOLO_DIARIO: 5_PREGUNTAS | ACCESO_UNICO'
                    }
                  </p>
                </div>
              </div>
              {!todayCompleted && (
                <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 font-mono uppercase">
                  DISPONIBLE
                </div>
              )}
            </div>
          </button>

          {/* Normal Mode */}
          <button
            onClick={() => setCurrentMode('normal')}
            className="w-full p-6 bg-gradient-to-r from-black via-yellow-500/5 to-black border-2 border-yellow-400 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 relative"
          >
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-4xl text-yellow-400">
                  {'[>>]'}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400 uppercase tracking-wide">
                    {'> MODO ENTRENAMIENTO'}
                  </h3>
                  <p className="text-sm text-yellow-300 font-mono">
                    MODO_LIBRE: 10_PREGUNTAS | ACCESO_ILIMITADO
                  </p>
                </div>
              </div>
              <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 font-mono uppercase">
                ACTIVO
              </div>
            </div>
          </button>

          {/* Stats */}
          <button
            onClick={() => setCurrentMode('stats')}
            className="w-full p-6 bg-gradient-to-r from-black via-yellow-500/5 to-black border-2 border-yellow-400 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 relative"
          >
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="text-4xl text-yellow-400">
                  [DB]
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400 uppercase tracking-wide">
                    {'> ANALISIS DE DATOS'}
                  </h3>
                  <p className="text-sm text-yellow-300 font-mono">
                    HISTORIAL_RENDIMIENTO | METRICAS_USUARIO
                  </p>
                </div>
              </div>
              <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 font-mono uppercase">
                ACCEDER
              </div>
            </div>
          </button>
        </div>

        {/* Futuristic Categories Preview */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-yellow-400 mb-2 uppercase tracking-wide">CATEGORIAS DEL SISTEMA</h2>
          <div className="h-0.5 w-48 bg-yellow-400 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Mundiales - Naranja */}
            <div className="bg-black/60 border-2 border-orange-400/30 p-4 text-center relative hover:border-orange-400/60 transition-colors">
              <div className="absolute top-1 right-1 w-1 h-1 bg-orange-400/60"></div>
              <div className="text-2xl mb-3 text-orange-400/80 font-mono">[W]</div>
              <h3 className="font-bold text-orange-400/90 uppercase text-sm mb-1">MUNDIALES</h3>
              <p className="text-xs text-orange-300/70 font-mono">WORLD_CUP.db</p>
            </div>
            
            {/* Jugadores - Azul suave */}
            <div className="bg-black/60 border-2 border-blue-400/30 p-4 text-center relative hover:border-blue-400/60 transition-colors">
              <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400/60"></div>
              <div className="text-2xl mb-3 text-blue-400/80 font-mono">[P]</div>
              <h3 className="font-bold text-blue-400/90 uppercase text-sm mb-1">JUGADORES</h3>
              <p className="text-xs text-blue-300/70 font-mono">PLAYERS.db</p>
            </div>
            
            {/* Clubes - Púrpura suave */}
            <div className="bg-black/60 border-2 border-purple-400/30 p-4 text-center relative hover:border-purple-400/60 transition-colors">
              <div className="absolute top-1 right-1 w-1 h-1 bg-purple-400/60"></div>
              <div className="text-2xl mb-3 text-purple-400/80 font-mono">[C]</div>
              <h3 className="font-bold text-purple-400/90 uppercase text-sm mb-1">CLUBES</h3>
              <p className="text-xs text-purple-300/70 font-mono">CLUBS.db</p>
            </div>
            
            {/* Historia - Blanco para mejor contraste */}
            <div className="bg-black/60 border-2 border-white/30 p-4 text-center relative hover:border-white/60 transition-colors">
              <div className="absolute top-1 right-1 w-1 h-1 bg-white/60"></div>
              <div className="text-2xl mb-3 text-white/90 font-mono">[HIS]</div>
              <h3 className="font-bold text-white uppercase text-sm mb-1">HISTORIA</h3>
              <p className="text-xs text-gray-300/80 font-mono">HISTORY.db</p>
            </div>
          </div>
        </div>

        {/* Futuristic Footer */}
        <div className="text-center mt-16 text-yellow-500 text-sm">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent mb-6"></div>
          <p className="font-mono mb-2">[INFO] QUE TANTO SABES DE FUTBOL ??</p>
          <p className="font-mono text-yellow-600">SISTEMA_EVALUACION | STATUS: EVOLUCION</p>
        </div>
      </div>
    </div>
  );
};

// Stats Screen Component
interface StatsScreenProps {
  stats: {
    bestScore: number;
    averageScore: number;
    correctAnswers: number;
    totalQuestions: number;
    totalGames: number;
  };
  onBack: () => void;
  onReset: () => void;
}

const StatsScreen: React.FC<StatsScreenProps> = ({ stats, onBack, onReset }) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    onReset();
    setShowResetConfirm(false);
  };

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
        <div className="max-w-3xl mx-auto">
          {/* Futuristic Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 text-yellow-400">[DB]</div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2 uppercase tracking-wide">ANALISIS DE RENDIMIENTO</h1>
            <div className="h-1 w-48 bg-yellow-400 mx-auto mb-4"></div>
            <p className="text-yellow-300 font-mono">CONSULTANDO_BASE_DE_DATOS...</p>
          </div>

          {/* Futuristic Stats Cards */}
          <div className="space-y-8 mb-12">
            <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 p-8 relative">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <h3 className="text-xl font-bold text-yellow-400 mb-6 uppercase tracking-wide font-mono">[PUNTUACIONES]</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.bestScore}</div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">MAX_SCORE</div>
                </div>
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.averageScore}</div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">AVG_SCORE</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 p-8 relative">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <h3 className="text-xl font-bold text-yellow-400 mb-6 uppercase tracking-wide font-mono">[PRECISION]</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.correctAnswers}</div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">CORRECTAS</div>
                </div>
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.totalQuestions}</div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">TOTAL</div>
                </div>
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">
                    {stats.totalQuestions > 0 ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0}%
                  </div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">ACCURACY</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 p-8 relative">
              <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400"></div>
              <h3 className="text-xl font-bold text-yellow-400 mb-6 uppercase tracking-wide font-mono">[ACTIVIDAD]</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center border border-yellow-400/30 p-4">
                  <div className="text-3xl font-bold text-yellow-400 font-mono">{stats.totalGames}</div>
                  <div className="text-sm text-yellow-300 uppercase tracking-wide mt-2 font-mono">SESSIONS_TOTAL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic Action Buttons */}
          <div className="space-y-6">
            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-6 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 uppercase tracking-wide font-mono"
            >
              [VOLVER_AL_MENU]
            </button>
            
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full bg-gradient-to-r from-red-900/30 via-black to-red-900/30 border-2 border-red-400 text-red-400 font-bold py-4 px-6 hover:border-red-300 hover:shadow-lg hover:shadow-red-400/20 transition-all duration-300 uppercase tracking-wide font-mono"
              >
                [RESET_DATABASE]
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-center text-yellow-400 font-mono uppercase tracking-wide border border-yellow-400/30 p-4">
                  [WARNING] ESTA_OPERACION_ES_IRREVERSIBLE
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-r from-red-900/50 via-black to-red-900/50 border-2 border-red-400 text-red-400 font-bold py-4 px-4 hover:border-red-300 transition-all duration-300 uppercase tracking-wide font-mono"
                  >
                    [CONFIRMAR]
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-4 hover:border-yellow-300 transition-all duration-300 uppercase tracking-wide font-mono"
                  >
                    [CANCELAR]
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;