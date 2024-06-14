import { useMemo } from "react";

export const useGrass = () => {
  const numbersOfGrass = 10000;
  const segments = 6;
  const vertices = (segments + 1) * 2; // each segment add 2 extra vertices
  const patchSize = 25;
  const width = 0.25;
  const height = 2;

  const indices = useMemo(() => {
    const tempIndices = [];
    for (let i = 0; i < segments; i++) {
      const vi = i * 2;

      tempIndices[i * 12 + 0] = vi + 0;
      tempIndices[i * 12 + 1] = vi + 1;
      tempIndices[i * 12 + 2] = vi + 2;

      tempIndices[i * 12 + 3] = vi + 2;
      tempIndices[i * 12 + 4] = vi + 1;
      tempIndices[i * 12 + 5] = vi + 3;

      const fi = vertices + vi;
      tempIndices[i * 12 + 6] = fi + 2;
      tempIndices[i * 12 + 7] = fi + 1;
      tempIndices[i * 12 + 8] = fi + 0;

      tempIndices[i * 12 + 9] = fi + 3;
      tempIndices[i * 12 + 10] = fi + 1;
      tempIndices[i * 12 + 11] = fi + 2;
    }
    return tempIndices;
  }, [segments, vertices]);

  return { numbersOfGrass, segments, vertices, patchSize, width, height, indices };
};
