import { FC, useMemo } from "react";

type PlaneProps = {
  key: number;
  scale: [x: number, y: number, z: number];
  position: [x: number, y: number, z: number];
};

export const PlaneImage: FC<PlaneProps> = (props) => {
  const uniforms = useMemo(() => ({}), []);

  return (
    <mesh key={props.key} scale={props.scale} position={props.position}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial uniforms={uniforms} />
    </mesh>
  );
};
