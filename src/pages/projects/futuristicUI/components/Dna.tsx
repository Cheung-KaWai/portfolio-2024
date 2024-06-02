/* eslint-disable react-hooks/exhaustive-deps */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Mesh, ShaderMaterial, Texture, Uniform, Vector2 } from "three";
import { GPUComputationRenderer, Variable } from "three/examples/jsm/Addons.js";
import gpgpuParticlesShader from "../shaders/gpgpu/particles.glsl";
import vertex from "../shaders/gpgpu/vertex.glsl";
import fragment from "../shaders/gpgpu/fragment.glsl";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

type DnaProps = {
  instance?: BufferGeometry;
  count?: number;
};

type GpuProps = {
  size?: number;
  computation?: GPUComputationRenderer;
  particleVariable?: Variable;
};

type ParticleProps = {
  geometry?: BufferGeometry;
  material?: ShaderMaterial;
};

export const Dna = () => {
  const gltf = useGLTF("/dna.glb");
  // console.log(gltf);

  const { gl } = useThree();
  const baseGeometry = useRef<DnaProps>({});
  const gpgpu = useRef<GpuProps>({});
  const particles = useRef<ParticleProps>({});
  const [renderTarget, setRenderTarget] = useState<Texture | null>(null);
  const uniforms = useMemo(
    () => ({
      uSize: new Uniform(0.1),
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uParticlesTexture: new Uniform(new Texture()),
      uTime: new Uniform(0),
      uShow: new Uniform(0),
      uColor: new Uniform(new Color("#009d98")),
      uColor2: new Uniform(new Color("#00fffd")),
    }),
    []
  );

  useLayoutEffect(() => {
    console.log(gltf);
    const spiral = gltf.scene.children[0] as Mesh;
    baseGeometry.current.instance = spiral.geometry;
    baseGeometry.current.count = baseGeometry.current.instance.attributes.position.count;

    gpgpu.current.size = Math.ceil(Math.sqrt(baseGeometry.current.count));
    gpgpu.current.computation = new GPUComputationRenderer(gpgpu.current.size, gpgpu.current.size, gl);

    const particlesUvArray = new Float32Array(baseGeometry.current.count * 2);
    const sizesArray = new Float32Array(baseGeometry.current.count);

    for (let y = 0; y < gpgpu.current.size; y++) {
      for (let x = 0; x < gpgpu.current.size; x++) {
        const i = y * gpgpu.current.size + x;
        const i2 = i * 2;

        const uvX = (x + 0.5) / gpgpu.current.size;
        const uvY = (y + 0.5) / gpgpu.current.size;

        particlesUvArray[i2 + 0] = uvX;
        particlesUvArray[i2 + 1] = uvY;

        sizesArray[i] = Math.random();
      }
    }

    particles.current.geometry = new BufferGeometry();
    particles.current.geometry.setDrawRange(0, baseGeometry.current.count);
    particles.current.geometry.setAttribute("aParticlesUv", new BufferAttribute(particlesUvArray, 2));
    particles.current.geometry.setAttribute("aSize", new BufferAttribute(sizesArray, 1));

    // base particles
    const baseParticleTexture = gpgpu.current.computation.createTexture();

    for (let i = 0; i < baseGeometry.current.count; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      baseParticleTexture.image.data[i4 + 0] = baseGeometry.current.instance.attributes.position.array[i3 + 0];
      baseParticleTexture.image.data[i4 + 1] = baseGeometry.current.instance.attributes.position.array[i3 + 1];
      baseParticleTexture.image.data[i4 + 2] = baseGeometry.current.instance.attributes.position.array[i3 + 2];
      baseParticleTexture.image.data[i4 + 3] = Math.random();
    }

    // particle variable
    gpgpu.current.particleVariable = gpgpu.current.computation.addVariable("uParticles", gpgpuParticlesShader, baseParticleTexture);
    gpgpu.current.computation.setVariableDependencies(gpgpu.current.particleVariable, [gpgpu.current.particleVariable]);
    gpgpu.current.particleVariable.material.uniforms.uTime = new Uniform(0);
    gpgpu.current.particleVariable.material.uniforms.uBase = new Uniform(baseParticleTexture);

    //init
    gpgpu.current.computation.init();

    setRenderTarget(gpgpu.current.computation?.getCurrentRenderTarget(gpgpu.current.particleVariable).texture);
  }, []);

  useFrame(({ clock }) => {
    if (gpgpu.current.computation && gpgpu.current.particleVariable) {
      gpgpu.current.particleVariable.material.uniforms.uTime.value = clock.elapsedTime;
      uniforms.uTime.value = clock.elapsedTime;
      gpgpu.current.computation.compute();
      uniforms.uParticlesTexture.value = gpgpu.current.computation.getCurrentRenderTarget(gpgpu.current.particleVariable).texture;
    }
  });

  useEffect(() => {
    gsap.to(uniforms.uShow, {
      value: 1,
      delay: 9,
      duration: 2,
    });
  }, []);

  return (
    <>
      <mesh visible={false}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={renderTarget} />
      </mesh>
      <points geometry={particles.current.geometry} position={[-5, -2.2, 0]} rotation={[0, Math.PI / 4, -Math.PI / 2.5]} frustumCulled={false} scale={2}>
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent={true} depthWrite={false} blending={AdditiveBlending} />
      </points>
    </>
  );
};
