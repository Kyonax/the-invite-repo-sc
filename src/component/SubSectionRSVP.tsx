import { useState, useEffect } from "preact/hooks";
import familyData from "../data/families-invited.json";
import "./scss/SubSectionRSVP.scss";

const SubSectionRSVP = () => {
  const [familyKey, setFamilyKey] = useState(null);
  const [family, setFamily] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("family");
    setFamilyKey(key);
    if (key && familyData[key]) {
      setFamily(familyData[key]);
    }
  }, []);

  const [form, setForm] = useState({
    cocktail: "",
    ceremony: "",
    mavicure: "",
    diet: "",
  });

  const isFormValid = () =>
    family?.text?.trim() && form.cocktail && form.ceremony && form.mavicure;

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    const payload = {
      familyKey,
      familyName: family.text,
      reserved: family.reserved,
      cocktail: form.cocktail,
      ceremony: form.ceremony,
      mavicure: form.mavicure,
      diet: form.diet || "",
    };

    console.log("Enviando a Google Sheets:", payload);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxTZyidH3tMKjcForLLJ0p-0XTKQmMwLVukelom3a62N8u7iydcr-rwgYhOoSMhPGDH/exec",
        {
          method: "POST",
          mode: "cors", // Importante para CORS
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(payload).toString(),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();
      console.log("Respuesta del servidor:", text);
      alert("¡Asistencia confirmada con éxito!");
    } catch (error) {
      console.error("Error al enviar a Google Sheets:", error);
      alert("Hubo un problema al enviar tu confirmación. Intenta nuevamente.");
    }
  };

  if (!family) {
    return (
      <section class="rsvp-section">
        <h2 class="rsvp-title">Confirmación de Asistencia</h2>
        <p class="rsvp-error">No se encontró la información de la familia.</p>
      </section>
    );
  }

  const isPlural = family.reserved > 1;

  return (
    <section class="rsvp-section">
      <h2 class="rsvp-title">Confirmación de Asistencia</h2>
      <p class="rsvp-subtitle">
        <strong>{family.text}</strong>
      </p>

      <form class="rsvp-form" onSubmit={(e) => e.preventDefault()}>
        <label>
          {isPlural
            ? "¿Asistirán al coctel de bienvenida?"
            : "¿Asistirás al coctel de bienvenida?"}
          <select
            value={form.cocktail}
            onChange={(e) => handleChange("cocktail", e.currentTarget.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          {isPlural
            ? "¿Asistirán a la ceremonia?"
            : "¿Asistirás a la ceremonia?"}
          <select
            value={form.ceremony}
            onChange={(e) => handleChange("ceremony", e.currentTarget.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          {isPlural
            ? "¿Asistirán a los cerros del Mavicure?"
            : "¿Asistirás a los cerros del Mavicure?"}
          <select
            value={form.mavicure}
            onChange={(e) => handleChange("mavicure", e.currentTarget.value)}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </label>

        <label>
          {isPlural
            ? "¿Tienen alguna restricción alimentaria?"
            : "¿Tienes alguna restricción alimentaria?"}
          <textarea
            value={form.diet}
            onInput={(e) => handleChange("diet", e.currentTarget.value)}
            placeholder="Escribe aquí si tienes alguna..."
          />
        </label>

        <button type="submit" disabled={!isFormValid()} onClick={handleSubmit}>
          Confirmar mi asistencia
        </button>
      </form>
    </section>
  );
};

export default SubSectionRSVP;
