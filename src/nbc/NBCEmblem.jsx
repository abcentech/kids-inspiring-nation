// The Nation Builders Corp crest.
// A civic emblem: a shield bearing a rising sun (a new dawn) behind ascending
// pillars (building), crowned by a star (excellence), on a laurel-flanked base.
// Green + gold. Scales cleanly from a 36px nav mark to the 520px hero fallback,
// and is reused on the Builder ID card, badges, and the footer.

export default function NBCEmblem({ size = 120, ring = true, glow = false, id = "nbc" }) {
  const gid = (n) => `${id}-${n}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nation Builders Corp crest">
      <defs>
        <radialGradient id={gid("shield")} cx="50%" cy="34%" r="80%">
          <stop offset="0%" stopColor="#17462D" />
          <stop offset="55%" stopColor="#0B2A1B" />
          <stop offset="100%" stopColor="#04110A" />
        </radialGradient>
        <linearGradient id={gid("gold")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6E7B4" />
          <stop offset="42%" stopColor="#E6C98F" />
          <stop offset="100%" stopColor="#A6801F" />
        </linearGradient>
        <radialGradient id={gid("sun")} cx="50%" cy="100%" r="90%">
          <stop offset="0%" stopColor="#FBEEC4" />
          <stop offset="55%" stopColor="#EBCB84" />
          <stop offset="100%" stopColor="#C5A037" />
        </radialGradient>
        <linearGradient id={gid("sheen")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        {glow && (
          <filter id={gid("glow")} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {ring && (
        <>
          <circle cx="100" cy="100" r="97" stroke={`url(#${gid("gold")})`} strokeWidth="1.5" opacity="0.5" />
          <circle cx="100" cy="100" r="92" stroke={`url(#${gid("gold")})`} strokeWidth="0.75" opacity="0.3" />
        </>
      )}

      <g filter={glow ? `url(#${gid("glow")})` : undefined}>
        {/* Shield */}
        <path
          d="M100 20 L158 40 V98 C158 134 133 162 100 180 C67 162 42 134 42 98 V40 Z"
          fill={`url(#${gid("shield")})`}
          stroke={`url(#${gid("gold")})`}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner bevel line */}
        <path
          d="M100 31 L150 48 V97 C150 128 128 152 100 167 C72 152 50 128 50 97 V48 Z"
          fill="none" stroke={`url(#${gid("gold")})`} strokeWidth="1" opacity="0.35" strokeLinejoin="round"
        />
        {/* Top sheen */}
        <path d="M100 24 L153 42 V70 C120 60 80 60 47 70 V42 Z" fill={`url(#${gid("sheen")})`} />

        {/* Rising sun behind the pillars */}
        <clipPath id={gid("sunclip")}><rect x="60" y="100" width="80" height="42" /></clipPath>
        <g clipPath={`url(#${gid("sunclip")})`}>
          <path d="M68 140 A32 32 0 0 1 132 140 Z" fill={`url(#${gid("sun")})`} opacity="0.92" />
        </g>
        {/* Sun rays */}
        <g stroke={`url(#${gid("sun")})`} strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
          <line x1="100" y1="96" x2="100" y2="88" />
          <line x1="79" y1="103" x2="73" y2="98" />
          <line x1="121" y1="103" x2="127" y2="98" />
          <line x1="65" y1="118" x2="58" y2="115" />
          <line x1="135" y1="118" x2="142" y2="115" />
        </g>

        {/* Ascending pillars on a plinth */}
        <g fill={`url(#${gid("gold")})`}>
          <rect x="80" y="116" width="11" height="26" rx="2.5" />
          <rect x="94.5" y="104" width="11" height="38" rx="2.5" />
          <rect x="109" y="92" width="11" height="50" rx="2.5" />
        </g>
        <rect x="72" y="143" width="56" height="4" rx="2" fill={`url(#${gid("gold")})`} />

        {/* Star of excellence */}
        <path
          d="M100 33 L103.1 41.8 L112.4 42 L105 47.6 L107.6 56.5 L100 51.2 L92.4 56.5 L95 47.6 L87.6 42 L96.9 41.8 Z"
          fill={`url(#${gid("gold")})`}
        />
      </g>
    </svg>
  );
}
