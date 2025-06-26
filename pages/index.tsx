import GolfCourseCard from "../components/GolfCourseCard";
import courses from "../data/golf-courses.enriched.json";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('/augusta.jpg')` }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen px-4 py-10">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Canchas de Golf en Buenos Aires
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <GolfCourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
