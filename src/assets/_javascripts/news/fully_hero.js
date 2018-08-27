import lottie from 'lottie-web';

const defaultHero = () => {
  // Get both hero in firstpage / news and menu
  const fullyheros = document.querySelectorAll('[data-news="fully-hero"]');

  const limitFps = false; // limit to AfterEffects fps (eg 30fps)

  if (!fullyheros || fullyheros.length < 1) return;

  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = fullyheros.length > 1 ? fullyheros[1] : fullyheros[0];
  if (fullyheros.length > 1) {
    fullyheros[0].classList.add('fallback');
  }

  const scenes = [...hero.querySelectorAll('[data-scene]')];

  let anims = [];

  scenes.map(scene => {
    const sceneObj = {
      path: scene.dataset.path,
      node: scene,

      // The lottie animation instance
      anim: lottie.loadAnimation(
        {
          container: scene,
          renderer: 'canvas', // canvas works better on firefox
          loop: true,
          autoplay: true,
          path: `../../assets/news/fully-hero/${scene.dataset.path}`,
          rendererSettings: { preserveAspectRatio: 'xMidYMax slice' }
        }
      ),

      // Init the animation
      init: () => {
        limitFps && sceneObj.anim.setSubframe(false); // run in 30fps

        // Slow motion feature
        scene.addEventListener('mouseover', function () {
          limitFps && sceneObj.anim.setSubframe(true); // interpolate the keyframes in between
          sceneObj.anim.setSpeed(0.05);
        });
        scene.addEventListener('mouseout', function () {
          limitFps && sceneObj.anim.setSubframe(false); // run in 30fps
          sceneObj.anim.setSpeed(1)
        });
      }
    }
    anims.push(sceneObj);
  });

  // run all animations
  anims.map(anim => {
    anim.init();
  })

  // Lissen for resize events and resize the canvas
  window.addEventListener("optimizedResize", function() {
    anims.map(anim => {
      anim.anim.resize();
    })
  });

  // Global Settings
  lottie.setQuality('low');

}
defaultHero();
