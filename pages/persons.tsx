import { useEffect, useState } from 'react';
import Head from 'next/head';
import Papa from 'papaparse';

interface ScoreEntry {
  club: string;
  fecha: string;
  jugador: string;
  gross: number;
  neto: number;
  birdies: number;
}

export default function PersonsPage() {
  const [resumen, setResumen] = useState<Record<string, { total: number; count: number }>>({});

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwacjFtn_0IJzMIbBvKU6xl41YFveKKelGd8rhqrGZMrb2zOn6s-DBtzDS7nf6r2hBZWQ/exec')
      .then(response => response.text())
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true });
        const data = parsed.data as ScoreEntry[];

        const resumenData: Record<string, { total: number; count: number }> = {};

        data.forEach(entry => {
          if (!resumenData[entry.jugador]) {
            resumenData[entry.jugador] = { total: 0, count: 0 };
          }
          resumenData[entry.jugador].total += Number(entry.neto);
          resumenData[entry.jugador].count += 1;
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
