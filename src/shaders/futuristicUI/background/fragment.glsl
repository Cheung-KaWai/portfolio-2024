varying vec2 vUv;
uniform vec2 uResolution;
uniform vec3 uGridBackgroundColor;
uniform vec3 uGridlinesColor;

void main(){
  // make the uv resolution independent and center
  vec2 uv = (vUv - 0.5) * uResolution;

  // by using fract it generates a repeating cell that goes from [0, cellWidthPixels]
  vec2 cell = fract(uv / 30.);
  
  // center the cell and the values ranges from [0,0.5]
  cell = abs(cell -0.5);

  // calculate the distance to the cell by using multiplying by to 2 to set the range from [0,1] and taking the max and next inverting it with
  // 1. - so the outer lines are black
  float distToCell =1. - 2. * max(cell.x,cell.y);

  // create the fine lines by using smoothstep
  float cellLine = smoothstep(0.,0.02,distToCell);

  vec3 color = vec3(cellLine);
  color = mix(uGridlinesColor,uGridBackgroundColor,cellLine);

  gl_FragColor=vec4(color, 1.);
}