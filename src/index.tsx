import { hydrate, prerender as ssr } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { preloadImages, GLOBAL_IMAGE_CACHE } from "./util/preload-images.util";

import Preloader from "./component/Preloader";
import SectionEnvelope from "./component/SectionEnvelope";
import SectionMain from "./component/SectionMain";

import data from "./data/families-invited.json";
import "./styles/main.scss";

// List of critical images to preload
const CRITICAL_IMAGES = [
  "the_invite_seal_sc",
  "noise_paper",
  "rough_paper",
  "COVER",
  "IMG_TRANSITION_ONE",
  "256A6935", // Center Image
  "256A6761", // Right Image
  "256A7100", // Left Image
  "256A6887",
  "256A6912",
  "256A6944",
  "256A6954",
  "256A7028",
  "256A7083",
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

// Inject image URLs into CSS custom properties for SCSS usage
export const injectImageUrlsToCSS = (cache) => {
  const style = document.createElement("style");
  const rules = Object.entries(cache.urls)
    .map(([id, url]) => `--img-${id}: url('${url}');`)
    .join("\n");
  style.innerText = `:root { ${rules} }`;
  document.head.appendChild(style);
};

export function App({ data }) {
  const [loaded, setLoaded] = useState(false);
  const [isTop, setIsTop] = useState(false); // State to toggle the 'top' class
  const [progress, setProgress] = useState(0); // State to track loading progress percentage

  // Handler to toggle the 'top' class on click
  const handleSealClick = () => {
    setIsTop((prev) => !prev);
  };

  useEffect(() => {
    const loadCriticalImages = async () => {
      await preloadImages(
        CRITICAL_IMAGES,
        GLOBAL_IMAGE_CACHE,
        (loaded, total) => {
          const percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        },
      );
      injectImageUrlsToCSS(GLOBAL_IMAGE_CACHE); // Expose URLs to CSS
      setLoaded(true);
    };
    loadCriticalImages();
  }, []);

  // Calculate transform for the dot based on progress (assuming bar width is 200px, dot width is 20px)
  const dotPosition = (progress / 100) * 180; // Adjust 180 based on bar width - dot width

  return (
    <div id="root" class={`${isTop ? "default" : ""}`}>
      {!loaded ? (
        <Preloader progress={progress} dotPosition={dotPosition} />
      ) : (
        <>
          <SectionEnvelope
            isTop={isTop}
            data={data}
            handleSealClick={handleSealClick}
          />

          <SectionMain isTop={isTop} handleSealClick={handleSealClick} />
        </>
      )}
    </div>
  );
}

if (typeof window !== "undefined") {
  const query = new URLSearchParams(window.location.search);
  const family = query.get("family");
  const result = data[family];
  hydrate(<App data={result} />, document.getElementById("app"));
}

export async function prerender({ url }) {
  const query = new URLSearchParams(url.split("?")[1] || "");
  const family = query.get("family");
  const result = data[family];

  return await ssr(<App data={result} />);
}
