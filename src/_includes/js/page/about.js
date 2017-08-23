var myIcons = new SVGMorpheus('#morphanim', {rotation:'none', easing: 'cubic-in-out', duration: 1000 } );
var animText = document.getElementById('morphanim__text');

var triggerDesktop = new mojs.Tween({
    delay: 2000,
    duration: 2000,
    onComplete: function onComplete() {
        animText.classList.remove('tablet');
        animText.classList.remove('mobile');
        myIcons.to('icon-desktop');
    }
});

var triggerTablet = new mojs.Tween({
    delay: 4000,
    duration: 2000,
    onComplete: function onComplete() {
        animText.classList.remove('mobile');
        animText.classList.add('tablet');
        myIcons.to('icon-tablet');
    }
});

var triggerMobile = new mojs.Tween({
    delay: 6000,
    duration: 2000,
    onComplete: function onComplete() {
        animText.classList.remove('tablet');
        animText.classList.add('mobile');
        myIcons.to('icon-mobile');
    }
});

var timeline = new mojs.Timeline({
    repeat:     999
});
timeline.add( triggerTablet, triggerMobile, triggerDesktop);
timeline.play();
