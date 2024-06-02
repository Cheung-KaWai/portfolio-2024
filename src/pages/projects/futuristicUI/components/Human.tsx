/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AdditiveBlending, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, LineBasicMaterial, Mesh, ShaderMaterial, Uniform, Vector3 } from "three";
import fragment from "../shaders/human/fragment.glsl";
import vertex from "../shaders/human/vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

const defaultSetting = { holographicColor1: "#0ee4ff", holographicColor2: "#fff" };

export const Human = () => {
  const { scene } = useGLTF("/futuristicUI/human.glb");
  const { clock } = useThree();

  const [controls, _set] = useControls("Human", () => ({
    holographicColor1: defaultSetting.holographicColor1,
  }));

  useEffect(() => {
    uniforms.uHolographicColor1.value = new Color(controls.holographicColor1);
  }, [controls]);

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uHolographicColor1: new Uniform(new Color(defaultSetting.holographicColor1)),
      uProgress: new Uniform(0),
    }),
    []
  );

  const shaderMaterial = useMemo(() => new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, uniforms: uniforms, transparent: true, side: DoubleSide, depthWrite: false, blending: AdditiveBlending }), []);
  const material = useMemo(() => new LineBasicMaterial({ color: 0x14b1ff, transparent: true, opacity: 0, depthWrite: false }), []);

  const [lineProps, setLineProps] = useState<{ geometry: null | BufferGeometry; lineMaterial: null | LineBasicMaterial }>({
    geometry: null,
    lineMaterial: null,
  });

  useEffect(() => {
    gsap.to(uniforms.uProgress, { value: 1, duration: 12 });
    gsap.to(material, { opacity: 0.1, duration: 3, delay: 8.5, ease: "back" });
  }, []);

  useLayoutEffect(() => {
    if (scene.children[0]) {
      const sampler = new MeshSurfaceSampler(scene.children[0] as Mesh).build();
      const bufferGeometry = new BufferGeometry();

      const vertices = [];

      const tempPosition = new Vector3();
      sampler.sample(tempPosition);
      let prevPosition = tempPosition.clone();

      for (let i = 0; i < 20000; i++) {
        let nextPointFound = false;

        while (!nextPointFound) {
          sampler.sample(tempPosition);

          if (tempPosition.distanceTo(prevPosition) < 0.5) {
            vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
            prevPosition = tempPosition.clone();
            nextPointFound = true;
          }
        }
      }

      bufferGeometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      setLineProps({ geometry: bufferGeometry, lineMaterial: material });
    }
  }, []);

  useFrame(() => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const skellet: any = scene.children[0];
    if (skellet) skellet.material = shaderMaterial;
  }, [scene]);

  return (
    <>
      {/* @ts-expect-error ignore type warning*/}
      <line geometry={lineProps.geometry} material={lineProps.lineMaterial} renderOrder={-1} />
      <primitive object={scene} />
    </>
  );
};
