uniform float uTime;
uniform float uScrollVelocity;
uniform vec2 uMouse;

attribute float aSize;
attribute float aSpeed;
attribute float aOffset;

varying float vAlpha;
varying float vSize;

void main() {
    vec3 pos = position;

    float t = uTime * aSpeed + aOffset;
    pos.x += sin(t * 0.5) * 0.3;
    pos.y += cos(t * 0.3) * 0.2 + uScrollVelocity * 0.01;
    pos.z += sin(t * 0.7) * 0.15;

    vec2 mouse3D = uMouse * 2.0 - 1.0;
    float mouseDist = length(pos.xy - mouse3D * 3.0);
    float mouseRepel = smoothstep(1.5, 0.0, mouseDist) * 0.5;
    pos.xy += normalize(pos.xy - mouse3D * 3.0 + 0.001) * mouseRepel;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float distToCamera = -mvPosition.z;

    vAlpha = smoothstep(8.0, 2.0, distToCamera) * 0.6;
    vSize = aSize * (300.0 / distToCamera);

    gl_PointSize = vSize;
    gl_Position = projectionMatrix * mvPosition;
}
