
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import GameScreen from '@/components/GameScreen';
import LeaderboardScreen from '@/components/LeaderboardScreen';

const Index = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [finalTime, setFinalTime] = useState<number>(0);

  const handleGameStart = () => {
    setGameState('playing');
  };

  const handleGameFinish = (time: number) => {
    setFinalTime(time);
    setGameState('finished');
  };

  const handlePlayAgain = () => {
    setGameState('start');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {gameState === 'start' && <StartScreen onStart={handleGameStart} />}
      {gameState === 'playing' && <GameScreen onFinish={handleGameFinish} />}
      {gameState === 'finished' && (
        <LeaderboardScreen time={finalTime} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default Index;
