import { useState } from "react";
import { useImages } from "../hooks/useImages";
import { useLenis } from "lenis/react";

export const ImagePlanes = () => {
  const { meshes } = useImages();
  const [scrollY, setScrollY] = useState(0);

  useLenis(({ scroll }) => {
    setScrollY(scroll);
  });

  return (
    <>
      {meshes?.map((media, index) => {
        const plane = (
          <mesh key={index} scale={[media.width, media.height, 1]} position={[media.left - window.innerWidth / 2 + media.width / 2, -media.top + window.innerHeight / 2 - media.height / 2 + scrollY, 0]}>
            <planeGeometry args={[1, 1, 100, 100]} />
            <shaderMaterial />
          </mesh>
        );

        return plane;
      })}
    </>
  );
};
