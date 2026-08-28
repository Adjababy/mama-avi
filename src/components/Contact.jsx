import { motion } from "framer-motion";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { waLink } from "./WhatsAppFloat";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[var(--color-green)] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Envie de commander ?
          </h2>
          <p className="text-white/80 mb-10">
            Le plus simple : écrivez-nous directement sur WhatsApp, on vous
            répond rapidement.
          </p>

          <a
            href={waLink("Bonjour, je voudrais commander des poulets.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform mb-12"
          >
            <FaWhatsapp size={24} />
            Écrire sur WhatsApp
          </a>

          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <span>+223 73 91 14 60</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt />
              <span>Yanfolila, Mali</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
