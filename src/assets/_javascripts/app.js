import ComponentsRegister from './components/ComponentRegister';

// Scroll reveal animations
// Usage: add data-scroll on an html element to toggle the classes visible and invisible
import ScrollTrigger from 'scrolltrigger-classes';
document.addEventListener('DOMContentLoaded', function(){
    var trigger = new ScrollTrigger({
        offset: {
            x: 0,
            y: 100
          },
          centerVertical: true,
          once: true
    });
});

// Branding
console.log('%c                       \n     FULLY STUDIOS     \n                       ', 'background: #5f11e8; color: #fff; font-family: monospace; font-size: 40px;');
