//style
const toggleButton = document.getElementById("theme-toggle");
const body = document.querySelector("body");

const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem("preferred-theme", theme);
};

const getTheme = () => {
  const theme = localStorage.getItem("preferred-theme");
  return theme || "dark";
};
const toggleTheme = () => {
  const currentTheme = body.dataset.theme;
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
};
toggleButton.addEventListener("click", toggleTheme);
const preferredTheme = getTheme();
setTheme(preferredTheme);

//gsap
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(Flip, ScrollTrigger);

  //navbar
  const showAnim = gsap
    .from(".nav_component", {
      yPercent: -150,
      opacity: 0,
      paused: true,
      duration: 0.6,
      ease: "circ.out",
    })
    .progress(1);
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });
  gsap.from("#logo *", {
    yPercent: 150,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: "circ.out",
  });
  gsap.from(".nav_container *", {
    yPercent: 100,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
  });

  let navbarLogoWrapper = document.querySelector(
    ".navbar_logo_wrapper"
  ).offsetHeight;
  let startPosition = "top+=" + navbarLogoWrapper + "px" + " top";
  function navChange() {
    navbarLogoWrapper = document.querySelector(
      ".navbar_logo_wrapper"
    ).offsetHeight;
    startPosition = "top+=" + navbarLogoWrapper + "px" + " top";
    ScrollTrigger.refresh();
  }
  window.addEventListener("resize", navChange);
  const tlNav = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".navbar_logo_wrapper",
        start: startPosition,
        end: "bottom center",
        invalidateOnRefresh: true,
        toggleActions: "play none reverse reset",
      },
    })
    .to(".slogan", {
      opacity: 0,
      duration: 0.001,
    })
    .to(".logonav.small", {
      opacity: 1,
      duration: 0.001,
    });

  //cursor
  const cursor = document.querySelector(".cursor");
  const cursorStroke = document.querySelector(".cursor_stroke");
  const linksAndButtons = document.querySelectorAll(
    "a, button, .blog17_menu-link"
  );

  gsap.set([cursor, cursorStroke], { xPercent: -50, yPercent: -50 });

  const xC = gsap.quickSetter(cursor, "x", "px");
  const yC = gsap.quickSetter(cursor, "y", "px");

  window.addEventListener("mousemove", (e) => {
    xC(e.x);
    yC(e.y);
    gsap.to(cursorStroke, {
      duration: 0.2,
      x: e.clientX,
      y: e.clientY,
    });
  });

  const handleHover = (element, opacityOnHover, scaleOnHover) => {
    element.addEventListener("mouseover", () => {
      cursor.style.opacity = opacityOnHover;
      cursorStroke.style.opacity = opacityOnHover;
      gsap.to(cursorStroke, {
        scale: scaleOnHover,
        duration: 0.4,
        ease: "circ.inOut",
      });
    });

    element.addEventListener("mouseout", () => {
      cursor.style.opacity = 1;
      cursorStroke.style.opacity = 1;
      gsap.to(cursorStroke, { scale: 1, duration: 1, eease: "circ.inOut" });
    });
  };

  linksAndButtons.forEach((element) => handleHover(element, 0, 1.75)); // Default for links and buttons
  document.addEventListener("mousedown", function (event) {
    gsap.to(cursorStroke, {
      scale: 1.5,
      ease: "circ.out",
    });
  });
  document.addEventListener("mouseup", function (event) {
    gsap.to(cursorStroke, {
      scale: 1,
      delay: 0.3,
      ease: "circ.out",
    });
  });

  //CTA
  const splitCTA = new SplitType(".heading_cta", {
    types: "words, chars",
  });

  const tlCTA = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".section_main_cta",
        start: "top center",
        end: "bottom 80%",
        scrub: 2,
      },
    })
    .from(splitCTA.chars, {
      opacity: 0.01,
      scale: 0.9,
      stagger: 0.01,
      yPercent: 10,
      duration: 0.1,
    });

  //rich-text

  gsap.set(".text-rich-text *", { opacity: 0, yPercent: 20 });
  ScrollTrigger.batch(".text-rich-text *", {
    start: "center 95%",
    onEnter: (batch) =>
      gsap.to(batch, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "circ.out",
      }),
  });

  //footer
  const tlfooter = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
        end: "center bottom",
        toggleActions: "restart none reverse none",
      },
    })
    .from("#logoFooter path", {
      yPercent: 150,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "circ.out",
    });

  // gsap code here!
});
