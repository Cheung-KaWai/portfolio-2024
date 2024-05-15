import { useEffect, useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, Mesh, ShaderMaterial, Uniform, Vector2, Vector3 } from "three";
import vertex from "@shaders/futuristicUI/humanParticles/vertex.glsl";
import fragment from "@shaders/futuristicUI/humanParticles/fragment.glsl";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

const defaultSettings = {
  count: 3000,
};

export const HumanParticles = () => {
  const { scene } = useGLTF("/human.glb");
  const pattern = useTexture("/pattern2.png");
  pattern.flipY = false;

  const uniforms = useMemo(
    () => ({
      uSize: new Uniform(0.1),
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uTexture: new Uniform(pattern),
      uProgress: new Uniform(0),
      uParticleColor: new Uniform(new Color("#0ee4ff")),
    }),
    []
  );
  const geometry = useMemo(() => new BufferGeometry(), []);
  const material = useMemo(() => new ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms: uniforms, transparent: true, depthWrite: false, blending: AdditiveBlending }), []);

  useEffect(() => {
    const fixAspect = () => {
      uniforms.uResolution.value = new Vector2(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", fixAspect);

    return () => {
      window.removeEventListener("resize", fixAspect);
    };
  }, []);

  //animation
  useEffect(() => {
    gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 10,
      ease: "linear",
    });
  }, []);

  useLayoutEffect(() => {
    if (scene.children[0]) {
      const sampler = new MeshSurfaceSampler(scene.children[0] as Mesh).build();

      const positions = new Float32Array(defaultSettings.count * 3);
      const positionsHuman = new Float32Array(defaultSettings.count * 3);
      const sizeArray = new Float32Array(defaultSettings.count);
      const timeMultiplierArray = new Float32Array(defaultSettings.count);

      const positionOnHuman = new Vector3();

      for (let i = 0; i < defaultSettings.count; i++) {
        const index = i * 3;

        // cx, cy = center x,y
        const cx = 0;
        const cy = 1.7;
        const minDistance = 0.5;
        const radius = 1.2;
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.sqrt(Math.random()) * (radius - minDistance) + minDistance;

        positions[index + 0] = cx + distance * Math.cos(angle);
        positions[index + 1] = -1.5;
        positions[index + 2] = cy + distance * Math.sin(angle);

        sizeArray[index] = Math.random();
        timeMultiplierArray[index] = 1 + Math.random();

        sampler.sample(positionOnHuman);
        positionsHuman[index + 0] = positionOnHuman.x;
        positionsHuman[index + 1] = positionOnHuman.y;
        positionsHuman[index + 2] = positionOnHuman.z;
      }

      geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geometry.setAttribute("aPositionHuman", new Float32BufferAttribute(positionsHuman, 3));
      geometry.setAttribute("aSize", new Float32BufferAttribute(sizeArray, 1));
      geometry.setAttribute("aTimeMultiplier", new Float32BufferAttribute(timeMultiplierArray, 1));
    }
  }, []);

  return <points geometry={geometry} material={material} />;
};
