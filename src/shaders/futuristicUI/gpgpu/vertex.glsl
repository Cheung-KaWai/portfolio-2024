uniform vec2 uResolution;
uniform float uSize;
uniform sampler2D uParticlesTexture;
uniform float uTime;

attribute vec2 aParticlesUv;
attribute float aSize;

varying vec3 vColor;
varying float vRandom;

mat4 getRotationMatrixY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat4(
        c, 0.0, s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        -s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
}

void main()
{
    vec4 particle = texture(uParticlesTexture,aParticlesUv);

        // Compute rotation angle based on time
    float angle = uTime*0.2; // Adjust the speed by multiplying uTime by a constant if needed

    // Get the rotation matrix
    mat4 rotationMatrix = getRotationMatrixY(angle);

        // Apply rotation to the particle position
    vec4 rotatedPosition = rotationMatrix * vec4(particle.xyz, 1.0);


    // Final position
    vec4 modelPosition = modelMatrix * vec4(rotatedPosition.xyz, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    float sizeIn = smoothstep(0.,0.1,particle.a);
    float sizeOut = 1. - smoothstep(0.7,1.,particle.a);
    float size = min(sizeIn,sizeOut);

    // Point size
    gl_PointSize = uSize * uResolution.y * aSize * size;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = vec3(1.0);
    vRandom = aSize;
}