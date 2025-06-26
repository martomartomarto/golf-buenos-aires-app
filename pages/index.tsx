import React from 'react';

type Props = {
  course: {
    Nombre: string;
    Dirección: string;
    Localidad: string;
    'Código Postal': string;
    Teléfono: string;
    maps_url: string;
    rating: string | number;
  };
};

const GolfCourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white/80 rounded-xl shadow-lg p-4 backdrop-blur-md">
      <h2 className="text-xl font-bold mb-2">{course.Nombre}</h2>
      <p>{course.Dirección}</p>
      <p>{course.Localidad}</p>
      <p>{course['Código Postal']}</p>
      {course.Teléfono && (
        <p className="flex items-center">
          <span className="mr-2">📞</span> {course.Teléfono}
        </p>
      )}
      {course.rating && (
        <p className="flex items-center">
          <span className="mr-1">⭐</span> {course.rating}
        </p>
      )}
      {course.maps_url && (
        <a
          href={course.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline mt-2 block"
        >
          Ver en Google Maps
        </a>
      )}
    </div>
  );
};

export default GolfCourseCard;
