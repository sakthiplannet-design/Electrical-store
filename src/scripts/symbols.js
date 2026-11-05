// Single-line-diagram symbols, drawn on a 48 grid in one 2px graphite stroke.
// Colour comes from CSS (currentColor); the lamp's glass takes --lamp-fill when lit.
const svg = (body, label = '') =>
  `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" ${label ? `data-symbol="${label}"` : ''}>${body}</svg>`;
const S = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

export const symbols = {
  // Circuit breaker on the busbar: contact with the trip cross.
  breaker: svg(
    `<g ${S}><path d="M24 2v14"/><path d="M24 16l9 14"/><path d="M24 32v14"/><path d="M19.5 11.5l9 9M28.5 11.5l-9 9" stroke-width="2.2"/><circle cx="24" cy="32" r="2.2" fill="currentColor"/></g>`,
    'breaker',
  ),
  // Lamp: circle with a cross; the glass fills when the circuit is live.
  lamp: svg(
    `<circle class="glass" cx="24" cy="24" r="13" fill="var(--lamp-fill, transparent)"/><g ${S}><circle cx="24" cy="24" r="13"/><path d="M14.8 14.8l18.4 18.4M33.2 14.8L14.8 33.2"/></g>`,
    'lamp',
  ),
  switch: svg(`<g ${S}><path d="M4 30h12M32 30h12"/><circle cx="16" cy="30" r="2.4"/><circle cx="32" cy="30" r="2.4"/><path d="M17.6 28.4L31 15"/></g>`),
  cable: svg(`<g ${S}><path d="M3 24h42"/><path d="M17 31l6-14M23 31l6-14M29 31l6-14"/></g>`),
  fan: svg(`<g ${S}><circle cx="24" cy="24" r="17"/><path d="M24 24c0-6 2.5-10 7-11-1 4.5-3 8-7 11zM24 24c5.2 3 7.4 7.2 6 11.6-4.4-1.4-6.8-4.6-6-11.6zM24 24c-5.2 3-9.9 3-12.9-.5 3.4-3 7.4-3.4 12.9.5z"/></g>`),
  socket: svg(`<g ${S}><path d="M10 30a14 14 0 0 1 28 0"/><path d="M24 30v14M17 16v8M31 16v8"/></g>`),
  tap: svg(`<g ${S}><path d="M8 14l16 10-16 10zM40 14L24 24l16 10z"/><path d="M24 24V8M18 8h12"/></g>`),
  earth: svg(`<g ${S}><path d="M24 2v20M10 22h28M15 29h18M20 36h8"/></g>`),
  supply: svg(`<g ${S}><circle cx="24" cy="24" r="16"/><path d="M14 24c3-6 7-6 10 0s7 6 10 0"/></g>`),
};

export const icons = {
  whatsapp: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.6a7.9 7.9 0 0 1-4-1.1l-.3-.2-3 .8.8-2.9-.2-.3A7.9 7.9 0 1 1 12 19.8zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.6-.1z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M5 3.5h3.3l1.6 4.2-2 1.3a11.5 11.5 0 0 0 7.1 7.1l1.3-2 4.2 1.6V19a1.8 1.8 0 0 1-2 1.8A16.6 16.6 0 0 1 3.2 5.5 1.8 1.8 0 0 1 5 3.5z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.3" fill="currentColor"/></svg>`,
  star: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.8l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.7l-5.6 3.1 1.3-6.2L3 9.3l6.3-.7z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h13M13 6l6 6-6 6"/></svg>`,
};
