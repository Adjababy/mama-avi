import { FaWhatsapp } from "react-icons/fa";

const PHONE = "22373911460";

export function waLink(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Bonjour, je suis intéressé(e) par vos poulets.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-xl hover:scale-105 transition-transform"
    >
      <FaWhatsapp size={22} />
      <span className="font-bold hidden sm:inline">Commander</span>
    </a>
  );
}
