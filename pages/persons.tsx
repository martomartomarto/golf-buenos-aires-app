import Head from 'next/head';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

type ScoreEntry = {
  club: string;
  fecha: string;
  jugador: string;
  gross: string;
  neto: string;
  birdies: string;
};

type Summary = {
  club: string;
  vecesJugado: number;
  mejorGross: number;
  mejorNeto: number;
  maxBirdies: number;
};

export default function PlayersSummaryPage() {
  const [data, setData] = useState<ScoreEntry[]>([]);
  const [jugadores, setJugadores] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwacjFtn_0IJzMIbBvKU6xl41YFveKKelGd8rhqrGZMrb2zOn6s-DBtzDS7nf6r2hBZWQ/exec')
      .then(res => res.text())
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true });
        const entries = parsed.data as ScoreEntry[];
        setData(entries.filter(row => row.jugador));
        const uniqueNames = Array.from(new Set(entries.map(row => row.jugador))).filter(Boolean);
        setJugadores(uniqueNames);
      });
  }, []);

  const handleSelect = (jugador: string) => {
    setSelected(jugador);
    const datos = data.filter(d => d.jugador === jugador);
    const resumen: Record<string, Summary> = {};

    datos.forEach(d => {
      if (!resumen[d.club]) {
        resumen[d.club] = {
          club: d.club,
          vecesJugado: 0,
          mejorGross: Infinity,
          mejorNeto: Infinity,
          maxBirdies: 0,
        };
      }
      const r = resumen[d.club];
      r.vecesJugado += 1;
      r.mejorGross = Math.min(r.mejorGross, parseInt(d.gross));
      r.mejorNeto = Math.min(r.mejorNeto, parseInt(d.neto));
      r.maxBirdies = Math.max(r.maxBirdies, parseInt(d.birdies));
    });

    setSummary(Object.values(resumen));
  };

  return (
    <>
      <Head>
        <title>Resumen por Jugador</title>
      </Head>

      <main className="min-h-screen p-8 bg-white bg-opacity-90 font-poppins">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Resumen por Jugador</h1>
          <a
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            ⬅ Volver al inicio
          </a>
        </div>

        <select
          value={selected}
          onChange={e => handleSelect(e.target.value)}
          className="mb-6 px-4 py-2 rounded border border-gray-300 text-black"
        >
          <option value="">Seleccioná un jugador</option>
          {jugadores.map((j, i) => (
            <option key={i} value={j}>{j}</option>
          ))}
        </select>

        {summary.length > 0 && (
          <table className="w-full text-sm text-black bg-white border border-gray-300 rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Club</th>
                <th className="p-2 border">Veces Jugado</th>
                <th className="p-2 border">Mejor Gross</th>
                <th className="p-2 border">Mejor Neto</th>
                <th className="p-2 border">Max Birdies</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((s, i) => (
                <tr key={i}>
                  <td className="p-2 border">{s.club}</td>
                  <td className="p-2 border">{s.vecesJugado}</td>
                  <td className="p-2 border">{s.mejorGross}</td>
                  <td className="p-2 border">{s.mejorNeto}</td>
                  <td className="p-2 border">{s.maxBirdies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
