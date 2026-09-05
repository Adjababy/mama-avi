import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaDrumstickBite,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { waLink } from "./WhatsAppFloat";
import chickensImage from "../assets/chickens.jpg";
import readyChickenImage from "../assets/ready-chicken.jpg";

const products = [
  {
    title: "Poulets vivants",
    subtitle: "Des poulets élevés localement",
    description:
      "Des poulets disponibles selon les quantités et les besoins de nos clients.",
    image: chickensImage,
    points: [
      "Élevage local à Yanfolila",
      "Disponibilité selon arrivage",
      "Petites et grandes quantités",
    ],
  },

  {
    title: "Poulets prêts à cuire",
    subtitle: "Pratiques et prêts pour votre cuisine",
    description:
      "Des poulets préparés pour vous faire gagner du temps et faciliter vos repas.",
    image: readyChickenImage,
    points: [
      "Préparation soignée",
      "Commande à l'avance",
      "Idéal pour familles et restaurants",
    ],
  },
];

export default function Products() {
  return (
    <section
      id="produits"
      className="py-24 md:py-28 px-6 bg-[#F8F3E7]"
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
            <span className="h-px w-10 bg-[#E3A72F]" />

            <p className="text-[#8F321E] font-bold uppercase tracking-[0.18em] text-xs">
              Nos produits
            </p>

            <span className="h-px w-10 bg-[#E3A72F]" />
          </div>

          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-extrabold text-[#173C21] mb-5">
            Du poulet pour chaque besoin
          </h2>

          <p className="text-[#6B6255] leading-relaxed">
            Que vous soyez particulier, restaurant ou revendeur,
            Mama Avi vous propose des poulets adaptés à vos besoins.
          </p>
        </motion.div>

        {/* PRODUITS */}
        <div className="grid md:grid-cols-2 gap-8">

          {products.map((product, index) => (
            <motion.article
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_15px_50px_rgba(32,23,13,0.10)] border border-[#173C21]/5"
            >

              {/* PHOTO */}
              <div className="relative h-72 overflow-hidden">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173C21]/75 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-5 left-5 bg-[#E3A72F] text-[#20170D] text-xs font-extrabold uppercase tracking-wide px-4 py-2 rounded-full shadow-lg">
                  Sur commande
                </div>

                {/* Texte sur image */}
                <div className="absolute bottom-5 left-6 right-6">
                  <p className="text-white/80 text-xs uppercase tracking-[0.15em] font-bold">
                    Mama Avi
                  </p>

                  <h3 className="font-[var(--font-display)] text-3xl font-extrabold text-white">
                    {product.title}
                  </h3>
                </div>
              </div>

              {/* CONTENU */}
              <div className="p-7 md:p-8">

                <div className="flex items-start justify-between gap-4 mb-3">

                  <div>
                    <p className="text-[#8F321E] text-sm font-bold">
                      {product.subtitle}
                    </p>
                  </div>

                  <FaDrumstickBite className="text-[#E3A72F] text-xl mt-1" />
                </div>

                <p className="text-[#6B6255] leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* POINTS */}
                <div className="space-y-3 mb-7">
                  {product.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-sm text-[#20170D]"
                    >
                      <FaCheckCircle className="text-[#E3A72F] flex-shrink-0" />

                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* FOOTER CARD */}
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-[#173C21]/10">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#6B6255]">
                      Tarif
                    </p>

                    <p className="font-extrabold text-[#173C21]">
                      Sur demande
                    </p>
                  </div>

                  <a
                    href={waLink(
                      `Bonjour, je suis intéressé(e) par les ${product.title.toLowerCase()} de Mama Avi.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#173C21] text-white font-bold px-5 py-3 rounded-full hover:bg-[#2F6038] hover:-translate-y-0.5 transition-all"
                  >
                    Commander

                    <FaArrowRight size={13} />
                  </a>

                </div>
              </div>

            </motion.article>
          ))}

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-sm text-[#6B6255]"
        >
          <span className="text-[#E3A72F] font-bold">
            ★
          </span>{" "}
          Contactez-nous pour connaître les disponibilités et les tarifs.
        </motion.div>

      </div>
    </section>
  );
}