import { useEffect, useState } from 'react';
import Head from 'next/head';
import Papa, { ParseResult } from 'papaparse';

interface ScoreEntry {
  Club: string;
  Fecha: string;
  Jugador: string;
  Gross: string;
  Neto: string;
  Birdies: string;
}

export default function JugadoresPage() {
  const [resumen, setResumen] = useState<Record<string, { total: number; count: number }>>({});

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwacjFtn_0IJzMIbBvKU6xl41YFveKKelGd8rhqrGZMrb2zOn6s-DBtzDS7nf6r2hBZWQ/exec')
      .then(response => response.text())
      .then(csv => {
        const parsed: ParseResult<ScoreEntry> = Papa.parse<ScoreEntry>(csv, {
          header: true,
          transformHeader: (header: string) => header.trim(),
          skipEmptyLines: true,
        });

        const data = parsed.data;
        console.log('🧪 Data cruda:', data);

        const resumenData: Record<string, { total: number; count: number }> = {};

        data.forEach(entry => {
          if (!entry.Jugador || !entry.Neto) return;

          if (!resumenData[entry.Jugador]) {
            resumenData[entry.Jugador] = { total: 0, count: 0 };
          }

          resumenData[entry.Jugador].total += Number(entry.Neto);
          resumenData[entry.Jugador].count += 1;
        });

        setResumen(resumenData);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Resumen por Jugador</title>
      </Head>

      <main className="min-h-screen p-10 bg-white bg-opacity-90 font-poppins">
        <div className="mb-6">
          <a
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            ← Volver al inicio
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Resumen por Jugador</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border px-4 py-2">Jugador</th>
              <th className="border px-4 py-2">Promedio Neto</th>
              <th className="border px-4 py-2">Rondas</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(resumen).map(([jugador, stats]) => (
              <tr key={jugador} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{jugador}</td>
                <td className="border px-4 py-2">
                  {(stats.total / stats.count).toFixed(2)}
                </td>
                <td className="border px-4 py-2">{stats.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

