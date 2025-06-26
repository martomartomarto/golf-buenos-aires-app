import Head from 'next/head';

export default function ScoresPage() {
  return (
    <>
      <Head>
        <title>Scores de Jugadores</title>
      </Head>

      <main className="min-h-screen p-10 bg-white bg-opacity-90 font-poppins">
        <h1 className="text-3xl font-bold mb-6 text-center">Scores cargados</h1>
        <p className="text-center">(Acá podríamos listar los scores de la Google Sheet en tiempo real.)</p>
      </main>
    </>
  );
}

