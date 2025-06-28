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
      </Head>

      <main className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">

          {/* --- HEADER SECTION --- */}
          {/* This container centers the header content on the page */}
          <div className="flex flex-col items-center text-center mb-8">
            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-masters-dark">
              Canchas de Golf
            </h1>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <a
                href="/jugadores"
                className="w-full sm:w-auto text-center bg-masters-dark hover:bg-black text-white font-semibold py-2 px-5 rounded-md uppercase tracking-wider text-sm"
              >
                Resumen
              </a>
              <a
                href="/scores"
                className="w-full sm:w-auto text-center bg-masters-green hover:opacity-90 text-white font-semibold py-2 px-5 rounded-md uppercase tracking-wider text-sm"
              >
                Cargar Score
              </a>
            </div>
            
            {/* Search Bar */}
            <div className="w-full max-w-lg mt-8">
              <input
                type="text"
                placeholder="Buscar club por nombre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="p-3 w-full rounded-md border-2 border-gray-300 focus:border-masters-green focus:ring-0"
              />
            </div>
          </div>

          {/* --- GOLF COURSES GRID --- */}
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
