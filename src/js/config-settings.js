export function initConfigSettings() {
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

    const fontBtn = document.getElementById('font-style-btn');
    const nameClassic = document.getElementById('name-classic');
    const nameFancy = document.getElementById('name-fancy');

    if (fontBtn && nameClassic && nameFancy) {
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
