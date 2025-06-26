interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  rating?: string;
  maps_url: string;
  Telefono: string;
}

export default function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md space-y-2">
      <h2 className="text-xl font-bold">{course.Nombre}</h2>
      <p className="text-sm">{course.Dirección}, {course.Localidad}</p>
      <p className="text-sm">📞 {course.Telefono}</p>
      {course.rating && (
        <p className="mt-1 text-sm">⭐ {course.rating}</p>
      )}
      <a
        href={course.maps_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm inline-block mt-2"
      >
        Ver en Google Maps
      </a>
    </div>
  );
}

