import { Perf } from "r3f-perf";
import { useGlobal } from "../store/GlobalStore";
import { useControls } from "leva";

export const Debug = () => {
  const { showPerf, update } = useGlobal();

  useControls({
    "perf monitor": {
      value: showPerf,
      onChange: (value) => {
        update({ showPerf: value });
      },
    },
  });

  return <Perf position="top-left" style={{ display: showPerf ? "block" : "none" }} />;
};
