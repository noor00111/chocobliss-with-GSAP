import React from "react";
import drink from "../assets/images/chocolate-drink.png";
import truffles from "../assets/images/menu-1.png";
import sundae from "../assets/images/menu-2.png";
import mousse from "../assets/images/menu-3.png";

const products = [
  { name: "Signature Layer Cup", note: "Cocoa mousse, vanilla cream, biscuit crumb and caramel ribbons", price: "$7.50", img: drink, landing: true, size: "h-[105%]" },
  { name: "Truffle Tasting Plate", note: "Cocoa-dusted, sprinkle-rolled and hazelnut truffles with milk chocolate cups", price: "$12.00", img: truffles, size: "h-8/12" },
  { name: "Caramel Peanut Sundae", note: "Chocolate and vanilla gelato, hot fudge, caramel, peanuts and a waffle crisp", price: "$8.50", img: sundae, size: "h-8/12" },
  { name: "Brownie Mousse Cup", note: "Chocolate mousse layered with brownie, glossy ganache and dark curls", price: "$8.00", img: mousse, size: "h-8/12"},
];

const words = ["Hand-tempered", "70% cocoa", "Baked every morning", "Small batches", "No preservatives"];

const Menu = () => {
  return (
    <>
      <div className="overflow-hidden bg-cocoa py-10 text-cream" aria-hidden="true">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {words.map((word) => (
                <span key={word} className="flex items-center font-display text-2xl md:text-4xl">
                  <span className="px-6">{word}</span>
                  <span className="text-ink">🍯</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="menu" className="relative w-full bg-cream px-6 md:px-[8vw] md:py-34 py-24 text-ganache">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="menu-heading font-display text-5xl md:text-7xl leading-none text-cocoa">
            The menu
          </h2>
          <p className="menu-heading max-w-sm text-base text-ganache/70">
            Four favourites, made fresh daily. Order at the counter or pick up from the stand.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li
              key={product.name}
              className="product-card group flex flex-col rounded-[2rem] bg-cocoa/5 p-6 ring-1 ring-cocoa/15 transition-[background,box-shadow] duration-500 hover:bg-cocoa/10 hover:shadow-[0_30px_60px_-30px_rgb(31_21_12/0.6)]">
              <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[1.4rem] bg-cocoa/10">
                <div className="absolute h-48 w-48 rounded-full bg-cocoa/15 transition-colors duration-500 group-hover:bg-cocoa/25" />
                <img className={`relative w-auto max-w-full shrink-0 object-contain ${product.size ?? "h-full py-2"} ${product.landing ? "menu-glass" : ""}`} src={product.img} alt={product.name} />
              </div>
              <h3 className="mt-6 text-xl font-bold">{product.name}</h3>
              <p className="mt-1 text-sm text-ganache/60">{product.note}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-lg text-cocoa">{product.price}</span>
                <a href="#visit"
                  className="rounded-full bg-ganache px-4 py-2 text-xs font-semibold text-cream transition-colors duration-300 hover:bg-cocoa">
                  Add to order
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Menu;
