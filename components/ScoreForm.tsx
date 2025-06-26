import { useState } from "react";

export default function ScoreForm() {
  const [form, setForm] = useState({
    nombre: "",
    club: "",
    gross: "",
    neto: "",
    birdies: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbybU5A1Apbq1uwisYSANJLDCBpIc5cWr1F2gvNhgXSmRltzLz1qF0btPP3vsGO2TXq4RQ/exec",
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setStatus("success");
        setForm({ nombre: "", club: "", gross: "", neto: "", birdies: "" });
      } else {
        throw new Error("Error al enviar");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-80 p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-8 text-black font-poppins">
      <h2 className="text-xl font-bold mb-4 text-center">Cargar Score</h2>

      {["nombre", "club", "gross", "neto", "birdies"].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={(form as any)[field]}
          onChange={handleChange}
          className="mb-3 w-full p-2 rounded border border-gray-300"
          required
        />
      ))}

      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded w-full">
        Enviar
      </button>

      {status === "success" && <p className="text-green-700 mt-2 text-center">✅ Score cargado con éxito</p>}
      {status === "error" && <p className="text-red-600 mt-2 text-center">❌ Hubo un error al enviar</p>}
    </form>
  );
}
