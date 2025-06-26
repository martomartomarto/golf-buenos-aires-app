import React from 'react';

interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  "Código Postal": string;
  Teléfono: string;
  maps_url: string;
  rating: string | number;
}

const GolfCourseCard: React.FC<{ course: GolfCourse }> = ({ course }) => {
  return (
    <div className="rounded-2xl shadow-lg bg-white bg-opacity-90 p-6 flex flex-col gap-2 transition hover:scale-[1.02] duration-200">
      <h2 className="text-xl font-semibold">{course.Nombre}</h2>
      <p className="text-sm text-gray-700">{course.Dirección}</p>
      <p className="text-sm text-gray-700">
        {course.Localidad}, CP: {course["Código Postal"]}
      </p>
      <p className="text-sm text-gray-700">Tel: {course.Teléfono}</p>
      <a
        href={course.maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 underline"
      >
        Ver en Google Maps
      </a>
      <p className="text-sm text-gray-700">Rating: {course.rating}</p>
    </div>
  );
};

export default GolfCourseCard;
