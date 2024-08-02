/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo } from "react";
import vertex from "../../shader/vertex.glsl";
import fragment from "../../shader/fragment.glsl";
import { Uniform, Vector2 } from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type PlaneProps = {
  scale: [x: number, y: number, z: number];
  position: [x: number, y: number, z: number];
  textureSize: Vector2;
  quadSize: Vector2;
  textureSource: string;
  scrollVelocity: number;
};

export const PlaneImage: FC<PlaneProps> = (props) => {
  const texture = useTexture(props.textureSource);

  const uniforms = useMemo(
    () => ({
      uResolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
      uTexture: new Uniform(texture),
      uTextureSize: new Uniform(props.textureSize),
      uQuadSize: new Uniform(props.quadSize),
      uScrollVelocity: new Uniform(props.scrollVelocity),
      uTime: new Uniform(0),
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uScrollVelocity.value = props.scrollVelocity;
  });

  useEffect(() => {}, [props]);

  return (
    <mesh scale={props.scale} position={props.position}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
    </mesh>
  );
};
