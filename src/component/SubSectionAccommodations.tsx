import AccommodationItem from "./AccommodationItem";
import InviteTitle from "./InviteTitle";
import "./scss/SubSectionAccommodations.scss";

const SubSectionAccommodations = () => {
  return (
    <section className="accommodations-section">
      <div class="accommodations-section__title">
        <InviteTitle main="Información Importante" background="Important" />
      </div>

      <AccommodationItem
        iconName="SvgHotel"
        name="Hotel Parature"
        background="Parature"
        description="A orillas del río Inírida, habitaciones con vista al río"
        phone="3102590686"
        web="https://www.tripadvisor.co/Hotel_Review-g3493976-d13535853-Reviews-Hotel_Parature-Inirida_Guainia_Department.html?m=19905"
      />

      <AccommodationItem
        iconName="SvgTonina"
        name="Tonina Amazonas Lodge"
        background="Amazonas"
        description="Ideal para quienes quieren una experiencia más natural. Hospedaje en cabañas / Ambiente tranquilo"
        phone="3105634887"
        web="https://toninastravel.com"
      />

      <AccommodationItem
        iconName="SvgCabanha"
        name="Hotel Cabañas Guainiana"
        background="Cabañas"
        description="Excelente opción para grupos y familias"
        phone="3225233545"
        web="https://www.tripadvisor.co/Hotel_Review-g3493976-d8474776-Reviews-La_Cabana_Guainiana-Inirida_Guainia_Department.html"
      />

      <AccommodationItem
        iconName="SvgHotel"
        name="Hotel Orinoco Real"
        background="Orinoco"
        description="Ubicación central, cómodo y accesible"
        phone="3026065093"
        web="https://www.tripadvisor.co/Hotel_Review-g3493976-d12496940-Reviews-Hotel_Orinoco_Real-Inirida_Guainia_Department.html"
      />
    </section>
  );
};

export default SubSectionAccommodations;
