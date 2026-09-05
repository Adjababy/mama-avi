import { motion } from "framer-motion";
import {
  FaLeaf,
  FaHeart,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import farmImage from "../assets/farm.jpg";

const values = [
  {
    icon: FaLeaf,
    title: "Élevage local",
    desc: "Notre activité est basée à Yanfolila, au plus près de nos clients.",
  },
  {
    icon: FaHeart,
    title: "Travail avec soin",
    desc: "Nous accordons une attention particulière à la qualité de notre production.",
  },
  {
    icon: FaUsers,
    title: "Proche de nos clients",
    desc: "Familles, restaurants et revendeurs peuvent directement nous contacter.",
  },
];

export default function About() {
  return (
    <section
      id="a-propos"
      className="py-24 md:py-28 px-6 bg-[#F8F3E7]"
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* PHOTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >

            <div className="absolute -left-4 -bottom-4 w-full h-full rounded-[2rem] border-2 border-[#E3A72F]" />

            <div className="relative h-[430px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">

              <img
                src={farmImage}
                alt="Élevage de poulets - Mama Avi"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#173C21]/85 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">

                <div className="inline-flex items-center gap-2 bg-[#E3A72F] text-[#20170D] font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                  <FaMapMarkerAlt />
                  Yanfolila, Mali
                </div>

              </div>
            </div>

          </motion.div>

          {/* TEXTE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="flex items-center gap-3 mb-4">

              <span className="h-[2px] w-10 bg-[#E3A72F]" />

              <span className="text-[#8F321E] font-bold uppercase tracking-[0.18em] text-xs">
                À propos de Mama Avi
              </span>

            </div>

            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-extrabold text-[#173C21] leading-tight mb-6">
              Une aviculture locale, proche de vous
            </h2>

            <p className="text-[#6B6255] leading-relaxed mb-5">
              Mama Avi est une ferme avicole basée à{" "}
              <strong className="text-[#173C21]">
                Yanfolila
              </strong>
              , au Mali.
            </p>

            <p className="text-[#6B6255] leading-relaxed mb-5">
              Notre objectif est de proposer des poulets de qualité
              aux particuliers, aux restaurants et aux revendeurs,
              tout en développant une activité locale au service de
              notre communauté.
            </p>

            <p className="text-[#6B6255] leading-relaxed mb-8">
              Pour connaître nos disponibilités, nos tarifs ou passer
              une commande, il suffit de nous contacter directement.
            </p>

            <div className="flex flex-wrap gap-3">

              <span className="px-4 py-2 rounded-full bg-[#173C21]/10 text-[#173C21] text-sm font-bold">
                🐔 Élevage avicole
              </span>

              <span className="px-4 py-2 rounded-full bg-[#E3A72F]/20 text-[#8F321E] text-sm font-bold">
                🇲🇱 Production locale
              </span>

              <span className="px-4 py-2 rounded-full bg-[#8F321E]/10 text-[#8F321E] text-sm font-bold">
                🤝 Proximité
              </span>

            </div>

          </motion.div>
        </div>

        {/* ENGAGEMENTS */}
        <div className="mt-24">

          <div className="text-center mb-12">

            <p className="text-[#8F321E] font-bold uppercase tracking-[0.18em] text-xs mb-3">
              Nos engagements
            </p>

            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#173C21]">
              Ce qui nous tient à cœur
            </h3>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-7 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >

                  <div className="w-16 h-16 mx-auto rounded-full bg-[#173C21] text-[#E3A72F] flex items-center justify-center mb-5">
                    <Icon size={23} />
                  </div>

                  <h4 className="font-[var(--font-display)] text-xl font-extrabold text-[#173C21] mb-3">
                    {value.title}
                  </h4>

                  <p className="text-sm text-[#6B6255] leading-relaxed">
                    {value.desc}
                  </p>

                </motion.div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}