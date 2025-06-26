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
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg p-5 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold mb-2">{course.Nombre}</h2>
      <p className="text-sm text-gray-800">{course.Dirección}</p>
      <p className="text-sm text-gray-700">
        {course.Localidad}, CP: {course["Código Postal"]}
      </p>
      {course.Teléfono && (
        <p className="text-sm text-gray-700 mt-1">Tel: {course.Teléfono}</p>
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
        <p className="text-sm text-yellow-700 mt-2 font-medium">
          Rating: {course.rating}
        </p>
      )}
    </div>
  );
};

export default GolfCourseCard;



