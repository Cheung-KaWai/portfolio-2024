varying vec2 vUv;
uniform vec4 grassParams;

void main(){
  int grassSegments = int(grassParams.x);
  int grassVertices = int(grassParams.y);
  float grassWidth = grassParams.z;
  float grassHeight = grassParams.w;

  // get vertix id, if it's greater or equal than the amount grassVertices then it's the other side
  int vertFB_ID = gl_VertexID % (grassVertices * 2);
  int vertID = vertFB_ID % grassVertices;

  // 0 = left, 1 = right
  int xTest = vertID & 0x1;
  int zTest = (vertFB_ID >= grassVertices) ? 1 : -1;
  float xSide = float(xTest);
  float zSide = float(zTest);
  float heightPercent = float(vertID - xTest) / (float(grassSegments) * 2.);

  float width = grassWidth;
  float height = grassHeight;

  float x = (xSide - 0.5) * width;
  float y = heightPercent * height;
  float z = 0.0;

  vec3 grassLocalposition = vec3(x,y,z);
  vec4 modelPosition = modelMatrix * vec4(grassLocalposition,1.);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}