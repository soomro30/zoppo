import ComponentsRegister from './components/ComponentRegister';
import SweetScroll from "sweet-scroll";
import ScrollTrigger from 'scrolltrigger-classes';
import enableInlineVideo from 'iphone-inline-video';

document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animations
    // Usage: add data-scroll on an html element to toggle the classes visible and invisible
    var trigger = new ScrollTrigger({
        offset: {
            x: 0,
            y: 100
        },
        centerVertical: true,
        once: true
    });
    
    // Activate SweetScroll
    const sweetScroll = new SweetScroll({
        trigger: "[data-scrollto]",
        outputLog: true,
    });

    const videoModal = document.querySelector('[data-videomodal]');
    if (videoModal) videoModal.classList.add('newsflash--open');

}, false);

// Branding
console.log('%c                       \n     FULLY STUDIOS     \n                       ', 'background: #5f11e8; color: #fff; font-family: monospace; font-size: 40px;');

// Easter stuff
const easterTrigger = function() {
    document.body.classList.add('easter');
}
const easterElem = document.getElementById('easter');
if (easterElem) {
    easterElem.addEventListener('click', easterTrigger, false);
}

// Fallback for WebKit Webview browsers
const iivVideos = document.querySelectorAll("video");
iivVideos.forEach(function(el) {
	enableInlineVideo(el);
});
