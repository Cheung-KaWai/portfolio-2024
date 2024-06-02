varying vec3 vColor;
uniform float uShow;
uniform vec3 uColor;
uniform vec3 uColor2;
varying float vRandom;

void main()
{
    float distanceToCenter = 1. - length(gl_PointCoord - 0.5);
    distanceToCenter = smoothstep(0.6,1., distanceToCenter);
    distanceToCenter = pow(distanceToCenter,4.);

    if(distanceToCenter==0.){
      discard;
    }
    vec3 color = vRandom >= 0.5 ? uColor: uColor2;
    
    gl_FragColor = vec4(color, distanceToCenter * uShow);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}