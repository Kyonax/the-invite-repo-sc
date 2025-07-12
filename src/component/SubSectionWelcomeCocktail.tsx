import "./scss/SubSectionWelcomeCocktail.scss";

const SubSectionWelcomeCocktail = () => {
  return (
    <div class="welcome-cocktail-section">
      <h2 class="welcome-cocktail-section__title">Coctel de Bienvenida</h2>

      <div class="welcome-cocktail-section__info">
        <p class="welcome-cocktail-section__location">
          <strong>Lugar:</strong> El Mirador Guainiano
        </p>

        <p class="welcome-cocktail-section__datetime">
          <strong>Fecha:</strong> 26 de febrero de 2026
          <br />
          <strong>Hora:</strong> 17:00 PM
        </p>

        <p class="welcome-cocktail-section__dresscode">
          <strong>Dress Code:</strong> Casual y cómodo. Prepárate para disfrutar
          la visita sin preocupaciones.
          <br />
          <em>¡Nos reservamos el blanco!</em>
        </p>
      </div>
    </div>
  );
};

export default SubSectionWelcomeCocktail;
