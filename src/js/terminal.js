export function initCrtTerminal() {
    const consoleEl = document.getElementById('terminal-console');
    const textbox = document.getElementById('terminal-textbox');
    const caret = document.getElementById('terminal-caret');
    const chips = document.querySelectorAll('.terminal-chip');
    const trigger = document.getElementById('terminal-trigger');

    if (!consoleEl || !textbox || !caret) return;

    const mirror = document.createElement('span');
    mirror.style.visibility = 'hidden';
    mirror.style.position = 'absolute';
    mirror.style.whiteSpace = 'pre';
    mirror.style.font = 'inherit';
    mirror.style.letterSpacing = 'inherit';
    document.body.appendChild(mirror);

    function updateCaretPosition() {
        mirror.textContent = textbox.value;
        const style = window.getComputedStyle(textbox);
        mirror.style.fontSize = style.fontSize;
        mirror.style.fontFamily = style.fontFamily;
        mirror.style.fontWeight = style.fontWeight;

        const offsetLeft = mirror.getBoundingClientRect().width;
        caret.style.left = offsetLeft + 'px';
    }

    textbox.addEventListener('input', updateCaretPosition);
    textbox.addEventListener('keydown', () => {
        setTimeout(updateCaretPosition, 0);
    });

    consoleEl.parentElement.addEventListener('click', () => {
        textbox.focus();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            textbox.value = cmd;
            updateCaretPosition();
            textbox.focus();
            handleCommandSubmission();
        });
    });

    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const termSec = document.getElementById('terminal-section');
            if (termSec) {
                termSec.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => textbox.focus(), 800);
            }
        });
    }

    textbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommandSubmission();
        }
    });

    function handleCommandSubmission() {
        const val = textbox.value.trim();
        if (!val) return;

        printLine(`visitor@yasin.security:~$ ${val}`, 'prompt-line');
        textbox.value = '';
        updateCaretPosition();
        processCommand(val);
    }

    function printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
        return line;
    }

    async function printTypedResponse(lines) {
        textbox.disabled = true;
        const wrapper = document.createElement('div');
        wrapper.className = 'terminal-line assistant-response';
        consoleEl.appendChild(wrapper);

        for (let i = 0; i < lines.length; i++) {
            const lineContainer = document.createElement('div');
            wrapper.appendChild(lineContainer);

            const lineText = lines[i];
            for (let charIndex = 0; charIndex < lineText.length; charIndex++) {
                lineContainer.textContent += lineText.charAt(charIndex);
                consoleEl.scrollTop = consoleEl.scrollHeight;
                await sleep(5 + Math.random() * 8);
            }
            await sleep(80);
        }

        textbox.disabled = false;
        textbox.focus();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function processCommand(input) {
        const lower = input.toLowerCase();

        if (lower.startsWith('/')) {
            const args = lower.split(' ');
            const cmd = args[0];

            switch(cmd) {
                case '/help':
                    await printTypedResponse([
                        "Available commands:",
                        "  /about      - Learn about Yasin's professional focus",
                        "  /projects   - List key container hardening & developer projects",
                        "  /tutorials  - List published deep dives & articles",
                        "  /contact    - Show mail inbox, GitHub link, and channels",
                        "  /theme      - Flip colors between Light (Stone) and Dark (Navy) modes",
                        "  /ping       - Test icmp connection trace to yasin.security node",
                        "  /version    - Print agent version code & build metadata",
                        "  /clear      - Flush terminal logs transcript",
                        "",
                        "Alternatively, ask any regular question to query the security agent."
                    ]);
                    break;
                case '/about':
                    await printTypedResponse([
                        "Mohammed Yasin — Software Engineer specializing in Cybersecurity, Cloud-native systems, and Blockchain.",
                        "Based in Bengaluru, India with 5+ years of experience across Linux kernel, eBPF telemetry, and smart bridges.",
                        "Core beliefs: Workload hardening requires deep integration with Linux Security Modules (LSM) rather than reactive logs monitoring."
                    ]);
                    break;
                case '/projects':
                    await printTypedResponse([
                        "Selected Work:",
                        "  - Kroger: Geospatial routing & zone management optimization built with Golang, YugaByte, and Redis.",
                        "  - P&G: Low-overhead video telemetry data ingestion using Golang with Apache Kafka.",
                        "  - Bank of America: High-availability container provisioning built using OpenShift, Tekton, and ArgoCD.",
                        "  - KubeArmor: Sandbox security enforcement utilizing BPF-LSM, AppArmor, and Linux eBPF telemetry hooks.",
                        "  - KubeDagger: Audit rootkit designed to pen-test and exploit Kubernetes container security vectors.",
                        "  - Warmor: Cross-platform enforcer combining eBPF probes with Rust WebAssembly filtering policies."
                    ]);
                    break;
                case '/tutorials':
                    await printTypedResponse([
                        "Published articles:",
                        "  [1] Hardening Kubernetes Workloads with AppArmor & BPF-LSM",
                        "  [2] Building High-Throughput Microservices in Golang with Kafka Ingestion",
                        "  [3] Syscall Monitoring and Workload Isolation using WebAssembly & Rust"
                    ]);
                    break;
                case '/contact':
                    await printTypedResponse([
                        "Inbox details & channels:",
                        "  Email:    yasindce1998@gmail.com",
                        "  LinkedIn: linkedin.com/in/mohammed-yasin-4660b9206",
                        "  GitHub:   github.com/yasindce1998",
                        "  Twitter:  x.com/yasindce1998",
                        "",
                        "Direct messages automatically trigger telegram alerts. I'll get back within 24 hours."
                    ]);
                    break;
                case '/theme':
                    const themeSwitch = document.getElementById('theme-toggle-switch');
                    if (themeSwitch) {
                        themeSwitch.checked = !themeSwitch.checked;
                        themeSwitch.dispatchEvent(new Event('change'));
                        await printTypedResponse([`[THEME] Style swapped to: ${themeSwitch.checked ? 'LIGHT MODE' : 'DARK MODE'}`]);
                    }
                    break;
                case '/ping':
                    printLine("PING yasin.security (127.0.0.1) 56(84) bytes of data.", 'system-line');
                    await sleep(300);
                    printLine("64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.11 ms", 'system-line');
                    await sleep(300);
                    printLine("64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.08 ms", 'system-line');
                    await sleep(150);
                    await printTypedResponse([
                        "--- yasin.security ping statistics ---",
                        "2 packets transmitted, 2 received, 0% packet loss, time 1003ms",
                        "rtt min/avg/max/mdev = 0.08/0.09/0.11/0.01 ms"
                    ]);
                    break;
                case '/version':
                    await printTypedResponse(["talk-to-yasin-agent · v1.0.0 · build a3e9c71 · Bengaluru"]);
                    break;
                case '/clear':
                    consoleEl.innerHTML = '';
                    printLine("[SYSTEM] Terminal transcript cleared.", 'system-line');
                    break;
                default:
                    await printTypedResponse([`Command not recognized: ${cmd}. Type /help for available options.`]);
            }
        } else {
            const text = lower;
            if (text.includes('kubearmor') || text.includes('cncf')) {
                await printTypedResponse([
                    "KubeArmor is a cloud-native runtime security enforcer that Yasin works on.",
                    "It blocks container activities at the system level (files, processes, networks) using Linux Security Modules (AppArmor, SELinux, BPF-LSM).",
                    "Yasin built low-overhead monitoring hooks and audit logging mechanisms inside the Golang core agent."
                ]);
            } else if (text.includes('ebpf') || text.includes('lsm') || text.includes('bpf')) {
                await printTypedResponse([
                    "eBPF (Extended Berkeley Packet Filter) allows running sandboxed programs in the Linux kernel without changing kernel code.",
                    "Yasin utilizes eBPF inside KubeArmor for audit logging and syscall monitoring, and inside Warmor for portable security policy filtering."
                ]);
            } else if (text.includes('warmor') || text.includes('wasm')) {
                await printTypedResponse([
                    "Warmor is a cross-platform enforcer created by Yasin.",
                    "It maps system call arguments captured by eBPF probes against WebAssembly compiled security profiles,",
                    "enabling lightning-fast policy execution independent of specific distribution kernels."
                ]);
            } else if (text.includes('golang') || text.includes('go')) {
                await printTypedResponse([
                    "Golang is Yasin's primary language for cloud infrastructures.",
                    "He used it at Kroger to scale geospatial zone services, at P&G for concurrent Kafka ingestion, and inside KubeArmor's central controller daemon."
                ]);
            } else if (text.includes('rust')) {
                await printTypedResponse([
                    "Yasin utilizes Rust for kernel-space integrations and WASM sandboxing.",
                    "His major Rust projects include the Warmor security parser engine, and smart blockchain Parachain nodes inside the Polkadot Substrate ecosystem."
                ]);
            } else if (text.includes('kubernetes') || text.includes('k8s') || text.includes('docker') || text.includes('container')) {
                await printTypedResponse([
                    "Yasin is highly experienced in Kubernetes workload security.",
                    "He specializes in designing least-permissive security scopes, sandboxing containers, auditing cluster configurations, and scripting automated CI/CD runners (Tekton/ArgoCD)."
                ]);
            } else if (text.includes('blockchain') || text.includes('polkadot') || text.includes('substrate')) {
                await printTypedResponse([
                    "In the blockchain space, Yasin built custom parachains in Substrate (Rust) and implemented consensus bridge protocols connecting EVM endpoints to Substrate runners."
                ]);
            } else {
                await printTypedResponse([
                    "Query registered.",
                    "As an automated security agent, I can confirm Mohammed Yasin is a specialist in cloud security, Golang concurrent backends, and Linux kernel programming.",
                    "Try typing '/about' or asking specific questions about: KubeArmor, eBPF, Rust, Golang, or Warmor."
                ]);
            }
        }
    }
}
