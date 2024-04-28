import { Perf } from "r3f-perf";
import { useGlobal } from "@store/GlobalStore";
import { useControls } from "leva";

export const Debug = () => {
  const { showDebug, update } = useGlobal();

  useControls({
    "perf monitor": {
      value: showDebug,
      onChange: (value) => {
        update({ showDebug: value });
      },
    },
  });

  return <Perf position="top-left" style={{ display: showDebug ? "block" : "none" }} />;
};
