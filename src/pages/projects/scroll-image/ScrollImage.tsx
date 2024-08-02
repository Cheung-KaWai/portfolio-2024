import ReactLenis from "lenis/react";
import { Grid } from "./components/Grid";
import { Scene } from "./components/three/Scene";
import { Images } from "./components/Images";

export const ScrollImage = () => {
  return (
    <>
      <ReactLenis root>
        <Grid>
          <Images />
        </Grid>
        <Scene />
      </ReactLenis>
    </>
  );
};
