import React, { useState } from "react";
import GolfCourseCard from "@/components/GolfCourseCard";
import ScoreForm from "@/components/ScoreForm";
import courses from "@/data/golf-courses.enriched.json";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.Nombre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-white px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center font-poppins mb-6">Canchas de Golf en Buenos Aires</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar club..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <GolfCourseCard key={index} course={course} />
        ))}
      </div>

      {/* FORMULARIO NUEVO */}
      <ScoreForm />
    </div>
  );
}

