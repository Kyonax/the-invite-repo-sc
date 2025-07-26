import InviteTitle from "./InviteTitle";
import "./scss/SubSectionGifts.scss";

const SubSectionGifts = () => {
  return (
    <div class="gifts-section">
      <InviteTitle main="Regalos" background="Presents" />

      <p data-animate="in-place" class="gifts-section__message">
        Tu compañía es nuestro mejor regalo. No pediremos obsequios; ven con el
        corazón lleno y los zapatos cómodos para bailar.
      </p>
    </div>
  );
};

export default SubSectionGifts;
