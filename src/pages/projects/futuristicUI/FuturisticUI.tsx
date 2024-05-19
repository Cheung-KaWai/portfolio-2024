import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import { Human } from "./Human";
import { Environment } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";
import { HumanGroundFloor } from "./HumanGroundFloor";
import { Controls } from "./Controls";
import { HumanParticles } from "./HumanParticles";
import { HeartRate } from "./HeartRate";
import { Heart } from "./Heart";
// import { Heart } from "./Heart";

export const FuturisticUI = () => {
  useDebug();
  return (
    <>
      <Canvas>
        <Grid />
        <group position={[0, 0.2, 0]}>
          <Human />
          <HumanGroundFloor />
          <HumanParticles />
          <HeartRate />
        </group>
        <Controls />

        <Heart />

        <Environment preset="city" />
      </Canvas>
    </>
  );
};
