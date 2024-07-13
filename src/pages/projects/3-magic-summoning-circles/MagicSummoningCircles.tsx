import { Environment, KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MagicCircle } from "./components/MagicCircle";
import { Effects } from "./components/Effects";
import { Crystal } from "./components/Crystal";
import { Physics } from "@react-three/rapier";
import { Character } from "./components/Character";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
  { name: "jump", keys: ["Space"] },
];

export const MagicSummoningCircles = () => {
  return (
    <>
      <KeyboardControls map={keyboardMap}>
        <Canvas>
          <Effects />
          <Physics debug>
            <Crystal />
            <MagicCircle />
            <Character />
          </Physics>
          <Environment preset="studio" />
        </Canvas>
      </KeyboardControls>
    </>
  );
};
