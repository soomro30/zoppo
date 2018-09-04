import lottie from 'lottie-web';

module.exports =
class LogoAnimation {
	constructor () {
		this._logoContainer = document.getElementById('logo_anim');
		this._path = '/assets/logo.json';

		// hide logoanim on Windows Edge because it looks like shit with the masks inside
		if (window.navigator.userAgent.indexOf("Edge") > -1) {
			this._logoContainer.classList.add('fallback');
			return;
		}

        this._animData = {
        	container: this._logoContainer,
        	renderer: 'svg',
        	loop: false,
			autoplay: false,
			path: this._path
        }

        this._anim = lottie.loadAnimation (this._animData);
        this._anim.addEventListener ('DOMLoaded', this.startLogoAnimation.bind(this));

        lottie.setQuality(2);
		window.onresize = this._anim.resize.bind(this._anim);
    }

    startLogoAnimation () {
    	this._anim.goToAndPlay (1, true);
    }
}
