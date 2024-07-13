/* eslint-disable @typescript-eslint/no-explicit-any */
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";

const normalizeAngle = (angle: number) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const Character = () => {
  const walkSpeed = 8;
  const runSpeed = 8;
  const rotationSpeed = 0.02;

  const rb = useRef<any>(null);
  const container = useRef<Group>(null);
  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const character = useRef<Group>(null);
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  const [_, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = { x: 0, z: 0, y: 0 };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      if (get().left) {
        movement.x = 1;
      }
      if (get().right) {
        movement.x = -1;
      }

      if (get().jump) {
        movement.y = 1;
      }

      const speed = get().run ? runSpeed : walkSpeed;

      if (movement.x !== 0) {
        rotationTarget.current += rotationSpeed * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
        vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;
      }

      if (movement.y !== 0) {
        vel.y = movement.y * speed;
      }

      if (character.current) {
        character.current.rotation.y = lerpAngle(character.current.rotation.y, characterRotationTarget.current, 0.1);
      }
      rb.current.setLinvel(vel, true);
    }

    if (container.current) {
      container.current.rotation.y = MathUtils.lerp(container.current.rotation.y, rotationTarget.current, 0.1);
    }

    cameraPosition.current?.getWorldPosition(cameraWorldPosition.current);
    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current?.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody lockRotations ref={rb} friction={10}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={10} position-z={-10} />
        <group ref={character}>
          <mesh>
            <cylinderGeometry />
            <meshStandardMaterial envMapIntensity={0.3} />
          </mesh>
        </group>
      </group>
    </RigidBody>
  );
};
