import Head from 'next/head';
import { useState } from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import golfCourses from '../data/golf-courses.enriched.json';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = golfCourses.filter(course =>
    course.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Canchas de Golf en Buenos Aires</title>
        <meta name="description" content="Listado de canchas de golf" />
      </Head>

      <main className="min-h-screen px-4 py-10 text-white">
        <div className="flex justify-end mb-6 gap-2">
          <a
            href="/jugadores"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
          >
            Ver resumen por jugador
          </a>
          <a
            href="/scores"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Cargar score
          </a>
        </div>

        <h1 className="text-4xl font-bold text-center mb-4 font-poppins">
          Canchas de Golf en Buenos Aires
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Buscar club..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 rounded text-black w-full max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, i) => (
            <GolfCourseCard key={i} course={course} />
          ))}
        </div>
      </main>
    </>
  );
}
