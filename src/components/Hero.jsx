import chocolate from '../assets/images/chocolate.png'
import drink from '../assets/images/chocolate-drink.png'
import chocolate2 from '../assets/images/choclate2.png'
import chocolate3 from '../assets/images/chocolate-3.png'
import bgChocolate from '../assets/images/bg-chocolate.jpg'

const drips = [
  [40, 30, 90], [170, 44, 150], [320, 24, 70], [450, 38, 170], [610, 28, 105],
  [760, 48, 190], [920, 26, 85], [1060, 40, 140], [1220, 30, 115], [1350, 46, 160],
];

const Hero = () => {
  return (
    <>
      <section id="home" className="hero relative z-10 flex flex-col items-center justify-end pb-[9vh] w-full h-screen bg-no-repeat bg-cover bg-center max-md:overflow-x-clip"
        style={{ backgroundImage: `url(${bgChocolate})` }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(31_21_12/0.2),rgb(0_0_0/0.75))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ganache" />

        <div className="hero-copy relative z-[4] flex flex-col items-center">
          <h1 aria-label="Chocolate"
            className="hero-title relative font-display text-cream text-[18vw] md:text-[15vw] leading-none [text-shadow:0_0.04em_0_var(--color-cocoa)]">
            {'Chocolate'.split('').map((letter, i) => (
              <span key={i} className="mask" aria-hidden="true">
                <span className="hero-letter">{letter}</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub relative mt-4 max-w-md px-6 text-center text-sm md:text-base text-cream/80">
            Layered cups, glossy tarts and gold-dusted truffles — made in small batches every morning.
          </p>
          <a
            href="#menu"
            className="hero-sub relative z-20 mt-6 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-cream hover:text-ganache">
            See the menu
          </a>
        </div>

        <img id="chocolate" className="flying z-[1]" src={chocolate} alt="" />
        <img id="drink" className="flying z-[2]" src={drink} alt="" />
        <img id="chocolate2" className="flying z-[3]" src={chocolate2} alt="" />
        <img id="chocolate3" className="flying z-[3]" src={chocolate3} alt="" />

        <svg
          className="drip-svg absolute left-0 top-full w-full h-[22vh] pointer-events-none"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true">
          <rect className="fill-ganache" x="0" y="-1" width="1440" height="26" />
          {drips.map(([x, w, len]) => (
            <path
              key={x}
              className="drip fill-ganache"
              d={`M${x} 0 h${w} v${len} a${w / 2} ${w / 2} 0 0 1 -${w} 0 Z`}
            />
          ))}
        </svg>
      </section>
    </>
  );
};

export default Hero;
