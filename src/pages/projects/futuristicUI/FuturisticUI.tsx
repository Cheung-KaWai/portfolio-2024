import { Canvas } from "@react-three/fiber";
import { Grid } from "./Grid";
import { Human } from "./Human";
import { Environment, OrbitControls } from "@react-three/drei";
import { useDebug } from "@hooks/useDebug";

export const FuturisticUI = () => {
  useDebug();
  return (
    <Canvas>
      {/* <Grid /> */}
      <Human />
      <OrbitControls />
      {/* <Lightformer /> */}
      <Environment preset="city" />
    </Canvas>
  );
};
