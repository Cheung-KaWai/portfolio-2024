import vertex from "@shaders/futuristicUI/brain/infoVertex.glsl";
import fragment from "@shaders/futuristicUI/brain/infoFragment.glsl";
import { AdditiveBlending, Color, Uniform } from "three";
import { useControls } from "leva";
import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
// import { Html } from "@react-three/drei";
// import styled from "styled-components";

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
      {/* <Html position={[-5.5, 2.3, 0.5]} transform rotation={[0, 0, Math.PI / 4.35]}>
        <Label $opacity={1}>&nbsp;cerebrum&nbsp;</Label>
      </Html> */}
      <mesh position={[-4.15, 1.02, 0.5]}>
        <planeGeometry args={[3.6, 3.2]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} transparent={false} depthWrite={false} blending={AdditiveBlending} uniforms={uniforms} />
      </mesh>
    </>
  );
};

// const Label = styled.p<{ $opacity: number }>`
//   text-transform: uppercase;
//   display: inline-block;
//   white-space: nowrap;
//   font-size: 0.8rem;
//   opacity: ${(props) => props.$opacity};
//   transition: opacity 0.3s ease-out;
// `;
