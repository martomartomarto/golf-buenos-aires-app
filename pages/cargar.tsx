// pages/cargar.tsx
import Head from 'next/head';
import ScoreForm from '../components/ScoreForm';

export default function Cargar() {
  return (
    <>
      <Head>
        <title>Cargar Score - Canchas de Golf en Buenos Aires</title>
        <meta name="description" content="Formulario para cargar score de golf" />
      </Head>

      <main className="min-h-screen px-4 py-10 text-white">
        <h1 className="text-4xl font-bold text-center mb-4 font-poppins">
          Cargar Score
        </h1>
        <ScoreForm />
      </main>
    </>
  );
}
