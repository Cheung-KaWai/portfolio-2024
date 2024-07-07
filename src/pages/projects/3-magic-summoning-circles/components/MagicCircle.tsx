/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/magic-circle/vertex.glsl";
import fragment from "../shaders/magic-circle/fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Color, MeshBasicMaterial, Uniform } from "three";
import { useControls } from "leva";
import { useDebug } from "@hooks/useDebug";
import ThreeCustomShaderMaterial from "three-custom-shader-material";

export const MagicCircle = () => {
  useDebug();
  const water = useTexture("/3-magic-summoning-circles/water.png");

  const uniforms = useMemo(
    () => ({
      uWater: new Uniform(water),
      uColor: new Uniform(new Color("#1383a3")),
    }),
    []
  );

  const controls = useControls({
    r: {
      value: 1,
      min: 0,
      max: 20,
      step: 0.1,
    },
    g: {
      value: 5,
      min: 0,
      max: 20,
      step: 0.1,
    },
    b: {
      value: 10,
      min: 0,
      max: 20,
      step: 0.1,
    },
  });

  useEffect(() => {}, [controls]);

  return (
    <>
      {/* <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh> */}
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 10]} />
        <ThreeCustomShaderMaterial baseMaterial={MeshBasicMaterial} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent silent color={new Color(controls.r, controls.g, controls.b)} />
      </mesh>
    </>
  );
};
