const GolfCourseCard: React.FC<Props> = ({ course }) => {
  return (
    <div className="bg-greenGlass rounded-xl shadow-lg p-6 backdrop-blur-md text-white">
      <h2 className="text-xl font-bold mb-2">{course.Nombre}</h2>
      <p>{course.Dirección}</p>
      <p>{course.Localidad}, CP: {course["Código Postal"]}</p>
      <p>Tel: {course.Teléfono}</p>
      <a
        href={course.maps_url}
        className="text-blue-200 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en Google Maps
      </a>
      <p className="mt-2 font-semibold">Rating: {course.rating}</p>
    </div>
  );
};
