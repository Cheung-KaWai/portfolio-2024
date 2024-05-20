varying vec2 vUv;
uniform float uTime;
uniform float uShow;
uniform vec3 uBrainColor;
#include ../../helpers/functions.glsl

void main(){
  float progress = smoothstep(-1.,1.,sin(vUv.x*8. + uTime * 2.));
  progress = clamp(0.,1.,progress);

  float side1 = (0.5 - abs(vUv.y - 0.5));
  float side2 = abs(vUv.y -0.5);
  float effect=side2*side1 * 1.5;

  vec3 finalColor = mix(uBrainColor,uBrainColor* 0.1 ,progress);
  float hideCorners =  smoothstep(0.,0.1,vUv.x);
  float hideCorners2 =  smoothstep(1.,0.9,vUv.x);
  gl_FragColor = vec4(finalColor, hideCorners * hideCorners2 *effect* uShow);



  #include <tonemapping_fragment>
  #include <colorspace_fragment>   
}