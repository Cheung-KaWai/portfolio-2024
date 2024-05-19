varying vec2 vUv;
uniform float uTime;
uniform vec3 uCircleColor1;
uniform vec3 uCircleColor2;
uniform float uProgress;

#include ../../helpers/functions.glsl;


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
  uv *= rotate2d(uTime * 0.1 * PI * 2.);
  uv += vec2(0.5); 
  float line = abs(uv.x - uv.y) -0.1;
  line = smoothstep(0.,stepValue,line);

  // third circle
  float innerCircle3 = distance(vUv,vec2(0.5));
  innerCircle3 = abs(innerCircle3 - 0.3);
  innerCircle3 = 1. - smoothstep(0.,stepValue,innerCircle3);

  // rotation animation
  vec2 uv2 = vUv - vec2(0.5);
  uv2 *= rotate2d(-uTime * 0.02 * PI);
  uv2 += vec2(0.5); 
  float line2 = abs(uv2.x - uv2.y) -0.3;
  line2 = smoothstep(0.,stepValue,line2);


  //stripes
  float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 0.5) + 0.5;
  float strength = sin(angle * PI * 100.);
  strength = smoothstep(0.,stepValue,strength);

  float innerCircle4 = distance(vUv,vec2(0.5));
  innerCircle4 = abs(innerCircle4 - 0.276);
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
  ringPattern = 1.- smoothstep(0.,0.12,ringPattern);
  ringPattern *= ring3;

  // starting animation;
  float startAnimation = distance(vUv,vec2(0.5));
  float animationTime = remap(uProgress,0.,0.3,0.,1.);
  startAnimation = step(animationTime,startAnimation);


  float humanGroundFloor = clamp(innerCircle + innerCircle2 * line + innerCircle3 * line2  + innerCircle4 + ringPattern , 0.,1.);
  if(humanGroundFloor <= 0.01){
    discard;
  }

  vec3 color = mix(uCircleColor2,uCircleColor1,humanGroundFloor);
  // vec3 color = vec3(startAnimation);

  gl_FragColor= vec4(color,mix(humanGroundFloor,0.,startAnimation));
  // gl_FragColor= vec4(color,1.);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}