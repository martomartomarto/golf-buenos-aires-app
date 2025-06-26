import Head from 'next/head';
import ScoreForm from '../components/ScoreForm';

export default function ScoresPage() {
  return (
    <>
      <Head>
        <title>Cargar Score</title>
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

        <h1 className="text-3xl font-bold mb-6 text-center">
          🏌️ Do not cheat you lame ass player 🏌️‍♀️
        </h1>

        <ScoreForm />
      </main>
    </>
  );
}
