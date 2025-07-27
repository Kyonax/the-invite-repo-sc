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
  onProgress?: (loaded: number, total: number) => void, // Add progress callback
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

  // Track loading progress
  let loadedCount = 0;
  const totalCount = imageIds.length;

  // Preload only requested images
  const imagePromises = imageIds.map((id) => {
    if (!variants[id] || cache.urls[id]) {
      loadedCount++;
      if (onProgress) onProgress(loadedCount, totalCount);
      return Promise.resolve(); // Skip if already cached or not found
    }

    const variantList = variants[id];
    const bestVariant = getBestVariant(variantList);

    // Store best URL for CSS usage
    cache.urls[id] = bestVariant.src;

    // Preload image
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = bestVariant.src;
      img.onload = () => {
        loadedCount++;
        if (onProgress) onProgress(loadedCount, totalCount);

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
                    .map(
                      (v) => `${v.src.replace(/\.\w+$/, ".webp")} ${v.width}w`,
                    )
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
        resolve();
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${id}`);
        loadedCount++;
        if (onProgress) onProgress(loadedCount, totalCount);
        resolve(); // Resolve even on error to continue
      };
    });
  });

  await Promise.all(imagePromises);
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
