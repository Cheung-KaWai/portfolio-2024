import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AdditiveBlending, BufferGeometry, Color, DoubleSide, Float32BufferAttribute, LineBasicMaterial, Mesh, ShaderMaterial, Uniform, Vector3 } from "three";
import fragment from "@shaders/futuristicUI/human/fragment.glsl";
import vertex from "@shaders/futuristicUI/human/vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

const defaultSetting = { holographicColor1: "#0ee4ff", holographicColor2: "#fff" };

export const Human = () => {
  const { scene } = useGLTF("/human.glb");
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
    }),
    []
  );

  const shaderMaterial = useMemo(() => new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, uniforms: uniforms, transparent: true, side: DoubleSide, depthWrite: false, blending: AdditiveBlending }), []);

  const [lineProps, setLineProps] = useState<{ geometry: null | BufferGeometry; lineMaterial: null | LineBasicMaterial }>({
    geometry: null,
    lineMaterial: null,
  });

  useLayoutEffect(() => {
    if (scene.children[0]) {
      console.log(scene);
      const sampler = new MeshSurfaceSampler(scene.children[0] as Mesh).build();
      const bufferGeometry = new BufferGeometry();
      const material = new LineBasicMaterial({ color: 0x14b1ff, transparent: true, opacity: 0.15, depthWrite: false });
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
    const skellet: any = scene.children[0];
    if (skellet) skellet.material = shaderMaterial;
  }, [scene]);

  return (
    <>
      {/* @ts-ignore */}
      <line geometry={lineProps.geometry} material={lineProps.lineMaterial} renderOrder={-1} />
      <primitive object={scene} />
    </>
  );
};
