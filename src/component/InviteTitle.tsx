import "./scss/InviteTitle.scss";

interface InviteTitleProps {
  main: string; // Texto principal
  background: string; // Texto decorativo de fondo
  className?: string; // Clases extra (opcional)
  children?: preact.ComponentChildren; // Para incluir contenido extra (como el contador)
}

const InviteTitle = ({
  main,
  background,
  className = "",
  children,
}: InviteTitleProps) => {
  return (
    <h3 data-animate="in-place" class={`invite-title ${className}`}>
      <span class="invite-title__background">{background}</span>
      {main}
      {children}
    </h3>
  );
};

export default InviteTitle;
