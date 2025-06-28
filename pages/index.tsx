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

      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 text-white">
        <div className="max-w-7xl mx-auto">
          {/* --- Contenedor de Cabecera Responsivo --- */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left font-poppins">
              Canchas de Golf en BA
            </h1>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <a
                href="/jugadores"
                className="w-full sm:w-auto text-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
              >
                Ver resumen
              </a>
              <a
                href="/scores"
                className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Cargar score
              </a>
            </div>
          </div>

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
        </div>
      </main>
    </>
  );
}
