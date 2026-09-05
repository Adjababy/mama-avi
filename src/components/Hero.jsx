import { motion } from "framer-motion";
import {
  FaArrowDown,
  FaMapMarkerAlt,
} from "react-icons/fa";
import chickensImage from "../assets/chickens.jpg";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-[760px] md:min-h-[820px] flex items-center overflow-hidden"
    >
      {/* IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url("${chickensImage}")`,
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08180d]/95 via-[#173C21]/80 to-[#173C21]/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#102b18]/80 via-transparent to-transparent" />

      {/* Décoration */}
      <div className="absolute right-[8%] top-[25%] w-72 h-72 rounded-full bg-[#E3A72F]/10 blur-3xl" />

      <div className="absolute right-10 top-36 w-32 h-32 border border-[#E3A72F]/30 rounded-full hidden md:block" />

      <div className="absolute right-16 top-42 w-20 h-20 border border-[#E3A72F]/20 rounded-full hidden md:block" />

      {/* CONTENU */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 py-32">
        <div className="max-w-3xl">

          {/* PETIT TITRE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-7"
          >
            <span className="h-[2px] w-10 bg-[#E3A72F]" />

            <span className="text-[#E3A72F] font-bold uppercase tracking-[0.25em] text-xs md:text-sm">
              Ferme avicole · Mali
            </span>

            <span className="h-[2px] w-10 bg-[#E3A72F]" />
          </motion.div>

          {/* LOGO / TITRE */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.85] tracking-tight text-white mb-7"
          >
            <span className="block text-[#E3A72F]">
              MAMA
            </span>

            <span className="block">
              AVI
            </span>
          </motion.h1>

          {/* SLOGAN */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-2xl md:text-3xl font-bold text-white mb-5"
          >
            La fraîcheur, notre priorité.
          </motion.p>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-9"
          >
            Des poulets de qualité, élevés avec soin à{" "}
            <span className="text-[#E3A72F] font-bold">
              Yanfolila
            </span>
            . Disponibles vivants ou prêts à cuire pour les
            familles, restaurants et revendeurs.
          </motion.p>

          {/* BOUTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            {/* BOUTON COMMANDE */}
            <a
              href="#commande"
              className="inline-flex items-center gap-3 bg-[#E3A72F] text-[#20170D] font-extrabold px-7 py-4 rounded-full shadow-xl hover:bg-[#f0bc48] hover:-translate-y-1 transition-all"
            >
              Passer une commande
              <FaArrowDown size={14} />
            </a>

            {/* BOUTON PRODUITS */}
            <a
              href="#produits"
              className="inline-flex items-center gap-3 border-2 border-white/70 text-white font-bold px-7 py-4 rounded-full hover:bg-white hover:text-[#173C21] transition-all"
            >
              Nos produits
              <FaArrowDown size={14} />
            </a>
          </motion.div>

          {/* LOCALISATION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex items-center gap-3 text-white/70 text-sm"
          >
            <FaMapMarkerAlt className="text-[#E3A72F]" />

            <span>Yanfolila, Mali</span>

            <span className="w-1 h-1 rounded-full bg-[#E3A72F]" />

            <span>Élevage local</span>
          </motion.div>

        </div>
      </div>

      {/* TRANSITION VERS LA SECTION SUIVANTE */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#F8F3E7] to-transparent" />
    </section>
  );
}