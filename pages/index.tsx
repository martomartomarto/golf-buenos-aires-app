import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <h1 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-md">
        Canchas de Golf en Buenos Aires
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <GolfCourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;

