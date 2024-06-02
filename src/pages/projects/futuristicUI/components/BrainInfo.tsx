/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/brain/infoVertex.glsl";
import fragment from "../shaders/brain/infoFragment.glsl";
import { AdditiveBlending, Color, Uniform } from "three";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

export const BrainInfo = () => {
  const [controls, _] = useControls("Brain", () => ({
    backgroundColor: "#00fffd",
    borderColor: "#0ee4ff",
    dotsColor: "#00fffd",
  }));

  const uniforms = useMemo(
    () => ({
      uBorderColor: new Uniform(new Color(controls.borderColor)),
      uDotsColor: new Uniform(new Color(controls.dotsColor)),
      uBackgroundColor: new Uniform(new Color(controls.backgroundColor)),
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
    uniforms.uDotsColor.value = new Color(controls.dotsColor);
    uniforms.uBackgroundColor.value = new Color(controls.backgroundColor);
  }, [controls]);

  return (
    <>
      <mesh position={[-4.15, 1.02, 0.5]}>
        <planeGeometry args={[3.6, 3.2]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent={false} depthWrite={false} blending={AdditiveBlending} uniforms={uniforms} />
      </mesh>
    </>
  );
};
