import Parallax from 'parallax-js';

const svenskaSkolanHero = () => {
  const newsSvenskaSkolan = document.querySelectorAll("[data-news='svenskaskolan-london']");
  
  if(!newsSvenskaSkolan || newsSvenskaSkolan.length < 1) return;
  
  newsSvenskaSkolan.forEach(item => {
    let container = item.querySelector('.parallax-container');
    let parallaxInstance = new Parallax(container);
  });
}
svenskaSkolanHero();
