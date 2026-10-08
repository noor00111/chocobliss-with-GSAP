import React from 'react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Visit', href: '#visit' },
];

const Navbar = () => {
  return (
    <>
      <nav
        id="navbar"
        className='fixed top-0 left-0 z-50 flex items-center justify-between w-full h-20 px-5 md:px-10 text-cream transition-[background,box-shadow] duration-500'>
        <a className='nav-anim text-outline font-display text-3xl md:text-4xl' href="#home">
          ChocoBliss
        </a>
        <div className="hidden sm:flex items-center gap-[3vw] text-sm tracking-wide">
          {links.map((link) => (
            <a key={link.href} className='nav-anim nav-link' href={link.href}>{link.label}</a>
          ))}
        </div>
        <div className='nav-anim'>
          <a
            href="#menu"
            className='inline-block rounded-full bg-cream px-5 py-2 text-sm font-semibold text-ink transition-[transform,background,color] duration-300 hover:scale-105 hover:bg-cocoa hover:text-cream'>
            Order now
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
