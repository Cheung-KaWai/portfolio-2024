/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/magic-circle/vertex.glsl";
import fragment from "../shaders/magic-circle/fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Color, Mesh, MeshBasicMaterial, Uniform } from "three";
import { useControls } from "leva";
import { useDebug } from "@hooks/useDebug";
import ThreeCustomShaderMaterial from "three-custom-shader-material";

export const MagicCircle = () => {
  useDebug();
  const ref = useRef<Mesh>(null);

  const water = useTexture("/3-magic-summoning-circles/water.png");

  const controls = useControls({
    progess: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
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

  const uniforms = useMemo(
    () => ({
      uWater: new Uniform(water),
      uProgress: new Uniform(controls.progess),
    }),
    []
  );

  useEffect(() => {
    uniforms.uProgress.value = controls.progess;
  }, [controls]);

  return (
    <mesh rotation-x={-Math.PI / 2} ref={ref}>
      <planeGeometry args={[10, 10]} />
      <ThreeCustomShaderMaterial baseMaterial={MeshBasicMaterial} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent silent color={new Color(controls.r, controls.g, controls.b)} />
    </mesh>
  );
};
