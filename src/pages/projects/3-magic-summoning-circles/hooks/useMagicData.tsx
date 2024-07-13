import { dataCircles, combinations } from "../data/data";
import { useMagicStore } from "../store/MagicStore";

export const useMagicData = () => {
  const { centerCircle, outerCircle, innerCircle } = useMagicStore();

  const centerCiclePath = dataCircles.centerCircle.find((x) => x.id === centerCircle)?.path;
  const outerCirclePath = dataCircles.outerCircle.find((x) => x.id === outerCircle)?.path;
  const innerCirclePath = dataCircles.innerCircle.find((x) => x.id === innerCircle)?.path;

  const activate = centerCircle === outerCircle && outerCircle === innerCircle;
  const typeCircle = centerCircle;
  const colors = combinations.find((x) => x.id === typeCircle)?.colors;

  return {
    centerCiclePath,
    outerCirclePath,
    innerCirclePath,
    activate,
    typeCircle,
    colors,
  };
};
