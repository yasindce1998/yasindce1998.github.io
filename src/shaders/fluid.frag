uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uScrollVelocity;

varying vec2 vUv;

#define PI 3.14159265359

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 6; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.08;
    float scrollEffect = uScrollVelocity * 0.5;

    vec2 mouse = uMouse * aspect;
    vec2 uvAspect = uv * aspect;
    float mouseDist = length(uvAspect - mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.15;
    vec2 distortedUV = uv + normalize(uvAspect - mouse + 0.001) * mouseInfluence;

    vec3 p1 = vec3(distortedUV * 3.0, t + scrollEffect);
    float n1 = fbm(p1);

    vec3 p2 = vec3(distortedUV * 3.0 + vec2(n1 * 1.5), t * 0.7);
    float n2 = fbm(p2);

    vec3 p3 = vec3(distortedUV * 4.0 + vec2(n2 * 0.8, n1 * 0.6), t * 0.5);
    float n3 = fbm(p3);

    float finalNoise = n1 * 0.3 + n2 * 0.4 + n3 * 0.3;
    finalNoise = finalNoise * 0.5 + 0.5;

    vec3 color1 = vec3(0.0, 0.0, 0.0);
    vec3 color2 = vec3(0.02, 0.02, 0.04);
    vec3 color3 = vec3(0.04, 0.02, 0.06);
    vec3 color4 = vec3(0.01, 0.03, 0.05);

    vec3 color = mix(color1, color2, smoothstep(0.2, 0.5, finalNoise));
    color = mix(color, color3, smoothstep(0.4, 0.7, finalNoise));
    color = mix(color, color4, smoothstep(0.6, 0.9, finalNoise));

    float gridX = abs(fract(uv.x * 60.0) - 0.5) * 2.0;
    float gridY = abs(fract(uv.y * 35.0) - 0.5) * 2.0;
    float grid = smoothstep(0.98, 1.0, gridX) + smoothstep(0.98, 1.0, gridY);
    color += vec3(0.015) * grid * (1.0 - finalNoise * 0.5);

    float vignette = 1.0 - length((uv - 0.5) * 1.6);
    vignette = smoothstep(0.0, 0.8, vignette);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}
