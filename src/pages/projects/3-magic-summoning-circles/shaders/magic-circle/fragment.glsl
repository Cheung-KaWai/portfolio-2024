varying vec2 vUv;
uniform sampler2D uWater;
uniform vec3 uColor;

void main(){
  vec2 uv = vUv;

  vec4 water = texture2D(uWater,uv);

  float circle = 1. - water.r;

  float alpha =water.a;

  csm_FragColor.a = alpha;
}