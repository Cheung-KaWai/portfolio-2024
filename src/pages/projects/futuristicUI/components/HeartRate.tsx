/* eslint-disable react-hooks/exhaustive-deps */
import vertex from "../shaders/heartRate/vertex.glsl";
import fragemt from "../shaders/heartRate/fragment.glsl";
import { useEffect, useMemo, useState } from "react";
import { Color, Uniform, Vector2 } from "three";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import gsap from "gsap";

export const HeartRate = () => {
  const [_show, setShow] = useState(0);

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
      duration: 2,
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
    <group position={[0.25, -0.1, 0]}>
      <mesh position={[3.975, 1.8, 0.5]}>
        <planeGeometry args={[3.5, 2]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragemt} uniforms={uniforms} transparent={true} />
      </mesh>
    </group>
  );
};
