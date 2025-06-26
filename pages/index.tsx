import Head from 'next/head';
import GolfCourseCard from '../components/GolfCourseCard';

const golfCourses = [
  {
    name: 'Abril Club De Campo',
    address: 'Autopista Bs. As.- La Plata Km. 30,5, Berazategui',
  },
  {
    name: 'Aero Club Fortin Lobos',
    address: 'Ruta Nac. Nº 205 Km. 106, Lobos',
    rating: 4.7,
    mapsUrl: 'https://goo.gl/maps/example1',
  },
  {
    name: 'Aero Golf Club De Coronel Suarez',
    address: 'Av. Mateo Llovera S/Nº Seccion Quintas, Coronel Suarez',
    rating: 4.5,
    mapsUrl: 'https://goo.gl/maps/example2',
  },
  {
    name: 'Aranjuez Country Club',
    address: 'Ruta 9 Km. 47, Escobar',
  },
  {
    name: 'Aranzazu Club De Campo',
    address: 'Panam. Ramal Pilar Hasta Garin, Garin',
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Augusta.jpg')" }}
    >
      <Head>
        <title>Canchas de Golf en Buenos Aires</title>
      </Head>

      <div className="bg-black bg-opacity-30 py-8 px-4 min-h-screen">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Canchas de Golf en Buenos Aires
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {golfCourses.map((course) => (
            <GolfCourseCard key={course.name} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
