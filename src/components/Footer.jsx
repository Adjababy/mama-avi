import HenIcon from "./HenIcon";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white/70 py-8 px-6 text-center text-sm">
      <div className="flex items-center justify-center gap-2 mb-2">
        <HenIcon className="w-6 h-6" color="var(--color-gold)" />
        <span className="font-bold text-white">Mama Avi</span>
      </div>
      <p>Yanfolila, Mali · © {new Date().getFullYear()}</p>
    </footer>
  );
}
