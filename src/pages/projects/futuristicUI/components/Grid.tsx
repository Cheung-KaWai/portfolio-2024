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
    <>
      <mesh ref={grid} position-z={-5}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
      <mesh ref={grid} position={[0, -viewport.height, viewport.width / 2 - 4.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
      <mesh ref={grid} position={[0, viewport.height, viewport.width / 2 - 4.2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
      <mesh ref={grid} position={[-27.3 / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
      <mesh ref={grid} position={[27.3 / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
      <mesh ref={grid} position-z={10.3} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
      </mesh>
    </>
  );
};
