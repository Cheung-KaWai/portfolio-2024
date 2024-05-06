import vertex from "@shaders/futuristicUI/humanGroundFloor/vertex.glsl";
import fragment from "@shaders/futuristicUI/humanGroundFloor/fragment.glsl";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Uniform, Vector2 } from "three";

export const HumanGroundFloor = () => {
  const { clock } = useThree();
  const planeRef = useRef<Mesh | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
    }),
    []
  );

  useLayoutEffect(() => {
    if (planeRef.current) {
      planeRef.current.geometry.computeBoundingBox();
      console.log(planeRef);
    }
  }, [planeRef.current]);

  useFrame(() => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, -1.5, 1.7]} rotation-x={-Math.PI / 2}>
      {/* <mesh position={[0, 0, 3]} ref={planeRef}> */}
      <planeGeometry args={[3, 3]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent={true} uniforms={uniforms} />
    </mesh>
  );
};
