/* eslint-disable react-hooks/exhaustive-deps */
import { RigidBody } from "@react-three/rapier";
import { FC, useEffect, useMemo, useState } from "react";
import { MagicButtonProps } from "../types/Types";
import { Uniform } from "three";
import gsap from "gsap";

export const MagicButton: FC<MagicButtonProps> = ({ texture }) => {
  const [pressed, setPressed] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTexture: new Uniform(texture),
      progress: new Uniform(0),
    }),
    []
  );

  useEffect(() => {
    const progressTo = pressed ? 1 : 0;
    gsap.to(uniforms.progress, { value: progressTo });
  }, [pressed]);

  return (
    //layer
    <group position={[10, 0, 10]}>
      <RigidBody onCollisionEnter={() => setPressed((prev) => !prev)} type="fixed">
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.51, 0]}>
          <planeGeometry args={[4.9, 4.9]} />
          <shaderMaterial uniforms={uniforms} />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh>
          <boxGeometry args={[5, 1, 5]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>
    </group>
  );
};
