import { Canvas } from "@react-three/fiber";
import { Grid } from "./components/Grid";
import { Human } from "./components/Human";
import { Environment } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";
import { HumanGroundFloor } from "./components/HumanGroundFloor";
import { Controls } from "./components/Controls";
import { HumanParticles } from "./components/HumanParticles";
import { HeartRate } from "./components/HeartRate";
import { Heart } from "./components/Heart";
import { Brain } from "./components/Brain";
import { BrainInfo } from "./components/BrainInfo";
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
        <group position={[0, 0.3, 0]}>
          <Brain />
          <BrainInfo />
        </group>
        <Controls />
        <Heart />

        <Environment preset="city" />
      </Canvas>
    </>
  );
};
