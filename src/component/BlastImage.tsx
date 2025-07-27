import { h, cloneElement } from "preact";
import { useImage, GLOBAL_IMAGE_CACHE } from "@/util/preload-images.util";

type BlastImageProps = {
  img: string;
  className?: string;
  sizes?: string;
  [key: string]: any;
};

const BlastImage = ({ img, className, sizes, ...rest }: BlastImageProps) => {
  const [isLoaded, image] = useImage(img, GLOBAL_IMAGE_CACHE);

  if (!img) {
    return <div class={className}>Missing image ID</div>;
  }

  if (!isLoaded || !image) {
    return (
      <div class={className} aria-busy="true">
        <span>Loading image...</span>
      </div>
    );
  }

  return cloneElement(
    image,
    {},
    image.props.children.map((child: any) =>
      child.type === "img"
        ? cloneElement(child, { className, ...rest })
        : child,
    ),
  );
};

export default BlastImage;
