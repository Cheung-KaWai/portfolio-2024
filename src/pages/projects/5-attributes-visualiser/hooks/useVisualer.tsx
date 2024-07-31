import { useAttributeVisualiserStore } from "../store/useAttributeVisualiserStore";
import { Instance } from "@react-three/drei";

export const useVisualer = () => {
  const ref = useAttributeVisualiserStore((state) => state.object);
  const positionsAttribute = ref?.geometry.attributes.position.array ?? [];

  const amountOfPoints = positionsAttribute.length;

  const renderPositions = () => {
    const elements = [];
    for (let i = 0; i < positionsAttribute.length; i = i + 3) {
      const x = positionsAttribute[i + 0];
      const y = positionsAttribute[i + 1];
      const z = positionsAttribute[i + 2];
      elements.push(<Instance scale={0.05} key={i} position={[x, y, z]} />);
    }
    return elements;
  };

  const positionsList = () => {
    const result = [];

    for (let i = 0; i < positionsAttribute.length; i += 3) {
      result.push(positionsAttribute.slice(i, i + 3));
    }

    return result;
  };

  return { amountOfPoints, renderPositions, positionsList };
};
