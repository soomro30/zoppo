module.exports =
class VideoPlayer {
	constructor () {
        this.triggerTime = 6.3;
        this.loopTime = 1.53; // seconds from the end that the film gonna loop from | 9.4 - 7.6
        this.videoModal = document.querySelector('[data-videomodal]');
        if (!this.videoModal) return;

        this.videoModal.classList.remove('newsflash--open');
        this.videoElement = document.querySelectorAll('[data-videoplayer]');
        this.videoElement.forEach((el, index) => {
            this.setupEvents(el);
        });
    } 
    
    // Lissen for the video to start playing, and loop it when it ends
    setupEvents (el) {
        el.addEventListener('playing', evt => {
            this.modalTrigger.call(this, el);
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
              console.log('hej');
          } else {
              el.play();
          }
        }
        motionQuery.addListener(handleReduceMotionChanged);
        handleReduceMotionChanged(); // trigger once on load if needed
    }
    
    modalTrigger (el) {
        let loop = () => {
            if (el.currentTime < this.triggerTime) {
                window.requestAnimationFrame(loop);
            } else {
                this.openModal(this.videoModal);
            }
        }
        
        window.requestAnimationFrame(loop);
    }

    openModal (el) {
        el.classList.add('newsflash--open');
    }

    videoLoop (el) {
        el.currentTime = el.duration - this.loopTime;
        el.play();
    }
}
