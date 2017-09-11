import LogoAnimation from '../LogoAnimation';
import enableInlineVideo from 'iphone-inline-video';

module.exports =
class Nav {
	constructor () {
        this._menutoggle = document.getElementById('openmenu');
        this._menu = document.getElementById('menu');
		this._menuVideo = document.getElementById('menuvideo');
        this._menuIsOpen = false;
		
        this._menutoggle.addEventListener('click', e => {
			e.preventDefault();
			this._menuIsOpen ? this.closeMenu() : this.openMenu();
		}, false);
		this._logoAnimation = new LogoAnimation;
		
		// Set invisible interactive elements and make them not tabbable
		this._menuItems = document.querySelectorAll('#menu a');
		this.setTabIndex(-1, this._menuItems);
		
		// Fallback for WebKit Webview browsers
		enableInlineVideo(this._menuVideo);
	}
	
	setTabIndex (index, items) {
		for(var i = 0; i < items.length; i++) {
			items[i].tabIndex = index;
		}
	}

	openMenu () {
		this._menutoggle.classList.add('menu-open');
		this._menu.classList.add('menu-open');
		this._logoAnimation.startLogoAnimation();
		this._menuIsOpen = true;
		this.setTabIndex(0, this._menuItems);
		this._menuVideo.play();
	}
	closeMenu () {
		this._menutoggle.classList.remove('menu-open');
		this._menu.classList.remove('menu-open');
		this._menuIsOpen = false;
		this.setTabIndex(-1, this._menuItems);
		this._menuVideo.stop();
	}

}
