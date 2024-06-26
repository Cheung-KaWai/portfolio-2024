#include /src/shaders/helpers/functions.glsl;
#include helpers.glsl;

varying vec2 vUv;
uniform vec2 uResolution;
uniform vec3 uGridBackgroundColor;
uniform vec3 uGridlinesColor;
uniform vec3 uDotColor;
uniform float uGridSize;

void main(){
  // make the uv resolution independent and center
  vec2 uv = (vUv - 0.5) * uResolution;

  // by using fract it generates a repeating cell that goes from [0, cellWidthPixels]
  vec2 cell = fract(uv / uGridSize);
  vec2 cell2 = fract(uv / 50.);
  
  // center the cell and the values ranges from [0,0.5]
  cell = abs(cell -0.5);

  // calculate the distance to the cell by using multiplying by to 2 to set the range from [0,1] and taking the max and next inverting it with
  // 1. - so the outer lines are black
  float distToCell =1. - 2. * max(cell.x,cell.y);

  float circle = distance(vec2(cell.x,cell.y),vec2(0.5));
  circle = 0.002/circle;
  // circle = smoothstep(0.8,1.,circle);
  // circle = 0.2/circle;
  // circle = smoothstep(0.1,1.,circle);

  float circle2 = distance(vec2(cell2.x,cell2.y),vec2(0.5));
  circle2 = smoothstep(0.,0.05,circle2);
  

  // create the fine lines by using smoothstep
  float cellLine = smoothstep(0.,0.02,distToCell);
  cellLine = remap(cellLine,0.,1.,0.95,1.);

  // cross sign on intersection of the grid
  float crosses = clamp(generateCrossOnGrid(uv,uGridSize, 0.01),0.,1.);
  crosses = remap(crosses,0.,1.,0.,0.05);
  

  vec3 color = mix(uGridlinesColor,uGridBackgroundColor,cellLine);
  color = mix(color,uGridlinesColor,crosses);
  // color = mix(color,uGridlinesColor,circle);
  color = mix(uDotColor,color,circle2);
  // gl_FragColor=vec4(vec3(crosses), 1.);
  // gl_FragColor=vec4(vec3(circle2), 1.);
  gl_FragColor=vec4(color, 1.);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}