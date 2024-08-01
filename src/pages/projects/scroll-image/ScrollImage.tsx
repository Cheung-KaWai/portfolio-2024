import ReactLenis from "lenis/react";
import { Grid } from "./components/Grid";
import { Images } from "./components/Images";
import { Scene } from "./components/three/Scene";

export const ScrollImage = () => {
  return (
    <>
      <ReactLenis root>
        <Grid>
          <Images />
          <Scene />
        </Grid>
      </ReactLenis>
    </>
  );
};
