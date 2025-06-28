import Head from 'next/head';
import Papa from 'papaparse';
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

        <h1 className="text-3xl font-bold mb-6 text-center">Resumen
