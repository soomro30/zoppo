import {TweenMax, Power1} from "gsap";
import ScrollMagic from 'ScrollMagic';
import 'gsap';
// import 'debug.addIndicators';
import OptimizedResize from "../OptimizedResize";

module.exports =
class ScrollAnimations {
	constructor () {
        this._hasBeenCreated = false;
        this._asWidth = 130; // number of vw to be moved
        this._asDuration = 0.8;

        // Runs create if media query matches
        this._checkMediaQuery();

        // create a resize event
        const optimizedResize = new OptimizedResize;
        optimizedResize.add( () => {
            this._checkMediaQuery();
        });
        document.body.classList.add('start-animations');

    }

    _checkMediaQuery () {
        const mq_m = window.matchMedia( "(min-width: 768px)" );
        // CREATE:
        if (mq_m.matches && !this._hasBeenCreated) {
            this.create();
            this._hasBeenCreated = true;
        }
        // REBUILD: The animation has been created but needs uppdated values
        else if ( mq_m.matches && this._hasBeenCreated) {
            // this.update();
            this.destroy();
            this.create();
        }
        // DESTROY
        else if (!mq_m.matches && this._hasBeenCreated) {
            this.destroy();
            this._hasBeenCreated = false;
        }
        // CONTINUE with life
        else {
            return;
        }
    }

    create () {
			if(!this._controller) {
				this._sceneHeight = this._updateDuration();

				// init controller
				this._controller = new ScrollMagic.Controller();

				// snap the mobile scroll
				this._trigger = new ScrollMagic.Scene({triggerElement: '#så-funkar-det', duration: this._sceneHeight })
				.setPin('#sidecroll-screens')
				.triggerHook('onLeave')
				.addTo(this._controller);

				// move to mobile screen 2
				this._scene1 = new ScrollMagic.Scene({triggerElement: '#sidescroll-2'})
				.on('start', (e) => {
					TweenMax.to('.sidescroll__screens', this._asDuration, {
						transform: 'translate3d(-' + (e.scrollDirection === 'FORWARD' ? this._asWidth : 0) + 'vw,0,0)', ease: Power1.easeInOut
					})
				})
				// .addIndicators() // add indicators (requires plugin)
				.setClassToggle('#sidescroll-2', 'active')
				.addTo(this._controller);

				// move to mobile screen 3
				this._scene2 = new ScrollMagic.Scene({triggerElement: '#sidescroll-3'})
				.on('start', (e) => {
					TweenMax.to('.sidescroll__screens', this._asDuration, {
						transform: 'translate3d(-' + (e.scrollDirection === 'FORWARD' ? this._asWidth*2 : this._asWidth) + 'vw,0,0)', ease: Power1.easeInOut
					})
				})
				// .addIndicators() // add indicators (requires plugin)
				.setClassToggle('#sidescroll-3', 'active')
				.addTo(this._controller);
			}
    }

    destroy () {
				console.log('destroy');
        // destroy controller
				if(this.controller){
					this._controller = this._controller.destroy(true);

					// destroy scenes
					this._trigger = this._trigger.destroy(true);
					this._trigger2 = this._trigger2.destroy(true);
					this._scene1 = this._scene1.destroy(true);
					this._scene2 = this._scene2.destroy(true);
					TweenMax.to('.sidescroll__screens', 1, {transform:'translate3d(0,0,0)'}); // maybe not needing this?
				}
    }

    // use a function to automatically adjust the duration to the window height.
    _updateDuration () {
        return this._sceneHeight = document.getElementById("så-funkar-det").offsetHeight * 1;
    }

}
