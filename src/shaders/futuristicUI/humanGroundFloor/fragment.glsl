varying vec2 vUv;
uniform float uTime;

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

  //octagon
  // float octagon = sdOctogon(vUv-0.5,0.35);
  // octagon = abs(octagon);
  // octagon =1. - smoothstep(0.,stepValue,octagon);

  //stripes
  float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (PI * 0.5) + 0.5;
  float strength = sin(angle * 100.0);
  strength = smoothstep(0.,stepValue,strength);

  float innerCircle4 = distance(vUv,vec2(0.5));
  innerCircle4 = abs(innerCircle4 - 0.275);
  innerCircle4 = 1. - smoothstep(0.,0.01,innerCircle4);
  innerCircle4 *= strength;


  float circleRingThickness=30.;
  float circleRadius = 0.35; // Set the radius of the circle
  float noIdea = 0.001; // Set the size of the dots
  float distanceToCenter = length(vUv - vec2(0.5)); // Distance to the center
  float innerCircle5 = abs(distanceToCenter - circleRadius); // Distance to the circle radius

  // Create a dotted line effect
  float ring = 1.0 - smoothstep(0.0, 0.1 , innerCircle5);
  float pattern = mod(floor(distanceToCenter / noIdea), circleRingThickness);
  float ringpattern = smoothstep(0.,30., pattern) * ring;
  // ringpattern = smoothstep(0.,0.1,ringpattern); 
  // ringpattern = smoothstep(,ringpattern);




  // if(innerCircle == 0.){
  //   discard;
  // }

  float humanGroundFloor = clamp(innerCircle + innerCircle2 * line + innerCircle3 * line2  + innerCircle4 + ringpattern, 0.,1.);

  gl_FragColor= vec4(vec3(humanGroundFloor),humanGroundFloor);
}