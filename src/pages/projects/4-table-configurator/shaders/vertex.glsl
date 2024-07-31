varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
uniform float uProgress;
uniform float uLength;
uniform float uDepth;

void main(){
  vec3 scaledPosition = position;
  scaledPosition.x = scaledPosition.x * (uLength * uProgress);

  float percentage = scaledPosition.z / uDepth;
  vec3 inverDirection = normalize(-normal);
  inverDirection.z = 0.;

  if(scaledPosition.z == 0.){
    scaledPosition = scaledPosition + inverDirection * 0.03;
  }
  else if(percentage <= 1.){
    scaledPosition = scaledPosition + inverDirection * 0.03  * (1. - percentage);
  }


  vec4 modelPosition = modelMatrix * vec4(scaledPosition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  vNormal = normalize(normal);
  vPosition = scaledPosition;
}