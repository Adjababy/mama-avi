import { FaWhatsapp } from "react-icons/fa";

const PHONE = "22373911460";

export const waLink = (message = "") => {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
};

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(
        "Bonjour Mama Avi 👋, je voudrais avoir des informations sur vos poulets."
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter Mama Avi sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#20bd5b] hover:scale-110 transition-all"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}