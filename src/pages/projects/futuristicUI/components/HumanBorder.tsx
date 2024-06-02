/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/human/borderVertex.glsl";
import fragment from "../shaders/human/borderFragment.glsl";
import { AdditiveBlending, Color, Uniform } from "three";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export const HumanBorder = () => {
  const [controls, _] = useControls("Human", () => ({
    borderColor: "#00ffbc",
  }));

  const uniforms = useMemo(
    () => ({
      uBorderColor: new Uniform(new Color(controls.borderColor)),
      uTime: new Uniform(0),
      uShow: new Uniform(0),
      uProgress: new Uniform(0),
    }),
    []
  );

  useEffect(() => {
    gsap.to(uniforms.uShow, {
      value: 1,
      delay: 9,
      duration: 2,
    });
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  useEffect(() => {
    uniforms.uBorderColor.value = new Color(controls.borderColor);
  }, [controls]);

  return (
    <mesh position={[0, -0.25, 1.8]}>
      <planeGeometry args={[3.5, 5.25]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent={true} uniforms={uniforms} depthWrite={false} blending={AdditiveBlending} />
    </mesh>
  );
};
