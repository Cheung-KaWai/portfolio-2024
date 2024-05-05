import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import { Human } from "./Human";
import { Environment } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";
// import { Heart } from "./Heart";

export const FuturisticUI = () => {
  useDebug();
  return (
    <Canvas>
      <Grid />
      <Human />
      {/* <Heart /> */}
      {/* <OrbitControls /> */}
      {/* <Lightformer /> */}
      <Environment preset="city" />
    </Canvas>
  );
};
