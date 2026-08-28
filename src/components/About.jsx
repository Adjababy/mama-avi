import { motion } from "framer-motion";

const values = [
  { title: "Élevage local", desc: "Toute la production est basée à Yanfolila, au plus près de nos clients." },
  { title: "Qualité suivie", desc: "Des poulets élevés avec attention, du début à la vente." },
  { title: "Pour tous", desc: "Familles, marchés locaux et restaurants — petites et grandes quantités." },
];

export default function About() {
  return (
    <section id="a-propos" className="py-24 px-6 bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-[var(--color-rust)] font-bold uppercase tracking-wide text-sm mb-2">
            À propos
          </p>
          <h2 className="text-4xl font-extrabold text-[var(--color-green)] mb-4">
            Une aviculture familiale à Yanfolila
          </h2>
          <p className="text-[var(--color-muted)]">
            Mama Avi élève des poulets à Yanfolila et les propose directement
            aux particuliers et aux restaurants de la région, sans
            intermédiaire.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--color-surface)] rounded-2xl p-6 text-center shadow-sm"
            >
              <h3 className="font-extrabold text-lg text-[var(--color-green)] mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
