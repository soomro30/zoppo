import lottie from 'lottie-web';
import Barba from 'barba.js';

module.exports =
class PageTransition {

	constructor () {
        Barba.Pjax.start();
        this._fadeTransition = Barba.BaseTransition.extend ({
            start: function () {
                Promise
                    .all([this.newContainerLoading, this.animOut()])
                    .then(this.animIn.bind(this));
            }
        })

        Barba.Pjax.getTransition = function() {
            /**
            * Here you can use your own logic!
            * For example you can use different Transition based on the current page or link...
            */

            return this._fadeTransition;
        };


        this._transitionOverlay = document.createElement('div');
        this._transitionOverlay.classList.add('transition-overlay');
        document.body.appendChild(this._transitionOverlay);
		this._path = '/assets/pagetransition.json'

        this._transitionData = {
        	container: this._transitionOverlay,
        	renderer: 'svg',
        	loop: false,
        	autoplay: false,
            autoloadSegments: false,
        	path: this._path,
            rendererSettings: {
                preserveAspectRatio:'none'
            }
        }

        this._pageTransition = lottie.loadAnimation (this._transitionData);
    }
    animOut () {
        return new Promise(function(resolve) {
            console.log('peggy');
            this._pageTransition.playSegments([[0,11]],true);
            this._pageTransition.onComplete = function() {
                resolve(true);
            }
        });
    }

    animIn () {
        window.scrollTo(0,0);

        // play the out transition
        this._pagetransition.playSegments([[25,54]],true);

        // immediately clear the old DOM
        this.done();
    }

}
