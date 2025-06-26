import React from 'react';

type GolfCourse = {
  name: string;
  address: string;
  rating?: number;
  mapsUrl?: string;
};

const GolfCourseCard = ({ course }: { course: GolfCourse }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300">
      <h2 className="text-xl font-semibold mb-1">{course.name}</h2>
      <p className="text-gray-700 text-sm mb-2">{course.address}</p>
      {course.rating && (
        <p className="text-yellow-600 text-sm mb-1">⭐ {course.rating}</p>
      )}
      {course.mapsUrl && (
        <a
          href={course.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 text-sm underline"
        >
          Ver en Google Maps
        </a>
      )}
    </div>
  );
};

export default GolfCourseCard;


