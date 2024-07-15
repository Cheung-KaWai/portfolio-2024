/* eslint-disable react-hooks/exhaustive-deps */
import { Extrude, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { RepeatWrapping, Shape, Uniform, Vector2 } from "three";
import vertex from "../shaders/vertex.glsl";
import fragment from "../shaders/fragment.glsl";
import { useLevaDebug } from "../hooks/useLevaDebug";
import { useThree } from "@react-three/fiber";

export const TableTop = () => {
  const { gl } = useThree();
  const texture = useTexture("/4-table-configurator/color.jpg");
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  texture.repeat = new Vector2(10, 10);

  const points = [new Vector2(0.5, 0.5), new Vector2(0.5, -0.5), new Vector2(-0.5, -0.5), new Vector2(-0.5, 0.5)];

  const shape = useMemo(() => new Shape(points), []);
  const controls = useLevaDebug();

  const uniforms = useMemo(
    () => ({
      uTexture: new Uniform(texture),
      uLength: new Uniform(2),
      uProgress: new Uniform(0),
      uDepth: new Uniform(controls.depth),
      uOffset: new Uniform(controls.offset),
      uLengthTable: new Uniform(controls.length),
    }),
    []
  );

  useEffect(() => {
    uniforms.uProgress.value = controls.progress;
    uniforms.uDepth.value = controls.depth;
    uniforms.uOffset.value = controls.offset;
    uniforms.uLengthTable.value = controls.length;
  }, [controls]);

  return (
    <group>
      <Extrude args={[shape, { depth: controls.depth, steps: 10, bevelEnabled: false }]}>
        <shaderMaterial uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} wireframe={controls.wireframe} />
      </Extrude>
    </group>
  );
};
