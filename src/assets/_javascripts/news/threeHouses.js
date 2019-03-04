import lottie from 'lottie-web';
import LottieScene from './../components/LottieScene';

export const threeHouses = () => {

  const limitFps = true; // limit to AfterEffects fps (eg 30fps)
  let anims = []; // an array of all the lottie anim instances

  // Get both hero in firstpage / news and menu
  const sceneElements = document.querySelectorAll('[data-news="three-houses"]');
  console.log('sceneElements', sceneElements);

  if (!sceneElements) return;

  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = sceneElements.length > 1 ? sceneElements[1] : sceneElements[0];

  let fallbacks = [];
  if (sceneElements.length) {
    fallbacks = [...sceneElements[0].querySelectorAll('[data-scene]')];
  }

  fallbacks.map(fallback => {
    fallback.classList.add('fallback');
  });

  // console.log('sceneElements.length <= 1', sceneElements.length <= 1)
  // if (sceneElements.length <= 1) return;

  const allScenes = [...hero.querySelectorAll('[data-scene]')];

  allScenes.map(scene => {
    scene.classList.add('fallback');
  });
  anims.map(anim => {
    anim.destroy();
  });


  const scene1 = new LottieScene(hero.querySelector('[data-scene="1"]'), false, true);
  scene1.init();
  anims.push(scene1);

  const scene2 = new LottieScene(hero.querySelector('[data-scene="2"]'), false, true);
  scene2.init();
  // scene2.slowMo();
  anims.push(scene2);

  // loop mellan 0 - 195
  // loop mellan 196 - 391
  const scene3 = new LottieScene(hero.querySelector('[data-scene="3"]'), false, true);
  scene3.init(244);
  // scene3.loopBetween([0, 195], true);
  // scene3.hoverPlayFrom(244);
  anims.push(scene3);

  const scene4 = new LottieScene(hero.querySelector('[data-scene="4"]'), false, true);
  scene4.init();
  anims.push(scene4);

  // Global Settings
  lottie.setQuality('low');


}
export default threeHouses;
