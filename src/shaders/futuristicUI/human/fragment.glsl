varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uHolographicColor1;
uniform float uTime;

void main(){
  // normal
  vec3 normal = normalize(vNormal);

  if(!gl_FrontFacing){
    normal *= -1.;
  }

  //stripes
  float stripes = mod((vPosition.y - uTime * 0.2)  * 10.  ,1.);
  stripes = pow(stripes, 3.);

  // fresnel
  vec3 viewDirection= normalize(vPosition - cameraPosition);
  float fresnel = dot(viewDirection, normal) +1.;
  fresnel = pow(fresnel,2.);

  // fallof
  float falloff = smoothstep(0.8,0., fresnel);

  float holographic = fresnel * stripes;
  holographic += fresnel *2.;
  holographic *= falloff;

  vec3 color = uHolographicColor1;

  gl_FragColor = vec4(color,holographic);


  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}