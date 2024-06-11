import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/Addons.js";

function save(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();

  // URL.revokeObjectURL( url ); breaks Firefox...
}

function saveString(text: string, filename: string) {
  save(new Blob([text], { type: "text/plain" }), filename);
}

function saveArrayBuffer(buffer: ArrayBuffer, filename: string) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

export const useExport = () => {
  const { scene } = useThree();

  function exportGLTF() {
    const gltfExporter = new GLTFExporter();

    const options = {
      binary: true,
    };
    gltfExporter.parse(
      scene,
      function (result) {
        if (result instanceof ArrayBuffer) {
          saveArrayBuffer(result, "scene.glb");
        } else {
          const output = JSON.stringify(result, null, 2);
          console.log(output);
          saveString(output, "scene.gltf");
        }
      },
      function (error) {
        console.log("An error happened during parsing", error);
      },
      options
    );
  }
  return { exportGLTF };
};
