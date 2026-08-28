import { motion } from "framer-motion";
import HenIcon from "./HenIcon";
import { waLink } from "./WhatsAppFloat";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-36 pb-24 px-6"
      style={{
        background:
          "linear-gradient(160deg, var(--color-cream) 0%, var(--color-cream-deep) 100%)",
      }}
    >
      {/* decorative hens */}
      <HenIcon
        className="absolute -top-6 -left-10 w-56 h-56 opacity-10 rotate-[-12deg]"
        color="var(--color-green)"
      />
      <HenIcon
        className="absolute bottom-0 right-[-40px] w-72 h-72 opacity-10 rotate-[10deg]"
        color="var(--color-rust)"
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[var(--color-gold)]/20 text-[var(--color-rust)] font-bold px-4 py-1.5 rounded-full text-sm mb-6"
        >
          🐔 Élevage local à Yanfolila
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold text-[var(--color-green)] leading-tight mb-6"
        >
          Des poulets élevés
          <br />
          avec soin, près de chez vous
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-10"
        >
          Mama Avi élève et vend des poulets vivants et prêts à cuire à
          Yanfolila — pour les familles comme pour les restaurants.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href={waLink("Bonjour, je voudrais commander des poulets.")}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--color-green)] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[var(--color-green-light)] transition-colors shadow-lg"
          >
            Commander sur WhatsApp
          </a>
          <a
            href="#produits"
            className="border-2 border-[var(--color-green)] text-[var(--color-green)] font-bold px-7 py-3.5 rounded-full hover:bg-[var(--color-green)] hover:text-white transition-colors"
          >
            Voir nos produits
          </a>
        </motion.div>
      </div>
    </section>
  );
}
