import { Grid } from "./components/Grid";
import { Images } from "./components/Images";
import { Scene } from "./components/three/Scene";

export const ScrollImage = () => {
  return (
    <>
      <Grid>
        <Images />
        <Scene />
      </Grid>
    </>
  );
};
