import { hydrate, prerender as ssr } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { Handwritten } from "./component/Handwritten";
import BlastImage from "./component/BlastImage";
import { preloadImages, GLOBAL_IMAGE_CACHE } from "./util/preload-images.util";
import data from "./data/families-invited.json";
import "./styles/main.scss";

const FALLBACK_TEXT = "Familia Moreno Cruz";
const FALLBACK_RESERVED = 1;

// List of critical images to preload
const CRITICAL_IMAGES = ["the_invite_seal_sc", "noise_paper", "rough_paper"];

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

  // Handler to toggle the 'top' class on click
  const handleSealClick = () => {
    setIsTop((prev) => !prev);
  };

  useEffect(() => {
    const loadCriticalImages = async () => {
      await preloadImages(CRITICAL_IMAGES, GLOBAL_IMAGE_CACHE);
      injectImageUrlsToCSS(GLOBAL_IMAGE_CACHE); // Expose URLs to CSS
      setLoaded(true);
    };
    loadCriticalImages();
  }, []);

  return (
    <div id="root">
      {!loaded ? (
        <div class="preloader-screen">
          <div class="preloader-animation"></div>
          <p>Preparando tu invitación...</p>
        </div>
      ) : (
        <>
          <section className={`loader ${isTop ? "hidden" : ""}`}>
            <div class="loader__texture"></div>
            <div class="loader__texture-second"></div>
            <div class="loader__light"></div>
            <div class="loader__container">
              <div class="container-triangle"></div>
              <Handwritten
                text={data?.text || FALLBACK_TEXT}
                fontSize={100}
                letterDelay={0.22}
              />
            </div>
            <div class="seal">
              <div class="seal__triangle"></div>
              <a href="#" class="circular-text">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </defs>
                  <text font-size="currentFontSize" fill="currentColor">
                    <textPath href="#circlePath" startOffset="0">
                      Click Aquí - Click Aquí
                    </textPath>
                  </text>
                </svg>
              </a>
              <BlastImage
                img="the_invite_seal_sc"
                className="seal-image"
                alt="The Invite Seal - S&C"
                fetchpriority="high"
                onClick={handleSealClick} // Add click handler here
              />
            </div>
            <div class="double_border"></div>
            <div class="deep_border"></div>

            <div class="card-reserved">
              <p>
                Hemos reservado {data?.reserved || FALLBACK_RESERVED} lugar(es){" "}
                {data?.baby ? " + bebé" : ""} en su honor.
              </p>
            </div>
          </section>
          <section className={`main ${isTop ? "top" : ""}`}>
            <span>Section #1</span>
          </section>
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
