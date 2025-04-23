
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
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
        <Button 
          onClick={onStart}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Comenzar Juego
        </Button>
      </CardContent>
    </Card>
  );
};

export default StartScreen;
