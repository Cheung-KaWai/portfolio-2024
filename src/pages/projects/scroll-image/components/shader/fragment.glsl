varying vec2 vUvCover;
uniform sampler2D uTexture; // texture


void main(){

  vec3 texture = vec3(texture(uTexture, vUvCover));

  gl_FragColor = vec4(texture,1.);
}