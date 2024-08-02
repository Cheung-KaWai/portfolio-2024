import { useState } from "react";
import { useImages } from "../../hooks/useImages";
import { useLenis } from "lenis/react";
import { PlaneImage } from "./PlaneImage";
import { Vector2 } from "three";

export const PlaneImages = () => {
  const { meshes, images } = useImages();
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [initPosition, _] = useState(window.scrollY);

  useLenis(({ scroll, velocity }) => {
    setScrollY(scroll);
    setScrollVelocity(velocity);
  });

  return (
    <>
      {meshes?.map((media, index) => (
        <PlaneImage
          key={index}
          scale={[media.width, media.height, 1]}
          position={[media.left - window.innerWidth / 2 + media.width / 2, -media.top + window.innerHeight / 2 - media.height / 2 - initPosition + scrollY, 0]}
          textureSize={new Vector2(images![index].naturalWidth, images![index].naturalHeight)}
          quadSize={new Vector2(media.width, media.height)}
          textureSource={media.src}
          scrollVelocity={scrollVelocity}
        />
      ))}
    </>
  );
};
