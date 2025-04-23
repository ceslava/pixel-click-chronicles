
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RankingEntry {
  name: string;
  time: number;
  pixels: number;
}

// Simulamos algunos datos de ejemplo para el ranking
const mockRankings: RankingEntry[] = [
  { name: "Player 1", time: 45, pixels: 300 },
  { name: "Player 2", time: 52, pixels: 300 },
  { name: "Player 3", time: 58, pixels: 200 },
];

const Rankings = () => {
  return (
    <Card className="w-full max-w-4xl bg-opacity-90 backdrop-blur-sm bg-gray-900">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">🏆 Ranking Global</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Posición</TableHead>
              <TableHead>Jugador</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead>Píxeles</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRankings.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.time}s</TableCell>
                <TableCell>{entry.pixels}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Rankings;
