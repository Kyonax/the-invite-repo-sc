import "./scss/SubSectionImportantInfo.scss";

const SubSectionImportantInfo = () => {
  return (
    <div class="important-info-section">
      <h2 class="important-info-section__title">Información importante</h2>

      <div class="important-info-section__content">
        <div class="important-info-section__image" />

        <div class="important-info-section__details">
          <p class="important-info-section__dresscode">
            <strong>Código de vestimenta:</strong> Elegante y fresco
          </p>
          <p class="important-info-section__palette">
            <strong>Paleta sugerida:</strong> Verde esmeralda, verde oliva,
            blanco puro, blanco hueso, beige claro o lino
          </p>

          <div class="important-info-section__quote">
            Cada invitado es una flor única en el jardín de nuestro amor.
          </div>

          <div class="important-info-section__colors">
            <div class="color-block" style="--color: #50c878">
              Verde esmeralda
            </div>
            <div class="color-block" style="--color: #808000">
              Verde oliva
            </div>
            <div class="color-block" style="--color: #fefefe">
              Blanco puro
            </div>
            <div class="color-block" style="--color: #f5f5dc">
              Blanco hueso
            </div>
            <div class="color-block" style="--color: #f5f5dc">
              Beige claro
            </div>
            <div class="color-block" style="--color: #e2725b">
              Terracota
            </div>
            <div class="color-block" style="--color: #7b002c">
              Cabernet
            </div>
            <div class="color-block" style="--color: #a52a2a">
              Auburn
            </div>
            <div class="color-block" style="--color: #b7410e">
              Rust
            </div>
            <div class="color-block" style="--color: #e0b0ff">
              Mauve
            </div>
            <div class="color-block" style="--color: #daafb9">
              Dusty Rose
            </div>
            <div class="color-block" style="--color: #f4c2c2">
              Melocotón tenue
            </div>
            <div class="color-block" style="--color: #e1ad01">
              Amarillo mostaza
            </div>
            <div class="color-block" style="--color: #6e7f80">
              Lavanda seco
            </div>
            <div class="color-block" style="--color: #005f73">
              Azul petróleo
            </div>
            <div class="color-block" style="--color: #800080">
              Morado
            </div>
            <div class="color-block" style="--color: #ff00ff">
              Fucsia
            </div>
          </div>

          <a
            class="important-info-section__link"
            href="https://pin.it/2PboLuRFQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver inspiración en Pinterest
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubSectionImportantInfo;
