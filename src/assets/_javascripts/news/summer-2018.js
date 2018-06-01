import Parallax from 'parallax-js';

const svenskaSkolanHero = () => {
  const summer2018 = document.querySelectorAll("[data-news='summer-2018']");

  if (!summer2018 || summer2018.length < 1) return;

  summer2018.forEach(item => {
    let container = item.querySelector('.parallax-container');
    let parallaxInstance = new Parallax(container);
  });
}
svenskaSkolanHero();
