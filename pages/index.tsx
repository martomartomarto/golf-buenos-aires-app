import React, { useEffect, useState } from "react";
import GolfCourseCard from "../components/GolfCourseCard";

interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  rating?: string;
  maps_url: string;
  Telefono: string;
}

const HomePage = () => {
  const [courses, setCourses] = useState<GolfCourse[]>([]);

  useEffect(() => {
    fetch("/data/golf-courses.enriched.json")
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="min-h-screen bg-[url('/augusta.jpg')] bg-cover bg-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
        Canchas de Golf en Buenos Aires
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <GolfCourseCard key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
