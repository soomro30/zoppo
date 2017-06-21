{% include js/gsap-cubicbezier.js %}
{% include js/bodymovin.min.js %}

// Init all code on document eady
function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

// Create transition object
var transitionOverlay = document.createElement("div");
transitionOverlay.classList.add('transition-overlay');
document.body.appendChild(transitionOverlay);

ready(function(){

	// Fade images when loaded if they are inside an image-loader container
	// Transition using CSS in base.scss
	var imageLoaders = document.querySelectorAll('.image-loader img');

	imageLoaders.forEach(function(image) {
		image.style.opacity = 0;
		var imageObj = new Image();
		imageObj.onload = function(){
			image.style.opacity = 1;
		}
		imageObj.src = image.src;
	}, this);

	// Init logo anim
	var animData = {
        container: document.getElementById('logo_anim'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '../../assets/javascript/logo.json'
    };
    var anim = bodymovin.loadAnimation(animData);

	// Init page transition anim
	var transitionData = {
        container: transitionOverlay,
        renderer: 'svg',
        loop: false,
        autoplay: false,
		autoloadSegments: false,
        path: '../../assets/javascript/pagetransition.json',
		rendererSettings: { 
        	preserveAspectRatio:'none'
    	}
    };
    var pagetransition = bodymovin.loadAnimation(transitionData);

	anim.addEventListener('DOMLoaded',startLogoAnimation);
	bodymovin.setQuality(2);
	window.onresize = anim.resize.bind(anim);

	function startLogoAnimation(){
		anim.goToAndPlay(1, true);
		// pagetransition.goToAndPlay(1, true);
	}


	// menu functions
	function openMenu(){
		menutoggle.classList.add('menu-open');
		menu.classList.add('menu-open');
		startLogoAnimation();
		menuIsOpen = true;
	}
	function closeMenu(){
		menutoggle.classList.remove('menu-open');
		menu.classList.remove('menu-open');
		menuIsOpen = false;
	}
	var menutoggle = document.getElementById('openmenu');
	var menu = document.getElementById('menu');
	var menuIsOpen = false;
	menutoggle.addEventListener('click', function(e){
		e.preventDefault();
		menuIsOpen ? closeMenu() : openMenu();
	}, false);


	// Initialize barba.js
	Barba.Pjax.start();

	// simple fade animation
	var FadeTransition = Barba.BaseTransition.extend({
		/**
		 * [start function]
		 *
		 * This function is automatically called as soon the Transition starts
		 * this.newContainerLoading is a Promise for the loading of the new container
		 * (Barba.js also comes with an handy Promise polyfill!)
	
		 */
		start: function() {
			// As soon the loading is finished and the old page is faded out, let's fade the new page
			Promise
				.all([this.newContainerLoading, this.animOut()])
				.then(this.animIn.bind(this));
		},

		/**
		 * [animOut transition]
		 * @return { promise }
		 */
		animOut: function() {
			return new Promise(function(resolve) {
				pagetransition.playSegments([[0,11]],true);
				pagetransition.onComplete = function() {
					resolve(true);
				}
			});
		},
		/**
		 * [animIn transition]
		 * @return { promise }
		 */
		animIn: function() {
			window.scrollTo(0,0);
			closeMenu();

			// play the out transition
			pagetransition.playSegments([[25,54]],true);
			
			// immediately clear the old DOM
			this.done();
		}
	});

	/**
	 * Tell Barba to use the FadeTransition
	 */
	Barba.Pjax.getTransition = function() {
		/**
		* Here you can use your own logic!
		* For example you can use different Transition based on the current page or link...
		*/

		return FadeTransition;
	};

	// lory js ( image slider )

    var js_slider 		  = document.querySelector('.js_slider');
    var js_slides 		  = document.querySelector('.js_slides');  
	var dot_count         = js_slider.querySelectorAll('.js_slide').length;
	var dot_container     = js_slider.querySelector('.js_dots');
	var dot_list_item     = document.createElement('li');


	function handleDotEvent(e) {
	   	
	   console.log('handleDotEvent');

	   if (e.type === 'before.lory.init') {
	     for (var i = 0, len = dot_count; i < len; i++) {
	       var clone = dot_list_item.cloneNode();
	       dot_container.appendChild(clone);

	       // var iw = js_slider.getElementsByTagName('img');
	       // var iw = iw;
	       // console.log(iw);
	     }
	     dot_container.childNodes[0].classList.add('active');
	   }
	   if (e.type === 'after.lory.init') {
	     for (var i = 0, len = dot_count; i < len; i++) {
	       dot_container.childNodes[i].addEventListener('click', function(e) {
	         dot_navigation_slider.slideTo(Array.prototype.indexOf.call(dot_container.childNodes, e.target));
	       });
	     }
	   }
	   if (e.type === 'after.lory.slide') {
	     for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
	       dot_container.childNodes[i].classList.remove('active');
	     }
	     dot_container.childNodes[e.detail.currentSlide - 1].classList.add('active');
	   }
	   if (e.type === 'on.lory.resize') {
	       for (var i = 0, len = dot_container.childNodes.length; i < len; i++) {
	           dot_container.childNodes[i].classList.remove('active');
	       }
	       dot_container.childNodes[0].classList.add('active');
	   }
	}
	
	js_slider.addEventListener('before.lory.init', handleDotEvent);
	js_slider.addEventListener('after.lory.init', handleDotEvent);
	js_slider.addEventListener('after.lory.slide', handleDotEvent);
	js_slider.addEventListener('on.lory.resize', handleDotEvent);

	// js_slider.addEventListener('before.lory.init', handleVariableWidth);

	var dot_navigation_slider = lory(js_slider, {
	   infinite: 1,
	   enableMouseEvents: true,
	   ease: 'cubic-bezier(.17,.67,.38,1.03)'
	});

});