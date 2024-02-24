varying vec2 vUv;
varying vec3 vColor;



void main(){
  vec2 uv = gl_PointCoord;
  float aplha = 0.05 /  length(uv-0.5) - 0.1;
  gl_FragColor=vec4(vColor, aplha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}