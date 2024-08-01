import { useEffect, useState } from "react";

export const useImages = () => {
  const [images, setImages] = useState<Array<Element> | null>(null);
  const [meshes, setMeshes] = useState<DOMRect[] | null>(null);

  // get all html images
  useEffect(() => {
    const media = [...document.querySelectorAll("[data-webgl-media]")];

    const mediaStore = media.map((media, _) => {
      const bounds = media.getBoundingClientRect();
      return bounds;
    });

    setImages(media);
    setMeshes(mediaStore);
  }, []);

  return { images, meshes };
};
