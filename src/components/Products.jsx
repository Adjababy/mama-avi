import { motion } from "framer-motion";
import HenIcon from "./HenIcon";
import { waLink } from "./WhatsAppFloat";

const products = [
  {
    title: "Poulets vivants",
    desc: "Poulets élevés en plein air, disponibles à l'unité ou en plus grande quantité pour les revendeurs.",
    tone: "green",
  },
  {
    title: "Poulets prêts à cuire",
    desc: "Poulets préparés, propres et prêts à passer directement en cuisine — pratique pour les familles pressées.",
    tone: "rust",
  },
];

export default function Products() {
  return (
    <section id="produits" className="py-24 px-6 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[var(--color-rust)] font-bold uppercase tracking-wide text-sm mb-2">
            Nos produits
          </p>
          <h2 className="text-4xl font-extrabold text-[var(--color-green)]">
            Ce que propose Mama Avi
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{
                  background:
                    p.tone === "green"
                      ? "rgba(47,82,51,0.1)"
                      : "rgba(196,98,45,0.12)",
                }}
              >
                <HenIcon
                  className="w-9 h-9"
                  color={p.tone === "green" ? "var(--color-green)" : "var(--color-rust)"}
                />
              </div>
              <h3 className="text-2xl font-extrabold text-[var(--color-ink)] mb-3">
                {p.title}
              </h3>
              <p className="text-[var(--color-muted)] mb-6">{p.desc}</p>
              <a
                href={waLink(`Bonjour, je suis intéressé(e) par : ${p.title}`)}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[var(--color-green)] hover:text-[var(--color-rust)] transition-colors"
              >
                Demander le prix →
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[var(--color-muted)] mt-10 text-sm">
          Prix sur devis selon quantité — contactez-nous directement pour un tarif adapté.
        </p>
      </div>
    </section>
  );
}
