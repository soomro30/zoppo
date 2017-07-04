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
		console.log('open menu');
    }

	openMenu () {
		this._menutoggle.classList.add('menu-open');
		this._menu.classList.add('menu-open');
		// startLogoAnimation();
		this._menuIsOpen = true;
	}
	closeMenu () {
		this._menutoggle.classList.remove('menu-open');
		this._menu.classList.remove('menu-open');
		this._menuIsOpen = false;
	}

}
