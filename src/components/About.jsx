import React from "react";
import aboutBg from '../assets/images/about-bg.png'

const heading = "Layered by hand, one glass at a time";

const facts = [
  { value: "70%", label: "cocoa in every ganache" },
  { value: "6", label: "layers in the signature cup" },
  { value: "0", label: "desserts kept overnight" },
];

const About = () => {
  return (
    <>
      <section
        id="about"
        className="relative flex w-full flex-col md:flex-row md:h-screen overflow-hidden bg-cocoa py-20">
        <div className="absolute right-[-10%] top-1/3 h-[60vh] w-[60vh] rounded-full bg-cream/10 blur-[120px]" />
        <div className="left-side relative w-full md:w-1/2 h-[55vh] md:h-full">
          <img
            className="about-splash absolute left-1/2 top-[42%] w-full max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90"
            src={aboutBg}
            alt=""
          />
        </div>

        <div className="right-side relative w-full md:w-1/2 flex flex-col justify-center gap-8 px-6 pb-20 md:pb-0 md:pt-[14vh] md:pl-4 md:pr-[8vw]">
          <p className="about-reveal font-mono text-xs uppercase tracking-[0.3em] text-cream/60">
            Our signature cup
          </p>
          <h2 className="about-heading font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            {heading.split(" ").map((word, i) => (
              <span key={i} className="mask mr-[0.25em]">
                <span className="about-word">{word}</span>
              </span>
            ))}
          </h2>
          <p className="about-reveal max-w-lg text-base md:text-lg leading-relaxed text-cream/80">
            Pure happiness in a glass — rich, creamy and perfectly sweet. Dark ganache,
            whipped cream and crushed biscuit, stacked fresh every morning. Whether you're
            cooling off on a hot day or just treating yourself, every spoonful feels like a
            little indulgent hug.
          </p>
          <ul className="grid grid-cols-3 gap-4 border-t border-cream/15 pt-6">
            {facts.map((fact) => (
              <li key={fact.label} className="about-fact">
                <span className="block font-display text-3xl md:text-4xl text-cream">{fact.value}</span>
                <span className="mt-1 block font-mono text-[11px] uppercase leading-snug tracking-wider text-cream/60">
                  {fact.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
