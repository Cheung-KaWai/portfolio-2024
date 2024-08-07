varying vec2 vUv;
varying vec3 vColor;
varying vec4 vGrassData;
varying vec3 vNormal;
varying vec3 vWorldPosition;

vec3 hemiLight(vec3 normal, vec3 groundColor, vec3 skyColor){
  return mix(groundColor,skyColor,0.5 * normal.y +0.5);
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

// float saturate(float x) {
//   return clamp(x,0.,1.);
// }

vec3 lambertLight(vec3 normal, vec3 viewDir, vec3 lightDir, vec3 lightColour) {
  float wrap = 0.5;
  float dotNL = saturate((dot(normal, lightDir) + wrap) / (1.0 + wrap));
  vec3 lighting = vec3(dotNL);
  
  float backlight = saturate((dot(viewDir, -lightDir) + wrap) / (1.0 + wrap));
  vec3 scatter = vec3(pow(backlight, 2.0));

  lighting += scatter;

  return lighting * lightColour;  
}

vec3 phongSpecular(vec3 normal, vec3 lightDir, vec3 viewDir) {
  float dotNL = saturate(dot(normal, lightDir));
  
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 32.0);

  vec3 specular = dotNL * vec3(phongValue);

  return specular;
}

void main (){
  // depth to the grassblade
  float grassX = vGrassData.x;
  float grassY = vGrassData.y;

  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition -vWorldPosition);

  // hemi light
  vec3 c1 = vec3(1.,1.,0.75);
  vec3 c2 = vec3(0.05,0.05,0.25);

  vec3 ambientLighting = hemiLight(normal,c2,c1);

  // directional light
  vec3 lightDir = normalize(vec3(-1.,0.5,1.));
  vec3 lightColor = vec3(1.);
  vec3 diffuseLighting = lambertLight(normal,viewDir,lightDir,lightColor);

  // specular 
  vec3 specular = phongSpecular(normal, lightDir, viewDir);

  // fake ao
  float ao = remap(pow(grassY, 2.), 0.,1.,0.125,1.);

  vec3 lightning = diffuseLighting * 0.5 + ambientLighting * 0.5;

  vec3 baseColor = mix(vColor * 0.75, vColor, smoothstep(0.125, 0., abs(grassX)));
  vec3 color = baseColor * ambientLighting;
  color *=ao;
  // color = lightning;

  gl_FragColor = vec4(color,1.);
}