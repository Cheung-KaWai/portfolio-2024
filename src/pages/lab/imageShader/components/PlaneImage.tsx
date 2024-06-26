/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, Uniform, Vector2, Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";

export const PlaneImage = () => {
  const tower = useTexture("/imageShader/tower.png");
  const { viewport } = useThree();
  const [expanded, setExpanded] = useState(false);
  const meshRef = useRef<Mesh>(null);

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
      uHover: new Uniform(0),
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
    <mesh
      position={arg.position}
      ref={meshRef}
      onPointerEnter={() => {
        if (!expanded) gsap.to(uniforms.uHover, { value: 1, duration: 0.5 });
      }}
      onPointerLeave={() => {
        gsap.to(uniforms.uHover, { value: 0, duration: 0.5 });
      }}
      onPointerDown={() => {
        gsap.to(uniforms.uHover, { value: 0, duration: 0.5 });
        gsap.to(uniforms.uProgress, {
          value: expanded ? 0 : 1,
          duration: 2,
          onComplete: () => {
            if (meshRef.current) meshRef.current.updateMatrixWorld();
          },
        });
        setExpanded((prev) => !prev);
      }}
    >
      <planeGeometry args={[planeArgs.x, planeArgs.y, 128, 128]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
};
