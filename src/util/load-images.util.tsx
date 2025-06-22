// utils/load-images.util.ts
import { h, VNode } from "preact";
import { useEffect, useState } from "preact/hooks";
import { ERROR_MSG } from "@/constants/Error";

type ImageVariant = {
  src: string;
  width: number;
};

type PictureCache = {
  [key: string]: VNode;
};

let picture_cache: PictureCache | null = null;
let variants_cache: Record<string, ImageVariant[]> = {};
const loadedImages: Record<string, boolean> = {};
const preloadSet: Set<string> = new Set();

// Get device width for variant selection
const getDeviceWidth = (): number => {
  return typeof window !== "undefined" ? window.innerWidth : 1200; // Default desktop size
};

// Find best variant based on device width
const getBestVariant = (variants: ImageVariant[]): ImageVariant => {
  const deviceWidth = getDeviceWidth();
  const sorted = [...variants].sort((a, b) => a.width - b.width);

  // Find smallest variant larger than device width
  const bestFit = sorted.find((v) => v.width >= deviceWidth);

  // Return best fit or largest available
  return bestFit || sorted[sorted.length - 1];
};

export const load_images = (
  neededImageIds: string[] = [],
): Promise<PictureCache> => {
  return new Promise((resolve) => {
    if (picture_cache) {
      console.log("ƛ :: IMAGE CACHE SUCCESSFULLY LOADED - ", picture_cache);
      return resolve(picture_cache);
    }

    const images_context = import.meta.glob(
      "/src/assets/app/**/*.{png,jpg,jpeg,gif,webp}",
      { as: "url", eager: true },
    );

    const image_paths = Object.keys(images_context);
    const variants: typeof variants_cache = {};

    // Process all images
    image_paths.forEach((path) => {
      const match = path.match(/(\w+)-(\d+)\.\w+$/);
      if (match) {
        const [, name, width] = match;
        variants[name] = variants[name] || [];
        variants[name].push({
          src: images_context[path] as string,
          width: parseInt(width),
        });
      } else {
        // Handle non-variant images
        const name_match = path.match(/(\w+)\.\w+$/);
        if (name_match) {
          const name = name_match[1];
          variants[name] = variants[name] || [];
          variants[name].push({
            src: images_context[path] as string,
            width: 0, // Flag as base image
          });
        }
      }
    });

    variants_cache = variants;

    // Preload only needed images
    neededImageIds.forEach((image_id) => {
      if (!variants[image_id] || preloadSet.has(image_id)) return;
      preloadSet.add(image_id);

      const variantsList = variants[image_id];
      const bestVariant = getBestVariant(
        variantsList.filter((v) => v.width > 0),
      );

      // Preload best variant and its WebP version
      const img = new Image();
      img.src = bestVariant.src;
    });

    // Generate picture cache for all images
    picture_cache = generatePictureCache(variants);
    resolve(picture_cache);
  });
};

function generatePictureCache(
  variants: Record<string, ImageVariant[]>,
): PictureCache {
  const cache: PictureCache = {};

  Object.entries(variants).forEach(([image_id, variantList]) => {
    // Filter out base images (width=0)
    const widthVariants = variantList.filter((v) => v.width > 0);
    const baseImage = variantList.find((v) => v.width === 0);

    // Use base image if no variants found
    if (widthVariants.length === 0 && baseImage) {
      cache[image_id] = (
        <picture id={image_id}>
          <source type="image/webp" srcSet={baseImage.src} />
          <img
            src={baseImage.src}
            alt={image_id}
            loading="lazy"
            decoding="async"
            onLoad={() => (loadedImages[image_id] = true)}
          />
        </picture>
      );
      return;
    }

    // Sort variants by width
    widthVariants.sort((a, b) => a.width - b.width);

    const webp_srcset = widthVariants
      .map((v) => `${v.src.replace(/\.\w+$/, ".webp")} ${v.width}w`)
      .join(", ");

    const fallback_srcset = widthVariants
      .map((v) => `${v.src} ${v.width}w`)
      .join(", ");

    // Use largest variant as fallback
    const fallback_src = widthVariants[widthVariants.length - 1].src;

    cache[image_id] = (
      <picture id={image_id}>
        <source
          type="image/webp"
          srcSet={webp_srcset}
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <source
          type={getMimeType(fallback_src)}
          srcSet={fallback_srcset}
          sizes="(max-width: 800px) 100vw, 50vw"
        />
        <img
          src={fallback_src}
          alt={image_id}
          loading="lazy"
          decoding="async"
          onLoad={() => (loadedImages[image_id] = true)}
        />
      </picture>
    );
  });

  return cache;
}

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

export const get_image_by_id = (id: string): VNode | null => {
  if (!picture_cache) {
    console.warn(ERROR_MSG.IMGs_NOT_LOADED_YET);
    try {
      // Initialize cache if needed
      load_images([id]);
    } catch (error) {
      console.error(ERROR_MSG.IMG_NAME_NOT_FOUND(id));
      return null;
    }
  }

  return picture_cache?.[id] || null;
};

export const useImagePreloader = (ids: string[]) => {
  useEffect(() => {
    load_images(ids);
  }, [JSON.stringify(ids)]);
};

export const useCachedImage = (id: string): VNode | null => {
  const [image, setImage] = useState<VNode | null>(null);

  useEffect(() => {
    const cachedImage = get_image_by_id(id);
    if (cachedImage) setImage(cachedImage);
  }, [id]);

  return image;
};

export const useImageLoaded = (id: string): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadedImages[id]) return setIsLoaded(true);
    if (picture_cache?.[id]) return setIsLoaded(true);

    const interval = setInterval(() => {
      if (loadedImages[id] || picture_cache?.[id]) {
        setIsLoaded(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [id]);

  return isLoaded;
};

export const useImage = (id: string): [boolean, VNode | null] => {
  const isLoaded = useImageLoaded(id);
  const image = useCachedImage(id);

  return [isLoaded, image];
};

// Track all loaded images
export const allImagesLoaded = (ids: string[]): boolean => {
  return ids.every((id) => loadedImages[id] || picture_cache?.[id]);
};
