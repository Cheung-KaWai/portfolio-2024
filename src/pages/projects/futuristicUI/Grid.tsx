import { useThree } from "@react-three/fiber";
import fragmentShader from "@shaders/futuristicUI/background/fragment.glsl";
import vertexShader from "@shaders/futuristicUI/background/vertex.glsl";
import { useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import { Color, Mesh, Uniform, Vector2 } from "three";

const defaultsetting = {
  gridBackgroundColor: "#15092a",
  gridLinesColor: "#4a8d83",
  gridSize: 150,
  // gridLinesColor: "#fff",
};

export const Grid = () => {
  const grid = useRef<Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uGridBackgroundColor: new Uniform(new Color(defaultsetting.gridBackgroundColor)),
      uGridlinesColor: new Uniform(new Color(defaultsetting.gridLinesColor)),
      uGridSize: new Uniform(defaultsetting.gridSize),
    }),
    []
  );

  const [controls, _set] = useControls("Grid", () => ({
    uGridBackgroundColor: defaultsetting.gridBackgroundColor,
    uGridlinesColor: defaultsetting.gridLinesColor,
    uGridSize: defaultsetting.gridSize,
  }));

  useEffect(() => {
    uniforms.uGridBackgroundColor.value = new Color(controls.uGridBackgroundColor);
    uniforms.uGridlinesColor.value = new Color(controls.uGridlinesColor);
    uniforms.uGridSize.value = controls.uGridSize;
  }, [controls]);

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value = new Vector2(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <mesh ref={grid} position-z={0}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};
