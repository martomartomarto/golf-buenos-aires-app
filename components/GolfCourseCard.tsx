import React from 'react';

interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  'Código Postal': string;
  Teléfono: string;
  maps_url: string;
  rating: number;
}

const GolfCourseCard: React.FC<{ course: GolfCourse }> = ({ course }) => {
  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 text-sm text-gray-800 backdrop-blur-md">
      <h2 className="text-xl font-bold mb-2">{course.Nombre}</h2>
      <p>{course.Dirección}</p>
      <p>{course.Localidad}, CP: {course['Código Postal']}</p>
      {course.Teléfono && <p>Tel: {course.Teléfono}</p>}
      <a href={course.maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
        Ver en Google Maps
      </a>
      <p className="mt-2">Rating: {course.rating}</p>
    </div>
  );
};

export default GolfCourseCard;
