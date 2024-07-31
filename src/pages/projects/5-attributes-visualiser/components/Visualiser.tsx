import { Instances } from "@react-three/drei";
import { useVisualer } from "../hooks/useVisualer";

export const Visualiser = () => {
  const { renderPositions } = useVisualer();

  return (
    <Instances>
      <sphereGeometry />
      <meshBasicMaterial />
      {renderPositions()}
    </Instances>
  );
};
