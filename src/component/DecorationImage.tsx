import BlastImage from "./BlastImage";
import "./scss/DecorationImage.scss";

type DecorationImageProps = {
  img: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  alt?: string;
  maxWidth?: string;
};

const DecorationImage = ({
  img,
  position = "top-left",
  className = "",
  alt = "Decorative image",
  maxWidth = "50%",
}: DecorationImageProps) => {
  return (
    <div
      className={`decoration-image ${position} ${className}`}
      style={{ maxWidth }}
    >
      <BlastImage img={img} alt={alt} />
    </div>
  );
};

export default DecorationImage;
