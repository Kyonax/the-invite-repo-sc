import "./scss/SubSectionAccommodations.scss";

const accommodations = [
  {
    name: "Hotel Parature",
    description: "A orillas del río Inírida, habitaciones con vista",
    phone: "Tel: _______",
    web: "Web: _______",
    price: "$________ por noche aprox.",
  },
  {
    name: "Tonina Amazonas Lodge",
    description:
      "Ideal para quienes quieren una experiencia más natural. Hospedaje en cabañas / Ambiente tranquilo",
    phone: "Tel: _______",
    web: "Web: _______",
  },
  {
    name: "Hotel Cabañas Guainiana",
    description: "Excelente opción para grupos y familias",
    phone: "Tel: _______",
    web: "Web: _______",
  },
  {
    name: "Hotel Orinoco Real",
    description: "Ubicación central, cómodo y accesible",
    phone: "Tel: _______",
    web: "Web: _______",
  },
];

const SubSectionAccommodations = () => {
  return (
    <div class="accommodations-section">
      <h2 class="accommodations-section__title">Hospedajes sugeridos</h2>
      <div class="accommodations-section__list">
        {accommodations.map((hotel) => (
          <div class="accommodation-card">
            <h3 class="accommodation-card__name">{hotel.name}</h3>
            <p class="accommodation-card__description">{hotel.description}</p>
            <p class="accommodation-card__contact">{hotel.phone}</p>
            <p class="accommodation-card__contact">{hotel.web}</p>
            {hotel.price && (
              <p class="accommodation-card__price">{hotel.price}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubSectionAccommodations;
