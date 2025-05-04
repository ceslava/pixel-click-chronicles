
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScreenResolution } from "@/hooks/useScreenResolution";

interface StartScreenProps {
  onStart: (pixels: number) => void;
  onShowRankings: () => void;
}

const StartScreen = ({ onStart, onShowRankings }: StartScreenProps) => {
  const viewportPixels = useScreenResolution();
  const [pixelOptions, setPixelOptions] = useState<number[]>([100, 200, 300, 500, 1000, 2000, 3000]);
  const [selectedPixels, setSelectedPixels] = useState<number>(300);

  useEffect(() => {
    if (viewportPixels > 0) {
      // Create dynamic pixel options based on viewport size
      const options = [
        Math.min(100, Math.floor(viewportPixels * 0.1)),
        Math.min(200, Math.floor(viewportPixels * 0.2)),
        Math.min(300, Math.floor(viewportPixels * 0.3)),
        Math.min(500, Math.floor(viewportPixels * 0.4)),
        Math.min(1000, Math.floor(viewportPixels * 0.5)),
        Math.min(2000, Math.floor(viewportPixels * 0.7)),
        Math.min(3000, Math.floor(viewportPixels * 0.9))
      ];
      
      // Filter out duplicate options
      const uniqueOptions = [...new Set(options)].filter(option => option > 0);
      setPixelOptions(uniqueOptions);
      setSelectedPixels(uniqueOptions[2] || uniqueOptions[0] || 300);
    }
  }, [viewportPixels]);

  const handleSelectChange = (value: string) => {
    setSelectedPixels(Number(value));
  };

  const getDifficultyLabel = (pixels: number) => {
    const percentage = pixels / viewportPixels;
    if (percentage < 0.2) return "fácil";
    if (percentage < 0.4) return "normal";
    if (percentage < 0.6) return "difícil";
    if (percentage < 0.8) return "muy difícil";
    return "extremo";
  };

  return (
    <Card className="w-full max-w-md bg-opacity-90 backdrop-blur-sm bg-gray-900">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">Pixel Click Chronicles</CardTitle>
        <CardDescription className="text-center text-gray-300">
          ¿Cuánto tiempo tardarás en hacer clic en todos los píxeles?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-300 space-y-2">
          <p>🎯 Haz clic en cada píxel de la pantalla</p>
          <p>⏱️ Tu tiempo será registrado</p>
          <p>🏆 ¡Compite por estar en el top 100!</p>
        </div>
        <div className="space-y-4">
          <Select 
            value={selectedPixels.toString()} 
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el número de píxeles" />
            </SelectTrigger>
            <SelectContent>
              {pixelOptions.map(pixels => (
                <SelectItem key={pixels} value={pixels.toString()}>
                  {pixels} píxeles ({getDifficultyLabel(pixels)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <Button 
              onClick={() => onStart(selectedPixels)} 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Comenzar Juego
            </Button>
            <Button onClick={onShowRankings} variant="outline" className="w-full">
              Ver Ranking Global
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StartScreen;
