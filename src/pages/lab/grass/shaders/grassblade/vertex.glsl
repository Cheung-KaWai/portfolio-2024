varying vec2 vUv;
uniform vec4 grassParams;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec3 hash( vec3 p ) 
{
	p = vec3(
        dot(p,vec3(127.1,311.7, 74.7)),
			  dot(p,vec3(269.5,183.3,246.1)),
			  dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

vec2 quickHash(float p){
  vec2 r = vec2(
    dot(vec2(p),vec2(17.43267,23.8934543)),
    dot(vec2(p),vec2(13.98342,37.2435343)));

  return fract(sin(r) * 1743.54892229);
}

float easeOut(float x, float t){
  return 1. - pow(1. - x, t);
}

mat3 rotateY(float theta) {
  float c = cos(theta);
  float s = sin(theta);
  return mat3(
      vec3(c, 0, s),
      vec3(0, 1, 0),
      vec3(-s, 0, c)
  );
}

vec3 bezier(vec3 P0, vec3 P1, vec3 P2, vec3 P3, float t) {
  return (1.0 - t) * (1.0 - t) * (1.0 - t) * P0 +
         3.0 * (1.0 - t) * (1.0 - t) * t * P1 +
         3.0 * (1.0 - t) * t * t * P2 +
         t * t * t * P3;
}

vec3 bezierGrad(vec3 P0, vec3 P1, vec3 P2, vec3 P3, float t) {
  return 3.0 * (1.0 - t) * (1.0 - t) * (P1 - P0) +
         6.0 * (1.0 - t) * t * (P2 - P1) +
         3.0 * t * t * (P3 - P2);
}

void main(){
  int grassSegments = int(grassParams.x);
  int grassVertices = (grassSegments + 1) * 2;
  float grassPatchSize = grassParams.y;
  float grassWidth = grassParams.z;
  float grassHeight = grassParams.w;
  
  //figure out grass offset
  vec2 hashedInstanceID = quickHash(float(gl_InstanceID)) *2. -1.;
  vec3 grassOffset = vec3(hashedInstanceID.x,0.,hashedInstanceID.y) * grassPatchSize;

  //rotation
  const float PI = 3.14159;
  vec3 grassBladeWorldPos = (modelMatrix * vec4(grassOffset, 1.)).xyz;
  vec3 hashVal = hash(grassBladeWorldPos);
  float angle = remap(hashVal.x,-1.,1.,PI,-PI);
  mat3 grassMat = rotateY(angle);

  // get vertix id, if it's greater or equal than the amount grassVertices then it's the other side
  int vertFB_ID = gl_VertexID % (grassVertices * 2);
  int vertID = vertFB_ID % grassVertices;

  // 0 = left, 1 = right
  int xTest = vertID & 0x1;
  int zTest = (vertFB_ID >= grassVertices) ? 1 : -1;
  float xSide = float(xTest);
  float zSide = float(zTest);
  float heightPercent = float(vertID - xTest) / (float(grassSegments) * 2.);

  float width = grassWidth * easeOut((1. - heightPercent),3.);
  float height = grassHeight;

  float x = (xSide - 0.5) * width;
  float y = heightPercent * height;
  float z = 0.0;

  
  // bezier curve
  float leanFactor = remap(hashVal.y, -1.,1.,0.,0.5);
  vec3 p1 = vec3(0.);
  vec3 p2 = vec3(0.,0.33,0.);
  vec3 p3 = vec3(0.,0.66,0.);
  vec3 p4 = vec3(0.,cos(leanFactor),sin(leanFactor));
  vec3 curve = bezier(p1,p2,p3,p4,heightPercent);
  y = curve.y * height;
  z = curve.z *height;


 


  vec3 grassLocalposition = grassMat * vec3(x,y,z) + grassOffset;
  vec4 modelPosition = modelMatrix * vec4(grassLocalposition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}