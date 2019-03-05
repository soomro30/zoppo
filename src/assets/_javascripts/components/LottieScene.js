// import "babel-polyfill";
import lottie from 'lottie-web';
import OptimizedResize from "./OptimizedResize";
/**
 * Create a Lottie scene from data-attributes: data-scene, data-path and data-preserveaspectratio
 *
 * @param {object} node - The lottie DOM container:
 * @param {bool} limitFps - Set to true if you wanna run the animation in AE comp framerate (ex 30fps)
 * @param {bool} canvas - Set to true if you wanna render with canvas instead of svg
 * @param {string} changeOnMedia - If you wana change json data and preserve aspect ratio on mobile (or any other media query) set a data-pathmobile and data-preserveaspectratiomobile on the html elements, and a correct match media string in the 4th parameter then you init the LottieScene class, ex "(min-aspect-ratio: 8/9)"
 *
 * @method init [frame = 0] - Plays the scene, adds classes and limit framerate
 * @method pause - Pauses the scene
 * @method destroy - Destroy the scene and add a fallback image class
 * @method resize - Resize the scene (when using canvas rendering)
 * @method slowMo - Slow motion function on hover
 * @method loopBetween [segment, force] - Loops between the first and second value in the segment array
 * @method hoverPlayFrom [frame = 0] - Start the animation on hover from a certain frame
 */
export class LottieScene {
  constructor(node, limitFps = false, canvas = false, changeOnMedia = false) {
    this.node = node;
    this.limitFps = limitFps;
    this.canvas = canvas;
    this.changeOnMedia = changeOnMedia;

    this.loaded = false;
    const initMatchMedia = window.matchMedia(changeOnMedia).matches;

    const dataset = node.dataset;

    this.dataDefault = {
      mode: 'default',
      scene: dataset.scene,
      path: dataset.path,
      preserveaspectratio: dataset.preserveaspectratio
    }

    this.dataMobile = {
      mode: 'mobile',
      scene: dataset.scene,
      path: dataset.pathmobile,
      preserveaspectratio: dataset.preserveaspectratiomobile
    }

    this.data = initMatchMedia ? this.dataMobile : this.dataDefault

    // The lottie animation instance
    this.anim = false;
    this.createAnim(this.data, this.node, this.canvas);

    if (canvas || changeOnMedia) {
      this.initResize();
    }
  }

  createAnim(data) {
    // Destroy old animation
    if (this.anim) {
      this.anim.destroy();
    }

    // The lottie animation instance
    this.anim = lottie.loadAnimation(
      {
        container: this.node,
        renderer: this.canvas ? 'canvas' : 'svg', // canvas works better on firefox
        loop: true,
        autoplay: false,
        path: `../../assets/news/${data.path}`,
        rendererSettings: {
          preserveAspectRatio: data.preserveaspectratio,
        }
      }
    );
  }

  init(frame = 0) {
    this.anim.goToAndPlay(frame, true);
    this.node.classList.remove('fallback');
    this.node.classList.add('loaded');
    this.limitFps && this.anim.setSubframe(false); // run in 30fps
  }

  pause() {
    this.anim.pause();
  }

  destroy() {
    this.anim.destroy();
    this.node.classList.add('fallback');
  }

  initResize() {
    // create a resize event
    const optimizedResize = new OptimizedResize;
    optimizedResize.add( () => {
        this.resize();
    });
  }

  resize() {
    // If changeOnMedia option is set, check if we need to recreate the animation or not
    if (this.changeOnMedia) {
      if (window.matchMedia( this.changeOnMedia ).matches) {
        if (this.data.mode !== this.dataMobile.mode) {
          this.data = this.dataMobile;
          this.createAnim(this.data);
          this.init();
        }
      } else {
        if (this.data.mode !== this.dataDefault.mode) {
          this.data = this.dataDefault;
          this.createAnim(this.data);
          this.init();
        }
      }
    }

    // Resize the animation only if it's loaded
    this.anim.isLoaded && this.anim.resize();
  }

  // Slow motion feature
  slowMo() {
    this.node.addEventListener('mouseover', () => {
      this.limitFps && this.anim.setSubframe(true); // interpolate the keyframes in between
      this.anim.setSpeed(0.05);
    });
    this.node.addEventListener('mouseout', () => {
      this.limitFps && this.anim.setSubframe(false); // run in 30fps
      this.anim.setSpeed(1)
    });
  }

  // segment: array with to values, from and to
  // force: true if you wanna force jump tp the startframe
  loopBetween(segment, force) {
    if (!this.loaded) {
      this.anim.addEventListener('DOMLoaded', () => {
        this.loaded = true;
        this.loopBetween(segment, force);
      });
      return;
    }

    this.anim.playSegments(segment, force);
  }

  // play from frame on hover
  // hoverFrame: the frame you want to go to and play
  hoverPlayFrom(hoverFrame = 0) {
    if (!this.loaded) {
      this.anim.addEventListener('DOMLoaded', () => {
        this.loaded = true;
        this.hoverPlayFrom(hoverFrame);
      });
      return;
    }
    this.node.addEventListener('mouseover', () => {
      this.anim.goToAndPlay(hoverFrame, true);
    });
  }
}

export default LottieScene;
