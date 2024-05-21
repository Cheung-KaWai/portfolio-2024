import { AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, Uniform, Vector3 } from "three";
import { data } from "../data/data";
import { FC, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

import vertex from "@shaders/futuristicUI/brain/vertex.glsl";
import fragment from "@shaders/futuristicUI/brain/fragment.glsl";
import { useControls } from "leva";
import { BrainParticles } from "./BrainParticles";
import gsap from "gsap";

const getCurves = () => {
  const paths = data.economics[0].paths;
  const brainCurves = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    const pathPoints = [];
    for (let j = 0; j < path.length; j += 3) {
      pathPoints.push(new Vector3(path[j], path[j + 1], path[j + 2]));
    }
    brainCurves.push(new CatmullRomCurve3(pathPoints));
  }
  return brainCurves;
};

const BrainWave: FC<{ curve: CatmullRomCurve3 }> = ({ curve }) => {
  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uBrainColor: new Uniform(new Color("#ffffff")),
      uShow: new Uniform(0),
    }),
    []
  );

  useEffect(() => {
    gsap.to(uniforms.uShow, {
      value: 1,
      delay: 9,
      duration: 2,
    });
  }, []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  const [controls, _] = useControls("Brain", () => ({
    brainColor: "#009d98",
  }));

  useEffect(() => {
    uniforms.uBrainColor.value = new Color(controls.brainColor);
  }, [controls]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.003, 2, false]}></tubeGeometry>
      <shaderMaterial uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} transparent={true} side={DoubleSide} blending={AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

export const Brain = () => {
  const curves = useMemo(() => getCurves(), []);

  return (
    <group position={[-4.1, 1.1, 0.3]} rotation={[0, Math.PI / 3, 0]} scale={10}>
      {curves.map((curve, index) => (
        <BrainWave curve={curve} key={index} />
      ))}
      <BrainParticles curves={curves} />
    </group>
  );
};
