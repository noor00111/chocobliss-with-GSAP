import React from "react";
import podiumImg from "../assets/images/footer.jpg";

const BottomSection = () => {
  return (
    <>
      <section id="podium" className="relative flex w-full h-screen items-start justify-center overflow-hidden">
        <img className="podium-bg absolute inset-0 w-full h-full object-cover" src={podiumImg} alt="" />
        <div className="absolute inset-0 bg-cocoa mix-blend-color" />
        <div className="absolute inset-0 bg-ganache/25 mix-blend-multiply" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cocoa to-transparent" />
        <div className="relative pt-[14vh] text-center px-6">
          <p className="podium-reveal font-mono text-xs uppercase tracking-[0.3em] text-cream/70">
            Today's line-up
          </p>
          <h2 className="podium-reveal mt-2 font-display text-4xl md:text-7xl text-cream [text-shadow:0_0.05em_0_var(--color-cocoa)]">
            Fresh on the stand
          </h2>
        </div>
      </section>
    </>
  );
};

export default BottomSection;
