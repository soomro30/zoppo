---
layout: curious/fully-arcade
type: curious-about
title:  "Fully Arcade"
subtitle: "We are adding a gaming wing to our studio!"
date:   2019-02-06 10:00:00 +0100
categories: art, design, web
slug: fully-arcade
background-image_720: "hero_720.jpg"
background-image_1440: "hero.jpg"
# background-image_2880: "hero@2x.jpg"
background-image_color: "#000000"
shareimage: curious-about/fully-arcade/shareimage.png
background-text_light: true

background: |
  <div class="fa-bg" data-scroll data-scroll-showCallback="runStars(true)" data-scroll-hideCallback="runStars(false)">
    <div class="fa-bg__cg1"></div>
    <div class="fa-bg__cg2"></div>
    <div class="fa-bg__cg3"></div>
    <div class="fa-bg__cg4"></div>
    <div class="fa-bg__stars" id="stars">
    </div>
    <div class="fa-bg__gt"></div>
    <script>
      var runAnim = 'false';
      function runStars(bool) {
        runAnim = bool;
        console.log('runAnim', runAnim);
        console.log('___', runAnim === 'true');
        if (runAnim === 'true') draw();
      }

      // Particles
      // Credits: https://codepen.io/ddstuff/pen/KoLLPZ
      var masterSpeed = 4;
      var dd = document.createElement("canvas");
      var cv = dd.getContext("2d");
      var sw = window.screen.width;
      var sh = window.screen.height;
      var vcx = document.body.clientWidth/2;
      var vcy = document.body.clientHeight/2;
      var rv = 1000;
      var rot = 0;
      var dim = Math.sqrt((sw*sw)+(sh*sh));
      var w = dd.width = dim;
      var h = dd.height = dim;
      var strs = [];
      var nstrs = 1.2 * w;
      var wrapper = document.getElementById('stars');
      wrapper.appendChild(dd);
      function rInt(s,b) {
        min=Math.ceil(s);max=Math.floor(b);
        return Math.floor(Math.random()*(b-s+1))+s;
      }
      function Star(x,y,sz,s,o) {
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.radius = parseInt(sz);
        this.speed = parseInt(s);
        this.opacity = o;
        this.draw = function(){
          cv.beginPath();
          cv.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
          cv.closePath();
          cv.fillStyle = "rgba(255,255,255,"+this.opacity+")";
          cv.fill();
        }
      }
      function draw() {
        console.log('draw runAnim', runAnim);
        if (runAnim === 'false') {
          window.cancelAnimationFrame(draw);
          console.log('draw cancel');
          return;
        }

        cv.clearRect(0,0,w,h);
        for(var i=0; i<nstrs;i++){
          strs[i].draw();
          strs[i].x += strs[i].speed/masterSpeed;
          strs[i].y -= strs[i].speed/masterSpeed;
          if(strs[i].x >= w || strs[i].y <= 0){
            strs[i] = new Star(-10,rInt(0,h*1.5),rInt(1,6)/3,rInt(1,2),rInt(4,10)/10);
          }
        }
        window.requestAnimationFrame(draw);
      }

      function init() {
        for(var i=0; i<nstrs;i++) {
          strs[i] = new Star(rInt(0,w),rInt(0,h),rInt(1,6)/3,rInt(1,5),rInt(4,10)/10);
        }
        draw();
      }
      init();

    </script>
  </div>

ingress: |
  We are adding a gaming wing to our studio!

section1: |
  ### Fundamentals first, gameplay second
  We’ve already gotten to work designing our first game. Of course the gameplay is the exciting bit, but we’ll keep this a spoiler-free read for now.

  While it’s plenty easy to get swept away in gameplay, we don’t plan to waste the rare opportunity of starting something from scratch. There are some structural elements that are hard to incorporate if you get too far down the road with building a game, so we’re doing them upfront – multiplayer programming being one of them.

section1_image1_2880: "section1_image1@2x.jpg"
section1_image1_1440: "section1_image1.jpg"
section1_image1_alt: "Concept art of an arena"

section2: |
  ##### Keep in mind we’re coming at this as digital service designers and developers. Since we see from such different eyes, there is a lot about gaming systems and features that we’re excited to revamp, upturn, and reimagine as we go along.

section2_image1_alt: "Concept art of a robot bird character"
section2_image2_alt: "Concept art of a character with a planet as a head"
section2_image3_alt: "Concept art of an alien character with 3 eyes"


section3: |
  ### Coding a multiplayer universe
  From a structural and methodical standpoint, multiplayer network code is way more difficult than single player. It’s also really hard to do retroactively — you need to do it from the get-go, before you’ve made any final decisions about your gameplay. That was the first decision we made, that we want to start with the multiplayer functionality.

section3-image1_large: "section3_image1@3x.jpg"
section3-image1_medium: "section3_image1@2x.jpg"
section3-image1_small: "section3_image1.jpg"


section4: |
  The beauty of multiplayer is that it enables you to be as competitive as you want, the game will always be as challenging as the next brilliant player you get matched with. And in a world of 3.2 billion internet users, there is a sea of competition out there to keep you on your toes. It’s inclusive too. Your great aunt can play, and a career gamer can play, and they’ll both have an awesome time.

section4_image1_large: "section4_image1@2x.jpg"
section4_image1_medium: "section4_image1.jpg"
section4_image1_alt: "4 persons sitting in a sofa with hand controllers and testing a game"

section5: |
  It’s also just straight-up fun (we think). In the development of our first game, our Gothenburg and Stockholm offices will be prototype-playing against each other to test the game. The inclusiveness and ruckus energy of multiplayer really fits us perfectly.

---

We are adding a gaming wing to our studio!
