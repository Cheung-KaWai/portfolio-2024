varying vec2 vUv;
uniform float uTime;
uniform float uShow;
uniform vec3 uBorderColor;
uniform vec3 uDotsColor;
uniform vec3 uBackgroundColor;
#include ../../helpers/functions.glsl


float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}


void main(){

  // float shape = distance(vUv, vec2(0.5)) -0.45;
  // shape =  smoothstep(0.,0.01, abs(shape));
  // shape = 1. - shape;
  // shape = clamp(0.,1.,smoothstep(1.,0.995,shape)); 
  float shape = sdOctogon(vUv - 0.5,0.49);
  shape = abs(shape); 
  shape = smoothstep(0.,0.005,shape);
  shape = 1. - shape; 
  shape *= step(0.1,abs(vUv.x - 0.5));

  float glowLeft = distance(vUv, vec2(0,0.5));
  glowLeft = 1. - glowLeft;
  glowLeft = smoothstep(0.,10.,glowLeft);

  float glowRight = distance(vUv, vec2(1.,0.5));
  glowRight = 1. - glowRight;
  glowRight = smoothstep(0.,1.,glowRight);
  glowRight = pow(glowRight,4.);

  float glowBottom = distance(vUv, vec2(0.5,0));
  glowBottom = 1. - glowBottom;
  glowBottom = smoothstep(0.,1.3,glowBottom);
  glowBottom = pow(glowBottom,2.5 + sin(uTime) * 0.5);

  float glowCut =  sdOctogon(vUv - 0.5,0.46); 
  glowCut = smoothstep(0.,0.05,(glowCut));
  glowCut = 1. - glowCut; 

  // float glow = (glowCut * glowLeft )+ (glowCut * glowRight);
  float glow = glowCut * glowBottom ;

  float dots = abs(vUv.y - 0.5);
  dots = smoothstep(0.18,0.19,dots);
  dots = 1. - dots;
  
  float stripes = mod(vUv.y * 10.,1.) ;
  stripes = smoothstep(0.3,0.6,stripes) * smoothstep(0.9,0.6,stripes);

  float cutout = abs(vUv.x - 0.5);
  cutout = smoothstep(0.46  ,0.47 ,cutout);
  cutout = 1. - cutout;
  cutout *= smoothstep(0.41,0.42,abs(vUv.x -  0.5));

  dots *= stripes * cutout;
  dots = pow(dots,10.);

  float alpha = glow + shape + dots;
  


  vec3 color = mix(vec3(0.),uBorderColor,shape);
  color = mix(color,uBackgroundColor,glow);
  color = mix(color,uDotsColor,dots);
  // color = vec3(cutout);



  gl_FragColor = vec4(color, alpha * uShow);



  #include <tonemapping_fragment>
  #include <colorspace_fragment>   
}