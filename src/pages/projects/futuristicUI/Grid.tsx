import { useThree } from "@react-three/fiber";
import fragmentShader from "@shaders/futuristicUI/background/fragment.glsl";
import vertexShader from "@shaders/futuristicUI/background/vertex.glsl";
import { useEffect, useMemo, useRef } from "react";
import { Mesh, Uniform, Vector2 } from "three";

export const Grid = () => {
  const grid = useRef<Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
    }),
    []
  );

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
