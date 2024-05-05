import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useState } from "react";
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, PointsMaterial, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

export const Heart = () => {
  const { scene } = useGLTF("/heart.glb");
  const [lineProps, setLineProps] = useState<{ geometry: null | BufferGeometry; lineMaterial: null | PointsMaterial }>({
    geometry: null,
    lineMaterial: null,
  });

  console.log("rerender");

  useLayoutEffect(() => {
    if (scene.children[0]) {
      const sampler = new MeshSurfaceSampler(scene.children[0] as Mesh).build();
      const bufferGeometry = new BufferGeometry();
      const material = new PointsMaterial({
        size: 0.01,
        alphaTest: 0.2,
        color: new Color("#f00"),
      });
      const vertices = [];
      const tempPosition = new Vector3();

      for (let i = 0; i < 10000; i++) {
        sampler.sample(tempPosition);
        vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
      }

      bufferGeometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
      setLineProps({ geometry: bufferGeometry, lineMaterial: material });
    }
  }, []);
  // @ts-ignore
  return <points geometry={lineProps.geometry} material={lineProps.lineMaterial} position={scene.children[0].position} />;
};
