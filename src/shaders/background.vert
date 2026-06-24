uniform float uTime;
uniform float uScrollProgress;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    float displacement = sin(pos.x * 3.0 + uTime * 0.5) * cos(pos.y * 2.0 + uTime * 0.3) * 0.1;
    displacement += sin(pos.x * 5.0 - uTime * 0.2) * 0.05;
    pos.z += displacement * (1.0 + uScrollProgress * 0.5);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
