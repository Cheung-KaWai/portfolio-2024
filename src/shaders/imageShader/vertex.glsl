varying vec2 vUv;
uniform float uProgress;
uniform vec2 uPlaneAspect;
uniform vec2 uViewport;


void main(){
  vec3 newPosition = position;
  newPosition.xy /= uPlaneAspect;
  vec3 finalPosition = mix(position,newPosition, uProgress);
  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = mix(uv,uv / uPlaneAspect, uProgress);
}