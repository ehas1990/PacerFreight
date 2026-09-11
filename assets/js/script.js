/* =========================================
   SCROLL RESTORATION FIX
========================================= */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     GSAP SETUP
  ========================================= */

  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    console.error("GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);


  /* =========================================
     MOBILE MENU
  ========================================= */

  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav a");

  if (menuBtn && mobileNav) {

    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");
      });

    });

  }


  /* =========================================
     SMOOTH ANCHOR SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  /* =========================================
     HERO BACKGROUND AUTO PLAY
  ========================================= */

  const scenes = [
    ".bg-1",
    ".bg-2",
    ".bg-3"
  ];

  const sceneElements = scenes
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);


  if (sceneElements.length > 1) {

    let activeScene = 0;

    gsap.set(sceneElements, {
      opacity: 0,
      scale: 1.12,
      filter: "blur(5px)"
    });

    gsap.set(sceneElements[0], {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)"
    });


    function playBackgroundTransition() {

      const currentScene =
        sceneElements[activeScene];

      activeScene =
        (activeScene + 1) % sceneElements.length;

      const nextScene =
        sceneElements[activeScene];


      const bgTimeline = gsap.timeline({
        onComplete: playBackgroundTransition
      });


      bgTimeline.to({}, {
        duration: 4
      });


      bgTimeline.set(nextScene, {
        opacity: 0,
        scale: 1.18,
        filter: "blur(10px)"
      });


      bgTimeline.to(
        currentScene,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(8px)",
          duration: 2,
          ease: "power2.inOut"
        }
      );


      bgTimeline.to(
        nextScene,
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          ease: "power2.inOut"
        },
        "<"
      );

    }


    playBackgroundTransition();

  }


  /* =========================================
     HERO INTRO ANIMATION
  ========================================= */

  const loader = document.querySelector(".site-loader");

  const intro = gsap.timeline();


  if (loader) {

    // Start logo from left
    gsap.set(".loader-logo", { x: -140, y: 0 });

    // Gentle natural wave floating motion (up/down and subtle micro-tilt)
    const floatAnim = gsap.to(".loader-logo", {
      y: -12,
      rotation: 1.5,
      duration: 1.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Smooth horizontal travel from LEFT to RIGHT (3.2 seconds)
    intro
      .to(".loader-logo", {
        x: 140,
        duration: 3.2,
        ease: "sine.inOut"
      })

      // Smooth fade out of entire loader background
      .to(loader, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          floatAnim.kill();
          loader.style.display = "none";
        }
      });

  }


  intro

    .from(".header", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=.3")

    .from(".hero-eyebrow", {
      x: -40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=.3")

    .from(".hero-title .title-line", {
      yPercent: 120,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: "power4.out"
    }, "-=.2")

    .from(".hero-description", {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=.5")

    .from(".hero-actions", {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=.4")

    .from(".hero-stats", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=.4")

    .from(".route-line", {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=.7");


  /* =========================================
     HERO MAP PARALLAX
  ========================================= */

  if (document.querySelector(".hero-map")) {

    gsap.to(".hero-map", {

      x: 80,

      ease: "none",

      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }

    });

  }


  /* =========================================
     LIGHT TRAILS
  ========================================= */

  if (document.querySelector(".trail-one")) {

    gsap.to(".trail-one", {

      x: -120,
      opacity: 1,

      duration: 2.5,
      repeat: -1,
      yoyo: true,

      ease: "sine.inOut"

    });

  }


  if (document.querySelector(".trail-two")) {

    gsap.to(".trail-two", {

      x: -80,

      duration: 3.2,
      repeat: -1,
      yoyo: true,

      ease: "sine.inOut"

    });

  }


  /* =========================================
     OLD ABOUT SECTION
  ========================================= */

  if (document.querySelector(".about-section")) {

    gsap.from(".about-label", {

      scrollTrigger: {
        trigger: ".about-section",
        start: "top 78%",
        once: true
      },

      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"

    });


    gsap.from(".about-heading h2", {

      scrollTrigger: {
        trigger: ".about-section",
        start: "top 65%",
        once: true
      },

      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power4.out"

    });


    gsap.from(".about-text", {

      scrollTrigger: {
        trigger: ".about-section",
        start: "top 60%",
        once: true
      },

      y: 50,
      opacity: 0,
      duration: 0.9,
      delay: 0.2,
      ease: "power3.out"

    });

  }


  /* =========================================
     OLD SERVICES SECTION
  ========================================= */

  if (document.querySelector(".services-section")) {

    gsap.from(".services-heading", {

      scrollTrigger: {
        trigger: ".services-section",
        start: "top 75%",
        once: true
      },

      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"

    });


    const oldServiceItems =
      document.querySelectorAll(".service-item");

    if (oldServiceItems.length) {

      gsap.from(oldServiceItems, {

        scrollTrigger: {
          trigger: ".services-list",
          start: "top 78%",
          once: true
        },

        x: -70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out"

      });

    }

  }


  /* =========================================
     NETWORK SECTION
  ========================================= */

  if (document.querySelector(".network-section")) {

    gsap.from(".network-content", {

      scrollTrigger: {
        trigger: ".network-section",
        start: "top 70%",
        once: true
      },

      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"

    });

  }


  /* =========================================
     CTA SECTION
  ========================================= */

  if (document.querySelector(".cta-section")) {

    gsap.from(".cta-content h2", {

      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 70%",
        once: true
      },

      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out"

    });


    gsap.from(".cta-circle", {

      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 65%",
        once: true
      },

      scale: 0,
      rotation: -90,
      duration: 1,
      ease: "back.out(1.4)"

    });

  }


  /* =========================================
     PACER ABOUT SECTION
  ========================================= */

  function initAboutPacerAnimations() {

    const aboutSection =
      document.querySelector(".about-pacer");

    if (!aboutSection) {
      return;
    }


    /* TOP */

    const aboutTop =
      gsap.timeline({

        scrollTrigger: {
          trigger: aboutSection,
          start: "top 80%",
          once: true
        }

      });


    aboutTop

      .from(
        ".about-pacer__section-label, .about-pacer__top-line",
        {
          opacity: 0,
          x: -40,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out"
        }
      )

      .from(
        ".about-pacer__logo",
        {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.5"
      );


    /* HISTORY TITLE */

    if (
      document.querySelector(".history-title-line")
    ) {

      gsap.from(".history-title-line", {

        scrollTrigger: {
          trigger: ".about-history",
          start: "top 75%",
          once: true
        },

        y: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out"

      });

    }


    /* HISTORY TEXT */

    if (
      document.querySelector(".about-history__text p")
    ) {

      gsap.from(".about-history__text p", {

        scrollTrigger: {
          trigger: ".about-history__text",
          start: "top 82%",
          once: true
        },

        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"

      });

    }


    /* STATS */

    if (
      document.querySelector(".history-stat")
    ) {

      gsap.from(".history-stat", {

        scrollTrigger: {
          trigger: ".about-history__stats",
          start: "top 88%",
          once: true
        },

        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"

      });

    }


    /* HISTORY IMAGE */

    if (
      document.querySelector(".history-image")
    ) {

      gsap.from(".history-image", {

        scrollTrigger: {
          trigger: ".about-history__visual",
          start: "top 78%",
          once: true
        },

        clipPath:
          "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",

        duration: 1.4,
        ease: "power4.inOut"

      });

    }


    if (
      document.querySelector(".history-plane")
    ) {

      gsap.from(".history-plane", {

        scrollTrigger: {
          trigger: ".about-history__visual",
          start: "top 80%",
          once: true
        },

        opacity: 0,
        y: 50,
        x: -50,
        duration: 1,
        delay: 0.4,
        ease: "power3.out"

      });

    }


    if (
      document.querySelector(".history-floating-card")
    ) {

      gsap.from(".history-floating-card", {

        scrollTrigger: {
          trigger: ".about-history__visual",
          start: "top 72%",
          once: true
        },

        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"

      });

    }


    /* MISSION */

    if (
      document.querySelector(".about-mission")
    ) {

      gsap.from(".about-mission", {

        scrollTrigger: {
          trigger: ".about-mission",
          start: "top 85%",
          once: true
        },

        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"

      });

    }


    /* VISION */

    if (
      document.querySelector(".about-vision__image")
    ) {

      gsap.from(".about-vision__image", {

        scrollTrigger: {
          trigger: ".about-vision",
          start: "top 82%",
          once: true
        },

        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out"

      });

    }


    const visionContent =
      document.querySelectorAll(
        ".about-vision__content > *"
      );

    if (visionContent.length) {

      gsap.from(visionContent, {

        scrollTrigger: {
          trigger: ".about-vision",
          start: "top 82%",
          once: true
        },

        opacity: 0,
        x: 35,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out"

      });

    }


    /* VALUES */

    if (
      document.querySelector(".about-values__heading")
    ) {

      gsap.from(".about-values__heading", {

        scrollTrigger: {
          trigger: ".about-values",
          start: "top 82%",
          once: true
        },

        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out"

      });

    }


    const valueItems =
      document.querySelectorAll(".value-item");

    if (valueItems.length) {

      gsap.from(valueItems, {

        scrollTrigger: {
          trigger: ".values-list",
          start: "top 85%",
          once: true
        },

        opacity: 0,
        y: 45,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out"

      });

    }


    /* HISTORY IMAGE PARALLAX */

    const historyImage =
      document.querySelector(".history-image img");

    if (
      historyImage &&


      historyImage &&
      document.querySelector(".about-history__visual")
    ) {

      gsap.to(historyImage, {

        yPercent: 8,

        ease: "none",

        scrollTrigger: {
          trigger: ".about-history__visual",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }

      });

    }

  }


  /* =========================================
     PACER SERVICES SECTION
  ========================================= */

  function initPacerServicesAnimation() {

    const section =
      document.querySelector(".pacer-services");

    if (!section) return;


    const heading =
      section.querySelector(".services-heading");

    const visual =
      section.querySelector(".services-main-image");

    const cards =
      section.querySelectorAll(".service-card");

    const grid =
      section.querySelector(".services-grid");


    /* =====================================
       HEADING
    ===================================== */

    if (heading) {

      gsap.from(
        heading.children,
        {

          scrollTrigger: {
            trigger: heading,
            start: "top 82%",
            once: true
          },

          y: 60,
          opacity: 0,

          stagger: 0.12,

          duration: 0.9,

          ease: "power3.out"

        }
      );

    }


    /* =====================================
       MAIN VISUAL
    ===================================== */

    if (visual) {

      const visualImage =
        visual.querySelector("img");

      const visualContent =
        visual.querySelectorAll(
          ".services-main-image__content, .service-image-content"
        );


      const visualTimeline =
        gsap.timeline({

          scrollTrigger: {
            trigger: visual,
            start: "top 80%",
            once: true
          }

        });


      if (visualImage) {

        visualTimeline.from(
          visualImage,
          {

            scale: 1.15,

            opacity: 0,

            duration: 1.2,

            ease: "power4.out"

          }
        );

      }


      if (visualContent.length) {

        visualTimeline.from(
          visualContent,
          {

            y: 40,

            opacity: 0,

            stagger: 0.12,

            duration: 0.8,

            ease: "power3.out"

          },
          "-=0.7"
        );

      }


      const brandShape =
        visual.querySelector(
          ".services-main-image__shape, .brand-shape"
        );


      if (brandShape) {

        visualTimeline.from(
          brandShape,
          {

            x: 120,

            opacity: 0,

            duration: 0.9,

            ease: "power4.out"

          },
          "-=0.7"
        );

      }

    }


    /* =====================================
       SERVICE CARDS
    ===================================== */

    if (cards.length && grid) {

      gsap.from(
        cards,
        {

          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            once: true
          },

          y: 70,

          opacity: 0,

          scale: 0.97,

          stagger: 0.12,

          duration: 0.8,

          ease: "power3.out"

        }
      );

    }


    /* =====================================
       SERVICES IMAGE PARALLAX
    ===================================== */

    const serviceImage =
      section.querySelector(
        ".services-main-image img"
      );


    if (serviceImage && visual) {

      gsap.to(
        serviceImage,
        {

          yPercent: 6,

          ease: "none",

          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }

        }
      );

    }

  }


  /* =========================================
     ACTIVE DESKTOP NAVIGATION
  ========================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(".desktop-nav a");


  if (sections.length && navLinks.length) {

    sections.forEach((section) => {

      ScrollTrigger.create({

        trigger: section,

        start: "top center",

        end: "bottom center",

        onEnter: () => {
          setActive(section.id);
        },

        onEnterBack: () => {
          setActive(section.id);
        }

      });

    });

  }


  function setActive(id) {

    navLinks.forEach((link) => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") === `#${id}`
      ) {
        link.classList.add("active");
      }

    });

  }


  /* =========================================
     INITIALIZE NEW SECTIONS
  ========================================= */

  initAboutPacerAnimations();

  initPacerServicesAnimation();


  /* =========================================
     REFRESH AFTER PAGE LOAD
  ========================================= */

  function refreshAllScrollTriggers() {

    ScrollTrigger.refresh();

  }


  requestAnimationFrame(() => {

    refreshAllScrollTriggers();

  });


  window.addEventListener("load", () => {

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        refreshAllScrollTriggers();

        setTimeout(
          refreshAllScrollTriggers,
          250
        );

        setTimeout(
          refreshAllScrollTriggers,
          700
        );

        setTimeout(
          refreshAllScrollTriggers,
          1200
        );

      });

    });

  });


  /* =========================================
     REFRESH ON RESIZE
  ========================================= */

  let resizeTimer;


  window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

      ScrollTrigger.refresh();

    }, 200);

  });

});


/* =========================================
   PACER FOOTER ANIMATION
========================================= */

function initFooterAnimations() {

  const footer =
    document.querySelector(".pacer-footer");


  if (!footer) return;


  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }


  gsap.registerPlugin(ScrollTrigger);


  /* Prevent duplicate initialization */

  if (
    footer.dataset.animationInit === "true"
  ) {
    return;
  }


  footer.dataset.animationInit = "true";


  /* =========================================
     MAIN COLUMNS
  ========================================= */

  const revealItems =
    footer.querySelectorAll(".footer-reveal");


  if (revealItems.length) {

    gsap.from(revealItems, {

      y: 60,

      opacity: 0,

      duration: 1,

      stagger: 0.16,

      ease: "power3.out",

      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        once: true
      }

    });

  }


  /* =========================================
     SOCIAL ICONS
  ========================================= */

  const socialIcons =
    footer.querySelectorAll(
      ".footer-social a"
    );


  if (socialIcons.length) {

    gsap.from(socialIcons, {

      scale: 0,

      opacity: 0,

      stagger: 0.1,

      duration: 0.6,

      ease: "back.out(1.8)",

      scrollTrigger: {
        trigger: ".footer-social",
        start: "top 90%",
        once: true
      }

    });

  }


  /* =========================================
     CONTACT BUTTON
  ========================================= */

  const contactButton =
    footer.querySelector(
      ".footer-contact-btn"
    );


  if (contactButton) {

    gsap.from(contactButton, {

      y: 25,

      opacity: 0,

      duration: 0.8,

      ease: "power3.out",

      scrollTrigger: {
        trigger: contactButton,
        start: "top 95%",
        once: true
      }

    });

  }


  /* =========================================
     BOTTOM SECTION
  ========================================= */

  const footerBottom =
    footer.querySelector(
      ".footer-bottom__container"
    );


  if (footerBottom) {

    gsap.from(footerBottom, {

      y: 35,

      opacity: 0,

      duration: 0.8,

      ease: "power3.out",

      scrollTrigger: {
        trigger: footerBottom,
        start: "top 95%",
        once: true
      }

    });

  }

}


/* =========================================
   INITIALIZE FOOTER
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initFooterAnimations();

  }
);


/* =========================================
   FINAL PAGE LOAD SAFETY REFRESH
========================================= */

window.addEventListener("load", () => {

  if (
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }


  requestAnimationFrame(() => {

    ScrollTrigger.refresh();

  });


  setTimeout(() => {

    ScrollTrigger.refresh();

  }, 500);


  setTimeout(() => {

    ScrollTrigger.refresh();

  }, 1000);


  setTimeout(() => {

    ScrollTrigger.refresh();

  }, 1500);

});


/* =========================================
   PACER FOOTER ANIMATION
========================================= */

function initFooterAnimations() {

  const footer = document.querySelector(".pacer-footer");

  if (!footer) return;

  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);


  /* Prevent duplicate initialization */

  if (footer.dataset.animationInit === "true") {
    return;
  }

  footer.dataset.animationInit = "true";


  /* -----------------------------------------
     MAIN COLUMNS
  ----------------------------------------- */

  const revealItems =
    footer.querySelectorAll(".footer-reveal");


  if (revealItems.length) {

    gsap.from(revealItems, {

      y: 60,

      opacity: 0,

      duration: 1,

      stagger: 0.16,

      ease: "power3.out",

      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        once: true
      }

    });

  }


  /* -----------------------------------------
     SOCIAL ICONS
  ----------------------------------------- */

  const socialIcons =
    footer.querySelectorAll(".footer-social a");


  if (socialIcons.length) {

    gsap.from(socialIcons, {

      scale: 0,

      opacity: 0,

      stagger: 0.1,

      duration: 0.6,

      ease: "back.out(1.8)",

      scrollTrigger: {
        trigger: ".footer-social",
        start: "top 90%",
        once: true
      }

    });

  }


  /* -----------------------------------------
     CONTACT BUTTON
  ----------------------------------------- */

  const contactButton =
    footer.querySelector(".footer-contact-btn");


  if (contactButton) {

    gsap.from(contactButton, {

      y: 25,

      opacity: 0,

      duration: 0.8,

      ease: "power3.out",

      scrollTrigger: {
        trigger: contactButton,
        start: "top 95%",
        once: true
      }

    });

  }


  /* -----------------------------------------
     BOTTOM SECTION
  ----------------------------------------- */

  gsap.from(
    ".footer-bottom__container",
    {

      y: 35,

      opacity: 0,

      duration: 0.8,

      ease: "power3.out",

      scrollTrigger: {
        trigger: ".footer-bottom",
        start: "top 95%",
        once: true
      }

    }
  );


  /* -----------------------------------------
     BACKGROUND PARALLAX
  ----------------------------------------- */

  const footerBackground =
    footer.querySelector(".pacer-footer__bg img");


  if (footerBackground) {

    gsap.to(
      footerBackground,
      {

        yPercent: 0,

        ease: "none",

        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }

      }
    );

  }

}


/* =========================================
   INITIALIZE FOOTER
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initFooterAnimations();

  }
);


/* =========================================
   MOBILE MENU - INDEPENDENT
========================================= */

$(document).ready(function () {

  // Open / toggle menu
  $(".mobile-menu-btn").click(function () {

    $(".mobile-nav").addClass("active");

    $(this).addClass("active");

  });


  // Close button
  $(".mobile-close-btn").click(function () {

    $(".mobile-nav").removeClass("active");

    $(".mobile-menu-btn").removeClass("active");

  });


  // Close when clicking menu links
  $(".mobile-nav a").click(function () {

    $(".mobile-nav").removeClass("active");

    $(".mobile-menu-btn").removeClass("active");

  });

});


/* =========================================
   COMPANY PROFILE SCROLL ANIMATION
   Uses existing Locomotive + ScrollTrigger
========================================= */

const companyProfile =
  document.querySelector(".company-profile");


if (
  companyProfile &&
  typeof gsap !== "undefined"
) {

  const profileTimeline =
    gsap.timeline({

      scrollTrigger: {
        trigger: ".company-profile",
        start: "top 75%",
        once: true
      }

    });


  /* Label */

  profileTimeline.from(
    ".profile-label",
    {

      y: 30,

      opacity: 0,

      duration: 0.7,

      ease: "power3.out"

    }
  );


  /* Title */

  profileTimeline.from(
    ".profile-title",
    {

      y: 60,

      opacity: 0,

      duration: 0.9,

      ease: "power4.out"

    },
    "-=0.3"
  );


  /* Line */

  profileTimeline.from(
    ".profile-line",
    {

      scaleX: 0,

      transformOrigin: "left center",

      duration: 0.7,

      ease: "power3.out"

    },
    "-=0.5"
  );


  /* Description */

  profileTimeline.from(
    ".profile-description",
    {

      y: 35,

      opacity: 0,

      duration: 0.8,

      ease: "power3.out"

    },
    "-=0.3"
  );


  /* Image */

  profileTimeline.from(
    ".company-profile__visual",
    {

      x: 80,

      opacity: 0,

      duration: 1.1,

      ease: "power4.out"

    },
    "-=0.8"
  );


  /* Image zoom reveal */

  profileTimeline.from(
    ".company-profile__visual img",
    {

      scale: 1.2,

      duration: 1.3,

      ease: "power3.out"

    },
    "-=1.1"
  );

}