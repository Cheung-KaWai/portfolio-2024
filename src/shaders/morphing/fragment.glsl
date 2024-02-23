varying vec2 vUv;


void main(){
  vec2 uv = gl_PointCoord;
  float aplha = 0.05 /  length(uv-0.5) - 0.1;
  gl_FragColor=vec4(vec3(1.), aplha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}