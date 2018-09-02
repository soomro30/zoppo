import lottie from 'lottie-web';

const defaultHero = () => {
  // Get both hero in firstpage / news and menu
  const fullyheros = document.querySelectorAll('[data-news="fully-hero"]');

  if (!fullyheros || fullyheros.length <= 1) return;
  
  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = fullyheros.length > 1 ? fullyheros[1] : fullyheros[0];
  if (fullyheros.length > 1 || fullyheros.length === 1) {
    fullyheros[0].classList.add('fallback');
  }
  if (fullyheros.length === 1) {
    return;
  }
  
  
  const scenes = [...hero.querySelectorAll('[data-scene]')];
  
  const limitFps = true; // limit to AfterEffects fps (eg 30fps)
  let anims = [];

  class Scene {
    constructor(node) {      
      this.node = node;
      const dataset = node.dataset;
      this.path = dataset.path;
      this.scene = dataset.scene
      this.preserveaspectratio = dataset.preserveaspectratio;
      this.loaded = false;

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

    init() {
      this.anim.play();
      console.log('this.node', this.node);
      
      this.node.classList.add('loaded');
      limitFps && this.anim.setSubframe(false); // run in 30fps
    }

    resize() {
      this.anim.resize();
    }
    
    // Slow motion feature
    slowMo() {      
      this.node.addEventListener('mouseover', () => {
        limitFps && this.anim.setSubframe(true); // interpolate the keyframes in between
        this.anim.setSpeed(0.05);
      });
      this.node.addEventListener('mouseout', () => {
        limitFps && this.anim.setSubframe(false); // run in 30fps
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
    hoverPlayFrom(hoverFrame) {
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

  console.log('scenes', scenes);
  
  const scene1 = new Scene(scenes[0]);
  scene1.init();
  anims.push(scene1);

  const scene2 = new Scene(scenes[1]);
  scene2.init();
  scene2.slowMo();
  anims.push(scene2);

  // room 3
  // loop mellan 0 - 195
  // loop mellan 196 - 391
  const scene3 = new Scene(scenes[2]);
  scene3.init();
  // scene3.loopBetween([0, 195], true);
  scene3.hoverPlayFrom(244);
  anims.push(scene3);

  // const scene4 = new Scene(scenes[3]);
  // scene4.init();
  // anims.push(scene4);

  const scene4_2 = new Scene(scenes[4]);
  scene4_2.init();
  anims.push(scene4_2);

  const scene5 = new Scene(scenes[5]);
  scene5.init();
  anims.push(scene5);

  const scene6 = new Scene(scenes[6]);
  scene6.init();
  anims.push(scene6);


  // Lissen for resize events and resize the canvas
  window.addEventListener("optimizedResize", function() {
    anims.map(anim => {
      anim.resize();
    })
  });

  // Global Settings
  lottie.setQuality('low');

}
defaultHero();
