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
        <h1 className="text-4xl font-bold text-center mb-4 font-poppins">
          Canchas de Golf en Buenos Aires
        </h1>

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
