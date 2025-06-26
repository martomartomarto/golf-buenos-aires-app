import { useEffect, useState } from 'react';
import { getScoresData } from '../utils/googleSheets'; // esto tiene que ser implementado si no lo tenés
import Papa from 'papaparse';

interface ScoreEntry {
  jugador: string;
  club: string;
  fecha: string;
  gross: number;
  neto: number;
  birdies: number;
}

interface Stats {
  vecesJugadas: number;
  mejorGross: number;
  peorGross: number;
  mejorNeto: number;
  maxBirdies: number;
}

export default function Jugadores() {
  const [data, setData] = useState<ScoreEntry[]>([]);
  const [jugadores, setJugadores] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [resumen, setResumen] = useState<Record<string, Stats>>({});

  useEffect(() => {
    async function fetchData() {
      const sheetData = await getScoresData(); // tu lógica de fetch de Google Sheets va aquí
      const parsed = sheetData.map((row: any) => ({
        club: row.Club,
        fecha: row.Fecha,
        jugador: row.Jugador,
        gross: Number(row.Gross),
        neto: Number(row.Neto),
        birdies: Number(row.Birdies),
      }));
      setData(parsed);
      setJugadores([...new Set(parsed.map(d => d.jugador))].sort());
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!selected) return;

    const jugadorData = data.filter(d => d.jugador === selected);
    const resumenPorClub: Record<string, Stats> = {};

    jugadorData.forEach(entry => {
      const club = entry.club;
      if (!resumenPorClub[club]) {
        resumenPorClub[club] = {
          vecesJugadas: 0,
          mejorGross: entry.gross,
          peorGross: entry.gross,
          mejorNeto: entry.neto,
          maxBirdies: entry.birdies,
        };
      }

      const stats = resumenPorClub[club];
      stats.vecesJugadas += 1;
      stats.mejorGross = Math.min(stats.mejorGross, entry.gross);
      stats.peorGross = Math.max(stats.peorGross, entry.gross);
      stats.mejorNeto = Math.min(stats.mejorNeto, entry.neto);
      stats.maxBirdies = Math.max(stats.maxBirdies, entry.birdies);
    });

    setResumen(resumenPorClub);
  }, [selected, data]);

  const handleExportCSV = () => {
    const csvData = Object.entries(resumen).map(([club, stats]) => ({
      Club: club,
      'Cantidad de veces jugadas': stats.vecesJugadas,
      'Mejor Gross': stats.mejorGross,
      'Peor Gross': stats.peorGross,
      'Mejor Neto': stats.mejorNeto,
      'Max Birdies': stats.maxBirdies,
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selected}_resumen.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen px-4 py-10 text-white">
      <div className="flex justify-start mb-6">
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Volver al inicio
        </a>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Resumen por Jugador</h1>

      <div className="mb-6 max-w-md mx-auto">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="p-2 rounded w-full text-black"
        >
          <option value="">Seleccioná un jugador</option>
          {jugadores.map(j => (
            <option key={j} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <button
            onClick={handleExportCSV}
            className="mb-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Exportar CSV
          </button>

          <table className="w-full border border-gray-200 text-sm text-white bg-black bg-opacity-80">
            <thead>
              <tr>
                <th className="border p-2">Club</th>
                <th className="border p-2">Cantidad de veces jugadas</th>
                <th className="border p-2">Mejor Gross</th>
                <th className="border p-2">Peor Gross</th>
                <th className="border p-2">Mejor Neto</th>
                <th className="border p-2">Max Birdies</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(resumen).map(([club, stats]) => (
                <tr key={club}>
                  <td className="border p-2">{club}</td>
                  <td className="border p-2 text-center">{stats.vecesJugadas}</td>
                  <td className="border p-2 text-center">{stats.mejorGross}</td>
                  <td className="border p-2 text-center">{stats.peorGross}</td>
                  <td className="border p-2 text-center">{stats.mejorNeto}</td>
                  <td className="border p-2 text-center">{stats.maxBirdies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
