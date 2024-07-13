import { RigidBody } from "@react-three/rapier";

export const Ground = () => {
  return (
    <RigidBody type="fixed">
      <mesh rotation-x={Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </RigidBody>
  );
};
