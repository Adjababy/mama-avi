import { motion } from "framer-motion";
import {
  FaDrumstickBite,
  FaClipboardList,
  FaCheckCircle,
  FaTruck,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: FaDrumstickBite,
    title: "Choisissez votre produit",
    desc: "Sélectionnez le type de poulet qui correspond à vos besoins : vivant ou prêt à cuire.",
  },
  {
    number: "02",
    icon: FaClipboardList,
    title: "Remplissez votre commande",
    desc: "Indiquez vos coordonnées, la quantité souhaitée, votre lieu et, si besoin, une date de commande.",
  },
  {
    number: "03",
    icon: FaCheckCircle,
    title: "Nous confirmons",
    desc: "Nous vérifions la disponibilité, le prix et les détails de votre commande avec vous.",
  },
  {
    number: "04",
    icon: FaTruck,
    title: "Vous récupérez votre commande",
    desc: "Nous convenons ensemble des modalités pour récupérer ou recevoir vos poulets.",
  },
];

export default function HowToOrder() {
  return (
    <section
      id="comment-commander"
      className="py-24 md:py-28 px-6 bg-[#EDE2C8]"
    >
      <div className="max-w-6xl mx-auto">

        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#8F321E]" />

            <p className="text-[#8F321E] font-bold uppercase tracking-[0.18em] text-xs">
              Simple et rapide
            </p>

            <span className="h-px w-10 bg-[#8F321E]" />
          </div>

          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-extrabold text-[#173C21] mb-5">
            Comment commander ?
          </h2>

          <p className="text-[#6B6255] leading-relaxed">
            De votre choix de produit jusqu'à la confirmation de votre
            commande, nous vous accompagnons à chaque étape.
          </p>
        </motion.div>

        {/* ÉTAPES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="relative bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* NUMÉRO */}
                <div className="absolute top-5 right-5 text-4xl font-[var(--font-display)] font-extrabold text-[#173C21]/10">
                  {step.number}
                </div>

                {/* ICÔNE */}
                <div className="w-14 h-14 rounded-2xl bg-[#173C21] text-[#E3A72F] flex items-center justify-center mb-6">
                  <Icon size={22} />
                </div>

                {/* TITRE */}
                <h3 className="font-[var(--font-display)] font-extrabold text-xl text-[#173C21] mb-3">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-[#6B6255] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* LIEN VERS LE FORMULAIRE */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#commande"
            className="inline-flex items-center gap-3 bg-[#173C21] text-white font-extrabold px-7 py-4 rounded-full shadow-lg hover:bg-[#2F6038] hover:-translate-y-1 transition-all"
          >
            Passer ma commande
            <FaClipboardList size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}