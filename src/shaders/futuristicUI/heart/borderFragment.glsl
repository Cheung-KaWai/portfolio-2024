varying vec2 vUv;
uniform vec3 uBorderColor;
uniform vec3 uBorderColor2;

#include ../../helpers/functions.glsl;

void main(){
  vec2 uv = vUv -0.5;
  float border = sdOctogon(uv, 0.495);
  border = 1. - smoothstep(0.,0.005,abs(border));
  border = clamp(border,0.,1.);
  border *= step(0.21,abs(uv.y));

  float border2 = sdOctogon(uv, 0.45);
  border2 = 1. - pow(smoothstep(0.,0.065,abs(border2)),0.5);
  border2 = pow(border2,3.);

  float border3 = sdOctogon(uv, 0.41);
  border3 = 1. - smoothstep(0.,0.005,abs(border3));
  border3 *= step(0.34,abs(uv.y));
  border3 *= step(0.07,abs(uv.x));
  // border3 = remap(border3,0.,1.,0.,0.3);

  float totalBorder = border + border2 + border3;

  // border = abs(border);
  // border = smoothstep(0.,1.,border);

  vec3 color = mix(vec3(0.),uBorderColor,clamp(border + border3,0.,1.));
  color = mix(color,uBorderColor2,border2);
  gl_FragColor = vec4(color,totalBorder);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}