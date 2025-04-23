
import { useState, useEffect } from 'react';

export const useScreenResolution = () => {
  const [totalPixels, setTotalPixels] = useState<number>(0);

  useEffect(() => {
    const calculateTotalPixels = () => {
      const width = window.screen.width;
      const height = window.screen.height;
      setTotalPixels(width * height);
    };

    calculateTotalPixels();
    window.addEventListener('resize', calculateTotalPixels);

    return () => window.removeEventListener('resize', calculateTotalPixels);
  }, []);

  return totalPixels;
};
