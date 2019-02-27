import "babel-polyfill";

import ComponentsRegister from './components/ComponentRegister';
import SweetScroll from "sweet-scroll";
import ScrollTrigger from 'scrolltrigger-classes';
import enableInlineVideo from 'iphone-inline-video';

import defaultHero from './news/fully-hero.js';
import threeHouses from './news/threeHouses.js';

document.addEventListener("DOMContentLoaded", () => {
    defaultHero();
    threeHouses();

    // Scroll reveal animations
    // Usage: add data-scroll on an html element to toggle the classes visible and invisible
    // If you wanna just use it once, add data-scroll="once". See more at https://github.com/terwanerik/ScrollTrigger/
    var trigger = new ScrollTrigger({
        offset: {
            x: 0,
            y: 100
        },
        centerVertical: true,
        once: false
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
console.log('%c                       \n     FULLY STUDIOS     \n                       ', 'background: #5f11e8; color: #fff; font-family: monospace; font-size: 30px;');

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

// Optimized event resize function
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

var optimizedResize = (function() {

    var callbacks = [],
        running = false;

    // fired on resize event
    function resize() {

        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }

    }

    // run the actual callbacks
    function runCallbacks() {

        callbacks.forEach(function(callback) {
            callback();
        });

        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {

        if (callback) {
            callbacks.push(callback);
        }

    }

    return {
        // public method to add additional callback
        add: function(callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        }
    }
}());

// start process
optimizedResize.add(function() {
    // console.log('Resource conscious resize callback!')
});