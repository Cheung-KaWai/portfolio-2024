import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from "three";

import vertex from "@shaders/futuristicUI/heart/vertex.glsl";
import fragment from "@shaders/futuristicUI/heart/fragment.glsl";
import vertex2 from "@shaders/futuristicUI/heart/borderVertex.glsl";
import fragment2 from "@shaders/futuristicUI/heart/borderFragment.glsl";
import { useControls } from "leva";
import styled from "styled-components";

export const Heart = () => {
  const { scene } = useGLTF("/heart.glb");

  const [controls, _] = useControls("Heart", () => ({
    heartColor: "#0ee4ff",
    fallOff: 0.9,
    fresnelPower: 3,
    fresnelAmount: 1,
    borderColor: "#0ee4ff",
    borderColor2: "#00fffd",
  }));

  const uniforms = useMemo(
    () => ({
      uColor: new Uniform(new Color(controls.heartColor)),
      uFalloff: new Uniform(controls.fallOff),
      uFresnelPower: new Uniform(controls.fresnelPower),
      uFresnelAmount: new Uniform(controls.fresnelAmount),
      uBorderColor: new Uniform(new Color(controls.borderColor)),
      uBorderColor2: new Uniform(new Color(controls.borderColor2)),
    }),
    []
  );

  useEffect(() => {
    uniforms.uColor.value = new Color(controls.heartColor);
    uniforms.uFalloff.value = controls.fallOff;
    uniforms.uFresnelPower.value = controls.fresnelPower;
    uniforms.uFresnelAmount.value = controls.fresnelAmount;
    uniforms.uBorderColor.value = new Color(controls.borderColor);
    uniforms.uBorderColor2.value = new Color(controls.borderColor2);
  }, [controls]);

  const material = useMemo(() => new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, transparent: true, side: DoubleSide, depthWrite: false, blending: AdditiveBlending, uniforms: uniforms }), []);

  useLayoutEffect(() => {
    if (scene.children[0]) {
      // @ts-ignore
      scene.children[0].material = material;
    }
  }, []);

  useFrame(() => {
    scene.children[0].rotation.y -= 0.005;
  });

  return (
    <>
      <primitive object={scene} scale={3.5} position={[2.05, -4.95, -0.2]} />;
      <Html transform position={[4.23, 0.1, 0.5]}>
        <Label $opacity={1}>&nbsp;cor&nbsp;</Label>
      </Html>
      <mesh position={[4.23, -1.3, 0.5]}>
        <planeGeometry args={[3.5, 3.5]} />
        <shaderMaterial vertexShader={vertex2} fragmentShader={fragment2} transparent={true} uniforms={uniforms} />
      </mesh>
    </>
  );
};

const Label = styled.p<{ $opacity: number }>`
  text-transform: uppercase;
  display: inline-block;
  white-space: nowrap;
  font-size: 0.8rem;
  opacity: ${(props) => props.$opacity};
  transition: opacity 0.3s ease-out;
`;
