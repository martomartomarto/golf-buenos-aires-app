import Head from 'next/head';
import Link from 'next/link';
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center font-poppins mb-4 md:mb-0">
            Canchas de Golf en Buenos Aires
          </h1>

          <Link href="/cargar">
            <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full md:w-auto">
              ➕ Cargar Score
            </button>
          </Link>
        </div>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Buscar club..."
            className="px-4 py-2 rounded-md text-black w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <GolfCourseCard key={index} course={course} />
          ))}
        </div>
      </main>
    </>
  );
}
