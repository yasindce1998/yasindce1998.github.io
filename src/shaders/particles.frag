varying float vAlpha;
varying float vSize;

void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;

    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, alpha);
}
