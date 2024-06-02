varying vec2 vUv;
uniform vec3 uBorderColor;
uniform vec3 uBorderColor2;
uniform float uTime;
uniform float uShow;

#include /src/shaders/helpers/functions.glsl;

void main(){
  vec2 uv = vUv -0.5;
  float border = sdOctogon(uv, 0.495);
  border = 1. - smoothstep(0.,0.005,abs(border));
  border = clamp(border,0.,1.);
  border *= step(0.21,abs(uv.y));

  float border2 = sdOctogon(uv, 0.45);
  border2 = 1. - pow(smoothstep(0.,0.065,abs(border2)),0.5);
  border2 = pow(border2,3. + sin(uTime * 7.));

  float border3 = sdOctogon(uv, 0.41);
  border3 = 1. - smoothstep(0.,0.005,abs(border3));
  border3 *= step(0.34,abs(uv.y));
  border3 *= step(0.07,abs(uv.x));

  float totalBorder = border + border2 + border3;

  if(totalBorder == 0.){
    discard;
  }

  vec3 color = mix(vec3(0.),uBorderColor,clamp(border + border3,0.,1.));
  color = mix(color,uBorderColor2,border2);
  gl_FragColor = vec4(color,totalBorder * uShow);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}