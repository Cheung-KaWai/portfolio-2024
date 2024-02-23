import { OrbitControls, useGLTF } from "@react-three/drei";
import { Layout } from "../components/Layout";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, InterleavedBufferAttribute, Mesh, Points, Scene, ShaderMaterial, Uniform } from "three";
import vertex from "../shaders/morphing/vertex.glsl";
import fragment from "../shaders/morphing/fragment.glsl";
import { useControls } from "leva";

type ParticlesProps = {
  positions: Array<BufferAttribute | InterleavedBufferAttribute>;
};

const useDebug = () => {
  const controls = useControls({
    pointSize: {
      value: 20,
      min: 1,
      max: 20,
      step: 1,
    },
  });

  return controls;
};

const ParticleMorphingContent = () => {
  const { scene } = useGLTF("morphing.glb");

  const controls = useDebug();

  //particles ref
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

  //rerender
  console.log("rerender" + Date.now());

  useEffect(() => {
    particles.current.positions = (scene.children as Mesh[]).map((child) => child.geometry.attributes.position);
    bufferGeoRef.current.setAttribute("position", particles.current.positions[1]);
  }, []);

  useEffect(() => {
    uniforms.uPointSize.value = controls.pointSize;
  }, [controls]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={bufferGeoRef} />
      <shaderMaterial ref={shaderRef} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </points>
  );
};

export const ParticleMorphing = () => {
  return (
    <Layout>
      <Canvas>
        <ParticleMorphingContent />
        <OrbitControls />
      </Canvas>
    </Layout>
  );
};
