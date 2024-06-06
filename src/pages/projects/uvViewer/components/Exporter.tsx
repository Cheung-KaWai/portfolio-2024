/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useExport } from "../hooks/useExport";

export const Exporter = () => {
  const { exportGLTF } = useExport();

  useEffect(() => {
    exportGLTF();
  }, []);
  return <></>;
};
