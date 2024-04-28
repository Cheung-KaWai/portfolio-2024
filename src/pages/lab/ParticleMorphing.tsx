import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, InterleavedBufferAttribute, Mesh, Points, ShaderMaterial, Uniform } from "three";
import vertex from "../../shaders/morphing/vertex.glsl";
import fragment from "../../shaders/morphing/fragment.glsl";
import { useControls } from "leva";
import { Debug } from "../../components/Debug";
import gsap from "gsap";

export const ParticleMorphing = () => {
  return (
    <Canvas>
      <Debug />
      <ParticleMorphingContent />
      <OrbitControls />
    </Canvas>
  );
};

const ParticleMorphingContent = () => {
  const { scene } = useGLTF("morphing.glb");

  // debug
  const { controls, set } = useDebug(morph);

  // refs + memo
  const particles = useRef<ParticlesProps>({ positions: [], shapeIndex: 0 });
  const bufferGeoRef = useRef<BufferGeometry>(null!);
  const shaderRef = useRef<ShaderMaterial>(null!);
  const pointsRef = useRef<Points>(null!);
  const uniforms = useMemo(
    () => ({
      uPointSize: new Uniform(controls.pointSize),
      uProgress: new Uniform(0),
      uColorA: new Uniform(new Color(controls.colorA)),
      uColorB: new Uniform(new Color(controls.colorB)),
      uTime: new Uniform(0),
      uAnimate: new Uniform(true),
    }),
    []
  );

  // rerender
  console.log("rerender" + Date.now());

  // setup positions buffer
  useEffect(() => {
    // get meshes positions attribute
    const positions = (scene.children as Mesh[]).map((child) => child.geometry.attributes.position);

    // get max count size and harmonize others by creating new float32Array and filling the rest with random values
    const { count } = positions.reduce((max, next) => (max.count < next.count ? next : max));
    const pointSize = new Float32Array(count);
    for (const position of positions) {
      const originalArray = position.array;
      const newArray = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        if (i3 < originalArray.length) {
          newArray[i3] = originalArray[i3];
          newArray[i3 + 1] = originalArray[i3 + 1];
          newArray[i3 + 2] = originalArray[i3 + 2];
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3;
          newArray[i3] = originalArray[randomIndex];
          newArray[i3 + 1] = originalArray[randomIndex + 1];
          newArray[i3 + 2] = originalArray[randomIndex + 2];
        }
        pointSize[i] = Math.random();
      }
      particles.current.positions.push(new Float32BufferAttribute(newArray, 3));
    }
    // set attributes positions to morph into
    bufferGeoRef.current.setAttribute("position", particles.current.positions[0]);
    bufferGeoRef.current.setAttribute("aPositionTarget", particles.current.positions[0]);
    bufferGeoRef.current.setAttribute("aPointSize", new Float32BufferAttribute(pointSize, 1));
  }, []);

  // update values controls
  useEffect(() => {
    uniforms.uAnimate.value = controls.animate;
    uniforms.uPointSize.value = controls.pointSize;
    uniforms.uProgress.value = controls.progress;
    uniforms.uColorA.value = new Color(controls.colorA);
    uniforms.uColorB.value = new Color(controls.colorB);
  }, [controls]);

  // animating the progress
  function morph(index: number) {
    bufferGeoRef.current.setAttribute("position", particles.current.positions[particles.current.shapeIndex]);
    bufferGeoRef.current.setAttribute("aPositionTarget", particles.current.positions[index]);

    gsap.fromTo(
      uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 3,
        ease: "linear",
        onUpdate: () => {
          set({ progress: uniforms.uProgress.value });
        },
      }
    );

    particles.current.shapeIndex = index;
  }

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={bufferGeoRef} />
      <shaderMaterial ref={shaderRef} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} blending={AdditiveBlending} depthWrite={false} />
    </points>
  );
};

// debug
const useDebug = (morph: (index: number) => void) => {
  const [controls, set] = useControls(() => ({
    animate: true,
    pointSize: {
      value: 50,
      min: 1,
      max: 100,
      step: 1,
    },
    progress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    colorA: "#ff7300",
    colorB: "#0023ff",
    object: {
      options: {
        cube: 0,
        sphere: 1,
        torus: 2,
      },
      onChange: (value: number, _: string, options: any) => {
        if (!options.initial) {
          morph(value);
        }
      },
    },
  }));

  return { controls, set };
};

type ParticlesProps = {
  positions: Array<BufferAttribute | InterleavedBufferAttribute>;
  shapeIndex: number;
};
