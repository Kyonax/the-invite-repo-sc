import { h, VNode } from "preact";
import { useEffect, useState } from "preact/hooks";

// Cache structure for both VNode elements and raw URLs (for CSS)
export interface ImageCache {
  urls: Record<string, string>; // Best variant URL for CSS/SCSS
  elements: Record<string, VNode>; // Preact VNode for rendering
}

// Global image cache (single instance defined here)
export const GLOBAL_IMAGE_CACHE: ImageCache = { urls: {}, elements: {} };

interface ImageVariant {
  src: string;
  width: number;
}

const getDeviceWidth = (): number => {
  return typeof window !== "undefined" ? window.innerWidth : 1200;
};

const getBestVariant = (variants: ImageVariant[]): ImageVariant => {
  const deviceWidth = getDeviceWidth();
  const sorted = [...variants].sort((a, b) => a.width - b.width);
  const bestFit = sorted.find((v) => v.width >= deviceWidth);
  return bestFit || sorted[sorted.length - 1];
};

export const preloadImages = async (
  imageIds: string[],
  cache: ImageCache = GLOBAL_IMAGE_CACHE, // Default to global cache
): Promise<void> => {
  if (!imageIds.length) return;

  const imagesContext = import.meta.glob(
    "/src/assets/app/**/*.{png,jpg,jpeg,gif,webp}",
    { as: "url", eager: true },
  );

  const imagePaths = Object.keys(imagesContext);
  const variants: Record<string, ImageVariant[]> = {};

  // Build variants map
  imagePaths.forEach((path) => {
    const match = path.match(/(\w+)-(\d+)\.\w+$/);
    if (match) {
      const [, name, width] = match;
      variants[name] = variants[name] || [];
      variants[name].push({
        src: imagesContext[path] as string,
        width: parseInt(width),
      });
    } else {
      const nameMatch = path.match(/(\w+)\.\w+$/);
      if (nameMatch) {
        const name = nameMatch[1];
        variants[name] = variants[name] || [];
        variants[name].push({
          src: imagesContext[path] as string,
          width: 0,
        });
      }
    }
  });

  // Preload only requested images
  for (const id of imageIds) {
    if (!variants[id] || cache.urls[id]) continue; // Skip if already cached
    const variantList = variants[id];
    const bestVariant = getBestVariant(variantList);

    // Store best URL for CSS usage
    cache.urls[id] = bestVariant.src;

    // Preload image
    const img = new Image();
    img.src = bestVariant.src;
    await new Promise((resolve) => (img.onload = resolve));

    // Build and cache the <picture> element
    const widthVariants = variantList.filter((v) => v.width > 0);
    const fallbackSrc = widthVariants.length
      ? widthVariants[widthVariants.length - 1].src
      : bestVariant.src;

    cache.elements[id] = (
      <picture id={id}>
        {widthVariants.length > 0 && (
          <>
            <source
              type="image/webp"
              srcSet={widthVariants
                .map((v) => `${v.src.replace(/\.\w+$/, ".webp")} ${v.width}w`)
                .join(", ")}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <source
              type={getMimeType(fallbackSrc)}
              srcSet={widthVariants
                .map((v) => `${v.src} ${v.width}w`)
                .join(", ")}
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </>
        )}
        <img src={fallbackSrc} alt={id} loading="eager" decoding="sync" />
      </picture>
    );
  }
};

const getMimeType = (path: string): string => {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    default:
      return "image/*";
  }
};

// Hook for accessing cached image
export const useImage = (
  id: string,
  cache: ImageCache = GLOBAL_IMAGE_CACHE, // Default to global cache
): [boolean, VNode | null, string] => {
  const [isLoaded, setIsLoaded] = useState(!!cache.elements[id]);

  useEffect(() => {
    if (!cache.elements[id]) {
      preloadImages([id], cache).then(() => setIsLoaded(true));
    }
  }, [id]);

  return [isLoaded, cache.elements[id] || null, cache.urls[id] || ""];
};
