import { FaWhatsapp } from "react-icons/fa";

const PHONE = "22373911460";

export const waLink = (message = "") => {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export default function WhatsAppFloat() {
  
  const handleClick = () => {
    // On ouvre directement WhatsApp - PAS de Firebase ici
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