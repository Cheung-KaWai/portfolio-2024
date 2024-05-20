varying vec2 vUv;
uniform float uTime;
uniform float uShow;
uniform vec3 uColor;

#include ../../helpers/functions.glsl

void main(){
  float circle = distance(gl_PointCoord, vec2(0.5));
  circle = 0.02 / circle;
  circle = smoothstep(0.1,1.,circle);

  gl_FragColor = vec4(uColor,circle * uShow);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}