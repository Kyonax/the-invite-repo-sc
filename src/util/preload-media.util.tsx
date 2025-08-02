const mediaImports = import.meta.glob("../assets/{music}/*.{mp3}", {
  eager: false,
});

export async function getMediaFileCount(): Promise<number> {
  return Object.keys(mediaImports).length;
}

export async function preloadMedia(
  onProgress?: (loaded: number, total: number) => void,
) {
  if (typeof window === "undefined") return;

  const importKeys = Object.keys(mediaImports);
  const total = importKeys.length;
  let loaded = 0;

  const promises = importKeys.map(async (key) => {
    const mod = await mediaImports[key]();
    const url = mod.default;

    const ext = url.split(".").pop()?.toLowerCase();
    const element =
      ext === "mp4" || ext === "mov"
        ? document.createElement("video")
        : document.createElement("audio");

    element.preload = "auto";
    element.src = url;

    return new Promise<void>((resolve) => {
      element.oncanplaythrough = () => {
        loaded++;
        onProgress?.(loaded, total);
        resolve();
      };
      element.onerror = () => {
        console.warn("Failed to preload media", url);
        loaded++;
        onProgress?.(loaded, total);
        resolve();
      };
    });
  });

  await Promise.all(promises);
}
