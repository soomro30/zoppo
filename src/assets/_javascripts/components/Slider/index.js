import {lory} from 'lory.js';

module.exports =
class Slider {
	constructor () {
       	this._js_slider = document.querySelector('.js_slider');

       	if (!this._js_slider) return;

	    this._js_slides = document.querySelector('.js_slides');  
		this._dot_count = this._js_slider.querySelectorAll('.js_slide').length;
		this._dot_container = this._js_slider.querySelector('.js_dots');
		this._dot_list_item = document.createElement('li');
		
		document.addEventListener('DOMContentLoaded', () => { 
			this._dot_navigation_slider = lory(this._js_slider, {
			   infinite: 1,
			   enableMouseEvents: true,
			   ease: 'cubic-bezier(.17,.67,.38,1.03)'
			});
		});
		
		this._js_slider.addEventListener('before.lory.init', this.handleDotEvent.bind(this));
		this._js_slider.addEventListener('after.lory.init', this.handleDotEvent.bind(this));
		this._js_slider.addEventListener('after.lory.slide', this.handleDotEvent.bind(this));
		this._js_slider.addEventListener('on.lory.resize', this.handleDotEvent.bind(this));
    }

    handleDotEvent (e) {
    	if (e.type === 'before.lory.init') {
	     	for (let i = 0, len = this._dot_count; i < len; i++) {
		       	let clone = this._dot_list_item.cloneNode();
		       	this._dot_container.appendChild(clone);
		    }
	    	this._dot_container.childNodes[0].classList.add('active');
	   }
	   
	   if (e.type === 'after.lory.init') {
	     	for (var i = 0, len = this._dot_count; i < len; i++) {
		       this._dot_container.childNodes[i].addEventListener('click', function(e) {
		         this._dot_navigation_slider.slideTo(Array.prototype.indexOf.call(this._dot_container.childNodes, e.target));
		    	}.bind(this));
	     	}
	   }
	   
	   if (e.type === 'after.lory.slide') {
		    for (var i = 0, len = this._dot_container.childNodes.length; i < len; i++) {
		       this._dot_container.childNodes[i].classList.remove('active');
		    }
	    	this._dot_container.childNodes[e.detail.currentSlide - 1].classList.add('active');
	   }

	   if (e.type === 'on.lory.resize') {
	       	for (var i = 0, len = this._dot_container.childNodes.length; i < len; i++) {
	        	this._dot_container.childNodes[i].classList.remove('active');
	       	}
	       	this._dot_container.childNodes[0].classList.add('active');
	   }
    }
}
