import InviteTitle from "./InviteTitle";
import SvgIcon from "./SvgIcon";
import "./scss/SubSectionImportantInfo.scss";

const COLORS_MEN_EXCLUDED = [{ name: "Verde", hex: "#808000" }];

const COLORS_WOMEN_EXCLUDED = [
  { name: "Blanco", hex: "#FFFFFF" },
  { name: "Beige", hex: "#E8D9B0" },
  { name: "Rust", hex: "#7E3717" },
  { name: "Terracota", hex: "#D9A48F" },
  { name: "Cabernet", hex: "#4D0F28" },
];

const ColorSwatchCircle = ({ name, hex }: { name: string; hex: string }) => (
  <div className="color-swatch">
    <div
      className="color-swatch__circle"
      style={{ "--swatch-color": hex } as React.CSSProperties}
    />
    <span className="color-swatch__label">{name}</span>
  </div>
);

const SubSectionImportantInfo = () => {
  return (
    <section className="important-info-section">
      {/**
       *  <InviteTitle main="Información importante" background="Important" />
       */}

      <div className="important-info-section__bento">
        <div className="important-info-section__half bordered">
          <h3 data-animate="in-place" className="important-info-section__title">
            Caballeros
          </h3>
          <p data-animate="in-place" className="important-info-section__text">
            Color reservado para el novio: Se recomienda evitar cualquier
            tonalidad relacionada.
          </p>
          <div className="important-info-section__row">
            <div
              data-animate="in-place"
              className="important-info-section__icon"
            >
              <SvgIcon name="SvgMan" />
            </div>
            <div
              data-animate="right"
              className="important-info-section__palette"
            >
              {COLORS_MEN_EXCLUDED.map((color, idx) => (
                <ColorSwatchCircle key={idx} {...color} />
              ))}
            </div>
          </div>
        </div>

        <div className="important-info-section__half bordered">
          <h3 data-animate="in-place" className="important-info-section__title">
            Damas
          </h3>
          <p data-animate="in-place" className="important-info-section__text">
            Colores reservados para la novia: Agradecemos evitar tonos
            similares.
          </p>
          <div className="important-info-section__row">
            <div
              data-animate="in-place"
              className="important-info-section__icon"
            >
              <SvgIcon name="SvgWoman" />
            </div>
            <div
              data-animate="right"
              className="important-info-section__palette"
            >
              {COLORS_WOMEN_EXCLUDED.map((color, idx) => (
                <ColorSwatchCircle key={idx} {...color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubSectionImportantInfo;
