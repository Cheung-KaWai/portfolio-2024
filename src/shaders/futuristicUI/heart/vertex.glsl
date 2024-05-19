varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;


void main(){
    // Define the beat parameters
  float beatFrequency = 2.0; // Frequency of the beats
  float beatDuration = 0.2; // Duration of a single beat
  float pauseDuration = 1.; // Duration of the pause

  // Create a repeating time pattern
  float cycleTime = beatDuration * 2.0 + pauseDuration;
  float timeInCycle = mod(uTime, cycleTime);

  // Calculate the heartbeat pattern
  float heartbeat = 0.0;
  if (timeInCycle < beatDuration) {
      heartbeat = abs(sin(timeInCycle * beatFrequency)) * 0.1;
  } else if (timeInCycle < beatDuration * 2.0) {
      heartbeat = abs(sin((timeInCycle - beatDuration) * beatFrequency)) * 0.1;
  }


 vec3 localposition = position * (1.0 + heartbeat);

 vec4 modelPosition = modelMatrix * vec4(localposition,1.);
 vec4 viewPosition = viewMatrix * modelPosition;
 vec4 projectedPosition = projectionMatrix * viewPosition;

 gl_Position = projectedPosition;

 vec4 modelNormal = modelMatrix * vec4(normal,0.);

 vUv = uv;
 vPosition = modelPosition.xyz;
 vNormal =  modelNormal.xyz;
}