import HenIcon from "./HenIcon";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { waLink } from "./WhatsAppFloat";

export default function Footer() {
  return (
    <footer className="bg-[#20170D] text-white/60">

      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-3 gap-10 items-start">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#E3A72F] flex items-center justify-center">
                <HenIcon
                  className="w-8 h-8"
                  color="#173C21"
                />
              </div>

              <div>
                <p className="font-[var(--font-display)] text-xl font-extrabold text-white">
                  MAMA AVI
                </p>

                <p className="text-[#E3A72F] text-[10px] uppercase tracking-widest">
                  Ferme avicole
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-xs">
              Des poulets élevés avec soin à Yanfolila.
              La fraîcheur, notre priorité.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-white mb-4">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <a href="#accueil" className="hover:text-[#E3A72F] transition-colors">
                Accueil
              </a>

              <a href="#produits" className="hover:text-[#E3A72F] transition-colors">
                Nos produits
              </a>

              <a href="#comment-commander" className="hover:text-[#E3A72F] transition-colors">
                Comment commander
              </a>

              <a href="#a-propos" className="hover:text-[#E3A72F] transition-colors">
                À propos
              </a>

              <a href="#contact" className="hover:text-[#E3A72F] transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">
              Nous contacter
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#E3A72F]" />
                <span>Yanfolila, Mali</span>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-[#E3A72F]" />
                <span>+223 73 91 14 60</span>
              </div>

              <a
                href={waLink(
                  "Bonjour Mama Avi, je voudrais avoir des informations."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[#E3A72F] font-bold hover:text-white transition-colors"
              >
                <FaWhatsapp />
                Nous écrire
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} Mama Avi. Tous droits réservés.
          </p>

          <p>
            Yanfolila · Mali 🇲🇱
          </p>
        </div>

      </div>
    </footer>
  );
}