import "./scss/SubSectionCeremonyLocation.scss";

const SubSectionCeremonyLocation = () => {
  return (
    <div class="ceremony-location-section">
      <h2 class="ceremony-location-section__title">Ceremonia</h2>

      <div class="ceremony-location-section__details">
        <p class="ceremony-location-section__place">
          <strong>Lugar:</strong> EL BAR
        </p>
        <p class="ceremony-location-section__date">
          <strong>Fecha:</strong> 27 de febrero de 2026
        </p>
        <p class="ceremony-location-section__address">
          <strong>Dirección:</strong> Calle 26c #25-67
        </p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=Calle+26c+25-67,+Inírida"
          target="_blank"
          rel="noopener noreferrer"
          class="ceremony-location-section__map-link"
        >
          Ver en el mapa
        </a>
      </div>
    </div>
  );
};

export default SubSectionCeremonyLocation;
