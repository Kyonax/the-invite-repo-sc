const fontImports = import.meta.glob("../assets/fonts/*.ttf", { eager: false });

const FONT_FAMILY_MAP: Record<string, string> = {
  Peristiwa: "Peristiwa.ttf",
  Astutely: "Astutely.ttf",
  DMSerif: "DMSerifDisplay-Regular.ttf",
  EBGaramond: "EBGaramond.ttf",
};

export async function preloadFonts(
  onProgress?: (loaded: number, total: number) => void,
) {
  let loaded = 0;
  const total = Object.keys(FONT_FAMILY_MAP).length;

  const promises = Object.entries(FONT_FAMILY_MAP).map(
    async ([family, filename]) => {
      // Find the import function by filename
      const importKey = Object.keys(fontImports).find((key) =>
        key.endsWith(filename),
      );

      if (!importKey) {
        console.warn(`Font file not found for ${family}`);
        return;
      }

      const fontModule = await fontImports[importKey]();
      const font = new FontFace(family, `url(${fontModule.default})`, {});
      await font.load();
      document.fonts.add(font);
      loaded++;
      onProgress?.(loaded, total);
    },
  );

  await Promise.all(promises);
}
