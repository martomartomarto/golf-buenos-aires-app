import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8">
          Canchas de Golf en Buenos Aires
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <GolfCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
