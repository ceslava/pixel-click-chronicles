
import { useState, useEffect } from 'react';

export const useScreenResolution = () => {
  const [totalPixels, setTotalPixels] = useState<number>(0);

  useEffect(() => {
    const calculateTotalPixels = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setTotalPixels(width * height);
    };

    calculateTotalPixels();
    window.addEventListener('resize', calculateTotalPixels);

    return () => window.removeEventListener('resize', calculateTotalPixels);
  }, []);

  return totalPixels;
};
