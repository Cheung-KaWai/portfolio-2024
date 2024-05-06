import vertex from "@shaders/futuristicUI/humanGroundFloor/vertex.glsl";
import fragment from "@shaders/futuristicUI/humanGroundFloor/fragment.glsl";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Color, Mesh, Uniform, Vector2 } from "three";
import { useControls } from "leva";

const defaultsetting = {
  circleColor1: "#c2ffff",
  circleColor2: "#000000",
};

export const HumanGroundFloor = () => {
  const { clock } = useThree();
  const planeRef = useRef<Mesh | null>(null);

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uCircleColor1: new Uniform(new Color(defaultsetting.circleColor1)),
      uCircleColor2: new Uniform(new Color(defaultsetting.circleColor2)),
    }),
    []
  );

  const [controls, _set] = useControls("Ground pattern", () => ({
    uCircleColor1: defaultsetting.circleColor1,
    uCircleColor2: defaultsetting.circleColor2,
  }));

  useEffect(() => {
    uniforms.uCircleColor1.value = new Color(controls.uCircleColor1);
    uniforms.uCircleColor2.value = new Color(controls.uCircleColor2);
  }, [controls]);

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
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent={true} uniforms={uniforms} blending={AdditiveBlending} />
    </mesh>
  );
};
