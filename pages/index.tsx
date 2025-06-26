import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover bg-no-repeat px-4 py-8"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-white text-center mb-10 drop-shadow-lg">
        Canchas de Golf en Buenos Aires
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <GolfCourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}


