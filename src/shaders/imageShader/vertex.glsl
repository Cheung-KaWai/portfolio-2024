varying vec2 vUv;
uniform float uProgress;
uniform vec2 uPlaneAspect;
uniform vec2 uViewport;
uniform float uTime;
uniform vec3 uMeshPosition;
uniform float uHover;

#include ../helpers/functions.glsl;


void main(){
  vec3 newPosition = position;


  float viewportAspect = uViewport.x / uViewport.y;

  // Assuming a perspective camera with known FOV (fov) in radians
  float fov = radians(50.0); // Example FOV, you should use your actual FOV here

  // Calculate the horizontal FOV based on the aspect ratio of the viewport
  float horizontalFOV = 2.0 * atan(tan(fov / 2.0) * viewportAspect);

  // Calculate the distance from the camera to the plane
  // This formula is derived from trigonometry
  float distanceToPlane = abs((0.5 * uPlaneAspect.x) / tan(horizontalFOV / 2.0));

  // Calculate the z-position of the plane relative to the camera position
  // This ensures that the plane is positioned correctly in front of the camera
  float cameraToPlaneDistance = distanceToPlane - length(vec3(0.,0.,cameraPosition.z - uMeshPosition.z));

  // Update the z-position of the plane
  newPosition.z = -cameraToPlaneDistance;
  newPosition.x -= uMeshPosition.x;
  newPosition.y -= uMeshPosition.y;

  float animation =clamp(smoothstep((uProgress*4.) + 2.,(uProgress*4.),(uv.x + uv.y) + 2.  ),0.,1.);
  
  vec3 finalPosition = mix(position,newPosition,animation);
  vec4 modelPosition = modelMatrix * vec4(finalPosition, 1.);
  modelPosition.z = sin(modelPosition.x * 2. + uTime*5.) * 0.15 * uHover;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}