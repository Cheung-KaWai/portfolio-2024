#include ../helpers/functions.glsl

attribute vec3 aPositionTarget;
attribute float aPointSize;

varying vec2 vUv;
varying vec3 vColor;

uniform float uPointSize;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform bool uAnimate;


void main(){

  float noiseOrigin = simplexNoise3d(position * 0.2);
  float noiseTarget = simplexNoise3d(aPositionTarget * 0.2);
  float noise = mix(noiseOrigin, noiseTarget, uProgress);
  noise = smoothstep(-1.,1.,noise);

  float duration = 0.6;
  float delay = (1. - duration) * noise;
  float end = duration + delay;
  float progress =smoothstep(delay,end, uProgress);


  vec3 mixPosition = mix(position,aPositionTarget,progress);
  if(uAnimate){
    mixPosition.x +=  tan((uTime + aPointSize + noise)*0.5) * noise; 
  }

  vec4 modelPosition = modelMatrix * vec4(mixPosition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  gl_PointSize = uPointSize * aPointSize;
  gl_PointSize *= (1.0 / - viewPosition.z);  

  vUv = uv;
  vColor= mix(uColorA,uColorB,noise);
}