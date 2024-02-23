import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, InterleavedBufferAttribute, Mesh, Points, ShaderMaterial, Uniform } from "three";
import vertex from "../shaders/morphing/vertex.glsl";
import fragment from "../shaders/morphing/fragment.glsl";
import { useControls } from "leva";
import { Debug } from "../components/Debug";

type ParticlesProps = {
  positions: Array<BufferAttribute | InterleavedBufferAttribute>;
};

const useDebug = () => {
  const controls = useControls({
    pointSize: {
      value: 50,
      min: 1,
      max: 100,
      step: 1,
    },
  });

  return controls;
};

const ParticleMorphingContent = () => {
  const { scene } = useGLTF("morphing.glb");

  // debug
  const controls = useDebug();

  // refs + memo
  const particles = useRef<ParticlesProps>({ positions: [] });
  const bufferGeoRef = useRef<BufferGeometry>(null!);
  const shaderRef = useRef<ShaderMaterial>(null!);
  const pointsRef = useRef<Points>(null!);
  const uniforms = useMemo(
    () => ({
      uPointSize: new Uniform(controls.pointSize),
    }),
    []
  );

  // rerender
  console.log("rerender" + Date.now());

  // setup positions buffer
  useEffect(() => {
    particles.current.positions = (scene.children as Mesh[]).map((child) => child.geometry.attributes.position);
    bufferGeoRef.current.setAttribute("position", particles.current.positions[1]);
  }, []);

  // update values controls
  useEffect(() => {
    uniforms.uPointSize.value = controls.pointSize;
  }, [controls]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={bufferGeoRef} />
      <shaderMaterial ref={shaderRef} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
};

export const ParticleMorphing = () => {
  return (
    <Canvas>
      <Debug />
      <ParticleMorphingContent />
      <OrbitControls />
    </Canvas>
  );
};
