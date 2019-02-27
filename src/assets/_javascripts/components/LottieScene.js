// import "babel-polyfill";
import lottie from 'lottie-web';

/**
 * Create a Lottie scene from data-attributes: data-scene, data-path and data-preserveaspectratio
 *
 * @param {object} node - The lottie DOM container:
 * @param {bool} limitFps - Set to true if you wanna run the animation in AE comp framerate (ex 30fps)
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
  constructor(node, limitFps, canvas) {
    this.node = node;
    const dataset = node.dataset;
    this.path = dataset.path;
    this.scene = dataset.scene
    this.preserveaspectratio = dataset.preserveaspectratio;
    this.loaded = false;
    this.limitFps = limitFps;

    // The lottie animation instance
    this.anim = lottie.loadAnimation(
      {
        container: this.node,
        renderer: canvas ? 'canvas' : 'svg', // canvas works better on firefox
        loop: true,
        autoplay: false,
        path: `../../assets/news/${this.path}`,
        rendererSettings: { preserveAspectRatio: this.preserveaspectratio }
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

  resize() {
    this.anim.resize();
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
