import React from 'react';

interface GolfCourse {
  name: string;
  address: string;
  phoneNumber?: string;
  rating?: number;
  mapsUrl?: string;
}

const GolfCourseCard = ({ course }: { course: GolfCourse }) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold">{course.name}</h2>
      <p>{course.address}</p>
      {course.phoneNumber && (
        <p className="mt-1">📞 {course.phoneNumber}</p>
      )}
      {course.rating && (
        <p className="mt-1">⭐ {course.rating}</p>
      )}
      {course.mapsUrl && (
        <a
          href={course.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 underline mt-2 inline-block"
        >
          Ver en Google Maps
        </a>
      )}
    </div>
  );
};

export default GolfCourseCard;

