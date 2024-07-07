#include ./noise.glsl;
attribute vec4 tangent;
uniform float uStrength;

float getWobble (vec3 position){
  float wobble = simplexNoise4D(vec4(position,0.)) * uStrength;

  return wobble;
}

void main() {

  float wobble =getWobble(csm_Position);

  vec3 biTan = cross(normal, tangent.xyz);

  float shift = 0.01;

  vec3 posA = csm_Position + tangent.xyz * shift;
  vec3 posB = csm_Position + biTan * shift;

  csm_Position += wobble * normal;

  posA += getWobble(posA) * normal;
  posB += getWobble(posB) * normal;

  //compute normal
  vec3 toA = normalize(posA - csm_Position);
  vec3 toB = normalize(posB - csm_Position);

  csm_Normal = cross(toA,toB);
}