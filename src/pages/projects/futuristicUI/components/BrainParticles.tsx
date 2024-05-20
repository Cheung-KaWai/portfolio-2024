import { FC, useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, BufferGeometry, CatmullRomCurve3, Color, Uniform } from "three";
import vertex from "@shaders/futuristicUI/brain/particleVertex.glsl";
import fragment from "@shaders/futuristicUI/brain/particleFragment.glsl";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

type PointsProps = {
  currentOffset: number;
  speed: number;
  curve: CatmullRomCurve3;
  curPosition: number;
};

export const BrainParticles: FC<{ curves: Array<CatmullRomCurve3> }> = ({ curves }) => {
  let density = 5;
  let numberOfPoints = density * curves.length;

  const myPoints = useRef<Array<PointsProps>>([]);
  const brainGeo = useRef<BufferGeometry>(null);

  const uniforms = useMemo(
    () => ({
      uColor: new Uniform(new Color("#00fffd")),
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

  const positions = useMemo(() => {
    let points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      points.push(Math.random(), Math.random(), Math.random());
    }

    return new Float32Array(points);
  }, []);

  const randomSize = useMemo(() => {
    let points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      points.push(Math.random() + 0.1);
    }

    return new Float32Array(points);
  }, []);

  useEffect(() => {
    for (let i = 0; i < curves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.001,
          curve: curves[i],
          curPosition: Math.random(),
        });
      }
    }
  }, []);

  useFrame(() => {
    if (brainGeo.current) {
      let curPosition = brainGeo.current.attributes.position.array;
      for (let i = 0; i < myPoints.current.length; i++) {
        myPoints.current[i].curPosition += myPoints.current[i].speed;
        myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

        let curPoint = myPoints.current[i].curve.getPointAt(myPoints.current[i].curPosition);

        curPosition[i * 3] = curPoint.x;
        curPosition[i * 3 + 1] = curPoint.y;
        curPosition[i * 3 + 2] = curPoint.z;
      }

      brainGeo.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points>
      <bufferGeometry ref={brainGeo}>
        <bufferAttribute attach={"attributes-position"} count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach={"attributes-aSize"} count={randomSize.length} array={randomSize} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} depthWrite={false} blending={AdditiveBlending} transparent={true} uniforms={uniforms} />
    </points>
  );
};
