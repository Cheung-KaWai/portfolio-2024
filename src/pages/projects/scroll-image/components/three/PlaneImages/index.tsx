import { useState } from "react";
import { useImages } from "../../hooks/useImages";
import { useLenis } from "lenis/react";
import { PlaneImage } from "./PlaneImage";

export const PlaneImages = () => {
  const { meshes } = useImages();
  const [scrollY, setScrollY] = useState(0);
  const [initPosition, _] = useState(window.scrollY);

  useLenis(({ scroll, velocity }) => {
    setScrollY(scroll);
    console.log(velocity);
  });

  return (
    <>
      {meshes?.map((media, index) => (
        <PlaneImage key={index} scale={[media.width, media.height, 1]} position={[media.left - window.innerWidth / 2 + media.width / 2, -media.top + window.innerHeight / 2 - media.height / 2 - initPosition + scrollY, 0]} />
      ))}
    </>
  );
};
