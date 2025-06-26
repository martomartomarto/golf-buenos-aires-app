import React, { useState } from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

export default function Home() {
  const [query, setQuery] = useState('');

  const filteredCourses = courses.filter(course =>
    course.Nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-black bg-opacity-30 text-white">
      <h1 className="text-4xl font-bold mb-4 drop-shadow-md text-center">
        Canchas de Golf en Buenos Aires
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Buscar club..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-full max-w-md rounded-lg border border-white bg-white bg-opacity-20 text-white placeholder-white focus:outline-none backdrop-blur-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <GolfCourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}
