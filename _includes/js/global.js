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

});