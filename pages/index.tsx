import React from "react";
import golfCourses from "../data/golf-courses.enriched.json";
import GolfCourseCard from "../components/GolfCourseCard";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[url('/augusta.jpg')] bg-cover bg-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
        Canchas de Golf en Buenos Aires
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {golfCourses.map((course, idx) => (
          <GolfCourseCard key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
