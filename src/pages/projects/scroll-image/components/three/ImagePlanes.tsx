import { useImages } from "../hooks/useImages";

export const ImagePlanes = () => {
  const { meshes } = useImages();

  return (
    <>
      {meshes?.map((media, index) => (
        <mesh key={index} scale={[media.width, media.height, 1]} position={[media.left - window.innerWidth / 2 + media.width / 2, -media.top + window.innerHeight / 2 - media.height / 2, 0]}>
          <planeGeometry args={[1, 1, 100, 100]} />
          <shaderMaterial />
        </mesh>
      ))}
    </>
  );
};
