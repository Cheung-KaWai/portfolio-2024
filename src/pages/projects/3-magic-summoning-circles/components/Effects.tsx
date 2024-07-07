import { Bloom, EffectComposer, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

export const Effects = () => {
  return (
    <EffectComposer>
      <Bloom mipmapBlur luminanceThreshold={2} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
};
