varying vec2 vUv;
varying vec3 vColor;
varying vec4 vGrassData;

void main (){
  // depth to the grassblade
  float grassX = vGrassData.x;
  vec3 color = mix(vColor * 0.75, vColor, smoothstep(0.125, 0., abs(grassX)));

  gl_FragColor = vec4(color,1.);
}