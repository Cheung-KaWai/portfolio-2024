varying vec2 vUv;
varying vec3 uNormal;
uniform float uProgress;
uniform float uLength;

void main(){
  vec3 scaledPosition = position;
  scaledPosition.x = scaledPosition.x * (uLength * uProgress);

  vec4 modelPosition = modelMatrix * vec4(scaledPosition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  uNormal = normalize(normal);
}