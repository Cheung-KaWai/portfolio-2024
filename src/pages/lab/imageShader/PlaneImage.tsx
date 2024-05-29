/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "@shaders/imageShader/vertex.glsl";
import fragment from "@shaders/imageShader/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Uniform, Vector2 } from "three";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";

export const PlaneImage = () => {
  const tower = useTexture("/tower.png");
  const { viewport } = useThree();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [arg, _set] = useControls(() => ({
    width: {
      value: 5,
      min: 1,
      max: 10,
      step: 1,
    },
    height: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    progress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
  }));

  const planeArgs = new Vector2(arg.width, arg.height);

  useEffect(() => {
    uniforms.uPlaneAspect.value = planeArgs;
    uniforms.uProgress.value = arg.progress;
  }, [arg]);

  const uniforms = useMemo(
    () => ({
      uViewport: new Uniform(new Vector2(viewport.width, viewport.height)),
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
