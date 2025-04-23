
import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface GameScreenProps {
  onFinish: (time: number) => void;
}

const GameScreen = ({ onFinish }: GameScreenProps) => {
  const [pixels, setPixels] = useState<boolean[]>([]);
  const [remainingPixels, setRemainingPixels] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const gridSize = 20 * 15; // 300 píxeles para empezar
    setPixels(new Array(gridSize).fill(false));
    setRemainingPixels(gridSize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handlePixelClick = (index: number) => {
    if (!pixels[index]) {
      const newPixels = [...pixels];
      newPixels[index] = true;
      setPixels(newPixels);
      const remaining = remainingPixels - 1;
      setRemainingPixels(remaining);

      if (remaining === 0) {
        onFinish(elapsedTime);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex justify-between items-center mb-4 bg-gray-900/50 p-4 rounded-lg">
        <div className="text-xl font-bold">
          Píxeles restantes: {remainingPixels}
        </div>
        <div className="flex items-center gap-2 text-xl font-mono">
          <Timer className="w-6 h-6" />
          {elapsedTime}s
        </div>
      </div>
      <div className="grid grid-cols-20 gap-1 p-4 bg-gray-900/30 rounded-lg">
        {pixels.map((clicked, index) => (
          <button
            key={index}
            onClick={() => handlePixelClick(index)}
            className={`w-full pt-[100%] relative ${
              clicked ? 'bg-primary' : 'bg-neutral-600'
            } rounded-sm hover:opacity-90 transition-colors`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
