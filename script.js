// 1. Time, Date, and Weather Widgets
function updateTime() {
    const now = new Date();
    
    // Format Time: HH:MM:SS AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeStr = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    const timeWidget = document.getElementById('time-widget');
    if (timeWidget) timeWidget.textContent = timeStr;
    
    // Format Date: MONTH/DAY/YEAR
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[now.getMonth()];
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    const dateStr = `${month}/${day}/${year}`;
    
    const dateWidget = document.getElementById('date-widget');
    if (dateWidget) dateWidget.textContent = dateStr;
}

// 2. Interactive Figma-Style Canvas Draggable Elements
function initDraggableCanvas() {
    const canvasBounds = document.getElementById('canvas-bounds');
    const cards = document.querySelectorAll('.draggable-card');
    
    if (!canvasBounds || cards.length === 0) return;

    let dragActive = false;
    let activeCard = null;
    let initialX = 0;
    let initialY = 0;
    let startX = 0;
    let startY = 0;
    let pointerId = null;

    // Load saved positions if any
    cards.forEach(card => {
        const savedPos = localStorage.getItem(`pos_${card.id}`);
        if (savedPos) {
            try {
                const { x, y } = JSON.parse(savedPos);
                card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                card.dataset.x = x;
                card.dataset.y = y;
            } catch (e) {
                resetCardPosition(card);
            }
        } else {
            resetCardPosition(card);
        }

        // Add selection and drag pointer listeners
        card.addEventListener('pointerdown', (e) => {
            // Ignore if clicked on buttons or input triggers
            if (e.target.closest('button') || e.target.closest('input') || e.target.closest('label')) {
                return;
            }

            // Bring to front
            cards.forEach(c => {
                c.classList.remove('selected');
                c.style.zIndex = 5;
            });
            card.classList.add('selected');
            card.style.zIndex = 10;

            dragActive = true;
            activeCard = card;
            pointerId = e.pointerId;
            card.setPointerCapture(pointerId);

            const transform = getTransformValues(card);
            initialX = transform.x;
            initialY = transform.y;
            startX = e.clientX;
            startY = e.clientY;
            
            e.preventDefault();
        });

        card.addEventListener('pointermove', (e) => {
            if (!dragActive || activeCard !== card || e.pointerId !== pointerId) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            let newX = initialX + dx;
            let newY = initialY + dy;

            // Contain in boundary box
            const boundsRect = canvasBounds.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const maxX = boundsRect.width - cardRect.width - 10;
            const maxY = boundsRect.height - cardRect.height - 10;

            newX = Math.max(10, Math.min(maxX, newX));
            newY = Math.max(10, Math.min(maxY, newY));

            card.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
            card.dataset.x = newX;
            card.dataset.y = newY;
            
            e.preventDefault();
        });

        const handlePointerUp = (e) => {
            if (dragActive && activeCard === card) {
                dragActive = false;
                activeCard = null;
                if (pointerId !== null) {
                    try {
                        card.releasePointerCapture(pointerId);
                    } catch (err) {}
                    pointerId = null;
                }
                
                // Save final position
                const currentPos = {
                    x: parseFloat(card.dataset.x || 0),
                    y: parseFloat(card.dataset.y || 0)
                };
                localStorage.setItem(`pos_${card.id}`, JSON.stringify(currentPos));
            }
        };

        card.addEventListener('pointerup', handlePointerUp);
        card.addEventListener('pointercancel', handlePointerUp);
    });

    // Helper to get raw CSS translate values
    function getTransformValues(el) {
        const style = window.getComputedStyle(el);
        const matrix = style.transform || style.webkitTransform;
        
        if (matrix && matrix !== 'none') {
            const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            if (matrixValues.length === 6) {
                // 2D matrix
                return { x: parseFloat(matrixValues[4]), y: parseFloat(matrixValues[5]) };
            } else if (matrixValues.length === 16) {
                // 3D matrix
                return { x: parseFloat(matrixValues[12]), y: parseFloat(matrixValues[13]) };
            }
        }
        return { x: 0, y: 0 };
    }

    // Fallback default coordinates
    function resetCardPosition(card) {
        let x = 40, y = 80;
        if (card.id === 'card-bio') {
            x = window.innerWidth > 768 ? 120 : 30;
            y = window.innerWidth > 768 ? 260 : 380;
        } else if (card.id === 'card-config') {
            x = window.innerWidth > 768 ? 580 : 30;
            y = window.innerWidth > 768 ? 120 : 700;
        }
        card.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        card.dataset.x = x;
        card.dataset.y = y;
    }
}

// 3. Simulated Cursors wandering inside Figma Canvas
function initSimulatedCursors() {
    const canvasBounds = document.getElementById('canvas-bounds');
    const cursors = [
        { el: document.getElementById('cursor-rust'), x: 200, y: 150, tx: 200, ty: 150, vx: 0, vy: 0, speed: 1.2 },
        { el: document.getElementById('cursor-k8s'), x: 450, y: 220, tx: 450, ty: 220, vx: 0, vy: 0, speed: 1.0 },
        { el: document.getElementById('cursor-ebpf'), x: 720, y: 180, tx: 720, ty: 180, vx: 0, vy: 0, speed: 1.5 }
    ];

    if (!canvasBounds || !cursors[0].el) return;

    // Set cursors to wander randomly inside bounds
    function updateWandering() {
        const bounds = canvasBounds.getBoundingClientRect();
        if (bounds.width < 100) return;

        cursors.forEach(c => {
            // If close to target, pick new random target
            const distToTarget = Math.hypot(c.tx - c.x, c.ty - c.y);
            if (distToTarget < 10 || Math.random() < 0.005) {
                c.tx = Math.random() * (bounds.width - 150) + 50;
                c.ty = Math.random() * (bounds.height - 80) + 40;
            }

            // Interpolate towards target
            c.x += (c.tx - c.x) * 0.02 * c.speed;
            c.y += (c.ty - c.y) * 0.02 * c.speed;

            c.el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
        });

        requestAnimationFrame(updateWandering);
    }

    // Start simulation
    updateWandering();
}

// 4. Config settings controls
function initConfigSettings() {
    // Theme Toggle Switch
    const themeSwitch = document.getElementById('theme-toggle-switch');
    if (themeSwitch) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            themeSwitch.checked = true;
        }

        themeSwitch.addEventListener('change', () => {
            if (themeSwitch.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // Font Style Toggle button (Classic vs Rubik Pixel font)
    const fontBtn = document.getElementById('font-style-btn');
    const nameClassic = document.getElementById('name-classic');
    const nameFancy = document.getElementById('name-fancy');

    if (fontBtn && nameClassic && nameFancy) {
        // Load saved choice
        const savedFont = localStorage.getItem('fontStyle') || 'CLASSIC';
        applyFontPreference(savedFont);

        fontBtn.addEventListener('click', () => {
            const currentFont = localStorage.getItem('fontStyle') || 'CLASSIC';
            const nextFont = currentFont === 'CLASSIC' ? 'PIXEL' : 'CLASSIC';
            applyFontPreference(nextFont);
        });

        function applyFontPreference(pref) {
            if (pref === 'PIXEL') {
                nameClassic.classList.add('hide');
                nameFancy.classList.remove('hide');
                fontBtn.textContent = 'CLASSIC';
                localStorage.setItem('fontStyle', 'PIXEL');
            } else {
                nameClassic.classList.remove('hide');
                nameFancy.classList.add('hide');
                fontBtn.textContent = 'PIXEL';
                localStorage.setItem('fontStyle', 'CLASSIC');
            }
        }
    }
}

// 5. CRT Terminal Observability Engine
function initCrtTerminal() {
    const consoleEl = document.getElementById('terminal-console');
    const textbox = document.getElementById('terminal-textbox');
    const caret = document.getElementById('terminal-caret');
    const chips = document.querySelectorAll('.terminal-chip');
    const trigger = document.getElementById('terminal-trigger');

    if (!consoleEl || !textbox || !caret) return;

    // Custom helper mirror to align caret perfectly inside text
    const mirror = document.createElement('span');
    mirror.style.visibility = 'hidden';
    mirror.style.position = 'absolute';
    mirror.style.whiteSpace = 'pre';
    mirror.style.font = 'inherit';
    mirror.style.letterSpacing = 'inherit';
    document.body.appendChild(mirror);

    function updateCaretPosition() {
        mirror.textContent = textbox.value;
        // Compute input styling to align mirror font parameters
        const style = window.getComputedStyle(textbox);
        mirror.style.fontSize = style.fontSize;
        mirror.style.fontFamily = style.fontFamily;
        mirror.style.fontWeight = style.fontWeight;
        
        const offsetLeft = mirror.getBoundingClientRect().width;
        caret.style.left = offsetLeft + 'px';
    }

    textbox.addEventListener('input', updateCaretPosition);
    textbox.addEventListener('keydown', (e) => {
        setTimeout(updateCaretPosition, 0);
    });

    // Focus input on console click
    consoleEl.parentElement.addEventListener('click', () => {
        textbox.focus();
    });

    // Suggestions chips handlers
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            textbox.value = cmd;
            updateCaretPosition();
            textbox.focus();
            
            // Execute command automatically
            handleCommandSubmission();
        });
    });

    // Talk to Agent button triggers terminal focus
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

    // Parse commands and execute
    textbox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCommandSubmission();
        }
    });

    function handleCommandSubmission() {
        const val = textbox.value.trim();
        if (!val) return;

        // Print user command line
        printLine(`visitor@yasin.security:~$ ${val}`, 'prompt-line');
        textbox.value = '';
        updateCaretPosition();

        // Process input
        processCommand(val);
    }

    // Prints line instantly
    function printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;
        return line;
    }

    // Simulates dynamic typewriter output
    async function printTypedResponse(lines) {
        textbox.disabled = true;
        const wrapper = document.createElement('div');
        wrapper.className = 'terminal-line assistant-response';
        consoleEl.appendChild(wrapper);

        for (let i = 0; i < lines.length; i++) {
            const lineContainer = document.createElement('div');
            wrapper.appendChild(lineContainer);
            
            const lineText = lines[i];
            // Render text characters one-by-one
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

    // Core Router for security agent replies
    async function processCommand(input) {
        const lower = input.toLowerCase();
        
        // Slash commands
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
            // Intelligent fallback responses based on queries
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

// 6. Smooth Scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 7. Mobile Hamburger Menu
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburgerBtn || !mobileOverlay) return;
    
    hamburgerBtn.addEventListener('click', () => {
        const isActive = hamburgerBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', isActive);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            hamburgerBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    initDraggableCanvas();
    initSimulatedCursors();
    initConfigSettings();
    initCrtTerminal();
    initSmoothScroll();
    initMobileMenu();
    
    // Update time clock every second
    setInterval(updateTime, 1000);
    
    // Update weather temperature slightly every 5 minutes (mock)
    setInterval(() => {
        const valEl = document.getElementById('temp-val');
        if (valEl) {
            const currentTemp = 24 + Math.floor(Math.random() * 5);
            valEl.textContent = `${currentTemp}°C`;
        }
    }, 300000);
});

// Console Easter Egg
console.log('%c👋 Hello, Developer!', 'font-size: 18px; font-weight: bold; color: #455ce9;');
console.log('%cWelcome to Yasin\'s secure agent console.', 'font-size: 13px; color: #6fa8dc;');
console.log('%cTry executing commands inside the page terminal for deep security auditing.', 'font-size: 13px; color: rgba(255,255,255,0.5);');
