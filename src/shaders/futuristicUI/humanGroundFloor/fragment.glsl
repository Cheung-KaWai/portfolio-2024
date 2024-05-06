varying vec2 vUv;
uniform float uTime;
uniform vec3 uCircleColor1;
uniform vec3 uCircleColor2;

#include ../../helpers/functions.glsl


void main(){
  float stepValue = 0.01;

  // first circle
  float innerCircle = distance(vUv,vec2(0.5));
  innerCircle = abs(innerCircle - 0.2);
  innerCircle = 1. - smoothstep(0.,stepValue,innerCircle);


  // second circle
  float innerCircle2 = distance(vUv,vec2(0.5));
  innerCircle2 = abs(innerCircle2 - 0.25);
  innerCircle2 = 1. - smoothstep(0.,stepValue,innerCircle2);

  // rotation animation
  vec2 uv = vUv - vec2(0.5);
  uv *= rotate2d(sin(uTime * 0.1) * PI * 2.);
  uv += vec2(0.5); 
  float line = abs(uv.x - uv.y) -0.1;
  line = smoothstep(0.,stepValue,line);

  // third circle
  float innerCircle3 = distance(vUv,vec2(0.5));
  innerCircle3 = abs(innerCircle3 - 0.3);
  innerCircle3 = 1. - smoothstep(0.,stepValue,innerCircle3);

  // rotation animation
  vec2 uv2 = vUv - vec2(0.5);
  uv2 *= rotate2d(-sin(uTime * 0.02) * PI);
  uv2 += vec2(0.5); 
  float line2 = abs(uv2.x - uv2.y) -0.3;
  line2 = smoothstep(0.,stepValue,line2);


  //stripes
  float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 0.5) + 0.5;
  float strength = sin(angle * PI * 20.);
  strength = smoothstep(0.,stepValue,strength);

  float innerCircle4 = distance(vUv,vec2(0.5));
  innerCircle4 = abs(innerCircle4 - 0.275);
  innerCircle4 = 1. - smoothstep(0.,0.01,innerCircle4);
  innerCircle4 *= strength;


  // thick ring pattern effect
  float ring =  distance(vUv,vec2(0.5));
  ring = clamp(0.,1. ,mod(ring * 20., 1. ));
  float ring1 = smoothstep(0.1,1.,ring);
  float ring2 = smoothstep(1., 0., ring);
  float ring3 = clamp(0.,1.,ring1 * ring2 * 10.);
  float ringPattern = distance(vUv,vec2(0.5));
  ringPattern = abs(ringPattern - 0.3);
  ringPattern = 1.- smoothstep(0.,0.14,ringPattern);
  ringPattern *= ring3;




  // if(innerCircle == 0.){
  //   discard;
  // }

  float humanGroundFloor = clamp(innerCircle + innerCircle2 * line + innerCircle3 * line2  + innerCircle4 + ringPattern, 0.,1.);
  vec3 color = mix(uCircleColor2,uCircleColor1,humanGroundFloor);

  gl_FragColor= vec4(color,humanGroundFloor);
}