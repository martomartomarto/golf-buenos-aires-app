import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black bg-white/70 p-4 rounded-xl w-fit">
        Canchas de Golf en Buenos Aires
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <GolfCourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;

