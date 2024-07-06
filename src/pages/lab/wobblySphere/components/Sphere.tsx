/* eslint-disable react-hooks/exhaustive-deps */
import { Mesh, MeshDepthMaterial, MeshStandardMaterial, RGBADepthPacking, Uniform } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { useLayoutEffect, useMemo, useRef } from "react";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const Sphere = () => {
  const ref = useRef<Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uStrength: new Uniform(0.2),
    }),
    []
  );

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.geometry = mergeVertices(ref.current.geometry);
      ref.current.geometry.computeTangents();
    }

    console.log(ref.current);
  }, [ref.current]);

  return (
    <mesh ref={ref} castShadow>
      <icosahedronGeometry args={[2.5, 50]} />
      <CustomShaderMaterial baseMaterial={MeshStandardMaterial} vertexShader={vertex} fragmentShader={fragment} silent uniforms={uniforms} />
      <CustomShaderMaterial attach="customDepthMaterial" baseMaterial={MeshDepthMaterial} vertexShader={vertex} fragmentShader={fragment} silent uniforms={uniforms} depthPacking={RGBADepthPacking} />
    </mesh>
  );
};
