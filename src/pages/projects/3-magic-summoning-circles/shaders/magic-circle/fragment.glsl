varying vec2 vUv;
uniform sampler2D uOuterCircle;
uniform sampler2D uInnerCircle;
uniform sampler2D uCenterCircle;
uniform float uProgress;

void main(){
  vec2 uv = vUv;

  vec4 outerCircle = texture2D(uOuterCircle,uv);
  vec4 innerCircle = texture2D(uInnerCircle,uv);
  vec4 centerCircle = texture2D(uCenterCircle,uv);

  float circle = 1. - (outerCircle.r + innerCircle.r + centerCircle.r);
  float alphaCircle = (outerCircle.a + innerCircle.a + centerCircle.a);

  float alpha = alphaCircle * uProgress;

  csm_FragColor.a = alpha;
}