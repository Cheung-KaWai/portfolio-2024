#include ../../helpers/functions.glsl;

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

attribute vec3 aPositionHuman;
attribute float aSize;
attribute float aTimeMultiplier;

void main(){
  float progress = uProgress * aTimeMultiplier;
  vec3 newPosition = mix(position,aPositionHuman,clamp(remap(progress,0.7,1.,0.,1.),0.,1.));

  float scalingProgress = remap(progress,0.,0.5,0.,1.);
  scalingProgress = clamp(scalingProgress,0.,1.);


  vec4 modelPosition = modelMatrix * vec4(newPosition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  gl_PointSize=uSize * uResolution.y * aSize * scalingProgress;
  gl_PointSize *= 1. / -viewPosition.z;
}