import lottie from 'lottie-web';

const defaultHero = () => {
  // Get both hero in firstpage / news and menu
  const fullyheros = document.querySelectorAll('[data-news="fully-hero"]');
  
  if (!fullyheros || fullyheros.length < 1) return;

  // only animate the one hero for performence reasons
  // and set fallback on the other on (if there is two)
  const hero = fullyheros.length > 1 ? fullyheros[1] : fullyheros[0];
  if (fullyheros.length > 1) {
    fullyheros[0].classList.add('fallback');
  }

  // Animation settings
  const params = {
    container: hero,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../../assets/news/fully-hero/data.json',
    rendererSettings: { preserveAspectRatio: 'xMidYMax slice' }
  };

  // Init the animation
  const anim = lottie.loadAnimation(params);
  // lottie.setSpeed(2);
  lottie.setQuality('low');
  hero.addEventListener('mouseover', function(){
    lottie.setSpeed(0.05);
    console.log('sloooowmo');
    
  });
  hero.addEventListener('mouseout', function(){
    lottie.setSpeed(1)
  });

  
}
defaultHero();
