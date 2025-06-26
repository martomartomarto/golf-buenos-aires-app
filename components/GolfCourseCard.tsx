import React from 'react';

interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  "Código Postal": string;
  Teléfono: string;
  maps_url: string;
  rating: string; // <-- Antes estaba como number, ahora string para coincidir con el JSON
}

const GolfCourseCard: React.FC<{ course: GolfCourse }> = ({ course }) => {
  return (
    <div className="bg-white bg-opacity-90 p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">{course.Nombre}</h2>
      <p className="text-sm">{course.Dirección}</p>
      <p className="text-sm">{course.Localidad}, CP: {course["Código Postal"]}</p>
      <p className="text-sm">Tel: {course.Teléfono}</p>
      <a
        href={course.maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        Ver en Google Maps
      </a>
      <p className="text-sm mt-1">Rating: {course.rating}</p>
    </div>
  );
};

export default GolfCourseCard;

