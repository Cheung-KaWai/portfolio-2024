varying vec2 vUv;


void main(){
  vec2 uv = gl_PointCoord;

  gl_FragColor=vec4(vec3(uv,1.), 1.);
}