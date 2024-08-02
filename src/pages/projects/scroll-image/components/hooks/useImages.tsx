import { useEffect, useState } from "react";

interface ImageData extends DOMRect {
  src: string;
}

export const useImages = () => {
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);
  const [meshes, setMeshes] = useState<ImageData[] | null>(null);

  // get all html images
  useEffect(() => {
    const setiImageInfo = () => {
      const media = [...document.querySelectorAll("[data-webgl-media]")];

      const mediaStore = media.map((media, _) => {
        const bounds = media.getBoundingClientRect() as ImageData;
        bounds.src = media.getAttribute("src")!;
        return bounds;
      });

      setImages(media as HTMLImageElement[]);
      setMeshes(mediaStore);
    };
    setiImageInfo();

    window.addEventListener("resize", setiImageInfo);

    return () => {
      window.removeEventListener("resize", setiImageInfo);
    };
  }, []);

  return { images, meshes };
};
