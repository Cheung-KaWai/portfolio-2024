import { dataCircles } from "../data/data";
import { useMagicStore } from "../store/MagicStore";

export const useMagicData = () => {
  const { centerCircle, outerCircle, innerCircle } = useMagicStore();

  const centerCiclePath = dataCircles.centerCircle.find((x) => x.id === centerCircle);
  const outerCirclePath = dataCircles.outerCircle.find((x) => x.id === outerCircle);
  const innerCirclePath = dataCircles.innerCircle.find((x) => x.id === innerCircle);

  const activate = centerCircle === outerCircle && outerCircle === innerCircle;
  const typeCircle = centerCircle;

  return {
    centerCiclePath,
    outerCirclePath,
    innerCirclePath,
    activate,
    typeCircle,
  };
};
