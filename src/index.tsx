import { hydrate, prerender as ssr } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { preloadImages, GLOBAL_IMAGE_CACHE } from "./util/preload-images.util";
import { preloadFonts } from "./util/preload-fonts.util";
import { preloadMedia, getMediaFileCount } from "./util/preload-media.util";
import { setupFadeInOnScroll } from "./util/setup-fade-in.util";

import Preloader from "./component/Preloader";
import SectionEnvelope from "./component/SectionEnvelope";
import SectionMain from "./component/SectionMain";
import MusicPlayer from "./component/MusicPlayer";
import ReloadButton from "./component/ReloadButton";

import data from "./data/families-invited.json";
import "./styles/main.scss";

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

export const injectImageUrlsToCSS = (cache) => {
  const style = document.createElement("style");

  const rules = Object.entries(cache.urls)
    .filter(([_, url]) => typeof url === "string" && url.length > 0)
    .map(([id, url]) => {
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
  const [totalAssets, setTotalAssets] = useState(null);

  const handleSealClick = () => {
    setIsTop((prev) => !prev);
  };

  useEffect(() => {
    setupFadeInOnScroll();
  }, []);

  useEffect(() => {
    const loadCriticalAssets = async () => {
      const mediaCount = await getMediaFileCount();
      const TOTAL_ASSETS =
        CRITICAL_IMAGES.length + 2 /* font files */ + mediaCount;
      setTotalAssets(TOTAL_ASSETS);

      await preloadImages(
        CRITICAL_IMAGES,
        GLOBAL_IMAGE_CACHE,
        (loaded, total) => {
          const percentage = Math.round(((loaded + 0) / TOTAL_ASSETS) * 100);
          setProgress(percentage);
        },
      );

      await preloadFonts(() => {
        setProgress((prev) => Math.min(100, prev + (1 / TOTAL_ASSETS) * 100));
      });

      await preloadMedia(() => {
        setProgress((prev) => Math.min(100, prev + (1 / TOTAL_ASSETS) * 100));
      });

      injectImageUrlsToCSS(GLOBAL_IMAGE_CACHE);
      setLoaded(true);
    };

    loadCriticalAssets();
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
          <MusicPlayer />
          <div class={`main-reload ${isTop ? "visible" : ""}`}>
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
