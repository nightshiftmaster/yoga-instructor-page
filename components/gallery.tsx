import fs from "fs";
import path from "path";
import Gallery from "@/components/galleryClient";

const imagesDirectory = path.join(process.cwd(), "public/images");
const filenames = fs.readdirSync(imagesDirectory);
const imagePaths = filenames.map((name) => `/images/${name}`); // не забудь кавычки

const images = imagePaths.map((imagePath, i) => {
  return { src: imagePath, alt: `Yoga practice ${i + 1}` };
});

export default function GalleryPage() {
  console.log("ssss");
  return <Gallery galleryImages={images} />;
}
