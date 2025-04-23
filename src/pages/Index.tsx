
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';
import Rankings from '@/components/Rankings';

const Index = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished' | 'rankings'>('start');
  const [finalTime, setFinalTime] = useState<number>(0);
  const [totalPixels, setTotalPixels] = useState<number>(300);

  const handleGameStart = (pixels: number) => {
    setTotalPixels(pixels);
    setGameState('playing');
  };

  const handleGameFinish = (time: number) => {
    setFinalTime(time);
    setGameState('finished');
  };

  const handlePlayAgain = () => {
    setGameState('start');
  };

  const handleShowRankings = () => {
    setGameState('rankings');
  };

  const handleAbandonGame = () => {
    setGameState('start');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {gameState === 'start' && (
        <StartScreen onStart={handleGameStart} onShowRankings={handleShowRankings} />
      )}
      {gameState === 'playing' && (
        <GameScreen 
          onFinish={handleGameFinish} 
          onAbandon={handleAbandonGame}
          totalPixels={totalPixels}
        />
      )}
      {gameState === 'finished' && (
        <LeaderboardScreen 
          time={finalTime} 
          onPlayAgain={handlePlayAgain}
        />
      )}
      {gameState === 'rankings' && <Rankings />}
    </div>
  );
};

export default Index;
