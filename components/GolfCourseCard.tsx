import React from 'react';

type Course = {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  "Código Postal": string;
  Teléfono: string;
  maps_url: string;
  rating: string | number;
};

type Props = {
  course: Course;
};

const GolfCourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold mb-2">{course.Nombre}</h2>
      <p className="text-sm text-gray-700 mb-1">{course.Dirección}</p>
      <p className="text-sm text-gray-600">{course.Localidad}, CP: {course["Código Postal"]}</p>
      {course.Teléfono && (
        <p className="text-sm text-gray-600">Tel: {course.Teléfono}</p>
      )}
      {course.maps_url && (
        <a
          href={course.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm mt-2 inline-block"
        >
          Ver en Google Maps
        </a>
      )}
      {course.rating && (
        <p className="text-sm text-yellow-600 mt-2">Rating: {course.rating}</p>
      )}
    </div>
  );
};

export default GolfCourseCard;



