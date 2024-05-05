import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from "three";
import fragment from "@shaders/futuristicUI/human/fragment.glsl";
import vertex from "@shaders/futuristicUI/human/vertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

const defaultSetting = { holographicColor1: "#0ee4ff", holographicColor2: "#fff" };

export const Human = () => {
  const { scene } = useGLTF("/human.glb");
  const { clock } = useThree();

  const [controls, _set] = useControls("Human", () => ({
    holographicColor1: defaultSetting.holographicColor1,
    holographicColor2: defaultSetting.holographicColor2,
  }));

  useEffect(() => {
    uniforms.uHolographicColor1.value = new Color(controls.holographicColor1);
    uniforms.uHolographicColor2.value = new Color(controls.holographicColor2);
  }, [controls]);

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uHolographicColor1: new Uniform(new Color(defaultSetting.holographicColor1)),
      uHolographicColor2: new Uniform(new Color(defaultSetting.holographicColor2)),
    }),
    []
  );

  const shaderMaterial = useMemo(() => new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, uniforms: uniforms, transparent: true, side: DoubleSide, depthWrite: false, blending: AdditiveBlending }), []);

  useFrame(() => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  useLayoutEffect(() => {
    const skellet: any = scene.children[0];
    if (skellet) skellet.material = shaderMaterial;
  }, [scene]);

  return <primitive object={scene} />;
};
