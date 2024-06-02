/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "@shaders/imageShader/vertex.glsl";
import fragment from "@shaders/imageShader/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Uniform, Vector2, Vector3 } from "three";
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
      max: 20,
      step: 1,
    },
    progress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    position: {
      value: [0, 0, -3],
    },
  }));

  const planeArgs = new Vector2(arg.width, arg.width / (viewport.width / viewport.height));

  useEffect(() => {
    uniforms.uViewport.value = new Vector2(viewport.width, viewport.height);
    uniforms.uPlaneAspect.value = planeArgs;
    uniforms.uProgress.value = arg.progress;
    uniforms.uMeshPosition.value = new Vector3(arg.position[0], arg.position[1], arg.position[2]);
  }, [arg]);

  const uniforms = useMemo(
    () => ({
      uViewport: new Uniform(new Vector2(viewport.width, viewport.height)),
      uImageResolution: new Uniform(new Vector2(1, 1)),
      uPlaneAspect: new Uniform(planeArgs),
      uTime: new Uniform(0),
      uProgress: new Uniform(0),
      uImage: new Uniform(tower),
      uMeshPosition: new Uniform(new Vector3(arg.position[0], arg.position[1], arg.position[2])),
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
    <mesh position={arg.position}>
      <planeGeometry args={[planeArgs.x, planeArgs.y, 128, 128]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
};
