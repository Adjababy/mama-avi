import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { waLink } from "./WhatsAppFloat";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-28 px-6 bg-[#173C21] text-white overflow-hidden"
    >
      {/* Decorations */}
      <div className="absolute -top-32 -right-32 w-96 h-96 border border-[#E3A72F]/20 rounded-full" />

      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-white/5 rounded-full" />

      <div className="absolute top-20 right-[20%] w-20 h-20 bg-[#E3A72F]/10 rounded-full blur-xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-[#E3A72F]" />

            <span className="text-[#E3A72F] font-bold uppercase tracking-[0.2em] text-xs">
              Contactez-nous
            </span>

            <span className="h-px w-10 bg-[#E3A72F]" />
          </div>

          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-extrabold mb-5">
            Prêt à commander ?
          </h2>

          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Une question, une commande ou simplement besoin de connaître
            nos disponibilités ? Notre équipe est à votre écoute.
          </p>

          <a
            href={waLink(
              "Bonjour, je voudrais commander des poulets chez Mama Avi."
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#E3A72F] text-[#20170D] font-extrabold px-8 py-4 rounded-full shadow-xl hover:bg-[#f2bd4b] hover:-translate-y-1 transition-all"
          >
            <FaWhatsapp size={23} />
            Écrire sur WhatsApp
            <FaArrowRight size={15} />
          </a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-14"
        >
          <div className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-11 h-11 rounded-full bg-[#E3A72F] text-[#20170D] flex items-center justify-center">
              <FaPhoneAlt />
            </div>

            <div className="text-left">
              <p className="text-white/50 text-xs uppercase tracking-wide">
                Téléphone
              </p>

              <p className="font-bold text-white">
                +223 73 91 14 60
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="w-11 h-11 rounded-full bg-[#E3A72F] text-[#20170D] flex items-center justify-center">
              <FaMapMarkerAlt />
            </div>

            <div className="text-left">
              <p className="text-white/50 text-xs uppercase tracking-wide">
                Localisation
              </p>

              <p className="font-bold text-white">
                Yanfolila, Mali
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}