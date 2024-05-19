varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uColor;
uniform float uFalloff;
uniform float uFresnelPower;
uniform float uFresnelAmount;
uniform float uProgress;

#include ../../helpers/functions.glsl


void main(){
  // normal
  vec3 normal = normalize(vNormal);

  if(!gl_FrontFacing){
    normal *= -1.;
  }

  // Compute transition based on uProgress
  float transition = clamp(smoothstep(0.0, 1.0, vUv.y - (1.0 - uProgress)),0.,1.);
  
  // fresnel
  vec3 viewDirection= normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) +1.;
  fresnel = pow(fresnel,uFresnelPower);

  // fallof
  float falloff = smoothstep(uFalloff,0., fresnel);

  float holographic = (fresnel * uFresnelAmount) * falloff;


  vec3 color = uColor;
  gl_FragColor = vec4(color,holographic * transition);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}