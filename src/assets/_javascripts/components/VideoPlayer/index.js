module.exports =
class VideoPlayer {
	constructor () {
        this.triggerTime = 5.7;
        this.loopTime = 1.5; // seconds from the end that the film gonna loop from
        this.videoModals = document.querySelectorAll('[data-videomodal]');
        this.videoElement = document.querySelectorAll('[data-videoplayer]');
        this.videoElement.forEach((el, index) => {
            this.setupEvents(el);
            el.modal = this.videoModals[index];
            el.modal.classList.remove('navigation__modal--open');
        });

    }

    setupEvents (el) {
        el.addEventListener('playing', evt => {
            console.log('the video is playing', evt);
            this.modalTrigger(el);
        });
        el.addEventListener('ended', evt => {
            console.log('the video has ended', evt);
            this.videoLoop(el);
        });

        console.log('test', this.videoElement);
    }

    modalTrigger (el) {
        let start = null;
        let self = this;
        function loop(timestamp) {
            if (!start) start = timestamp;
            // let progress = timestamp - start;
            
            if (el.currentTime < self.triggerTime) {
                window.requestAnimationFrame(loop);
            } else {
                console.log(el.currentTime );
                self.openModal(el.modal);
            }
        }
        
        window.requestAnimationFrame(loop);
    }

    openModal (el) {
        el.classList.add('navigation__modal--open');
    }

    videoLoop (el) {
        el.currentTime = el.duration - this.loopTime;
        el.play();
    }
}
