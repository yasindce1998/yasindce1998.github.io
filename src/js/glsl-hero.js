const VERTEX_SHADER = `#version 300 es
in vec2 aPosition;
void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

out vec4 fragColor;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.15;

    // Mouse distortion
    vec2 mouse = uMouse * aspect;
    vec2 uvAspect = uv * aspect;
    float mouseDist = length(uvAspect - mouse);
    float mouseInfluence = smoothstep(0.35, 0.0, mouseDist) * 0.08;
    vec2 distortedUV = uv + normalize(uvAspect - mouse + 0.001) * mouseInfluence;

    // Fluid noise
    vec2 q = distortedUV * 3.0;
    float n1 = fbm(q + vec2(t, t * 0.7));
    float n2 = fbm(q + vec2(n1 * 1.2, t * 0.5));
    float n = fbm(q + vec2(n2 * 0.9, n1 * 0.8));

    // Dark palette
    vec3 color = mix(vec3(0.0), vec3(0.06), n);
    color += vec3(0.02) * smoothstep(0.4, 0.6, n2);

    // Faint grid lines
    vec2 grid = fract(uv * vec2(40.0, 25.0));
    float line = step(0.97, grid.x) + step(0.97, grid.y);
    color += vec3(0.012) * line;

    // Vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.4);
    vignette = smoothstep(0.0, 0.7, vignette);
    color *= vignette;

    fragColor = vec4(color, 1.0);
}`;

export function initGlslHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;';
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) return;

    function createShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uMouse = gl.getUniformLocation(program, 'uMouse');

    let mouseX = 0.5, mouseY = 0.5;
    let smoothMouseX = 0.5, smoothMouseY = 0.5;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resize);
    resize();

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = 1.0 - (e.clientY - rect.top) / rect.height;
    });

    const startTime = performance.now();
    let animId;

    function render() {
        const elapsed = (performance.now() - startTime) / 1000;

        smoothMouseX += (mouseX - smoothMouseX) * 0.03;
        smoothMouseY += (mouseY - smoothMouseY) * 0.03;

        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, smoothMouseX, smoothMouseY);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animId = requestAnimationFrame(render);
    }

    render();
}
