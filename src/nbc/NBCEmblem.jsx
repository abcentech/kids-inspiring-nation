// The Nation Builders Corp crest.
// A civic emblem: a shield bearing a rising sun (a new dawn), ascending pillars
// (building), crowned by a star (excellence). Green + gold. Scales cleanly and
// is reused in the hero, the Builder ID card, badges, and the footer.

export default function NBCEmblem({ size = 120, ring = true, glow = false, id = "nbc" }) {
  const gid = (n) => `${id}-${n}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nation Builders Corp crest">
      <defs>
        <radialGradient id={gid("shield")} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#123A26" />
          <stop offset="60%" stopColor="#0B2A1B" />
          <stop offset="100%" stopColor="#05140D" />
        </radialGradient>
        <linearGradient id={gid("gold")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0DCA0" />
          <stop offset="45%" stopColor="#E6C98F" />
          <stop offset="100%" stopColor="#A6801F" />
        </linearGradient>
        <linearGradient id={gid("sun")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6E4AF" />
          <stop offset="100%" stopColor="#C5A037" />
        </linearGradient>
        {glow && (
          <filter id={gid("glow")} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {ring && (
        <>
          <circle cx="100" cy="100" r="96" stroke={`url(#${gid("gold")})`} strokeWidth="2" opacity="0.55" />
          <circle cx="100" cy="100" r="90" stroke={`url(#${gid("gold")})`} strokeWidth="1" opacity="0.3" />
        </>
      )}

      {/* Shield */}
      <g filter={glow ? `url(#${gid("glow")})` : undefined}>
        <path
          d="M100 22 L156 42 V96 C156 132 132 158 100 176 C68 158 44 132 44 96 V42 Z"
          fill={`url(#${gid("shield")})`}
          stroke={`url(#${gid("gold")})`}
          strokeWidth="3"
        />

        {/* Star of excellence */}
        <path d="M100 40 l4.2 9.2 10 1.1 -7.4 6.8 2 9.9 -8.8 -4.9 -8.8 4.9 2 -9.9 -7.4 -6.8 10 -1.1 Z" fill={`url(#${gid("gold")})`} />

        {/* Ascending pillars — the act of building, forming an upward thrust */}
        <g>
          <rect x="82" y="108" width="9" height="26" rx="2" fill={`url(#${gid("gold")})`} />
          <rect x="95.5" y="98" width="9" height="36" rx="2" fill={`url(#${gid("gold")})`} />
          <rect x="109" y="86" width="9" height="48" rx="2" fill={`url(#${gid("gold")})`} />
        </g>

        {/* Rising sun with rays over a horizon */}
        <g>
          <line x1="100" y1="70" x2="100" y2="80" stroke={`url(#${gid("sun")})`} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="80" y1="84" x2="86" y2="90" stroke={`url(#${gid("sun")})`} strokeWidth="2.4" strokeLinecap="round" />
          <line x1="120" y1="84" x2="114" y2="90" stroke={`url(#${gid("sun")})`} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M84 150 a16 16 0 0 1 32 0 Z" fill={`url(#${gid("sun")})`} opacity="0.95" />
          <line x1="60" y1="150" x2="140" y2="150" stroke={`url(#${gid("gold")})`} strokeWidth="2" opacity="0.65" />
        </g>
      </g>
    </svg>
  );
}
