
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RankingEntry {
  name: string;
  time: number;
  pixels: number;
}

// Simulamos 100 registros de ejemplo para el ranking
const mockRankings: RankingEntry[] = Array.from({ length: 100 }, (_, i) => ({
  name: `Jugador ${i + 1}`,
  time: Math.floor(Math.random() * 100) + 30,
  pixels: [200, 300, 400][Math.floor(Math.random() * 3)],
})).sort((a, b) => a.time - b.time);

const Rankings = () => {
  return (
    <Card className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-sm text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">
          🏆 Ranking Global
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800/50">
                <TableHead className="text-white">Posición</TableHead>
                <TableHead className="text-white">Jugador</TableHead>
                <TableHead className="text-white">Tiempo</TableHead>
                <TableHead className="text-white">Píxeles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRankings.map((entry, index) => (
                <TableRow 
                  key={index}
                  className="border-gray-800 hover:bg-gray-800/50"
                >
                  <TableCell className="text-white">{index + 1}</TableCell>
                  <TableCell className="text-white">{entry.name}</TableCell>
                  <TableCell className="text-white">{entry.time}s</TableCell>
                  <TableCell className="text-white">{entry.pixels}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Rankings;
