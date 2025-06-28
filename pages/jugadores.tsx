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

  // Obtenemos una lista de jugadores únicos para el filtro
  const playerNames = [...new Set(resumen.map(item => item.Jugador))];

  // Filtramos los resultados basados en el jugador seleccionado
  const filteredResumen = selectedPlayer
    ? resumen.filter(item => item.Jugador === selectedPlayer)
    : resumen;

  return (
    <>
      <Head>
        <title>Resumen por Jugador</title>
      </Head>

      <main className="min-h-screen p-10 bg-white bg-opacity-90 font-poppins">
        <div className="flex justify-between items-center mb-6">
          <a
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
          >
            ← Volver al inicio
          </a>

          {/* Filtro por jugador */}
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 text-black"
          >
            <option value="">Todos los jugadores</option>
            {playerNames.map(player => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Resumen por Jugador</h1>
        
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
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
              {filteredResumen.map((entry, i) => (
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
        )}
      </main>
    </>
  );
}

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
