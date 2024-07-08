varying vec2 vUv;
uniform sampler2D uWater;
uniform float uProgress;

void main(){
  vec2 uv = vUv;

  vec4 water = texture2D(uWater,uv);

  float circle = 1. - water.r;

  float alpha = water.a * uProgress;

  csm_FragColor.a = alpha;
}