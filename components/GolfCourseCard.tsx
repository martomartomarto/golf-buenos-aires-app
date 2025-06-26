interface GolfCourse {
  Nombre: string;
  Dirección: string;
  Localidad: string;
  "Código Postal": string;
  Teléfono: string;
  maps_url: string;
  rating: string | number;
}

export default function GolfCourseCard({ course }: { course: GolfCourse }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-200">
      <h2 className="text-lg font-semibold mb-2">{course.Nombre}</h2>
      <p className="text-sm text-gray-600">{course.Dirección}</p>
      <p className="text-sm text-gray-600">
        {course.Localidad}, CP: {course["Código Postal"]}
      </p>
      <p className="text-sm text-gray-600">Tel: {course.Teléfono}</p>
      <a
        href={course.maps_url}
        className="text-sm text-blue-600 underline block mt-2"
        target="_blank"
      >
        Ver en Google Maps
      </a>
      <p className="text-sm text-gray-800 mt-1">Rating: {course.rating}</p>
    </div>
  );
}

