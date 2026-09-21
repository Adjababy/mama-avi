import { FaWhatsapp } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
const PHONE = "22373911460";

export const waLink = (message = "") => {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export default function WhatsAppFloat() {
  
  const handleClick = async () => {
    try {
      // 1. On enregistre dans le dashboard admin de ton beau-frère
      await addDoc(collection(db, "commandes"), {
        nom_client: "Clic bouton flottant",
        telephone: "À voir sur WhatsApp",
        quantite: 1,
        total: 0, // on ne connait pas encore le prix
        poulet: "Demande d'info",
        statut: "nouveau",
        source: "bouton flottant",
        date: new Date()
      });
    } catch (e) {
      console.log("Erreur Firebase, mais on ouvre WhatsApp quand même", e);
    }

    // 2. On ouvre WhatsApp (même si Firebase bug, ça marche)
    const msg = "Bonjour Mama Avi, je voudrais avoir des informations sur vos poulets.";
    window.open(waLink(msg), "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contacter Mama Avi sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#20bd5b] hover:scale-110 transition-all"
    >
      <FaWhatsapp size={28} />
    </button>
  );
}