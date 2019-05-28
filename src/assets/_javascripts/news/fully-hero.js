import lottie from 'lottie-web';
import LottieScene from './../components/LottieScene';

export const defaultHero = () => {
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

  if (fullyheros[0].dataset.frontpage && fullyheros.length <= 1) return;


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

        const scene1 = new LottieScene(hero.querySelector('[data-scene="1"]'), limitFps);
        scene1.init();
        anims.push(scene1);

        const scene2 = new LottieScene(hero.querySelector('[data-scene="2"]'), limitFps);
        scene2.init();
        scene2.slowMo();
        anims.push(scene2);

        // TODO: Make a button to hide navigation and show this scene
        // const scene4 = new LottieScene(hero.querySelector('[data-scene="4"]'), limitFps);
        // scene4.init();
        // anims.push(scene4);

        const scene4_2 = new LottieScene(hero.querySelector('[data-scene="4_2"]'), limitFps);
        scene4_2.init();
        anims.push(scene4_2);

        const scene5 = new LottieScene(hero.querySelector('[data-scene="5"]'), limitFps);
        scene5.init();
        anims.push(scene5);
      }

      // room 3
      // loop mellan 0 - 195
      // loop mellan 196 - 391
      const scene3 = new LottieScene(hero.querySelector('[data-scene="3"]'), limitFps);
      scene3.init(244);
      // scene3.loopBetween([0, 195], true);
      scene3.hoverPlayFrom(244);
      anims.push(scene3);

      const scene6 = new LottieScene(hero.querySelector('[data-scene="6"]'), limitFps);
      scene6.init();
      anims.push(scene6);

      // /* Resize function when using Canvas
      // Lissen for resize events and resize the canvas, but only after scrolling
      // */

      // // Setup isScrolling variable
      // let isScrolling
      // let isScrollingTimer;

      // // Listen for scroll events
      // window.addEventListener('scroll', function (event) {
      //   let isScrolling = true;

      //   // Clear our timeout throughout the scroll
      //   window.clearTimeout(isScrollingTimer);

      //   // Set a timeout to run after scrolling ends
      //   isScrollingTimer = setTimeout(function () {

      //     let isScrolling = false;

      //   }, 66);

      // }, false);

      // window.addEventListener("optimizedResize", function() {
      //   if (!isScrolling) {
      //     anims.map(anim => {
      //       anim.resize();
      //     })
      //   }
      // });
      // //end resize function

    }
  }
  motionQuery.addListener(handleReduceMotionChanged);
  handleReduceMotionChanged(); // trigger once on load if needed

  // Global Settings
  lottie.setQuality('low');


}


// Always, runs, but returns false when not needed to run
// defaultHero();

export default defaultHero;
