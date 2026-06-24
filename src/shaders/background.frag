uniform float uTime;
uniform float uScrollProgress;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec2 uv = vUv;

    float pattern = sin(vPosition.x * 20.0 + uTime) * sin(vPosition.y * 20.0 + uTime * 0.5);
    pattern = smoothstep(0.0, 0.02, abs(pattern));

    vec3 color = vec3(0.02);
    color = mix(vec3(0.04, 0.02, 0.06), color, pattern);

    float edgeFade = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x) *
                     smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
    color *= edgeFade;

    gl_FragColor = vec4(color, 0.3);
}
