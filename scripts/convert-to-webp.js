import { promises as fs } from "fs";
import path from "path";
import fg from "fast-glob";
import sharp from "sharp";

const { join, extname, basename, dirname, relative } = path;

const SOURCE_DIR = "src/assets/convert";
const OUTPUT_DIR = "src/assets/app";

const files = await fg([`${SOURCE_DIR}/**/*.{jpg,jpeg,png}`]);

for (const file of files) {
  const relative_path = relative(SOURCE_DIR, file),
    output_file_name = basename(file, extname(file)) + ".webp",
    output_sub_dir = dirname(relative_path),
    output_dir_full_path = join(OUTPUT_DIR, output_sub_dir),
    output_path = join(output_dir_full_path, output_file_name);

  await fs.mkdir(output_dir_full_path, { recursive: true });

  const buffer = await sharp(file).webp({ quality: 70 }).toBuffer();

  await fs.writeFile(output_path, buffer);
  console.log("ƛ :: IMAGE SUCCESSFULLY WEBP CONVERTED - ", file);
}
