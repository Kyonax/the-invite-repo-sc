import InviteTitle from "./InviteTitle";
import "./scss/SubSectionImportantInfo.scss";

const COLORS_MEN_EXCLUDED = [
  { name: "Beige claro", hex: "#f5f5dc" },
  { name: "Blanco", hex: "#ffffff" },
];

const COLORS_WOMEN_EXCLUDED = [{ name: "Verde Oliva", hex: "#808000" }];

const COLORS_BRIDESMAIDS = [
  { name: "Rust", hex: "#7E3717" },
  { name: "Tant", hex: "#A9835C" },
  { name: "Nut Brown", hex: "#5C3422" },
  { name: "Dune", hex: "#A05035" },
  { name: "Dark Red", hex: "#3D0A05" },
  { name: "Toasted Caramel", hex: "#84592B" },
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
      <InviteTitle main="Información importante" background="Important" />

      <div className="important-info-section__content">
        <div className="important-info-section__group">
          <h3 className="important-info-section__title">Caballeros</h3>
          <p className="important-info-section__text">
            Todos los colores son bienvenidos, excepto los siguientes que están
            reservados para las damas.
          </p>
          <div className="important-info-section__palette">
            {COLORS_MEN_EXCLUDED.map((color, idx) => (
              <ColorSwatchCircle key={idx} {...color} />
            ))}
          </div>
        </div>

        <div className="important-info-section__group">
          <h3 className="important-info-section__title">Damas</h3>
          <p className="important-info-section__text">
            Todos los colores son bienvenidos, excepto el siguiente reservado
            para los caballeros.
          </p>
          <div className="important-info-section__palette">
            {COLORS_WOMEN_EXCLUDED.map((color, idx) => (
              <ColorSwatchCircle key={idx} {...color} />
            ))}
          </div>
        </div>

        <div className="important-info-section__group">
          <h3 className="important-info-section__title">Damas de honor</h3>
          <p className="important-info-section__text">
            Tonos que han sido reservados especialmente para ustedes.
          </p>
          <div className="important-info-section__palette">
            {COLORS_BRIDESMAIDS.map((color, idx) => (
              <ColorSwatchCircle key={idx} {...color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubSectionImportantInfo;
