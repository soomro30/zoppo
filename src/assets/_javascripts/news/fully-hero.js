import lottie from 'lottie-web';

const defaultHero = () => {
  const fullyheros = document.querySelectorAll("[data-news='fully-hero']");


  // var anim;

  // anim = lottie.loadAnimation(params);

  let anims = [];
  
  if (!fullyheros || fullyheros.length < 1) return;

  const hero = fullyheros.length > 1 ? fullyheros[1] : fullyheros[0]; // only animate on hero
  if (fullyheros.length > 1) {
    //set bg image on menu
    fullyheros[0].classList.add('fallback');
    console.log(fullyheros[0].classList);
    
  }
  const params = {
    container: hero,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../../assets/news/fully-hero/data.json',
    rendererSettings: { preserveAspectRatio: 'xMidYMax slice' }
  };

  

  const anim = lottie.loadAnimation(params);
  anims.push(anim);
  // let container = hero.querySelector('.parallax-container');
  // let parallaxInstance = new Parallax(container);

  
}
defaultHero();
