import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import { Human } from "./Human";
import { Environment } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";
import { HumanGroundFloor } from "./HumanGroundFloor";
import { Controls } from "./Controls";
import { HumanParticles } from "./HumanParticles";
// import { Heart } from "./Heart";

export const FuturisticUI = () => {
  useDebug();
  return (
    <>
      <Canvas>
        <Grid />
        <Human />
        <HumanGroundFloor />
        <HumanParticles />
        <Controls />

        {/* <Heart /> */}

        <Environment preset="city" />
      </Canvas>
    </>
  );
};
