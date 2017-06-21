import bodymovin from 'bodymovin';

module.exports =
class LogoAnimation {
	constructor () {
		this._logoContainer = document.getElementById('logo_anim');
		this._path = '/assets/logo.json'

        this._animData = {
        	container: this._logoContainer,
        	renderer: 'svg',
        	loop: false,
        	autoplay: false,
        	path: this._path
        }

        this._anim = bodymovin.loadAnimation (this._animData);
        this._anim.addEventListener ('DOMLoaded', this.startLogoAnimation.bind(this));

        bodymovin.setQuality (2);
		window.onresize = this._anim.resize.bind(this._anim);
    }

    startLogoAnimation () {
    	this._anim.goToAndPlay (1, true);
    }
}
