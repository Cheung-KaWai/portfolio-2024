import { useEffect, useRef } from "react";
import styled from "styled-components";

export const Cursor = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circlePosition = { x: 0, y: 0 };
    const mousePosition = { x: 0, y: 0 };
    const prevMousePosition = { x: 0, y: 0 };
    const speed = 0.15;
    let scale = 0;
    let angle = 0;
    let opacity = 0;

    const tick = () => {
      // position
      circlePosition.x += (mousePosition.x - circlePosition.x) * speed;
      circlePosition.y += (mousePosition.y - circlePosition.y) * speed;
      const translate = `translate(${circlePosition.x}px, ${circlePosition.y}px)`;

      // distance, velocity, scaling
      const deltaMouseX = mousePosition.x - prevMousePosition.x;
      const deltaMouseY = mousePosition.y - prevMousePosition.y;
      prevMousePosition.x = mousePosition.x;
      prevMousePosition.y = mousePosition.y;

      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX * deltaMouseX + deltaMouseY * deltaMouseY) * 4, 50);
      const scaleValue = (mouseVelocity / 50) * 0.5;
      scale += (scaleValue - scale) * speed;
      const scaleTransform = `scale(${1 + scale},${1 - scale})`;

      // rotate
      const deltaCircelMouseX = mousePosition.x - circlePosition.x;
      const deltaCircleMouseY = mousePosition.y - circlePosition.y;
      const calculatedAnlge = Math.atan2(deltaCircleMouseY, deltaCircelMouseX);

      if (mouseVelocity > 10) {
        angle = calculatedAnlge;
      }
      const rotateTransform = `rotate(${angle}rad)`;

      // opacity
      opacity += speed * 0.01;

      if (circleRef.current) {
        circleRef.current.style.transform = translate + rotateTransform + scaleTransform;
        circleRef.current.style.opacity = opacity.toString();
      }
      requestAnimationFrame(tick);
    };

    tick();

    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.x = e.x;
      mousePosition.y = e.y;
      if (circleRef.current) {
        circleRef.current.style.display = "block";
      }
    };

    window.addEventListener("mousemove", (e) => updateMousePosition(e));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return <Circle ref={circleRef}></Circle>;
};

const Circle = styled.div`
  width: 4rem;
  aspect-ratio: 1;
  border: 1px solid gray;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  left: -2rem;
  top: -2rem;
  opacity: 0;
  display: none;
`;
