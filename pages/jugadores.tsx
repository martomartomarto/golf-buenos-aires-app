import Head from 'next/head';
import Papa from 'papaparse';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

interface ResumenJugador {
  Jugador: string;
  Club: string;
  'Cantidad de veces Jugadas': string;
  'Mejor Gross': string;
  'Mejor Neto': string;
  'Max Birdies': string;
}

interface JugadoresPageProps {
  resumen: ResumenJugador[];
  error?: string;
}

export default function JugadoresPage({ resumen, error }: JugadoresPageProps) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const playerNames = Array.from(new Set(resumen.map(item => item.Jugador)));
  const filteredResumen = selectedPlayer
    ? resumen.filter(item => item.Jugador === selectedPlayer)
    : resumen;

  return (
    <>
      <Head>
        <title>Resumen por Jugador</title>
      </Head>

      <main className="min-h-screen p-4 sm:p-10 font-poppins">
        <div className="max-w-7xl mx-auto">
          {/* --- Contenedor de Cabecera Responsivo --- */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <a
              href="/"
              className="w-full sm:w-auto text-center bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            >
              ← Volver al inicio
            </a>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded border border-gray-300 text-black"
            >
              <option value="">Todos los jugadores</option>
              {playerNames.map(player => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center text-white">Resumen por Jugador</h1>
          
          {/* --- Contenedor de la Tabla con Scroll Horizontal --- */}
          <div className="overflow-x-auto bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <table className="w-full border-collapse min-w-[640px]">
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
                  {filteredResumen.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-100">
                      <td className="border px-4 py-2 whitespace-nowrap">{entry.Jugador}</td>
                      <td className="border px-4 py-2 whitespace-nowrap">{entry.Club}</td>
                      <td className="border px-4 py-2 text-center">{entry['Cantidad de veces Jugadas']}</td>
                      <td className="border px-4 py-2 text-center">{entry['Mejor Gross']}</td>
                      <td className="border px-4 py-2 text-center">{entry['Mejor Neto']}</td>
                      <td className="border px-4 py-2 text-center">{entry['Max Birdies']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

// La función getServerSideProps no necesita cambios y se mantiene igual.
export const getServerSideProps: GetServerSideProps = async () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby3TRxfCQo0hVSKnfT7l2uvhlMRyBfM39-Gt3ugAZKNtdiNLo5FCiFr_xy0Uzo1JOM-gg/exec';
  try {
    const response = await fetch(SCRIPT_URL);
    if (!response.ok) {
      throw new Error('No se pudo obtener la información del servidor.');
    }
    const csv = await response.text();
    const parsed = Papa.parse(csv, {
      header: true,
      transformHeader: (h: string) => h.trim(),
      skipEmptyLines: true,
    });
    const data = (parsed.data as ResumenJugador[]).filter(d => d.Jugador);
    return {
      props: {
        resumen: data,
      },
    };
  } catch (err: any) {
    return {
      props: {
        resumen: [],
        error: err.message || 'Error al cargar los datos.',
      },
    };
  }
};
