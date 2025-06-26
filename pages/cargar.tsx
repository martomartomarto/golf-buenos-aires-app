import Head from 'next/head';
import Link from 'next/link';
import ScoreForm from '../components/ScoreForm';

export default function Cargar() {
  return (
    <>
      <Head>
        <title>Cargar Score - Canchas de Golf</title>
        <meta name="description" content="Formulario para cargar score de golf" />
      </Head>

      <main className="min-h-screen px-4 py-10 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center font-poppins mb-4 md:mb-0">
            Cargar Score
          </h1>

          <Link href="/">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
              ⬅ Volver al Inicio
            </button>
          </Link>
        </div>

        <ScoreForm />
      </main>
    </>
  );
}
