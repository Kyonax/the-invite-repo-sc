import "./scss/ReloadButton.scss";
import SvgIcon from "./SvgIcon";

const ReloadButton = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div class="reload-button-container">
      <div class="reload-wrapper hide-message">
        <button
          onClick={reloadPage}
          class="reload-button"
          aria-label="Cerrar sobre"
          title="Cerrar sobre"
        >
          <SvgIcon name="SvgEnvelope" />
        </button>
      </div>
    </div>
  );
};

export default ReloadButton;
