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
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwacjFtn_0IJzMIbBvKU6xl41YFveKKelGd8rhqrGZMrb2zOn6s-DBtzDS7nf6r2hBZWQ/exec');
    if (!response.ok) {
      throw new Error('No se pudo obtener la información del servidor.');
    }
    const csv = await response.text();
    
    const parsed = Papa.parse(csv, {
      header: true,
      // ✨ LA CORRECCIÓN ESTÁ AQUÍ ✨
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
