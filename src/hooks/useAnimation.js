import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const desktop = {
  hero: {
    "#drink":      { left: "40%", top: "18%", width: "22%", rotation: 0 },
    "#chocolate":  { left: "14%", top: "16%", width: "13%", rotation: 0 },
    "#chocolate3": { left: "38%", top: "12%",  width: "16%", rotation: 0 },
    "#chocolate2": { left: "86%", top: "38%", width: "10%", rotation: '20deg' },
  },
  about: {
    "#drink":      { left: "17%", top: "123%", width: "18%", rotation: -10 },
    "#chocolate":  { left: "23%",  top: "130%", width: "8%", rotation: 20 },
    "#chocolate3": { left: "16%", top: "120%", width: "13%", rotation: 25 },
    "#chocolate2": { right: "40%", top: "162%", width: "8%", rotation: -20 },
  },
  podium: {
    "#drink":      { left: "42%", top: "220%", width: "18%", rotation: 0 },
    "#chocolate":  { left: "36%", top: "252%", width: "13%", rotation: 360 },
    "#chocolate2": { left: "52%", top: "230%", width: "6%",  rotation: 0 },
  },
};

const mobileHero = {
  "#drink":      { left: "25%", top: "18%", width: "50%", rotation: 0 },
  "#chocolate":  { left: "4%",  top: "12%", width: "26%", rotation: 0 },
  "#chocolate3": { left: "68%", top: "10%", width: "30%", rotation: 0 },
  "#chocolate2": { left: "76%", top: "46%", width: "20%", rotation: 0 },
};


const docOffset = (el) => {
  let top = 0;
  let left = 0;
  for (let node = el; node; node = node.offsetParent) {
    top += node.offsetTop;
    left += node.offsetLeft;
  }
  return { top, left };
};

const slotPosition = (selector) => {
  const measure = () => {
    const slot = document.querySelector(selector);
    const hero = docOffset(document.querySelector("#home"));
    const pos = docOffset(slot);
    return { top: pos.top - hero.top, left: pos.left - hero.left, width: slot.offsetWidth };
  };
  return {
    top: () => measure().top,
    left: () => measure().left,
    width: () => measure().width,
  };
};

const HERO_ANIMATED = "#chocolate, #chocolate3";

const setPositions = (positions) => {
  Object.entries(positions).forEach(([id, props]) => gsap.set(id, props));
};

const fly = (tl, from, to, label) => {
  Object.entries(to).forEach(([id, props]) => {
    tl.fromTo(
      id,
      from[id],
      { ...props, ease: "power2.inOut", duration: 0.95, immediateRender: false },
      label
    );
  });
};

const useAnimation = (scope) => {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let refreshTimer;
      const refreshSoon = () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
      };
      const layoutObserver = new ResizeObserver(refreshSoon);
      layoutObserver.observe(scope.current);
      document.fonts?.ready.then(refreshSoon);

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions;

          setPositions(isDesktop ? desktop.hero : mobileHero);
          if (reduceMotion) return;

          const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
          intro
            .from(".nav-anim", { y: -40, opacity: 0, stagger: 0.08, duration: 0.8 })
            .from(".hero-letter", { yPercent: 115, stagger: 0.05, duration: 1.1 }, 0.1)
            .from(HERO_ANIMATED, {
              scale: 0,
              opacity: 0,
              rotation: -40,
              stagger: 0.1,
              duration: 1.2,
              ease: "back.out(1.6)",
            }, 0.5)
            .from(".hero-sub", { y: 30, opacity: 0, stagger: 0.1, duration: 0.9 }, 0.8);

          const floats = gsap.utils.toArray(HERO_ANIMATED).map((el, i) =>
            gsap.to(el, {
              y: i % 2 ? 14 : -14,
              duration: 2.4 + i * 0.3,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            })
          );

          ScrollTrigger.create({
            trigger: "#podium",
            start: "top 60%",
            onEnter: () => {
              floats.forEach((float) => float.pause());
              gsap.to(HERO_ANIMATED, { y: 0, duration: 0.6, ease: "power2.out", overwrite: "auto" });
            },
            onLeaveBack: () => floats.forEach((float) => float.restart()),
          });

          const navbar = document.querySelector("#navbar");
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => navbar.classList.toggle("nav-solid", self.scroll() > 80),
          });

          gsap.to(".hero-copy", {
            yPercent: -40,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: "#home", start: "top top", end: "60% top", scrub: true },
          });

          gsap.utils.toArray(".drip").forEach((drip) => {
            gsap.fromTo(
              drip,
              { scaleY: gsap.utils.random(0.15, 0.45), transformOrigin: "50% 0%" },
              {
                scaleY: gsap.utils.random(1, 1.25),
                ease: "none",
                scrollTrigger: { trigger: "#about", start: "top bottom", end: "top 20%", scrub: true },
              }
            );
          });

          if (isDesktop) {
            const flight = gsap.timeline({
              scrollTrigger: {
                trigger: "#home",
                start: "top top",
                endTrigger: "#podium",
                end: "top top",
                scrub: 1,
              },
            });
            fly(flight, desktop.hero, desktop.about, 0);
            fly(flight, desktop.about, desktop.podium, 1.05);

            gsap.set(".menu-glass", { autoAlpha: 0 });
            gsap.fromTo(
              "#drink",
              desktop.podium["#drink"],
              {
                ...slotPosition(".menu-glass"),
                rotation: 360,
                ease: "power1.inOut",
                immediateRender: false,
                scrollTrigger: {
                  trigger: "#podium",
                  start: "top -15%",
                  endTrigger: ".menu-glass",
                  end: "center 55%",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );

            gsap.fromTo(
              "#drink",
              { ...slotPosition(".menu-glass"), rotation: 360 },
              {
                ...slotPosition(".footer-glass"),
                rotation: 0,
                ease: "power1.inOut",
                immediateRender: false,
                scrollTrigger: {
                  trigger: ".menu-glass",
                  start: "center 40%",
                  endTrigger: "#visit",
                  end: "bottom bottom",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              }
            );
          } else {
            gsap.fromTo(
              ".flying",
              { yPercent: 0, opacity: 1 },
              {
                yPercent: -80,
                opacity: 0,
                stagger: 0.05,
                ease: "none",
                immediateRender: false,
                scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
              }
            );
          }

          const about = gsap.timeline({
            scrollTrigger: { trigger: "#about", start: "top 45%", toggleActions: "play none none reverse" },
          });
          about
            .from(".about-word", { yPercent: 110, stagger: 0.06, duration: 0.9, ease: "power4.out" })
            .from(".about-reveal", { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" }, 0.1)
            .from(".about-fact", { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(1.7)" }, 0.4);

          gsap.fromTo(
            ".about-splash",
            { rotation: -25, yPercent: 20 },
            {
              rotation: -8,
              yPercent: -20,
              ease: "none",
              scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
            }
          );

          gsap.from(".podium-reveal", {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: "#podium", start: "top 40%", toggleActions: "play none none reverse" },
          });
          gsap.fromTo(
            ".podium-bg",
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: "#podium", start: "top bottom", end: "top top", scrub: true },
            }
          );

          gsap.to(".marquee-track", { xPercent: -50, duration: 22, ease: "none", repeat: -1 });

          gsap.from(".menu-heading", {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: "#menu", start: "top 70%" },
          });
          gsap.from(".product-card", {
            y: 80,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: "#menu ul", start: "top 80%" },
          });

          gsap.from(".footer-col", {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: "#visit", start: "top 75%" },
          });
          gsap.from(".footer-letter", {
            yPercent: 110,
            stagger: 0.04,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".footer-mark", start: "top 95%" },
          });
        }
      );

      return () => {
        layoutObserver.disconnect();
        clearTimeout(refreshTimer);
      };
    },
    { scope }
  );
};

export default useAnimation;
