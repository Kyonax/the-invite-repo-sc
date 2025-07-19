import { useState, useEffect } from "preact/hooks";
import familyData from "../data/families-invited.json";
import "./scss/SubSectionRSVP.scss";
import InviteTitle from "./InviteTitle";

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
    attending: "",
    cocktail: "",
    ceremony: "",
    mavicure: "",
    diet: "",
  });

  const isFormValid = () =>
    family?.text?.trim() &&
    form.attending &&
    form.cocktail &&
    form.ceremony &&
    form.mavicure;

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!isFormValid()) return;

    const attendingFormatted = `${form.attending}/${family.reserved}`;

    const formElement = document.createElement("form");
    formElement.method = "POST";
    formElement.target = "_blank";
    formElement.action =
      "https://script.google.com/macros/s/AKfycbzOh_A9m2wQMPNzJcNiw9RvZqhFwMnQ9hRAcixSUrryyWZj0T-vQgkM8tprbM0GAaqC/exec";

    const addField = (name: string, value: string) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      formElement.appendChild(input);
    };

    addField("familyKey", familyKey);
    addField("familyName", family.text);
    addField("attending", attendingFormatted); // 👈 Enviamos "2/3", "1/2", etc.
    addField("cocktail", form.cocktail);
    addField("ceremony", form.ceremony);
    addField("mavicure", form.mavicure);
    addField("diet", form.diet || "");

    document.body.appendChild(formElement);
    formElement.submit();

    alert("🎉 Tu confirmación fue enviada correctamente.");
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
      <div class="section-container">
        <InviteTitle main="Confirmación de Asistencia" background="Rsvp Form" />

        <p class="rsvp-subtitle">
          <strong>{family.text}</strong>
        </p>

        <form class="rsvp-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            {isPlural
              ? "¿Cuántas personas asistirán a la boda?"
              : "¿Confirmas tu asistencia a la boda?"}
            <select
              value={form.attending}
              onChange={(e) => handleChange("attending", e.currentTarget.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              {Array.from({ length: family.reserved }, (_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>

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

          <button
            type="submit"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Confirmar mi asistencia
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubSectionRSVP;
