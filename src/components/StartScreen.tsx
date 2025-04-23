
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScreenResolution } from "@/hooks/useScreenResolution";

interface StartScreenProps {
  onStart: (pixels: number) => void;
  onShowRankings: () => void;
}

const StartScreen = ({ onStart, onShowRankings }: StartScreenProps) => {
  const totalScreenPixels = useScreenResolution();

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
          <Select defaultValue="300" onValueChange={(value) => onStart(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el número de píxeles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">100 píxeles</SelectItem>
              <SelectItem value="200">200 píxeles</SelectItem>
              <SelectItem value="300">300 píxeles (normal)</SelectItem>
              <SelectItem value="400">400 píxeles</SelectItem>
              <SelectItem value="500">500 píxeles</SelectItem>
              <SelectItem value={totalScreenPixels.toString()}>
                Todos los píxeles de mi pantalla ({totalScreenPixels.toLocaleString()} píxeles)
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="space-y-2">
            <Button onClick={() => onStart(300)} className="w-full bg-primary hover:bg-primary/90">
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
