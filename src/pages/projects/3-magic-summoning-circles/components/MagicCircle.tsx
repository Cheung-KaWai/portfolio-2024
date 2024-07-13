/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/magic-circle/vertex.glsl";
import fragment from "../shaders/magic-circle/fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Color, Mesh, MeshBasicMaterial, MeshStandardMaterial, Uniform } from "three";
import { useControls } from "leva";
import { useDebug } from "@hooks/useDebug";
import ThreeCustomShaderMaterial from "three-custom-shader-material";
import { useMagicData } from "../hooks/useMagicData";
import gsap from "gsap";
import { RigidBody } from "@react-three/rapier";

export const MagicCircle = () => {
  useDebug();
  const ref = useRef<Mesh>(null);
  const { outerCirclePath, centerCiclePath, innerCirclePath, activate, colors } = useMagicData();

  const outerImage = useTexture(outerCirclePath!);
  const innerImage = useTexture(innerCirclePath!);
  const centerImage = useTexture(centerCiclePath!);

  const controls = useControls({
    progess: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    r: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.1,
    },
    g: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.1,
    },
    b: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.1,
    },
  });

  const uniforms = useMemo(
    () => ({
      uOuterCircle: new Uniform(outerImage),
      uInnerCircle: new Uniform(innerImage),
      uCenterCircle: new Uniform(centerImage),
      uProgress: new Uniform(controls.progess),
    }),
    []
  );

  useEffect(() => {
    uniforms.uOuterCircle.value = outerImage;
    uniforms.uInnerCircle.value = innerImage;
    uniforms.uCenterCircle.value = centerImage;
  }, [outerImage, innerImage, centerImage]);

  useEffect(() => {
    if (ref.current?.material) {
      const material = ref.current.material as MeshStandardMaterial;
      if (activate) {
        gsap.to(material.color, { ...colors });
      } else {
        gsap.to(material.color, { r: 2, g: 2, b: 2 });
      }
    }
  }, [activate]);

  return (
    <RigidBody type="fixed">
      <mesh rotation-x={-Math.PI / 2} ref={ref}>
        <planeGeometry args={[20, 20]} />
        <ThreeCustomShaderMaterial baseMaterial={MeshBasicMaterial} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent silent color={new Color(controls.r, controls.g, controls.b)} />
      </mesh>
    </RigidBody>
  );
};
