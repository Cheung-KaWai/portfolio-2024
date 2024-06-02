varying vec2 vUv;
varying float vProgress;

attribute float aSize;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;

  gl_PointSize=12.;
  gl_PointSize *= 1. / -viewPosition.z;
  gl_PointSize *= aSize * 30.;
}