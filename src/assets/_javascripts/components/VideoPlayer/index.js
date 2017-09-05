module.exports =
class VideoPlayer {
	constructor () {
        this.triggerTime = 6.3;
        this.loopTime = 1.44; // seconds from the end that the film gonna loop from | 07:15 = 7.6 - 09:04 = 9.04
        this.videoModal = document.querySelector('[data-videomodal]');
        if (!this.videoModal) return;
        this.modalIsTriggered = false;
        this.modalIsOpened = false;
        this.videoModal.classList.remove('newsflash--open');
        this.videoElement = document.querySelectorAll('[data-videoplayer]');
        this.videoElement.forEach((el, index) => {
            this.setupEvents(el);
        });
    } 
    
    // Lissen for the video to start playing, and loop it when it ends
    setupEvents (el) {
        console.log('setup events');
        el.addEventListener('playing', evt => {
            if (this.modalIsTriggered) return;
            this.modalTrigger.call(this, el);
            // console.log('start playing video');
        });
        el.addEventListener('ended', evt => {
            this.videoLoop(el);
        });

        // Reduce motion / pause video
        var motionQuery = matchMedia('(prefers-reduced-motion)');
        function handleReduceMotionChanged() {
            if (motionQuery.matches) {
                // Pause autoplaying video
                el.pause();
                // console.log('reduced motion activated');
            } else {
                el.play();
            }
        }
        motionQuery.addListener(handleReduceMotionChanged);
        handleReduceMotionChanged(); // trigger once on load if needed
    }
    
    openModal (el) {
        this.modalIsOpened = true;
        el.classList.add('newsflash--open');
    }

    modalTrigger (el) {
        this.modalIsTriggered = true;
        let loop = () => {
            if (el.currentTime < this.triggerTime) {
                window.requestAnimationFrame(loop);
                // console.log('el.currentTime: ' + el.currentTime);
            } else {
                if (this.modalIsOpened) return;
                // console.log('el.currentTime: ' + el.currentTime);
                // console.log('this.triggerTime: ' + this.triggerTime);
                this.openModal(this.videoModal);
            }
        }
        
        window.requestAnimationFrame(loop);
    }


    videoLoop (el) {
        el.currentTime = el.duration - this.loopTime;
        el.play();
    }
}
