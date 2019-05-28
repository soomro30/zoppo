import lottie from 'lottie-web';
import LottieScene from './../components/LottieScene';

export const threeHouses = () => {

  const limitFps = true; // limit to AfterEffects fps (eg 30fps)

  // Get both hero in firstpage / news and menu
  const sceneElements = document.querySelectorAll('[data-news="three-houses"]');

  if (sceneElements.length === 0) return;

  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = sceneElements.length > 1 ? sceneElements[1] : sceneElements[0];

  let fallbacks = [];
  if (sceneElements.length) {
    fallbacks = [...sceneElements[0].querySelectorAll('[data-scene]')];
  }

  // return if the only scene element is only used on the menu.
  if (sceneElements.length <= 1 && sceneElements[0].dataset.ismenu) return false;

  fallbacks.map(fallback => {
    fallback.classList.add('fallback'); // TODO: read a fallback image directly from the dataset instead
  });

  // if (sceneElements.length <= 1) return;
  let changeOnMedia = '(max-aspect-ratio: 8/9)'; // @media (min-aspect-ratio: 8/9) // 1514x1706

  const allScenes = [...hero.querySelectorAll('[data-scene]')];

  allScenes.map(scene => {
    scene.classList.add('fallback');
    new LottieScene(scene, false, true, changeOnMedia).init()
  });

  // Global Settings
  lottie.setQuality('low');


}
export default threeHouses;
