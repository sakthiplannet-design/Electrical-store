// Product-type illustrations: one consistent 3px line on a 64 grid, drawn for this site.
// Colour from CSS (currentColor); `.lit` parts take the lamp-glow colour.
const g = (body) =>
  `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;

export const art = {
  switch: g('<rect x="12" y="8" width="40" height="48" rx="6"/><rect x="23" y="18" width="18" height="28" rx="3"/><path d="M23 32h18"/><circle class="lit" cx="32" cy="24" r="2.5" fill="currentColor"/>'),
  plate: g('<rect x="6" y="14" width="52" height="36" rx="6"/><rect x="13" y="21" width="10" height="22" rx="2"/><rect x="27" y="21" width="10" height="22" rx="2"/><rect x="41" y="21" width="10" height="22" rx="2"/>'),
  spike: g('<rect x="6" y="24" width="44" height="16" rx="5"/><circle cx="16" cy="32" r="3"/><circle cx="28" cy="32" r="3"/><circle cx="40" cy="32" r="3"/><path d="M50 32c6 0 8 4 8 10s-3 10-8 10"/>'),
  bell: g('<path d="M20 44V30a12 12 0 0 1 24 0v14"/><path d="M14 44h36"/><path d="M28 50a4 4 0 0 0 8 0"/><path d="M32 12v6"/><path class="lit" d="M50 22c3 2 4 6 3 10M14 22c-3 2-4 6-3 10"/>'),
  bulb: g('<path class="lit" d="M32 8a16 16 0 0 0-9 29c2 2 3 4 3 7h12c0-3 1-5 3-7A16 16 0 0 0 32 8z"/><path d="M26 50h12M27 56h10"/><path d="M28 30l4 6 4-6"/>'),
  tube: g('<rect class="lit" x="6" y="26" width="52" height="12" rx="6"/><path d="M10 44v4M54 44v4M14 20l-4-6M32 18v-8M50 20l4-6"/>'),
  panel: g('<rect x="10" y="18" width="44" height="28" rx="4"/><rect class="lit" x="16" y="24" width="32" height="16" rx="2"/><path d="M14 52l-4 6M50 52l4 6M32 52v8"/>'),
  spot: g('<path d="M22 10h20l-4 14H26z"/><path d="M20 24h24"/><path class="lit" d="M24 30l-8 26M40 30l8 26M32 30v26"/>'),
  strip: g('<path d="M6 40c8-14 16-14 26 0s18 14 26 0"/><circle class="lit" cx="14" cy="32" r="2.5" fill="currentColor"/><circle class="lit" cx="32" cy="40" r="2.5" fill="currentColor"/><circle class="lit" cx="50" cy="32" r="2.5" fill="currentColor"/>'),
  flood: g('<rect x="12" y="12" width="40" height="28" rx="5"/><rect class="lit" x="18" y="18" width="28" height="16" rx="2"/><path d="M32 40v8M22 54h20M24 48h16"/>'),
  fan: g('<circle cx="32" cy="30" r="4"/><path d="M32 6v20"/><path d="M28 30c-10 2-18 0-22-4 6-4 14-4 22 0M36 30c10 2 18 0 22-4-6-4-14-4-22 0M32 34c-2 10 0 18 4 22 4-6 2-14-4-22"/>'),
  bladeless: g('<ellipse cx="32" cy="22" rx="12" ry="16"/><ellipse cx="32" cy="22" rx="6" ry="10"/><path d="M26 38l-2 14h16l-2-14"/><path d="M20 56h24"/>'),
  tablefan: g('<circle cx="32" cy="24" r="16"/><circle cx="32" cy="24" r="3"/><path d="M32 21c0-6 4-10 8-10M35 25c5 3 7 8 5 12M29 25c-6 1-10-1-12-5"/><path d="M32 40v12M22 56h20"/>'),
  exhaust: g('<rect x="8" y="8" width="48" height="48" rx="6"/><circle cx="32" cy="32" r="16"/><path d="M32 16v32M16 32h32M21 21l22 22M43 21L21 43"/>'),
  wire: g('<ellipse cx="32" cy="32" rx="22" ry="22"/><ellipse cx="32" cy="32" rx="14" ry="14"/><ellipse cx="32" cy="32" rx="6" ry="6"/><path class="lit" d="M54 32h6"/>'),
  cable: g('<path d="M6 22h30a10 10 0 0 1 0 20H20"/><path d="M6 30h30a2 2 0 0 1 0 4H20"/><path class="lit" d="M20 42l-8 8M20 34l-10 0"/><circle cx="52" cy="32" r="6"/>'),
  mcb: g('<rect x="20" y="6" width="24" height="52" rx="4"/><rect x="26" y="20" width="12" height="18" rx="2"/><path class="lit" d="M26 26h12"/><path d="M26 12h12M26 48h12M26 52h12"/>'),
  db: g('<rect x="8" y="10" width="48" height="44" rx="5"/><path d="M8 22h48"/><path d="M16 28v14M24 28v14M32 28v14M40 28v14M48 28v14"/><path class="lit" d="M14 16h6"/>'),
  mixer: g('<path d="M22 8h20l-3 26H25z"/><path d="M42 12h6v12h-7"/><rect x="18" y="38" width="28" height="18" rx="4"/><circle class="lit" cx="32" cy="47" r="3" fill="currentColor"/><path d="M26 34h12"/>'),
  kettle: g('<path d="M18 24h28l-2 30H20z"/><path d="M24 24c0-6 4-10 8-10s8 4 8 10"/><path d="M46 30c6 0 8 4 8 8s-2 8-8 8M18 30l-8-6"/><path class="lit" d="M24 50h16"/>'),
  iron: g('<path d="M8 46h44c0-14-8-24-24-24H18"/><path d="M8 46l6-8h38"/><path d="M26 22c0-6 4-10 10-10h8"/><path class="lit" d="M14 52h6M28 52h6M42 52h6"/>'),
  steamer: g('<rect x="22" y="22" width="20" height="34" rx="5"/><path d="M24 22l4-10h8l4 10"/><path class="lit" d="M26 8c0-4 4-4 4 0M34 8c0-4 4-4 4 0"/><path d="M28 34h8"/>'),
  pipe: g('<path d="M6 22h30a8 8 0 0 1 8 8v28M6 34h26a2 2 0 0 1 2 2v22"/><path d="M4 18v20M30 56h18"/>'),
  fitting: g('<path d="M10 22h20v20H10zM30 28h14a6 6 0 0 1 6 6v20M30 36h10a2 2 0 0 1 2 2v16"/><path d="M8 20v24M38 56h16"/>'),
  tap: g('<path d="M8 24h26a10 10 0 0 1 10 10v8"/><path d="M8 32h22a6 6 0 0 1 6 6v4"/><path d="M34 42h12"/><path d="M22 24v-8M14 16h16"/><path class="lit" d="M40 50c0 3 2 4 2 6a2 2 0 0 1-4 0c0-2 2-3 2-6z"/>'),
  smart: g('<rect x="18" y="6" width="28" height="52" rx="6"/><path d="M28 52h8"/><circle class="lit" cx="32" cy="28" r="7"/><path d="M22 18c6-6 14-6 20 0M26 22c3-3 9-3 12 0"/>'),
};

// Diwali ornaments for the page itself.
export const diya = `<svg class="diya" viewBox="0 0 80 64" aria-hidden="true" focusable="false"><path class="flame" d="M40 4c6 9 9 15 9 20a9 9 0 0 1-18 0c0-5 3-11 9-20z"/><path class="flame-core" d="M40 16c3 4 4 7 4 9a4 4 0 0 1-8 0c0-2 1-5 4-9z"/><path class="bowl" d="M6 36h68c-2 14-16 22-34 22S8 50 6 36z"/><path class="rim" d="M6 36c10-4 22-6 34-6s24 2 34 6"/><path class="dots" d="M18 46h.01M30 49h.01M40 50h.01M50 49h.01M62 46h.01"/></svg>`;
