/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { FrontSide, Sphere, Uniform, Vector2, Vector3, Vector4 } from "three";
import vertex from "../shaders/grassblade/vertex.glsl";
import fragment from "../shaders/grassblade/fragment.glsl";
import { useGrass } from "../hooks/useGrass";

export const GrassBlades = () => {
  const { numbersOfGrass, segments, vertices, patchSize, width, height, indices } = useGrass();

  const uniforms = useMemo(
    () => ({
      grassParams: new Uniform(new Vector4(segments, vertices, width, height)),
      time: new Uniform(0),
      resolution: new Uniform(new Vector2(1, 1)),
    }),
    []
  );

  return (
    <mesh>
      <instancedBufferGeometry instanceCount={numbersOfGrass} boundingSphere={new Sphere(new Vector3(0, 0, 0), 1 + patchSize * 2)}>
        <instancedBufferAttribute attach={"index"} args={[new Uint16Array(indices), 1]} />
      </instancedBufferGeometry>
      <shaderMaterial uniforms={uniforms} side={FrontSide} vertexShader={vertex} fragmentShader={fragment} />
    </mesh>
  );
};
