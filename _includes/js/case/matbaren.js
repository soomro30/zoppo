{% include js/gsap-cubicbezier.js %}

// Init all code on document eady
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function(){

    //////////////////
    // CASE 2
    
    // Config
    var easeBounce = CubicBezier.config(0.2, 2, .3, .8);
    var t = 1.6;

    // Reset
    var reset_case2 = function(){
        TweenMax.set("#mbkz_bg", { rotationX:20, rotationZ:15, x:0, y:0, z:0 });
        TweenMax.set("#mbkz_menu", { rotationX:20, rotationZ:15, x:-3, y:-10, z:40 }); 
        TweenMax.set("#mbkz_side", { rotationX:20, rotationZ:15, x:-3, y:-20, z:60 });
        TweenMax.set("#mbkz_content", { rotationX:20, rotationZ:15, x:-10, y:-2, z:15 });
        TweenMax.set(".mbkz_textrow", { x:-5, y:-5 });
    }
    reset_case2();

    var start_case2 = function(){
        // console.log('start');
        TweenMax.to("#mbkz_bg", t, { rotationX:0, rotationZ:0, x:0, y:0, z:0, ease: easeBounce });
        TweenMax.to("#mbkz_menu", t, { rotationX:0, rotationZ:0, x:0, y:0, z:0, ease: easeBounce }); 
        TweenMax.to("#mbkz_side", t, { rotationX:0, rotationZ:0, x:0, y:0, z:0, ease: easeBounce });
        TweenMax.to("#mbkz_content", t, { rotationX:0, rotationZ:0, x:0, y:0, z:0, ease: easeBounce });

        TweenMax.staggerTo(".mbkz_textrow", 0.5, {x:0, y:0, ease:Back.easeOut}, 0.05);
        TweenMax.set("#mbkz_bg", { rotationX:20, rotationZ:15, x:0, y:0, z:0 });
    }

    var end_case2 = function() {
        // console.log('end');
        TweenMax.to("#mbkz_bg", t, { rotationX:20, rotationZ:15, x:0, y:0, z:0, ease: easeBounce });
        TweenMax.to("#mbkz_menu", t, { rotationX:20, rotationZ:15, x:-3, y:-10, z:40, ease: easeBounce }); 
        TweenMax.to("#mbkz_side", t, { rotationX:20, rotationZ:15, x:-3, y:-20, z:60, ease: easeBounce });
        TweenMax.to("#mbkz_content", t, { rotationX:20, rotationZ:15, x:-10, y:-2, z:15, ease: easeBounce });

        TweenMax.staggerTo(".mbkz_textrow", 0.5, {x:-5, y:-5, ease:Back.easeOut}, 0.05);
    }

    // Events
    var hover_case2 = false; // prevent from start multiple hover animations

    $('.cases__item--2').bind('touchstart mouseenter', function(e) {
        if ( !hover_case2 ) {
            start_case2();
            hover_case2 = true;
        }

    });

    $('.cases__item--2').bind('touchend mouseleave', function(e) {
        if ( hover_case2 ) {
            end_case2();
            hover_case2 = false;
        }
    });
});