import { motion } from "framer-motion";
import { FaWhatsapp, FaComments, FaHandHoldingHeart } from "react-icons/fa";

const steps = [
  {
    icon: FaWhatsapp,
    title: "1. Contactez-nous",
    desc: "Écrivez-nous sur WhatsApp pour nous dire ce dont vous avez besoin.",
  },
  {
    icon: FaComments,
    title: "2. On discute ensemble",
    desc: "Quantité, type de poulet, disponibilité — on s'accorde sur les détails et le prix.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "3. Vous récupérez vos poulets",
    desc: "On convient ensemble du meilleur moyen de vous les faire parvenir.",
  },
];

export default function HowToOrder() {
  return (
    <section className="py-24 px-6 bg-[var(--color-cream-deep)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[var(--color-rust)] font-bold uppercase tracking-wide text-sm mb-2">
            Simple et rapide
          </p>
          <h2 className="text-4xl font-extrabold text-[var(--color-green)]">
            Comment commander
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-green)]/10 flex items-center justify-center mb-4">
                <s.icon className="text-[var(--color-green)] text-2xl" />
              </div>
              <h3 className="font-extrabold text-lg text-[var(--color-ink)] mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
