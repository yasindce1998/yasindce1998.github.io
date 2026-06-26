uniform float uTime;

varying float vAlpha;
varying float vSize;
varying vec3 vPosition;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    // Softer, glowier falloff
    float alpha = smoothstep(0.5, 0.05, dist) * vAlpha;

    // Gradient color based on position and time — cyan to purple
    float colorMix = sin(vPosition.x * 0.5 + vPosition.y * 0.3 + uTime * 0.2) * 0.5 + 0.5;
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    vec3 purple = vec3(0.66, 0.33, 0.97);
    vec3 color = mix(cyan, purple, colorMix);

    // Add outer glow ring
    float glow = smoothstep(0.5, 0.2, dist) * 0.3;
    color += glow * vec3(0.4, 0.2, 0.8);

    gl_FragColor = vec4(color, alpha);
}
