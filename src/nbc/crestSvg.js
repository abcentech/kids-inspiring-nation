// The crest as a standalone SVG string — used to rasterise the emblem onto
// <canvas> when generating downloadable Builder ID cards and certificates.
// Kept in sync with NBCEmblem.jsx.

export const CREST_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
<defs><radialGradient id="s" cx="50%" cy="38%" r="75%"><stop offset="0%" stop-color="#123A26"/><stop offset="60%" stop-color="#0B2A1B"/><stop offset="100%" stop-color="#05140D"/></radialGradient>
<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F0DCA0"/><stop offset="45%" stop-color="#E6C98F"/><stop offset="100%" stop-color="#A6801F"/></linearGradient></defs>
<path d="M100 22 L156 42 V96 C156 132 132 158 100 176 C68 158 44 132 44 96 V42 Z" fill="url(#s)" stroke="url(#g)" stroke-width="3"/>
<path d="M100 40 l4.2 9.2 10 1.1 -7.4 6.8 2 9.9 -8.8 -4.9 -8.8 4.9 2 -9.9 -7.4 -6.8 10 -1.1 Z" fill="url(#g)"/>
<rect x="82" y="108" width="9" height="26" rx="2" fill="url(#g)"/><rect x="95.5" y="98" width="9" height="36" rx="2" fill="url(#g)"/><rect x="109" y="86" width="9" height="48" rx="2" fill="url(#g)"/>
<path d="M84 150 a16 16 0 0 1 32 0 Z" fill="url(#g)"/><line x1="60" y1="150" x2="140" y2="150" stroke="url(#g)" stroke-width="2" opacity="0.65"/>
<line x1="100" y1="70" x2="100" y2="80" stroke="#F6E4AF" stroke-width="2.4" stroke-linecap="round"/>
<line x1="80" y1="84" x2="86" y2="90" stroke="#F6E4AF" stroke-width="2.4" stroke-linecap="round"/>
<line x1="120" y1="84" x2="114" y2="90" stroke="#F6E4AF" stroke-width="2.4" stroke-linecap="round"/></svg>`;

export function svgToImage(str) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([str], { type: "image/svg+xml" }));
    const img = new Image();
    img.onload = () => { resolve(img); URL.revokeObjectURL(url); };
    img.onerror = reject;
    img.src = url;
  });
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
