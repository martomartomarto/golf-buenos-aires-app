import Head from 'next/head';
import Papa from 'papaparse';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';

interface ResumenJugador { Jugador: string; Club: string; 'Cantidad de veces Jugadas': string; 'Mejor Gross': string; 'Mejor Neto': string; 'Max Birdies': string; }
interface JugadoresPageProps { resumen: ResumenJugador[]; error?: string; }

export default function JugadoresPage({ resumen, error }: JugadoresPageProps) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const playerNames = Array.from(new Set(resumen.map(item => item.Jugador)));
  const filteredResumen = selectedPlayer ? resumen.filter(item => item.Jugador === selectedPlayer) : resumen;

  return (
    <>
      <Head>
        <title>Resumen por Jugador</title>
      </Head>
      <main className="p-4 sm:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <a href="/" className="w-full sm:w-auto text-center bg-masters-dark hover:bg-black text-white font-semibold py-2 px-5 rounded-md uppercase tracking-wider text-sm">
              ← Volver
            </a>
            <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} className="w-full sm:w-auto p-2 rounded-md border-2 border-gray-300 focus:border-masters-green focus:ring-0">
              <option value="">Filtrar por Jugador</option>
              {playerNames.map(player => <option key={player} value={player}>{player}</option>)}
            </select>
          </div>
          
          {/* --- COLOR DE TÍTULO CORREGIDO --- */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-masters-dark text-center mb-8">
            Resumen por Jugador
          </h1>

          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            {error ? (<p className="text-red-500 text-center p-8">{error}</p>) : (
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-masters-green text-white uppercase text-sm tracking-wider">
                    <th className="p-4 text-left">Jugador</th>
                    <th className="p-4 text-left">Club</th>
                    <th className="p-4 text-center">Rondas</th>
                    <th className="p-4 text-center">Mejor Gross</th>
                    <th className="p-4 text-center">Mejor Neto</th>
                    <th className="p-4 text-center">Max Birdies</th>
                  </tr>
                </thead>
                <tbody className="text-masters-dark">
                  {filteredResumen.map((entry, i) => (
                    <tr key={i} className="border-b border-gray-200 hover:bg-masters-light">
                      <td className="p-4 whitespace-nowrap font-semibold">{entry.Jugador}</td>
                      <td className="p-4 whitespace-nowrap">{entry.Club}</td>
                      <td className="p-4 whitespace-nowrap text-center">{entry['Cantidad de veces Jugadas']}</td>
                      <td className="p-4 whitespace-nowrap text-center font-bold">{entry['Mejor Gross']}</td>
                      <td className="p-4 whitespace-nowrap text-center font-bold">{entry['Mejor Neto']}</td>
                      <td className="p-4 whitespace-nowrap text-center">{entry['Max Birdies']}</td>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby3TRxfCQo0hVSKnfT7l2uvhlMRyBfM39-Gt3ugAZKNtdiNLo5FCiFr_xy0Uzo1JOM-gg/exec';
  try {
    const response = await fetch(SCRIPT_URL);
    const csv = await response.text();
    const parsed = Papa.parse(csv, { header: true, transformHeader: (h: string) => h.trim(), skipEmptyLines: true });
    const data = (parsed.data as ResumenJugador[]).filter(d => d.Jugador);
    return { props: { resumen: data } };
  } catch (err: any) {
    return { props: { resumen: [], error: 'Error al cargar los datos.' } };
  }
};
