import { useGlobal } from "@store/GlobalStore";
import { Leva } from "leva";

export const LevaDebug = () => {
  const { showDebug } = useGlobal();

  return <Leva hidden={!showDebug} />;
};
