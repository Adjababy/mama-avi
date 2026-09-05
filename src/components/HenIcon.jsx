export default function HenIcon({
  className = "",
  color = "currentColor",
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse
        cx="48"
        cy="58"
        rx="28"
        ry="22"
        fill={color}
      />

      {/* Head */}
      <circle
        cx="72"
        cy="34"
        r="15"
        fill={color}
      />

      {/* Comb */}
      <path
        d="M64 21C64 16 68 14 71 18C73 12 78 13 78 19C82 15 87 18 84 23"
        fill="#E3A72F"
      />

      {/* Beak */}
      <path
        d="M86 34L98 39L86 44V34Z"
        fill="#C4622D"
      />

      {/* Eye */}
      <circle
        cx="76"
        cy="31"
        r="2.5"
        fill="#20170D"
      />

      {/* Wattle */}
      <path
        d="M77 47C78 53 85 54 87 48"
        stroke="#C4622D"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Wing */}
      <path
        d="M34 55C44 48 58 52 61 63C55 69 42 70 34 63C31 60 31 57 34 55Z"
        fill="#E3A72F"
        opacity="0.9"
      />

      {/* Tail */}
      <path
        d="M25 53C13 45 9 50 16 59C7 58 8 67 19 66C10 73 19 79 29 67"
        fill={color}
      />

      {/* Legs */}
      <path
        d="M39 77V88M57 77V88"
        stroke="#C4622D"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Feet */}
      <path
        d="M34 88H44M52 88H62"
        stroke="#C4622D"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}