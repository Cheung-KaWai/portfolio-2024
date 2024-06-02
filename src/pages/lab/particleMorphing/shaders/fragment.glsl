varying vec2 vUv;
varying vec3 vColor;



void main(){
  vec2 uv = gl_PointCoord;
  float horizontalElipse=.5/(distance(vec2(uv.x,(uv.y-.5)*10.+.5),vec2(.5)));
  float verticalEllipse=.5/(distance(vec2((uv.x-.5)*10.+.5,uv.y),vec2(.5)));

  float aplha = verticalEllipse*horizontalElipse;
  gl_FragColor=vec4(vColor, aplha);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}