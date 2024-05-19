import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from "three";

import vertex from "@shaders/futuristicUI/heart/vertex.glsl";
import fragment from "@shaders/futuristicUI/heart/fragment.glsl";
import vertex2 from "@shaders/futuristicUI/heart/borderVertex.glsl";
import fragment2 from "@shaders/futuristicUI/heart/borderFragment.glsl";
import { useControls } from "leva";
import styled from "styled-components";
import gsap from "gsap";

export const Heart = () => {
  const { scene } = useGLTF("/heart.glb");
  const [show, setShow] = useState(0);

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
      uTime: new Uniform(0),
      uShow: new Uniform(0),
      uProgress: new Uniform(0),
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

    gsap.to(uniforms.uShow, {
      value: 1,
      delay: 9,
      duration: 2,
      onStart: () => {
        setShow(1);
      },
    });
    gsap.to(uniforms.uProgress, {
      value: 1,
      delay: 9,
      duration: 3,
    });
  }, []);

  useFrame(({ clock }) => {
    scene.children[0].rotation.y -= 0.003;
    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <>
      <primitive object={scene} scale={4.7} position={[3, -6.75, -2.2]} />;
      <Html transform position={[4.23, 0.1, 0.5]}>
        <Label $opacity={show}>&nbsp;cor&nbsp;</Label>
      </Html>
      <mesh position={[4.23, -1.3, 0.5]}>
        <planeGeometry args={[3.5, 3.5]} />
        <shaderMaterial vertexShader={vertex2} fragmentShader={fragment2} transparent={true} uniforms={uniforms} />
      </mesh>
    </>
  );
};

const Label: any = styled.p<{ $opacity: number }>`
  text-transform: uppercase;
  display: inline-block;
  white-space: nowrap;
  font-size: 0.8rem;
  opacity: ${(props) => props.$opacity};
  transition: opacity 0.3s ease-out;
`;
