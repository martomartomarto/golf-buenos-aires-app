import { useEffect, useState } from "react";
import GolfCourseCard from "../components/GolfCourseCard";

type GolfCourse = {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  rating: string;
  maps_url: string;
  Telefono: string;
};

export default function HomePage() {
  const [courses, setCourses] = useState<GolfCourse[]>([]);

  useEffect(() => {
    fetch("/data/golf-courses.enriched.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Canchas de Golf en Buenos Aires</h1>
      {courses.map((course, i) => (
        <GolfCourseCard key={i} course={course} />
      ))}
    </main>
  );
}
