import { useState, useEffect } from "react";
import HenIcon from "./HenIcon";
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { waLink } from "./WhatsAppFloat";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = [
    { href: "#accueil", label: "Accueil" },
    { href: "#produits", label: "Nos produits" },
    { href: "#comment-commander", label: "Comment commander" },
    { href: "#commande", label: "Commander" },
    { href: "#a-propos", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#173C21]/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-[#102b18]/70 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#accueil"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-full bg-[#E3A72F] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
              <HenIcon
                className="w-8 h-8"
                color="#173C21"
              />
            </div>

            <div>
              <div
                className={`font-[var(--font-display)] font-extrabold text-xl leading-none ${
                  scrolled ? "text-white" : "text-white"
                }`}
              >
                MAMA AVI
              </div>

              <div className="text-[#E3A72F] text-[10px] uppercase tracking-[0.18em] font-bold mt-1">
                Ferme avicole
              </div>
            </div>
          </a>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-[#E3A72F] font-semibold text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={waLink(
                "Bonjour, je voudrais commander des poulets chez Mama Avi."
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#E3A72F] text-[#20170D] font-extrabold px-5 py-3 rounded-full hover:bg-[#f2bd4b] hover:-translate-y-0.5 transition-all shadow-lg"
            >
              <FaWhatsapp size={18} />
              Commander
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white text-2xl p-2"
            aria-label="Ouvrir le menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-6">
            <div className="bg-[#F8F3E7] rounded-2xl p-5 shadow-2xl flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-[#173C21] font-bold py-3 px-3 rounded-xl hover:bg-[#EDE2C8] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <a
                href={waLink(
                  "Bonjour, je voudrais commander des poulets chez Mama Avi."
                )}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 bg-[#173C21] text-white font-bold py-3.5 rounded-xl"
              >
                <FaWhatsapp />
                Commander sur WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}