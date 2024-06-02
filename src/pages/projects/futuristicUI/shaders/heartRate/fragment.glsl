#include /src/shaders/helpers/functions.glsl;

varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2 uAspect;
uniform float uTime;
uniform vec3 uCornerColor;
uniform vec3 uGridColors;
uniform vec3 uBackgroundColor;
uniform vec3 uHeartRateColor;
uniform float uShow;

float udCos( in vec2 p, in float a, in float b, in float c, in float d )
{
    // convert all data to primitive cosine space where y(x) = w·cos(x)
    p = c*(p-vec2(d,a));
    float w = c*b;
    
    // reduce to principal half cycle
    const float TPI = 6.28318530718;
    p.x = mod( p.x, TPI); if( p.x>(0.5*TPI) ) p.x = TPI - p.x;

    // find zero of derivative (minimize distance)
    float xa = 0.0, xb = TPI;
    for( int i=0; i<8; i++ ) // bisection, 7 bits more or less
    {
        float x = 0.5*(xa+xb);
        float y = x-p.x+w* sin(x)*(p.y-w*cos(x));
        if( y<0.0 ) xa = x; else xb = x;
    }

    #if 0
    float x = 0.5*(xa+xb);
    #else
    // linear interpolation
    float ya = xa-p.x+w* sin(xa)*(p.y-w*cos(xa));
    float yb = xb-p.x+w* sin(xb)*(p.y-w*cos(xb));
    float x = xa + (xb-xa)*(0.0-ya)/(yb-ya);
    #endif
    
    for( int i=0; i<4; i++ ) // newtown-raphson
    {
        float si = sin(x);
        float co = cos(x);
        float  f = x - p.x + w*(p.y*si - w*si*co);
        float df = 1.0     + w*(p.y*co - w*(2.0*co*co-1.0));
        x = x - f/df;
    }
    
    // compute distance    
    vec2 q = vec2(x,w*cos(x));
    float r = length(p-q);
    
    // convert back to the non primitive cosine space 
    return r/c;
}

void main (){
  vec2 uv = vUv * uAspect;
  vec2 centeredUv = (vUv - 0.5) * uAspect;
  vec2 normalizeUv= (vUv-0.25) * uAspect * 2. -1.; // between -1. and 1.

  float linethickness = 0.02;
  float linethickness2 = 0.15;

  // corners border
  float leftBorder = 1.0 - step(linethickness, uv.x);
  float bottomBorder = 1.0 - step(linethickness, uv.y);
  float rightBorder = step(uAspect.x - linethickness, uv.x);
  float topBorder = step(uAspect.y - linethickness, uv.y);
  float border = leftBorder + bottomBorder + rightBorder + topBorder;
  border *= step(1.5,distance(centeredUv.x,0.)) * step(0.75,distance(centeredUv.y,0.));

  //grid
  vec2 cell = fract(centeredUv*4.);
  cell = abs(cell -0.5);
  float distToCell =1. - 2. * max(cell.x,cell.y);
  float cellLine = smoothstep(0.0,0.1,distToCell);
  cellLine = 1. - remap(cellLine,0.,1.,0.95,1.);
  cellLine = clamp(cellLine,0.,1.);
  cellLine = smoothstep(0.,0.5,cellLine);

  //shadertoy
  float t = uTime;
  float move =mod(t*0.5,3.);
  float ca = 0.0;// offset    (y position)
//   float cb =  pow((0.5-abs(vUv.x - 0.5 )),3.) * 10.; // amplitude (y scale)
  float cb =  smoothstep(-0.2,-0.5,abs(vUv.x - move + 0.2) - 0.5); // amplitude (y scale)
  float cc = 5.; // frequency (x scale)
  float cd = 0.;// phase     (x position)
    
  // sdf
  float d = udCos(normalizeUv, ca, cb, cc, cd );
  float heartbeat = exp(-1.0*abs(d));
  heartbeat = pow(heartbeat,30. + sin(uTime * 7.) * 10.);

  
//   float color = border + cellLine + heartbeat;
  float color =cellLine;
  vec3 colors = uBackgroundColor;
  colors = mix(uBackgroundColor,uCornerColor,clamp(border,0.,1.));
  colors = mix(colors,uGridColors,cellLine);
  colors = mix(colors,uHeartRateColor,clamp(heartbeat,0.,1.));

  if(uShow == 0.){
    discard;
  }


  gl_FragColor = vec4(colors, 1. * uShow);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
} 