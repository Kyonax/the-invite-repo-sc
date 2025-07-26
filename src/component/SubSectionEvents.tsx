import EventItem from "./EventItem";
import "./scss/SubSectionWelcomeCocktail.scss";

const SubSectionEvents = () => {
  return (
    <section className="welcome-cocktail">
      <EventItem
        iconName="SvgCocktail"
        title="Cóctel de Bienvenida"
        background="Welcome Cocktail"
        place="El Mirador Guainiano"
        date="26 de febrero de 2026 - 17:00 PM"
        locationUrl="https://maps.app.goo.gl/A1MkEmT5xp4yi2a19"
      />

      <EventItem
        iconName="SvgWeddingCeremony"
        title="Ceremonia"
        background="Ceremony"
        place="El Bar"
        description="Calle 26c #25-67"
        date="27 de febrero de 2026"
        locationUrl="https://maps.app.goo.gl/2PJP3QpAA73NXHN29"
      />

      <EventItem
        iconName="SvgClothes"
        title="Código de Vestimenta"
        description="Prepárate para disfrutar sin preocupaciones"
        background="Dress Code"
        place="Smart Cocktail"
        locationUrl="https://pin.it/2PboLuRFQ"
        locationText="Ver inspiración en Pinterest"
      />
    </section>
  );
};

export default SubSectionEvents;
