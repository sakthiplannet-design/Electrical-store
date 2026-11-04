import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { PIPE, mainRun, tailRun, flanges, middleTap, bottomTap } from './logo-geometry.js';

const BLUE = new THREE.Color('#1557c8');
const CENTER = { x: 50, y: 62 };
const v = ([x, y], z = 0) => new THREE.Vector3(x - CENTER.x, -(y - CENTER.y), z);

function runCurve(points, r) {
  const path = new THREE.CurvePath();
  let start = v(points[0]);
  for (let i = 1; i < points.length; i++) {
    const cur = v(points[i]);
    if (i === points.length - 1) {
      path.add(new THREE.LineCurve3(start, cur));
      break;
    }
    const next = v(points[i + 1]);
    const inDir = cur.clone().sub(start).normalize();
    const outDir = next.clone().sub(cur).normalize();
    const a = Math.min(r, start.distanceTo(cur) / 2, cur.distanceTo(next) / 2);
    const p1 = cur.clone().addScaledVector(inDir, -a);
    const p2 = cur.clone().addScaledVector(outDir, a);
    path.add(new THREE.LineCurve3(start, p1));
    path.add(new THREE.QuadraticBezierCurve3(p1, cur, p2));
    start = p2;
  }
  return path;
}

function tube(points, radius, material, corner = 4) {
  const curve = runCurve(points, corner);
  const segs = Math.max(48, Math.round(curve.getLength() * 0.7));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, segs, radius, 20, false), material);
}

function rod([x1, y1, x2, y2], radius, material) {
  const a = v([x1, y1]);
  const b = v([x2, y2]);
  const len = a.distanceTo(b);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 20), material);
  mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return mesh;
}

function dropGeometry(r) {
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const ang = Math.PI * t;
    // teardrop: sphere-ish base, pointed top
    const y = -Math.cos(ang) * r * (t < 0.5 ? 1 : 1.9);
    const x = Math.sin(ang) * r * (t < 0.5 ? 1 : 1 - (t - 0.5) * 1.6);
    pts.push(new THREE.Vector2(Math.max(x, 0.0001), y));
  }
  return new THREE.LatheGeometry(pts, 32);
}

export function mountLogo3D(canvas, { reducedMotion = false, onReady } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(28, 1, 1, 2000);
  camera.position.set(0, 4, 300);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-120, 160, 220);
  scene.add(key, new THREE.HemisphereLight(0xffffff, 0x9fb4d6, 0.6));

  const pvc = new THREE.MeshPhysicalMaterial({
    color: BLUE,
    roughness: 0.3,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const water = new THREE.MeshPhysicalMaterial({
    color: '#7fb6ff',
    roughness: 0.08,
    clearcoat: 1,
    transparent: true,
    opacity: 0.9,
  });

  const mark = new THREE.Group();
  const R = PIPE / 2;
  mark.add(tube(mainRun, R, pvc));
  mark.add(tube(tailRun, R, pvc));
  mark.add(tube(bottomTap.spout, R * 0.82, pvc, 6));

  // Flanges are discs around the pipe at its open ends.
  for (const [cx, cy, w, h] of flanges) {
    const vertical = w > h;
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(Math.max(w, h) / 2, Math.max(w, h) / 2, Math.min(w, h), 36),
      pvc,
    );
    disc.position.copy(v([cx, cy]));
    if (!vertical) disc.rotation.z = Math.PI / 2;
    mark.add(disc);
  }
  // Spout mouth ring.
  const mouth = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.02, R * 0.9, 2.4, 28), pvc);
  mouth.position.copy(v([bottomTap.spout[2][0], bottomTap.spout[2][1] - 0.6]));
  mark.add(mouth);

  // Middle tap body: a lathe dome resting on the middle run.
  const b = middleTap.body;
  const h = b.base - b.top;
  const prof = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    prof.push(new THREE.Vector2(b.halfTop + (b.halfBase - b.halfTop) * Math.pow(t, 2.2), h * (1 - t)));
  }
  prof.unshift(new THREE.Vector2(0.001, h));
  prof.push(new THREE.Vector2(0.001, 0));
  const dome = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), pvc);
  dome.scale.set(1, 1, 0.55);
  dome.position.copy(v([b.cx, b.base]));
  mark.add(dome);

  mark.add(rod(middleTap.stem, 1.7, pvc));
  mark.add(rod(middleTap.bar, 1.7, pvc));
  for (const [x, y, r] of middleTap.knobs) {
    const knob = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), pvc);
    knob.position.copy(v([x, y]));
    mark.add(knob);
  }
  mark.add(rod(bottomTap.stem, 1.4, pvc));
  mark.add(rod(bottomTap.bar, 1.4, pvc));

  const drop = new THREE.Mesh(dropGeometry(bottomTap.drop.r), water);
  const dropHome = v([bottomTap.drop.cx, bottomTap.drop.cy]);
  drop.position.copy(dropHome);
  mark.add(drop);

  mark.rotation.y = -0.38;
  scene.add(mark);

  let width = 0;
  let height = 0;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === width && rect.height === height) return;
    width = rect.width;
    height = rect.height;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    // Fit the mark (about 120 units tall, 112 wide) with a margin.
    const fitH = 150 / (2 * Math.tan((camera.fov * Math.PI) / 360));
    const fitW = fitH * (1.0 / Math.min(camera.aspect, 1));
    camera.position.z = Math.max(fitH, fitW);
    camera.updateProjectionMatrix();
  }

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  function onPointer(e) {
    const rect = canvas.getBoundingClientRect();
    pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }
  if (!reducedMotion) window.addEventListener('pointermove', onPointer, { passive: true });

  let visible = true;
  let raf = 0;
  let ready = false;
  const t0 = performance.now();
  function frame() {
    raf = 0;
    resize();
    const t = (performance.now() - t0) / 1000;
    if (!reducedMotion) {
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      mark.rotation.y = -0.38 + Math.sin(t * 0.45) * 0.32 + pointer.x * 0.35;
      mark.rotation.x = -0.04 + pointer.y * 0.12;
      // The drop swells under the tap, falls, and is caught by the line below.
      const cycle = (t % 2.8) / 2.8;
      if (cycle < 0.45) {
        const s = 0.35 + (cycle / 0.45) * 0.65;
        drop.scale.setScalar(s);
        drop.position.set(dropHome.x, dropHome.y + 4 * (1 - s), dropHome.z);
        water.opacity = 0.9;
      } else {
        const f = (cycle - 0.45) / 0.55;
        drop.scale.setScalar(1);
        drop.position.set(dropHome.x, dropHome.y - f * f * 70, dropHome.z);
        water.opacity = 0.9 * (1 - Math.max(0, (f - 0.7) / 0.3));
      }
    }
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady?.();
    }
    if (!reducedMotion && visible) raf = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(frame);
  });
  io.observe(canvas);
  window.addEventListener('resize', () => {
    if (!raf) raf = requestAnimationFrame(frame);
  });
  raf = requestAnimationFrame(frame);
  return renderer;
}
