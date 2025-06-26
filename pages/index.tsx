import React from 'react';
import GolfCourseCard from '../components/GolfCourseCard';
import courses from '../data/golf-courses.enriched.json';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <div className="backdrop-brightness-90 min-h-screen px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Canchas de Golf en Buenos Aires
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <GolfCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

