
class VideoPlayer {
  constructor() {
    //console.log('test');
    this.triggerTime = 6.2;
    this.videoDuration = 9.04; // instead of reading el.duration that is a bit buggy in WebKit webview
    this.loopTime = 1.44; // seconds from the end that the film gonna loop from | 07:15 = 7.6 - 09:04 = 9.04
    this.loopFrom = this.videoDuration - this.loopTime;
    this.videoModal = document.querySelector('[data-firstvideomodal]');
    if (!this.videoModal) return;
    this.modalIsTriggered = false;
    this.modalIsOpened = false;
    this.videoModal.classList.remove('newsflash--open');
    this.videoElement = document.getElementById("startvideo");

    if (this.videoElement != undefined) {
      this.setupEvents(this.videoElement);
    } else {
      this.modalTrigger(this.videoModal);
    }

    // Set fixed height on video for iOS 7+ for train video apect ratio 3:5
    this.videoContainer = document.getElementById('startmenu');
    if (navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)) {
      this.videoElement.width = this.videoContainer.offsetHeight * 1.67;
    }
  }

  // Lissen for the video to start playing, and loop it when it ends
  setupEvents(el) {
    el.addEventListener('timeupdate', this.modalTrigger.bind(this, el));
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

  openModal(el) {
    this.modalIsOpened = true;
    el.classList.add('newsflash--open');
  }

  modalTrigger(el) {
    if (this.modalIsTriggered) return;
    
    this.adjustSettings(); //Update vars if needed/special hero
    
    if (el.currentTime < this.triggerTime) {
      return;
    } else {
      console.log('modal trigger');
      this.modalIsTriggered = true;
      this.openModal(this.videoModal);
    }
  }

  adjustSettings() {
    if (document.querySelectorAll("[data-news='firstnewsflash']").length > 0) {
      this.triggerTime = 6.2;
      this.videoDuration = 9.04;
    }
  }


  videoLoop(el) {
    el.currentTime = this.loopFrom;
    el.play();
    el.currentTime = this.loopFrom;
  }
}

new VideoPlayer;