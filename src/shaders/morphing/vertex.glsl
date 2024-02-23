varying vec2 vUv;

uniform float uPointSize;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  gl_PointSize = uPointSize;
  gl_PointSize *= (1.0 / - viewPosition.z);  

  vUv = uv;
}