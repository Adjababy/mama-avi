export default function HenIcon({ className = "", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* body */}
      <ellipse cx="48" cy="62" rx="30" ry="24" fill={color} />
      {/* head */}
      <circle cx="76" cy="38" r="14" fill={color} />
      {/* comb */}
      <path
        d="M70 26 Q72 18 76 24 Q78 16 82 24 Q86 18 86 26 Q84 30 78 29 Q73 30 70 26Z"
        fill="#C4622D"
      />
      {/* beak */}
      <path d="M89 38 L98 41 L89 45 Z" fill="#E3A72F" />
      {/* eye */}
      <circle cx="79" cy="35" r="2.2" fill="#2A211A" />
      {/* wattle */}
      <path d="M80 46 Q83 50 80 53 Q77 50 80 46Z" fill="#C4622D" />
      {/* wing */}
      <path
        d="M30 50 Q45 46 52 60 Q42 66 28 62 Q24 56 30 50Z"
        fill="rgba(0,0,0,0.12)"
      />
      {/* tail */}
      <path
        d="M18 48 Q6 40 10 28 Q18 34 22 44 Q24 30 34 22 Q34 36 28 46 Q32 34 42 30 Q38 44 30 50Z"
        fill={color}
      />
      {/* legs */}
      <path d="M42 84 L40 96 M42 84 L36 94 M42 84 L46 94" stroke="#E3A72F" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 84 L58 96 M58 84 L52 94 M58 84 L64 94" stroke="#E3A72F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
