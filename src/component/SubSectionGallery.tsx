import { useState } from "preact/hooks";
import BlastImage from "./BlastImage";
import weddingVideo from "../assets/backup/IMG_7519.MOV";

import "./scss/SubSectionGallery.scss";

const images = [
  "256A6761",
  "256A6887",
  "256A6912",
  "256A6935",
  "256A6944",
  "256A6954",
  "256A7028",
  "256A7083",
  "256A7100",
  "256A7190",
  "256A7260",
  "256A7276",
  "IMG_5206",
  "IMG_6027",
  "IMG_6450",
  "IMG_6551",
  "IMG_6839",
  "IMG_6858",
  "IMG_8263",
];

const midpoint = Math.floor(images.length / 2);
const galleryItems = [
  ...images.slice(0, midpoint).map((img) => ({ type: "image", src: img })),
  { type: "video", src: weddingVideo },
  ...images.slice(midpoint).map((img) => ({ type: "image", src: img })),
];

const SubSectionGallery = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setActiveIndex((prev) => Math.max(prev - 1, 1));
    } else {
      setActiveIndex((prev) => Math.min(prev + 1, galleryItems.length - 2));
    }
  };

  const getClassForIndex = (index: number) => {
    if (index === activeIndex)
      return "gallery-section__item gallery-section__item--center";
    if (index === activeIndex - 1)
      return "gallery-section__item gallery-section__item--side-left";
    if (index === activeIndex + 1)
      return "gallery-section__item gallery-section__item--side-right";
    return "gallery-section__item gallery-section__item--hidden";
  };

  return (
    <section class="gallery-viewport">
      <div class="gallery-section">
        <h2 class="gallery-section__title">Nuestros Recuerdos</h2>

        <div class="gallery-section__carousel-wrapper">
          <button
            class="gallery-section__nav gallery-section__nav--left"
            onClick={() => scroll("left")}
            disabled={activeIndex <= 1}
          >
            &larr;
          </button>

          <div class="gallery-section__carousel">
            {galleryItems.map((item, index) => (
              <div class={getClassForIndex(index)} key={index}>
                <div class="gallery-section__image-wrapper">
                  {item.type === "image" ? (
                    <BlastImage
                      img={item.src}
                      className="gallery-image"
                      alt={`Galería ${index + 1}`}
                      fetchpriority="auto"
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      class="gallery-video"
                    >
                      <source src={item.src} type="video/mp4" />
                      Tu navegador no soporta video HTML5.
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            class="gallery-section__nav gallery-section__nav--right"
            onClick={() => scroll("right")}
            disabled={activeIndex >= galleryItems.length - 2}
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default SubSectionGallery;
