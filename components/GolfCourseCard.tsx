import React from 'react';

type Props = {
  course: {
    Nombre: string;
    Dirección: string;
    Localidad: string;
    'Código Postal': string;
    Teléfono: string;
    maps_url: string;
    rating: number | string;
  };
};

const GolfCourseCard: React.FC<Props> = ({ course }) => {
  return (
    // Card container with a solid background and shadow
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center flex flex-col h-full">
      {/* Title with a clear, dark green color */}
      <h2 className="font-serif text-2xl font-bold text-masters-green mb-3">
        {course.Nombre}
      </h2>

      {/* Details section with a dark, readable text color */}
      <div className="text-masters-dark/90 space-y-1 flex-grow font-sans">
        <p>{course.Dirección}</p>
        <p>
          {course.Localidad}, CP: {course['Código Postal']}
        </p>
        <p>Tel: {course.Teléfono}</p>
      </div>

      {/* Links and rating with clear, distinct colors */}
      <div className="mt-4">
        <a
          href={course.maps_url}
          className="font-sans text-masters-green hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver en Google Maps
        </a>
      </div>
      <p className="font-sans mt-3 font-semibold text-masters-dark">Rating: {course.rating}</p>
    </div>
  );
};

export default GolfCourseCard;
