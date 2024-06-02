uniform sampler2D uTexture;
uniform float uProgress;
uniform vec3 uParticleColor;

void main(){
  vec4 textureColor = texture(uTexture,gl_PointCoord);
  float visible = smoothstep(0.2,0.3,uProgress);
  float alpha = textureColor.r;

  gl_FragColor = vec4(uParticleColor,alpha * visible);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}