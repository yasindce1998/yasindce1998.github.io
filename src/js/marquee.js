export function initMarquee() {
    const marquee = document.querySelector('.marquee');
    if (!marquee) return;

    const track = marquee.querySelector('.marquee-track');
    if (!track) return;

    const content = track.innerHTML;
    track.innerHTML = content + content;
}
