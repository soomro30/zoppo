module.exports =
class VideoPlayer {
	constructor () {
        // console.log('test');
        this.triggerTime = 0.5;
        this.videoDuration = 2; // instead of reading el.duration that is a bit buggy in WebKit webview
        // this.loopTime = 1.44; // seconds from the end that the film gonna loop from | 07:15 = 7.6 - 09:04 = 9.04
        // this.loopFrom = this.videoDuration - this.loopTime;
        this.videoModal = document.querySelector('[data-videomodal]');
        if (!this.videoModal) return;
        this.modalIsTriggered = false;
        this.modalIsOpened = false;
        this.videoModal.classList.remove('newsflash--open');
        this.videoElement = document.getElementById("startvideo");
        this.setupEvents(this.videoElement);

        // Set fixed height on video for iOS 7+ for train video apect ratio 3:5
        this.videoContainer = document.getElementById('startmenu');
        if (navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i) ) {
            this.videoElement.width = this.videoContainer.offsetHeight * 1.67;
        }

    } 
    
    // Lissen for the video to start playing, and loop it when it ends
    setupEvents (el) {
        el.addEventListener('timeupdate', this.modalTrigger.bind(this, el));
        // el.addEventListener('ended', evt => {
        //     this.videoLoop(el);
        // });

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
        // console.log('playing video', el.currentTime);
        if (this.modalIsTriggered) return;

        if (el.currentTime < this.triggerTime) {
            return;
        } else {
            this.modalIsTriggered = true;
            this.openModal(this.videoModal);
            // This is not working
            // el.removeEventListener('timeupdate', this.modalTrigger);
        }
        // const loop = () => {
        //     if (el.currentTime < this.triggerTime) {
        //         window.requestAnimationFrame(loop);
        //         // console.log('el.currentTime: ' + el.currentTime);
        //     } else {
        //         if (this.modalIsOpened) return;
        //         // console.log('el.currentTime: ' + el.currentTime);
        //         // console.log('this.triggerTime: ' + this.triggerTime);
        //         this.openModal(this.videoModal);
        //     }
        // }
        
        // window.requestAnimationFrame(loop);
    }


    videoLoop (el) {
        // el.currentTime = this.loopFrom;
        // el.play();
        // el.currentTime = this.loopFrom;
    }
}
