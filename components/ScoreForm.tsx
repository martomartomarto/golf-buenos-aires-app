import { useState } from 'react';
import golfCourses from '../data/golf-courses.enriched.json';

// Lista de jugadores autorizados
const players = [
  'Lucas Roldan',
  'Martin Mastrogiacomo',
  'Nicolas Chimmalez',
  'Facundo Garcia',
  'Gonzalo Campi',
  'Tomas Manfredini',
];

export default function ScoreForm() {
  const [formData, setFormData] = useState({
    jugador: '',
    fecha: '',
    club: '',
    gross: '',
    neto: '',
    birdies: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycby3TRxfCQo0hVSKnfT7l2uvhlMRyBfM39-Gt3ugAZKNtdiNLo5FCiFr_xy0Uzo1JOM-gg/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      setSuccess(true);
      setFormData({
        jugador: '',
        fecha: '',
        club: '',
        gross: '',
        neto: '',
        birdies: '',
      });
    } catch (error) {
      console.error('Error al enviar el score:', error);
      alert('Error de red al enviar el score.');
    }
  };

  const clubOptions = golfCourses.map(c => c.Nombre).sort();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md mx-auto text-black"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        ⛳️Do not cheat you lame ass player⛳️
      </h2>

      {/* Reemplazamos el input por un select para el jugador */}
      <select
        name="jugador"
        value={formData.jugador}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      >
        <option value="">Seleccioná un jugador</option>
        {players.map((player) => (
          <option key={player} value={player}>
            {player}
          </option>
        ))}
      </select>

      <input
        name="fecha"
        type="text"
        placeholder="Fecha (DD/MM/AAAA)"
        value={formData.fecha}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      />

      <select
        name="club"
        value={formData.club}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      >
        <option value="">Seleccioná un club</option>
        {clubOptions.map((club, i) => (
          <option key={i} value={club}>
            {club}
          </option>
        ))}
      </select>

      <input
        name="gross"
        type="number"
        placeholder="Gross"
        value={formData.gross}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      />

      <input
        name="neto"
        type="number"
        placeholder="Neto"
        value={formData.neto}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      />

      <input
        name="birdies"
        type="number"
        placeholder="Birdies"
        value={formData.birdies}
        onChange={handleChange}
        className="mb-4 px-4 py-2 w-full rounded border border-gray-300"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      >
        Enviar
      </button>

      {success && (
        <p className="mt-4 text-green-700 font-semibold flex items-center justify-center">
          ✅ Score cargado con éxito
        </p>
      )}
    </form>
  );
}
