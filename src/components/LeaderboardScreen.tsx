
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";

interface LeaderboardScreenProps {
  time: number;
  clickedPixels: number;
  totalPixels: number;
  abandoned: boolean;
  onPlayAgain: () => void;
}

const LeaderboardScreen = ({ time, clickedPixels, totalPixels, abandoned, onPlayAgain }: LeaderboardScreenProps) => {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (playerName.trim()) {
      // Aquí se implementará la lógica para guardar la puntuación
      setSubmitted(true);
    }
  };

  return (
    <Card className="w-full max-w-md bg-opacity-90 backdrop-blur-sm bg-gray-900">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-400" />
          {abandoned ? "Juego Abandonado" : "¡Completado!"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-xl font-mono">
            Tiempo: {time}s
          </p>
          <p className="text-lg">
            Píxeles clickeados: {clickedPixels} de {totalPixels} ({Math.round((clickedPixels / totalPixels) * 100)}%)
          </p>
        </div>
        
        {!submitted ? (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Ingresa tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="bg-gray-800"
            />
            <Button 
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!playerName.trim()}
            >
              Guardar Puntuación
            </Button>
          </div>
        ) : (
          <div className="text-center text-gray-300">
            ¡Puntuación guardada!
          </div>
        )}
        
        <Button 
          onClick={onPlayAgain}
          variant="outline"
          className="w-full"
        >
          Jugar de Nuevo
        </Button>
      </CardContent>
    </Card>
  );
};

export default LeaderboardScreen;
