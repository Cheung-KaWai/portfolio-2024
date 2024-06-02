float generateCrossOnGrid(vec2 uv, float gridSize,float thickness){
  uv -= thickness * gridSize;

  float verticalBars1 = mod(uv.x - (0.05 - thickness) * gridSize , gridSize);
  verticalBars1 = remap(verticalBars1,-gridSize,gridSize,0.,1.);
  verticalBars1 = step(0.95,verticalBars1);

  float horizontalBars1 = mod(uv.y, gridSize);
  horizontalBars1 = remap(horizontalBars1,-gridSize,gridSize,0.,1.);
  horizontalBars1 = step(1. - thickness,horizontalBars1);

  float verticalBars2 = mod(uv.x, gridSize);
  verticalBars2 = remap(verticalBars2,-gridSize,gridSize,0.,1.);
  verticalBars2 =  step(1.- thickness,verticalBars2);

  float horizontalBars2 = mod(uv.y - (0.05 - thickness) * gridSize, gridSize);
  horizontalBars2 = remap(horizontalBars2,-gridSize,gridSize,0.,1.);
  horizontalBars2 = step(0.95,horizontalBars2);

  return (verticalBars1 * horizontalBars1) + (verticalBars2 * horizontalBars2);
}