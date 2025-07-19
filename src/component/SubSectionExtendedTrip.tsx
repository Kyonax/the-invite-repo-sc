import InviteTitle from "./InviteTitle";
import "./scss/SubSectionExtendedTrip.scss";
import DecorationImage from "./DecorationImage";

const SubSectionExtendedTrip = () => {
  return (
    <div class="extended-trip-section">
      {/**
       *
       *<DecorationImage
       *  img="OLIVE_DECO_DOWN_LEFT"
       *  position="bottom-left"
       *  maxWidth="50%" />
       *
       */}

      <InviteTitle
        main="Extensión de la Boda - Cerros de Mavicure"
        background="Extension"
      />

      <p class="extended-trip-section__intro">
        Más que una boda, queremos invitarte a vivir una experiencia
        inolvidable.
      </p>

      <div class="extended-trip-section__details">
        <p>
          El <strong>sábado 28 de febrero de 2026</strong> a las{" "}
          <strong>2:00 p.m</strong> saldremos juntos hacia los Cerros de
          Mavicure: un lugar sagrado, imponente y profundamente significativo
          para nosotros.
        </p>
        <p>
          Esta travesía es opcional, pero representa una extensión espiritual de
          nuestra celebración. Es una oportunidad para compartir contigo la
          esencia del Guainía: su tierra, su energía y su gente.
        </p>

        <h3>¿Qué incluye esta experiencia?</h3>
        <ul>
          <li>
            <span>🚤</span> Transporte fluvial (ida y regreso)
          </li>
          <li>
            <span>🧭</span> Guía local conocedor del territorio
          </li>
          <li>
            <span>🍽</span> Cena comunitaria
          </li>
          <li>
            <span>🏕️</span> Alojamiento a elegir:
            <ul class="extended-trip-section__sublist">
              <li>Hamaca</li>
              <li>Camping</li>
              <li>Cabaña</li>
            </ul>
          </li>
        </ul>

        <p>
          <strong>Regreso:</strong> Domingo 1 de marzo en la Tarde.
          <br />
          <strong>Estarías de vuelta en casa:</strong> Lunes 2 de Marzo.
        </p>

        <p>
          Esta es una experiencia pensada con el corazón. Sabemos que implica un
          esfuerzo adicional y tiempo, pero también creemos que será una forma
          única de cerrar con broche de oro este encuentro tan especial.
        </p>

        <p>
          Para quienes estén interesados, se recogerá una cuota por persona
          según el tipo de alojamiento elegido. Los valores y detalles se
          informarán más adelante.
        </p>
      </div>
    </div>
  );
};

export default SubSectionExtendedTrip;
