varying vec2 vUv;
uniform sampler2D uImage;
uniform vec2 uImageResolution;
uniform vec2 uPlaneAspect;

void main (){

  float imageAspect = uImageResolution.x / uImageResolution.y;
  float planeAspect = uPlaneAspect.x / uPlaneAspect.y;

  vec2 uv = vUv;

   if (imageAspect > planeAspect) {
    float scale = planeAspect / imageAspect;
    uv.x = uv.x * scale + (1.0 - scale) * 0.5;
  } else {
    float scale = imageAspect / planeAspect;
    uv.y = uv.y * scale + (1.0 - scale) * 0.5;
  }


  vec3 image = texture2D(uImage,uv).xyz;
  vec3 color = vec3(0.5);

  gl_FragColor = vec4(image,1.);
}