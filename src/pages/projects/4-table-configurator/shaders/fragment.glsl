#define PI 3.14159265359

varying vec2 vUv;
varying vec3 uNormal;
uniform float uProgress;
uniform float uLength;
uniform float uDepth;
uniform float uOffset;
uniform float uLengthTable;

uniform sampler2D uTexture;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main(){
  vec2 uv = vUv;
  float REPEAT = 1.;

  // repeat texture size
  uv = uv * REPEAT;
  
  // prevent stretch of textures on left and right side
  if(uNormal.x == 1. || uNormal.x == -1.){
    uv = rotate2d(-PI/2.) * uv; // rotate texture on left and right side

    // right side
    if(uNormal.x == 1.){
      uv.x = uv.x * -1.; // mirror the texture
      uv.x = uv.x + uDepth + uProgress ; // make the texture on the right side extend from the back and not front and make it connect with front face
      uv.y = uv.y + uOffset;
    } 

    //left side
    if(uNormal.x == -1.){
      uv.x = uv.x - uDepth - uProgress;; // make the texture on the left side extend from the back and not front and make it connect with front face
    }
  }
  // prevent stretch on the other sides
  else{
    uv.x = uv.x * (uLength * uProgress);  
  }

  // align top face with front face
  if(uNormal.y == 1.){
    uv.y = uv.y + uDepth + 0.5;
  }

  // align bottom face with front face 
  if(uNormal.y == -1.){
     uv.y = uv.y * -1.; // mirror the texture
     uv.y = uv.y - uDepth - 0.5;
  }

  if(uNormal.z == -1.){
    uv.x = uv.x * -1.;
  }


  vec3 wood = texture2D(uTexture,uv).rgb;

  gl_FragColor = vec4(wood,1.);
}