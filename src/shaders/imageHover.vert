uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vWave;

void main() {
    vUv = uv;

    vec3 pos = position;

    float dist = length(uv - uMouse);
    float wave = sin(dist * 10.0 - uTime * 3.0) * 0.05 * uHover;
    wave *= smoothstep(1.0, 0.0, dist);

    pos.z += wave;
    vWave = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
