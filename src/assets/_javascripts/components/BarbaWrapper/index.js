import Barba from 'barba.js';
import PageTransition from './../PageTransition';

module.exports =
class BarbaWrapper {
	constructor () {
		this._pageTransition = new PageTransition;
		
		Barba.Pjax.start ();
		this._fadeTransition = Barba.BaseTransition.extend ({
			start: function () {
				Promise
					.all([this.newContainerLoading, this.animOut().bind(this)])
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