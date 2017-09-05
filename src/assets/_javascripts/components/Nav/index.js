import LogoAnimation from '../LogoAnimation';

module.exports =
class Nav {
	constructor () {
        this._menutoggle = document.getElementById('openmenu');
        this._menu = document.getElementById('menu');
        this._menuIsOpen = false;

        this._menutoggle.addEventListener('click', e => {
			e.preventDefault();
			this._menuIsOpen ? this.closeMenu() : this.openMenu();
		}, false);
		this.logoAnimation = new LogoAnimation;
		// Set interactive elements
		
		this.menuItems = document.querySelectorAll('#menu a');
		this.setTabIndex(-1, this.menuItems);
	}
	
	// Functionality
	setTabIndex (index, items) {
		for(var i = 0; i < items.length; i++) {
			items[i].tabIndex = index;
		}
		console.log('set tab index', items);
	}

	openMenu () {
		this._menutoggle.classList.add('menu-open');
		this._menu.classList.add('menu-open');
		this.logoAnimation.startLogoAnimation();
		this._menuIsOpen = true;
		this.setTabIndex(0, this.menuItems);
	}
	closeMenu () {
		this._menutoggle.classList.remove('menu-open');
		this._menu.classList.remove('menu-open');
		this._menuIsOpen = false;
		this.setTabIndex(-1, this.menuItems);
	}

}
