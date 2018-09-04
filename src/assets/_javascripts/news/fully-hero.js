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
class Scene {
  constructor(node, limitFps) {
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
        renderer: 'canvas', // canvas works better on firefox
        loop: true,
        autoplay: false,
        path: `../../assets/news/fully-hero/${this.path}`,
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

const defaultHero = () => {
  const limitFps = true; // limit to AfterEffects fps (eg 30fps)
  let anims = []; // an array of all the lottie anim instances

  // Get both hero in firstpage / news and menu
  const fullyheros = document.querySelectorAll('[data-news="fully-hero"]');
  if (!fullyheros) return;

  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = fullyheros.length > 1 ? fullyheros[1] : fullyheros[0];

  let fallbacks = [];
  if (fullyheros.length > 1 || fullyheros.length === 1) {
    fallbacks = [...fullyheros[0].querySelectorAll('[data-scene]')];
  }

  let scenes = [];

  if (window.matchMedia("(orientation: portrait)").matches) {
    let herofallbacks = [...hero.querySelectorAll('[data-scene]')];
    herofallbacks.splice(2, 1); // remove scene 3
    herofallbacks.splice(5, 1); // remove scene 6
    fallbacks = [...fallbacks, ...herofallbacks];

    scenes = [hero.querySelector('[data-scene="3"]'), hero.querySelector('[data-scene="6"]')];
  } else {
    scenes = [...hero.querySelectorAll('[data-scene]')];
  }

  fallbacks.map(fallback => {
    fallback.classList.add('fallback');
  });

  if (fullyheros.length <= 1) return;

  // Use fallbacks images instead of animations
  // in case the user preferes a reduced motion experience
  let motionQuery = matchMedia('(prefers-reduced-motion)');
  function handleReduceMotionChanged() {
    if (motionQuery.matches) {
      // Reduced motion
      const allScenes = [...hero.querySelectorAll('[data-scene]')];

      allScenes.map(scene => {
        scene.classList.add('fallback');
      });
      anims.map(anim => {
        anim.destroy();
      })
    } else {
      // standard motion
      if (window.matchMedia("(orientation: landscape)").matches) {

        const scene1 = new Scene(hero.querySelector('[data-scene="1"]'), limitFps);
        scene1.init();
        anims.push(scene1);

        const scene2 = new Scene(hero.querySelector('[data-scene="2"]'), limitFps);
        scene2.init();
        scene2.slowMo();
        anims.push(scene2);

        // TODO: Make a button to hide navigation and show this scene
        // const scene4 = new Scene(scenes[3], limitFps);
        // scene4.init();
        // anims.push(scene4);

        const scene4_2 = new Scene(hero.querySelector('[data-scene="4_2"]'), limitFps);
        scene4_2.init();
        anims.push(scene4_2);

        const scene5 = new Scene(hero.querySelector('[data-scene="5"]'), limitFps);
        scene5.init();
        anims.push(scene5);
      }

      // room 3
      // loop mellan 0 - 195
      // loop mellan 196 - 391
      const scene3 = new Scene(hero.querySelector('[data-scene="3"]'), limitFps);
      scene3.init(244);
      // scene3.loopBetween([0, 195], true);
      scene3.hoverPlayFrom(244);
      anims.push(scene3);

      const scene6 = new Scene(hero.querySelector('[data-scene="6"]'), limitFps);
      scene6.init();
      anims.push(scene6);

      // Lissen for resize events and resize the canvas
      window.addEventListener("optimizedResize", function() {
        anims.map(anim => {
          anim.resize();
        })
      });
    }
  }
  motionQuery.addListener(handleReduceMotionChanged);
  handleReduceMotionChanged(); // trigger once on load if needed

  // Global Settings
  lottie.setQuality('low');


}
export default defaultHero;
