const toggleButton = document.getElementById('theme-toggle');
const body = document.querySelector('body');

const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem('preferred-theme', theme);
};

const getTheme = () => {
  const theme = localStorage.getItem('preferred-theme');
  return theme || 'dark'; // domyślny motyw
};

const toggleTheme = () => {
  const currentTheme = body.dataset.theme;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};

toggleButton.addEventListener('click', toggleTheme);

// Ustawienie domyślnego motywu z localStorage
const preferredTheme = getTheme();
setTheme(preferredTheme);

// use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Flip, ScrollTrigger)
  //theme
  
  //navbar
const showAnim = gsap
.from(".nav_component", {
  yPercent: -150,
  opacity:0,
  paused: true,
  duration: 0.8,
  ease: "power3.inOut",
})
.progress(1);
ScrollTrigger.create({
start: "top top",
end: 99999,
onUpdate: (self) => {
  self.direction === -1 ? showAnim.play() : showAnim.reverse();
},
});
gsap.from(".nav_item", {
yPercent: -100,
opacity: 0,
stagger: 0.1,
});

let navbarLogoWrapper = document.querySelector('.navbar_logo_wrapper').offsetHeight;
let startPosition = 'top+=' + navbarLogoWrapper + 'px' + ' top';
function navChange() {
navbarLogoWrapper = document.querySelector('.navbar_logo_wrapper').offsetHeight;
startPosition = 'top+=' + navbarLogoWrapper + 'px' + ' top';
ScrollTrigger.refresh();
console.log(startPosition)
};
window.addEventListener("resize", navChange);
const tlNav = gsap.timeline({
  scrollTrigger: {
    trigger: ".navbar_logo_wrapper",
    start: startPosition,
    end: "bottom center",
    invalidateOnRefresh: true,
    toggleActions: "play none reverse reset"
  }
})
.to('.slogan', {
  opacity:0,
},0)
.to('.logonav.small', {
  opacity:1,
},0);




  const cursor = document.querySelector('.cursor');
  const cursorStroke = document.querySelector('.cursor_stroke');
  const linksAndButtons = document.querySelectorAll('a, button');
  const cursorShowreel = document.querySelector('.showreel_cursor');
  const showreel = document.querySelector('.showreel');
  const showreelVideo = document.querySelector('#showreel-video');

  const showreelHero = document.querySelector('.hero_showreel');


  showreel.addEventListener("click", () => {
    showreelVideo.muted = !showreelVideo.muted;
    const state = Flip.getState(".hero_showreel");  
    showreelHero.classList.toggle("is-open");
    body.classList.toggle("overflow");
    cursorShowreel.classList.toggle("close");

    Flip.from(state, {
      absolute: true, 
      duration: 0.5, 
      ease: "power3.out",
    });
  });

  document.addEventListener("keydown", (event) => {
    // Check if the pressed key is the Escape key (keyCode 27)
    if (event.keyCode === 27) {
      showreelVideo.muted = true; // Mute the video
      showreelHero.classList.remove("is-open"); // Close the showreel
      body.classList.remove("overflow"); // Remove overflow styles
      cursorShowreel.classList.remove("close"); // Restore cursor styles

      Flip.from(state, {
      absolute: true, 
      duration: 0.5, 
      ease: "power3.out",
    });
    }
  });
  

  gsap.set([cursor, cursorStroke, cursorShowreel], { xPercent: -50, yPercent: -50 });

  const xC = gsap.quickSetter(cursor, "x", "px");
  const yC = gsap.quickSetter(cursor, "y", "px");
  const xCS = gsap.quickSetter(cursorShowreel, "x", "px");
  const yCS = gsap.quickSetter(cursorShowreel, "y", "px");

  window.addEventListener("mousemove", e => {
    xC(e.x)
    yC(e.y)
    xCS(e.x)
    yCS(e.y)
    gsap.to(cursorStroke, {
      duration: 0.2,
      x: e.clientX,
      y: e.clientY
    })
  });

  const handleHover = (element, opacityOnHover, scaleOnHover, duration = 0.4, ease = "power3.inOut") => {
    element.addEventListener('mouseover', () => {
      cursor.style.opacity = opacityOnHover;
      cursorStroke.style.opacity = opacityOnHover;
      gsap.to(cursorStroke, { scale: scaleOnHover, duration, ease });
    });
  
    element.addEventListener('mouseout', () => {
      cursor.style.opacity = 1;
      cursorStroke.style.opacity = 1;
      gsap.to(cursorStroke, { scale: 1, duration, ease });
    });
  };
  
linksAndButtons.forEach(element => handleHover(element, 0, 1.75)); // Default for links and buttons
showreel.addEventListener('mouseover', () => handleHover(showreel, 0, 2.25)); // Specific behavior for showreel
document.addEventListener('mousedown', function(event) { 
  gsap.to(cursorStroke,{
    scale: 1.5,
    ease: "power2.in"
  });
});
document.addEventListener('mouseup', function(event) {
  gsap.to(cursorStroke,{
    scale:1,
    delay:0.3,
    ease: "power2.out"
  });
});


  let showreelAnim = gsap.to(cursorShowreel, {
    paused: true,
    scale: 1,
    duration: 0.4,
    ease: "power3.inOut",
  });

  showreel.addEventListener("mouseenter", () => showreelAnim.play());
  showreel.addEventListener("mouseleave", () => showreelAnim.reverse());




  let offerItems = gsap.utils.toArray(".home_portfolio_item_wrapper");
  let scrollItems = gsap.utils.toArray("[data-item='scroll']");
  let offerCards = offerItems.length;
  let card = document.querySelector(".home_portfolio_item_wrapper");

  let moveDistance = card.offsetWidth;
  let move = moveDistance * (offerCards);

  let scrollTween = gsap.to(".home_portfolio_component", {
    x: -move,
    ease: "none",
    scrollTrigger: {
      trigger: ".section_home_portfolio",
      start: "center center",
      end: () => "+=" + window.innerHeight,
      pin: true,
      scrub: 1.5
    }
  });

  scrollItems.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      yPercent:15,
      scale:0.9,
      scrollTrigger: {
        containerAnimation: scrollTween,
        trigger: card,
        start: "left 70%",
        ease: "power3.inOut",
        toggleActions: "play none none reverse"
      }
    });
  });

  const splitAbout = new SplitType('#imbir-info', {
    types: 'words, chars'
  })

  const tlInfo = gsap.timeline({
      scrollTrigger: {
        trigger: ".section_home_about",
        start: "top 80%",
        end: "bottom 80%",
        // end: "+=150%",
        // pin: true,
        scrub: 0.5,
      }
    })
    .from(splitAbout.chars, {
      opacity: .1,
      scale: 0.95,
        stagger: 0.01,
        yPercent:10,
        duration: 0.1,
    });

    const splitCTA = new SplitType('.heading_cta', {
      types: 'words, chars'
    })
  
    const tlCTA = gsap.timeline({
        scrollTrigger: {
          trigger: ".section_main_cta",
          start: "top center",
          end: "bottom 80%",
          scrub: 2,
        }
      })
      .from(splitCTA.chars, {
        opacity: 0.01,
        scale: 0.90,
        stagger: 0.01,
        yPercent:10,
        duration: 0.1,
      });



  gsap.to('.home_photo_component', {
    scrollTrigger: {
      trigger: '.home_photo_component',
      scrub: 1
    }, // start the animation when ".box" enters the viewport (once)
    xPercent: -20
  });

  // gsap code here!
});
