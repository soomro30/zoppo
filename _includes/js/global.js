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
	anim.addEventListener('DOMLoaded',startLogoAnimation);
	bodymovin.setQuality(2);
	window.onresize = anim.resize.bind(anim);

	function startLogoAnimation(){
		anim.goToAndPlay(1, true);
	}

	// menu function
	var menutoggle = document.getElementById('openmenu');
	var menu = document.getElementById('menu');
	var menuIsOpen = false;
	menutoggle.addEventListener('click', function(e){
		e.preventDefault();
		console.log(e);
		if (menuIsOpen) {
			menutoggle.classList.remove('menu-open');
			// menutoggle.classList.add('menu-closed');
			menu.classList.remove('menu-open');
			// menu.classList.add('menu-closed');
			// document.body.classList.remove('menu-open');
		} else {
			// menutoggle.classList.remove('menu-closed');	
			menutoggle.classList.add('menu-open');
			// menu.classList.remove('menu-closed');
			menu.classList.add('menu-open');
			// document.body.classList.add('menu-open');
			startLogoAnimation();
		}
		menuIsOpen = !menuIsOpen;
		console.log(menuIsOpen);
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

			var deferred = Barba.Utils.deferred();

			/**
			 * Animate out the old container 
			 * this.oldContainer is the HTMLElement of the old Container
			 */
			TweenMax.to(this.oldContainer, 0.2, {
				opacity: 0,
				onComplete: function() {
					deferred.resolve();
				}
			});

			return deferred.promise;
		},
		/**
		 * [animIn transition]
		 * @return { promise }
		 */
		animIn: function() {
			var _this = this;
			var newCont = this.newContainer;

			// Hide the old container
			this.oldContainer.style.display = "none";

			// Set the new container's start values
			TweenMax.set(newCont, { visibility: 'visible', opacity:0 });

			// Animate in the new container
			TweenMax.to(newCont, 0.2, {
				opacity: 1,
				onComplete: function() {
					// .done() will automatically remove the old Container from the DOM 
					_this.done();
				}
			});
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