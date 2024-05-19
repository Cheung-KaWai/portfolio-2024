import vertex from "@shaders/futuristicUI/heartRate/vertex.glsl";
import fragemt from "@shaders/futuristicUI/heartRate/fragment.glsl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Uniform, Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import styled from "styled-components";

export const HeartRate = () => {
  const labelRef = useRef(null);
  const [show, setShow] = useState(0);

  const [controls, _] = useControls("Heart rate", () => ({
    cornersColor: "#0ee4ff",
    gridColor: "#4acec9",
    backgroundColor: "#15092a",
    heartRateColor: "#00fffd",
  }));

  const uniforms = useMemo(
    () => ({
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uAspect: new Uniform(new Vector2(3.5, 2)),
      uTime: new Uniform(0),
      uCornerColor: new Uniform(new Color(controls.cornersColor)),
      uGridColors: new Uniform(new Color(controls.gridColor)),
      uBackgroundColor: new Uniform(new Color(controls.backgroundColor)),
      uHeartRateColor: new Uniform(new Color(controls.heartRateColor)),
      uShow: new Uniform(0),
    }),
    []
  );

  useEffect(() => {
    uniforms.uCornerColor.value = new Color(controls.cornersColor);
    uniforms.uGridColors.value = new Color(controls.gridColor);
    uniforms.uBackgroundColor.value = new Color(controls.backgroundColor);
    uniforms.uHeartRateColor.value = new Color(controls.heartRateColor);
  }, [controls]);

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value = new Vector2(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    gsap.to(uniforms.uShow, {
      value: 1,
      delay: 9,
      duration: 3,
      onStart: () => {
        setShow(1);
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group position={[0.25, 0, 0]}>
      <Html position={[2.59, 3.0, 0.5]} transform>
        <Label $opacity={show} ref={labelRef}>
          &nbsp;pulsatio&nbsp;
        </Label>
      </Html>
      <Html position={[5.595, 3, 0.5]} transform>
        <Label $opacity={show} ref={labelRef}>
          &nbsp;60&nbsp;
        </Label>
      </Html>
      <mesh position={[3.975, 1.8, 0.5]}>
        <planeGeometry args={[3.5, 2]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragemt} uniforms={uniforms} transparent={true} />
      </mesh>
    </group>
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
