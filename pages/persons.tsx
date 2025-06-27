import { useEffect, useState } from 'react';
import Head from 'next/head';
import Papa from 'papaparse';

interface ResumenJugador {
  Jugador: string;
  Club: string;
  'Cantidad de veces Jugadas': string;
  'Mejor Gross': string;
  'Mejor Neto': string;
  'Max Birdies': string;
}

export default function JugadoresPage() {
  const [resumen, setResumen] = useState<ResumenJugador[]>([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbwacjFtn_0IJzMIbBvKU6xl41YFveKKelGd8rhqrGZMrb2zOn6s-DBtzDS7nf6r2hBZWQ/exec')
      .then(response => response.text())
      .then(csv => {
        const parsed = Papa.parse(csv, {
          header: true,
          transformHeader: (h) => h.trim(),
          skipEmptyLines: true,
        });

        const data = parsed.data as ResumenJugador[];
        const filtrado = data.filter(d => d.Jugador); // evita headers duplicados o vacíos
        setResumen(filtrado);
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
              <th className="border px-4 py-2">Club</th>
              <th className="border px-4 py-2">Veces Jugadas</th>
              <th className="border px-4 py-2">Mejor Gross</th>
              <th className="border px-4 py-2">Mejor Neto</th>
              <th className="border px-4 py-2">Max Birdies</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((entry, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{entry.Jugador}</td>
                <td className="border px-4 py-2">{entry.Club}</td>
                <td className="border px-4 py-2">{entry['Cantidad de veces Jugadas']}</td>
                <td className="border px-4 py-2">{entry['Mejor Gross']}</td>
                <td className="border px-4 py-2">{entry['Mejor Neto']}</td>
                <td className="border px-4 py-2">{entry['Max Birdies']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
