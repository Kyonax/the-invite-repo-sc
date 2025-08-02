import { hydrate, prerender as ssr } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { preloadImages, GLOBAL_IMAGE_CACHE } from "./util/preload-images.util";
import { setupFadeInOnScroll } from "./util/setup-fade-in.util";

import Preloader from "./component/Preloader";
import SectionEnvelope from "./component/SectionEnvelope";
import SectionMain from "./component/SectionMain";

import data from "./data/families-invited.json";
import "./styles/main.scss";
import MusicPlayer from "./component/MusicPlayer";
import ReloadButton from "./component/ReloadButton";

// List of critical images to preload
const CRITICAL_IMAGES = [
  "the_invite_seal_sc",
  "noise_paper",
  "rough_paper",
  "COVER",
  "IMG_TRANSITION_ONE",
  "OLIVE_DECO_DOWN_LEFT",
  "256A6935",
  "256A6761",
  "256A7100",
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

// ✅ FIX: Encode image URLs before using in CSS
export const injectImageUrlsToCSS = (cache) => {
  const style = document.createElement("style");

  const rules = Object.entries(cache.urls)
    .filter(([_, url]) => typeof url === "string" && url.length > 0)
    .map(([id, url]) => {
      // Encode characters that may break CSS
      const safeUrl = encodeURI(url).replace(/'/g, "\\'");
      return `--img-${id}: url('${safeUrl}');`;
    })
    .join("\n");

  style.innerText = `:root {\n${rules}\n}`;
  document.head.appendChild(style);
};

export function App({ data }) {
  const [loaded, setLoaded] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSealClick = () => {
    setIsTop((prev) => !prev);
  };

  useEffect(() => {
    setupFadeInOnScroll();
  }, []);

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

      injectImageUrlsToCSS(GLOBAL_IMAGE_CACHE); // ✅ Safe inject
      setLoaded(true);
    };

    loadCriticalImages();
  }, []);

  const dotPosition = (progress / 100) * 180;

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
          <div class={`main-reload ${isTop ? "visible" : ""}`}>
            <MusicPlayer />
            <ReloadButton />
          </div>
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
