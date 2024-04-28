import { useGlobal } from "@store/GlobalStore";
import { useEffect } from "react";

export const useDebug = () => {
  let showDebug = false;
  const { update } = useGlobal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if CMD (Meta) key and 'D' key are pressed simultaneously or windows equivalent
      if ((event.metaKey && event.key === "d") || (event.ctrlKey && event.key === "d")) {
        update({ showDebug: !showDebug });
        showDebug = !showDebug;
      }
    };

    // Add event listener when component mounts
    document.addEventListener("keydown", handleKeyDown);

    // Clean up by removing event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
