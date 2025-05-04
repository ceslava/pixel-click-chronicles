
import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useScreenResolution } from '@/hooks/useScreenResolution';

interface GameScreenProps {
  onFinish: (time: number) => void;
  onAbandon: (time: number, clickedPixels: number) => void;
  totalPixels?: number;
}

const GameScreen = ({ onFinish, onAbandon, totalPixels = 300 }: GameScreenProps) => {
  const [pixels, setPixels] = useState<boolean[]>([]);
  const [remainingPixels, setRemainingPixels] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const viewportPixels = useScreenResolution();

  useEffect(() => {
    // Ensure totalPixels never exceeds 90% of the viewport size
    const adjustedPixels = Math.min(totalPixels, Math.floor(viewportPixels * 0.9));
    setPixels(new Array(adjustedPixels).fill(false));
    setRemainingPixels(adjustedPixels);
  }, [totalPixels, viewportPixels]);

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

  const handleAbandon = () => {
    const clickedPixels = pixels.filter(pixel => pixel).length;
    onAbandon(elapsedTime, clickedPixels);
  };

  // Determine the number of columns based on pixel count
  const getGridColumns = () => {
    const actualPixels = pixels.length;
    if (actualPixels <= 100) return 'grid-cols-10';
    if (actualPixels <= 200) return 'grid-cols-15';
    if (actualPixels <= 300) return 'grid-cols-20';
    if (actualPixels <= 500) return 'grid-cols-25';
    if (actualPixels <= 1000) return 'grid-cols-30';
    if (actualPixels <= 2000) return 'grid-cols-40';
    return 'grid-cols-50';
  };

  // Calculate the pixel size class based on pixel count
  const getPixelSize = () => {
    const actualPixels = pixels.length;
    if (actualPixels <= 100) return 'h-3 w-3';
    if (actualPixels <= 300) return 'h-2.5 w-2.5';
    if (actualPixels <= 500) return 'h-2 w-2';
    if (actualPixels <= 1000) return 'h-1.5 w-1.5';
    if (actualPixels <= 2000) return 'h-1 w-1';
    return 'h-0.5 w-0.5';
  };

  return (
    <div className="w-full h-[90vh] flex flex-col space-y-2 max-w-full">
      <div className="flex justify-between items-center p-2 bg-gray-900/50 rounded-lg">
        <div className="text-sm md:text-lg font-bold">
          Píxeles restantes: {remainingPixels} / {pixels.length}
        </div>
        <div className="flex items-center gap-2 text-sm md:text-lg font-mono">
          <Timer className="w-4 h-4 md:w-6 md:h-6" />
          {elapsedTime}s
        </div>
      </div>
      <div className="flex-grow w-full overflow-hidden rounded-lg bg-gray-900/30">
        <div className={`grid ${getGridColumns()} gap-0 w-full h-full`}>
          {pixels.map((clicked, index) => (
            <button
              key={index}
              onClick={() => handlePixelClick(index)}
              className={`${getPixelSize()} ${
                clicked ? 'bg-primary' : 'bg-neutral-600'
              } rounded-none hover:opacity-90 transition-colors`}
            />
          ))}
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={handleAbandon}
        className="w-full"
      >
        Abandonar Juego
      </Button>
    </div>
  );
};

export default GameScreen;
