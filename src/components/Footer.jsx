import React from "react";

const columns = [
  { title: "Visit", lines: ["24 Cocoa Lane", "Old Town"] },
  { title: "Open", lines: ["Daily 10am – 10pm", "Fresh batch at 9am"] },
  { title: "Say hello", lines: ["hello@chocobliss.com", "+1 (555) 014-2024"] },
];

const Footer = () => {
  return (
    <>
      <footer id="visit" className="relative w-full overflow-hidden bg-ink px-6 pt-24 pb-10 md:px-[8vw]">
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cream/60">{col.title}</h3>
              {col.lines.map((line) => (
                <p key={line} className="mt-3 text-lg text-cream/80">{line}</p>
              ))}
            </div>
          ))}
        </div>

        <p aria-label="ChocoBliss"
          className="footer-mark mt-20 whitespace-nowrap font-display text-[12vw] leading-[0.9] text-cocoa select-none">
          {"ChocoBliss".split("").map((letter, i) => (
            <span key={i} className="mask" aria-hidden="true">
              <span className={`footer-letter ${i >= 5 ? "" : ""}`}>{letter}</span>
            </span>
          ))}
          <span className="footer-glass ml-[0.06em] -mb-[0.08em] inline-block w-[0.7em] aspect-[2/3]" aria-hidden="true" />
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} ChocoBliss</span>
          <a href="#home" className="nav-link w-fit hover:text-cream">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
