// Sri Ambica Electricals mark: a pipe drawn as an "S" inside a house outline,
// a tap on the middle run and a dripping tap on the bottom run. Traced from the
// shop's backlit counter sign. One source of truth for the 2D SVG and the 3D model.
// Units: icon is 100 wide; y grows downward (SVG convention).

export const PIPE = 10.5; // pipe diameter
export const CORNER = 2.5; // elbow radius

// Main run: open end on the right wall, over the roof, down the left wall,
// across the middle, down the right side, back along the bottom into the spout.
export const mainRun = [
  [95.4, 43],
  [95.4, 27],
  [50, 5.4],
  [4.6, 27],
  [4.6, 56.7],
  [95.4, 56.7],
  [95.4, 93],
  [56, 93],
];

// Tail of the S: rises from the bottom-left and ends in a flange.
export const tailRun = [
  [38, 93],
  [4.6, 93],
  [4.6, 69],
];

// Flanges: [cx, cy, width, height]
export const flanges = [
  [95.4, 42.5, 15, 4.2], // right wall open end
  [4.6, 68.5, 15, 4.2], // tail end
  [38.5, 93, 4.2, 12], // tail cap at the gap
];

// Middle tap: dome body sitting on the middle run, stem, T handle, knobs.
export const middleTap = {
  body: { cx: 50, base: 52, top: 43.5, halfBase: 22, halfTop: 11 },
  stem: [50, 43.5, 50, 34],
  bar: [33, 33.8, 67, 33.8],
  knobs: [
    [31.5, 33.8, 3.3],
    [68.5, 33.8, 3.3],
  ],
};

// Bottom tap: spout turning down from the bottom run, small T handle, the drop.
export const bottomTap = {
  spout: [
    [56, 93],
    [48.6, 93],
    [48.6, 108],
  ],
  stem: [63, 88.5, 63, 84],
  bar: [57.5, 83.6, 68.5, 83.6],
  drop: { cx: 48.6, cy: 119, r: 3.6 },
};

export const VIEWBOX = '-6 -2 112 128';

function roundedPath(points, r) {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const a = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx + ((px - cx) / l1) * a;
    const ay = cy + ((py - cy) / l1) * a;
    const bx = cx + ((nx - cx) / l2) * a;
    const by = cy + ((ny - cy) / l2) * a;
    d += ` L${ax.toFixed(2)} ${ay.toFixed(2)} Q${cx} ${cy} ${bx.toFixed(2)} ${by.toFixed(2)}`;
  }
  const last = points[points.length - 1];
  return `${d} L${last[0]} ${last[1]}`;
}

function dropPath({ cx, cy, r }) {
  const tip = cy - r * 2.3;
  return `M${cx} ${tip} C${cx + r * 0.35} ${cy - r * 1.3} ${cx + r} ${cy - r * 0.6} ${cx + r} ${cy} A${r} ${r} 0 1 1 ${cx - r} ${cy} C${cx - r} ${cy - r * 0.6} ${cx - r * 0.35} ${cy - r * 1.3} ${cx} ${tip}Z`;
}

/** Inline SVG for the mark. `fill` is any CSS colour (defaults to currentColor). */
export function logoSvg({ title = 'Sri Ambica Electricals', fill = 'currentColor', className = '' } = {}) {
  const b = middleTap.body;
  const body = `M${b.cx - b.halfBase} ${b.base} C${b.cx - b.halfBase} ${b.top + 1} ${b.cx - b.halfTop - 4} ${b.top} ${b.cx - b.halfTop} ${b.top} L${b.cx + b.halfTop} ${b.top} C${b.cx + b.halfTop + 4} ${b.top} ${b.cx + b.halfBase} ${b.top + 1} ${b.cx + b.halfBase} ${b.base}Z`;
  const line = ([x1, y1, x2, y2], w) =>
    `<path d="M${x1} ${y1} L${x2} ${y2}" stroke-width="${w}" stroke-linecap="round"/>`;
  const rects = flanges
    .map(([cx, cy, w, h]) => `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="1.2"/>`)
    .join('');
  const knobs = middleTap.knobs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
  return `<svg class="${className}" viewBox="${VIEWBOX}" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg"><title>${title}</title><g fill="none" stroke="${fill}" stroke-linejoin="round"><path d="${roundedPath(mainRun, CORNER)}" stroke-width="${PIPE}"/><path d="${roundedPath(tailRun, CORNER)}" stroke-width="${PIPE}"/><path d="${roundedPath(bottomTap.spout, 6)}" stroke-width="${PIPE * 0.82}"/>${line(middleTap.stem, 3.2)}${line(middleTap.bar, 3.2)}${line(bottomTap.stem, 2.6)}${line(bottomTap.bar, 2.6)}</g><g fill="${fill}">${rects}${knobs}<path d="${body}"/><path d="${dropPath(bottomTap.drop)}"/></g></svg>`;
}
