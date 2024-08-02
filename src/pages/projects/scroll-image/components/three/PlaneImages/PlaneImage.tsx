import { FC, useMemo } from "react";
import vertex from "../../shader/vertex.glsl";

type PlaneProps = {
  scale: [x: number, y: number, z: number];
  position: [x: number, y: number, z: number];
};

export const PlaneImage: FC<PlaneProps> = (props) => {
  const uniforms = useMemo(() => ({}), []);

  return (
    <mesh scale={props.scale} position={props.position}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertex} />
    </mesh>
  );
};
