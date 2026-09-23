import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const PHONE = "22373911460";
const stockActuel = form.product === "Poulets vivants"
 ? (stock.vivants?? stock.vivant?? 0)
  : stock.prets;

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "", phone: "", product: "Poulets vivants",
    quantity: 1, location: "", date: "", message: "",
  });
  const [stock, setStock] = useState({ vivants: 0, prets: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // On écoute le stock en temps réel depuis Firebase
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "config", "stock"), (snap) => {
      if (snap.exists()) setStock(snap.data());
    });
    return () => unsub();
  }, []);

  const stockActuel = form.product === "Poulets vivants"? stock.vivants : stock.prets;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Veuillez renseigner votre nom.");
    if (!form.phone.trim()) return setError("Veuillez renseigner votre numéro.");
    if (!form.location.trim()) return setError("Veuillez renseigner votre lieu.");
    if (Number(form.quantity) < 1) return setError("La quantité doit être au moins 1.");
    if (Number(form.quantity) > stockActuel) return setError(`Stock insuffisant. Il ne reste que ${stockActuel} poulets.`);

    setLoading(true);
    const nouvelleCommande = {
      nom_client: form.name,
      telephone: form.phone,
      poulet: form.product,
      quantite: Number(form.quantity),
      lieu: form.location,
      date_souhaitee: form.date || "À confirmer",
      message: form.message || "Aucun message",
      statut: "nouveau",
      date: serverTimestamp(),
    };

    try {
      // 1. Sauver la commande
      await addDoc(collection(db, "commandes"), nouvelleCommande);

      // 2. DIMINUER LE STOCK AUTOMATIQUEMENT
      const stockRef = doc(db, "config", "stock");
      if(form.product === "Poulets vivants"){
        await updateDoc(stockRef, { vivants: stock.vivants - Number(form.quantity) });
      } else {
        await updateDoc(stockRef, { prets: stock.prets - Number(form.quantity) });
      }

    } catch (err) {
      console.error("Erreur:", err);
      setError("Erreur lors de la commande. Réessayez.");
      setLoading(false);
      return;
    }

    // Message SANS emojis pour que ça soit joli sur WhatsApp
    const message = `Bonjour Mama Avi, je souhaite passer une commande:

Client: ${form.name}
Telephone: ${form.phone}
Produit: ${form.product}
Quantite: ${form.quantity}
Lieu: ${form.location}
Date souhaitee: ${form.date || "A confirmer"}
Message: ${form.message || "Aucun"}

Merci de me confirmer.`;

    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank");
    setLoading(false);
    setForm({ name: "", phone: "", product: "Poulets vivants", quantity: 1, location: "", date: "", message: "" });
  };

  return (
    <section id="commande" className="py-24 px-6 bg-[#F8F3E7]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-display)] text-4xl font-extrabold text-[#173C21] mb-3">Passez votre commande</h2>
          <p className={stockActuel > 0? "text-green-700 font-bold" : "text-red-600 font-bold"}>
            {stockActuel > 0? `${stockActuel} ${form.product.toLowerCase()} disponibles` : `Rupture de ${form.product.toLowerCase()}`}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#173C21] text-white p-8">
              <h3 className="text-3xl font-extrabold mb-4">Stock actuel</h3>
              <p className="text-white/70 mb-6">Le stock se met à jour tout seul après chaque vente.</p>
              <div className="space-y-3">
                <div className="flex justify-between bg-white/10 p-3 rounded-xl"><span>Poulets vivants</span><b>{stock.vivants}</b></div>
                <div className="flex justify-between bg-white/10 p-3 rounded-xl"><span>Prêts à cuire</span><b>{stock.prets}</b></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-7 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <div><label className="block text-sm font-bold mb-2">Nom complet *</label><input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
                <div><label className="block text-sm font-bold mb-2">Téléphone *</label><input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
                <div><label className="block text-sm font-bold mb-2">Type *</label><select name="product" value={form.product} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]"><option>Poulets vivants</option><option>Poulets prêts à cuire</option></select></div>
                <div><label className="block text-sm font-bold mb-2">Quantité *</label><input name="quantity" type="number" min="1" max={stockActuel} value={form.quantity} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
                <div><label className="block text-sm font-bold mb-2">Lieu *</label><input name="location" value={form.location} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
                <div><label className="block text-sm font-bold mb-2">Date</label><input name="date" type="date" value={form.date} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
              </div>
              <div className="mt-5"><label className="block text-sm font-bold mb-2">Message</label><textarea name="message" rows="3" value={form.message} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border bg-[#FCFAF5]" /></div>
              {error && <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-bold">{error}</div>}
              <button type="submit" disabled={loading || stockActuel === 0} className="w-full mt-6 bg-[#25D366] text-white font-extrabold px-6 py-4 rounded-xl disabled:opacity-50">{loading? "En cours..." : stockActuel === 0? "Rupture de stock" : "Envoyer sur WhatsApp"}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}