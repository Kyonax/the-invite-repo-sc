import InviteTitle from "./InviteTitle";

const SubSectionIntro = () => {
  return (
    <div class="second-section">
      <p class="wedding-phrase" data-animate="in-place">
        Donde el río abraza la selva, floreció nuestro amor. Hoy, en el corazón
        de nuestro hogar, celebramos lo que la vida tejió con paciencia.
        Queremos que vengas a celebrar esta historia que apenas comienza.
      </p>

      <InviteTitle
        main="Con la bendición de nuestros padres"
        background="Bendición"
        className="blessing-text"
      />

      <div class="blessing-parents">
        <div data-animate="left" class="parents" style="text-align: left;">
          <span class="parents__from">Padres de la Novia</span>
          <span>Nelson O Ramírez A.</span>
          <span>Yolima R Cruz V.</span>
        </div>
        <div data-animate="right" class="parents" style="text-align: right;">
          <span class="parents__from">Padres del Novio</span>
          <span>Manuel G Tapia Q.</span>
          <span>Gladys Páez Q.</span>
        </div>
      </div>
    </div>
  );
};

export default SubSectionIntro;
