import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCommentAlt,
  FaDrumstickBite,
} from "react-icons/fa";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const PHONE = "22373911460";

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "Poulets vivants",
    quantity: 1,
    location: "",
    date: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({
     ...previous,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Veuillez renseigner votre nom.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Veuillez renseigner votre numéro de téléphone.");
      return;
    }
    if (!form.location.trim()) {
      setError("Veuillez renseigner votre lieu.");
      return;
    }
    if (!form.quantity || Number(form.quantity) < 1) {
      setError("La quantité doit être au moins égale à 1.");
      return;
    }

    setLoading(true);

    // 1. ON SAUVEGARDE DANS FIREBASE - C'EST LA PARTIE NOUVELLE
    try {
      await addDoc(collection(db, "commandes"), {
        nom_client: form.name,
        telephone: form.phone,
        poulet: form.product,
        quantite: Number(form.quantity),
        lieu: form.location,
        date_souhaitee: form.date || "À confirmer",
        message: form.message || "Aucun message",
        source: "formulaire principal",
        statut: "nouveau",
        date: serverTimestamp(),
      });
      console.log("Commande sauvée dans Firebase!");
    } catch (err) {
      console.error("Erreur Firebase:", err);
      // On continue quand même vers WhatsApp
    }

    // 2. ON OUVRE WHATSAPP COMME AVANT
    const message = `Bonjour Mama Avi 👋

Je souhaite passer une commande.

👤 *Client :* ${form.name}
📞 *Téléphone :* ${form.phone}
🐔 *Produit :* ${form.product}
🔢 *Quantité :* ${form.quantity}
📍 *Lieu :* ${form.location}
📅 *Date souhaitée :* ${
      form.date? form.date : "À confirmer"
    }

💬 *Message :* ${
      form.message.trim()? form.message.trim() : "Aucun message particulier"
    }

Merci de me confirmer la disponibilité et le prix.`;

    const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setLoading(false);
  };

  return (
    <section
      id="commande"
      className="py-24 md:py-28 px-6 bg-[#F8F3E7]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-[#8F321E]" />
            <p className="text-[#8F321E] font-bold uppercase tracking-[0.18em] text-xs">
              Commande
            </p>
            <span className="h-px w-10 bg-[#8F321E]" />
          </div>
          <h2 className="font-[var(--font-display)] text-4xl md:text-5xl font-extrabold text-[#173C21] mb-5">
            Passez votre commande
          </h2>
          <p className="text-[#6B6255] leading-relaxed">
            Remplissez le formulaire ci-dessous. Votre commande sera
            automatiquement préparée dans WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#173C21] text-white p-8 md:p-10">
              <div className="w-16 h-16 rounded-2xl bg-[#E3A72F] text-[#173C21] flex items-center justify-center mb-7">
                <FaDrumstickBite size={26} />
              </div>
              <h3 className="font-[var(--font-display)] text-3xl font-extrabold mb-5">
                Commandez simplement
              </h3>
              <p className="text-white/70 leading-relaxed mb-8">
                Indiquez-nous vos besoins et nous vous répondrons directement
                sur WhatsApp pour confirmer votre commande.
              </p>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="text-[#E3A72F] mt-1"><FaWhatsapp /></div>
                  <div><p className="font-bold">Réponse rapide</p><p className="text-sm text-white/60 mt-1">Échange direct avec Mama Avi.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#E3A72F] mt-1"><FaDrumstickBite /></div>
                  <div><p className="font-bold">Poulets de qualité</p><p className="text-sm text-white/60 mt-1">Poulets vivants ou prêts à cuire.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#E3A72F] mt-1"><FaMapMarkerAlt /></div>
                  <div><p className="font-bold">Yanfolila, Mali</p><p className="text-sm text-white/60 mt-1">Élevage local.</p></div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-7 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[#173C21] mb-2">Nom complet *</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F321E]" />
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Votre nom" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-[#173C21] mb-2">Téléphone *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F321E]" />
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Ex : 73 00 00 00" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="product" className="block text-sm font-bold text-[#173C21] mb-2">Type de poulet *</label>
                  <select id="product" name="product" value={form.product} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition">
                    <option value="Poulets vivants">Poulets vivants</option>
                    <option value="Poulets prêts à cuire">Poulets prêts à cuire</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-bold text-[#173C21] mb-2">Quantité *</label>
                  <input id="quantity" name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-bold text-[#173C21] mb-2">Lieu *</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F321E]" />
                    <input id="location" name="location" type="text" value={form.location} onChange={handleChange} placeholder="Ex : Yanfolila" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-bold text-[#173C21] mb-2">Date souhaitée</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8F321E]" />
                    <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition" />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="block text-sm font-bold text-[#173C21] mb-2">Message ou précision</label>
                <div className="relative">
                  <FaCommentAlt className="absolute left-4 top-4 text-[#8F321E]" />
                  <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} placeholder="Ex : Je souhaite récupérer ma commande le matin..." className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#DED5C4] bg-[#FCFAF5] focus:border-[#E3A72F] focus:ring-2 focus:ring-[#E3A72F]/20 outline-none transition resize-none" />
                </div>
              </div>
              {error && (
                <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-semibold">{error}</div>
              )}
              <button type="submit" disabled={loading} className="w-full mt-6 inline-flex items-center justify-center gap-3 bg-[#25D366] text-white font-extrabold px-6 py-4 rounded-xl shadow-lg hover:bg-[#20bd5b] hover:-translate-y-0.5 transition-all disabled:opacity-50">
                <FaWhatsapp size={22} />
                {loading? "Enregistrement..." : "Envoyer ma commande sur WhatsApp"}
              </button>
              <p className="text-center text-xs text-[#6B6255] mt-4">Votre commande sera ouverte directement dans WhatsApp.</p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}