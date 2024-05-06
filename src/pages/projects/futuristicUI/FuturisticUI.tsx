import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import { Human } from "./Human";
import { Environment } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";
import { HumanGroundFloor } from "./HumanGroundFloor";
import { Controls } from "./Controls";
// import { Heart } from "./Heart";

export const FuturisticUI = () => {
  useDebug();
  return (
    <>
      <Canvas>
        <Grid />
        <Human />
        <HumanGroundFloor />
        <Controls />
        {/* <Heart /> */}

        <Environment preset="city" />
      </Canvas>
    </>
  );
};
