import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/augusta.jpg')` }} // asegurate que esté en /public
    >
      <div className="bg-black bg-opacity-50 min-h-screen px-6 py-12">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Canchas de Golf en Buenos Aires
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <GolfCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
