varying vec2 vUv;
uniform float uTime;
uniform float uShow;
uniform vec3 uBorderColor;

#include /src/shaders/helpers/functions.glsl;

void main(){

  float border = sdBox(vUv - 0.5,vec2(0.40,0.40));

  border = smoothstep(0.,.05,abs(border));
  border = pow(border,0.5);
  border = 0.04/border;

  border *= smoothstep(0.35,0.351,abs(vUv.y-0.5));
  // border 


  vec3 color = mix(vec3(0.),uBorderColor,border);

  gl_FragColor = vec4(color,border * uShow);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}