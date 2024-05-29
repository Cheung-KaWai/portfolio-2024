/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "@shaders/imageShader/vertex.glsl";
import fragment from "@shaders/imageShader/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Uniform, Vector2 } from "three";
import { useTexture } from "@react-three/drei";

export const PlaneImage = () => {
  const tower = useTexture("/tower.png");
  const planeArgs = new Vector2(2, 10);

  const uniforms = useMemo(
    () => ({
      uImageResolution: new Uniform(new Vector2(1, 1)),
      uPlaneAspect: new Uniform(planeArgs),
      uTime: new Uniform(0),
      uProgress: new Uniform(0),
      uImage: new Uniform(tower),
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  useEffect(() => {
    if (tower.image) {
      uniforms.uImageResolution.value = new Vector2(tower.image.width, tower.image.height);
    }
  }, [tower]);

  return (
    <mesh>
      <planeGeometry args={[planeArgs.x, planeArgs.y]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
};
