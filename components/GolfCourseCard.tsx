interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  rating: string;
  maps_url: string;
  Telefono: string;
}

export default function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <div className="bg-white bg-opacity-90 rounded-2xl p-4 shadow-lg w-full max-w-xl">
      <h2 className="text-xl font-semibold">{course.Nombre}</h2>
      <p className="text-sm">{course.Dirección}, {course.Localidad}</p>
      <p className="text-sm">📞 {course.Telefono}</p>
      {course.rating && <p className="mt-1">⭐ {course.rating}</p>}
      {course.maps_url && (
        <a
          href={course.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-2 inline-block"
        >
          Ver en Google Maps
        </a>
      )}
    </div>
  );
}
