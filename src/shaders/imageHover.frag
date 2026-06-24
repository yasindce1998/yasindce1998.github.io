uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vWave;

void main() {
    vec2 uv = vUv;

    float dist = length(uv - uMouse);
    float distortion = smoothstep(0.8, 0.0, dist) * uHover * 0.03;
    uv += distortion * normalize(uv - uMouse);

    float rgbShift = uHover * 0.01 * smoothstep(0.5, 0.0, dist);
    vec4 r = texture2D(uTexture, uv + vec2(rgbShift, 0.0));
    vec4 g = texture2D(uTexture, uv);
    vec4 b = texture2D(uTexture, uv - vec2(rgbShift, 0.0));

    vec4 color = vec4(r.r, g.g, b.b, g.a);

    float brightness = 1.0 + uHover * 0.1;
    color.rgb *= brightness;

    gl_FragColor = color;
}
