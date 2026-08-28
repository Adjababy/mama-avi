import { useState, useEffect } from "react";
import HenIcon from "./HenIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#accueil", label: "Accueil" },
    { href: "#produits", label: "Nos produits" },
    { href: "#a-propos", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all ${
        scrolled ? "bg-[var(--color-cream)]/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#accueil" className="flex items-center gap-2">
          <HenIcon className="w-9 h-9" color="var(--color-green)" />
          <span className="font-[var(--font-display)] font-extrabold text-xl text-[var(--color-green)]">
            Mama Avi
          </span>
        </a>

        <ul className="hidden md:flex gap-8 font-bold text-[var(--color-ink)]">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-[var(--color-rust)] transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-[var(--color-green)] text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--color-cream)] px-6 pb-5 flex flex-col gap-4 font-bold">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
