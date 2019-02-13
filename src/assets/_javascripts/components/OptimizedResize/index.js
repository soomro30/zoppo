module.exports =
class OptimizedResize {
	constructor () {
        this.running = false;
        this.callbacks = [];
    }

    // run the actual callbacks
    _runCallbacks() {

        this.callbacks.forEach(function(callback) {
            callback();
        });

        this.running = false;
    }

    // fired on resize event
    _resize() {
        if (!this.running) {
            this.running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame( () => this._runCallbacks() );
            } else {
                setTimeout( () => this._runCallbacks(), 66);
            }
        }

    }


    // adds callback to loop
    _addCallback (callback) {
        if (callback) {
            this.callbacks.push(callback);
        }

    }

    // The "public" method add
    add (callback) {
        if (!this.callbacks.length) {
            window.addEventListener('resize', () => this._resize() );
        }
        this._addCallback(callback);
    }
}
