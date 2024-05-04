import { useEffect, useState } from "react";

export const useMouse = () => {
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleCursorPosition = (e: MouseEvent) => {
      setCursor({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    console.log("rerender eventlinster");

    window.addEventListener("mousemove", handleCursorPosition);

    return () => {
      window.removeEventListener("mousemove", handleCursorPosition);
    };
  }, []);

  return { cursor };
};
