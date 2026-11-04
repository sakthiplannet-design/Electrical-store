// 3D showroom: a ceiling fan, an LED bulb and a modular switch plate, modelled in code.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function pedestal(gold) {
  const g = new THREE.Group();
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.12, 0.14, 64),
    new THREE.MeshStandardMaterial({ color: '#2b1544', roughness: 0.55 }),
  );
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.03, 12, 96), gold);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.07;
  g.add(top, rim);
  return g;
}

function ceilingFan() {
  const fan = new THREE.Group();
  const bronze = new THREE.MeshStandardMaterial({ color: '#b07a3c', metalness: 0.75, roughness: 0.32 });
  const wood = new THREE.MeshStandardMaterial({ color: '#6b3a22', roughness: 0.55 });
  const motorProfile = [
    [0.001, -0.17],
    [0.3, -0.17],
    [0.44, -0.09],
    [0.46, 0],
    [0.4, 0.1],
    [0.18, 0.17],
    [0.001, 0.17],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const motor = new THREE.Mesh(new THREE.LatheGeometry(motorProfile, 64), bronze);
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.55, 16), bronze);
  rod.position.y = 0.44;
  const canopy = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 0.14, 32), bronze);
  canopy.position.y = 0.74;
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 16), bronze);
  cap.position.y = -0.17;
  fan.add(motor, rod, canopy, cap);

  const rotor = new THREE.Group();
  const blade = new THREE.Shape();
  blade.moveTo(0, -0.1);
  blade.bezierCurveTo(0.5, -0.14, 1.15, -0.2, 1.3, -0.06);
  blade.bezierCurveTo(1.38, 0.04, 1.3, 0.16, 1.18, 0.17);
  blade.bezierCurveTo(0.8, 0.16, 0.4, 0.12, 0, 0.1);
  blade.lineTo(0, -0.1);
  const bladeGeo = new THREE.ExtrudeGeometry(blade, { depth: 0.025, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 });
  bladeGeo.rotateX(Math.PI / 2);
  for (let i = 0; i < 3; i++) {
    const arm = new THREE.Group();
    const b = new THREE.Mesh(bladeGeo, wood);
    b.position.x = 0.38;
    b.rotation.x = 0.12; // blade pitch
    const holder = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.1), bronze);
    holder.position.x = 0.35;
    arm.add(b, holder);
    arm.rotation.y = (i * Math.PI * 2) / 3;
    rotor.add(arm);
  }
  rotor.position.y = -0.04;
  fan.add(rotor);
  fan.userData.rotor = rotor;
  return fan;
}

function ledBulb() {
  const bulb = new THREE.Group();
  // A60 bulb: a short neck flaring into a sphere (centre y 0.95, radius 0.62).
  const prof = [new THREE.Vector2(0.001, 0.33), new THREE.Vector2(0.3, 0.33)];
  const a0 = -Math.acos(0.36 / 0.62);
  for (let i = 0; i <= 32; i++) {
    const a = a0 + (i / 32) * (Math.PI / 2 - a0);
    prof.push(new THREE.Vector2(Math.max(0.001, Math.cos(a) * 0.62), 0.95 + Math.sin(a) * 0.62));
  }
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#fff7e4',
    emissive: '#ffcf73',
    emissiveIntensity: 1,
    roughness: 0.35,
    clearcoat: 1,
  });
  const glass = new THREE.Mesh(new THREE.LatheGeometry(prof, 64), glassMat);
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.31, 0.24, 0.22, 48),
    new THREE.MeshStandardMaterial({ color: '#f2efe9', roughness: 0.4 }),
  );
  neck.position.y = 0.24;
  const metal = new THREE.MeshStandardMaterial({ color: '#d9d9d9', metalness: 1, roughness: 0.25 });
  const capBody = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.22, 48), metal);
  capBody.position.y = 0.06;
  bulb.add(glass, neck, capBody);
  for (const x of [-0.12, 0.12]) {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.14, 12), metal);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(x * 1.6, 0.06, 0);
    bulb.add(pin);
  }
  const light = new THREE.PointLight('#ffcf73', 6, 5, 1.6);
  light.position.y = 0.95;
  bulb.add(light);
  bulb.userData = { glassMat, light };
  return bulb;
}

function switchPlate() {
  const g = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({ color: '#fbfbf8', roughness: 0.25, clearcoat: 0.8 });
  const plateGeo = new THREE.ExtrudeGeometry(roundedRect(1.5, 1.0, 0.12), { depth: 0.08, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 4 });
  plateGeo.center();
  const plate = new THREE.Mesh(plateGeo, white);
  const frame = new THREE.Mesh(
    new THREE.ExtrudeGeometry(roundedRect(1.26, 0.76, 0.06), { depth: 0.02, bevelEnabled: false }),
    new THREE.MeshStandardMaterial({ color: '#e6e3dc', roughness: 0.5 }),
  );
  frame.position.z = 0.06;
  g.add(plate, frame);
  const rockerGeo = new THREE.BoxGeometry(0.28, 0.56, 0.08, 2, 2, 2);
  const rockers = [];
  for (const x of [-0.45, -0.13]) {
    const r = new THREE.Mesh(rockerGeo, white);
    r.position.set(x, 0, 0.12);
    const led = new THREE.Mesh(
      new THREE.CircleGeometry(0.025, 16),
      new THREE.MeshStandardMaterial({ color: '#552200', emissive: '#ff7a1a', emissiveIntensity: 0 }),
    );
    led.position.set(0, 0.2, 0.041);
    r.add(led);
    g.add(r);
    rockers.push({ r, led });
  }
  // a 5-pin socket on the right
  const socketFace = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.04, 40), white);
  socketFace.rotation.x = Math.PI / 2;
  socketFace.position.set(0.36, 0, 0.1);
  g.add(socketFace);
  const holeMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.8 });
  for (const [x, y, r] of [
    [0.36, 0.11, 0.035],
    [0.26, -0.06, 0.028],
    [0.46, -0.06, 0.028],
    [0.31, 0.03, 0.02],
    [0.41, 0.03, 0.02],
  ]) {
    const h = new THREE.Mesh(new THREE.CircleGeometry(r, 16), holeMat);
    h.position.set(x, y, 0.121);
    g.add(h);
  }
  g.userData.rockers = rockers;
  return g;
}

export function mountShowroom(canvas, { reducedMotion = false, onReady } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.6;
  scene.add(new THREE.HemisphereLight('#ffe9c8', '#2a1040', 0.7));
  const key = new THREE.DirectionalLight('#fff1d6', 1.4);
  key.position.set(3, 6, 6);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(30, 2.6, 0.1, 100);
  const target = new THREE.Vector3(0, 1.0, 0);

  const gold = new THREE.MeshStandardMaterial({ color: '#ffc23d', metalness: 0.9, roughness: 0.3, emissive: '#5a3a00', emissiveIntensity: 0.3 });
  const xs = [-3.1, 0, 3.1];
  for (const x of xs) {
    const p = pedestal(gold);
    p.position.set(x, 0, 0);
    scene.add(p);
  }

  const fan = ceilingFan();
  fan.position.set(xs[0], 1.25, 0);
  fan.rotation.x = 0.62;
  scene.add(fan);

  const bulb = ledBulb();
  bulb.position.set(xs[1], 0.07, 0);
  scene.add(bulb);

  const sw = switchPlate();
  sw.position.set(xs[2], 1.0, 0);
  sw.rotation.x = -0.1;
  scene.add(sw);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.52;
  controls.minAzimuthAngle = -0.7;
  controls.maxAzimuthAngle = 0.7;
  controls.target.copy(target);

  let w = 0;
  let h = 0;
  function resize() {
    const r = canvas.getBoundingClientRect();
    if (r.width === w && r.height === h) return;
    w = r.width;
    h = r.height;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    // keep all three objects (about 8.4 units wide) in frame at any aspect
    const halfW = 4.6;
    const dist = Math.max(8.2, halfW / (Math.tan((camera.fov * Math.PI) / 360) * camera.aspect));
    camera.position.set(0, 2.2, dist);
    camera.updateProjectionMatrix();
    controls.update();
  }

  let visible = true;
  let raf = 0;
  let ready = false;
  const t0 = performance.now();
  function frame() {
    raf = 0;
    resize();
    const t = (performance.now() - t0) / 1000;
    if (!reducedMotion) {
      fan.userData.rotor.rotation.y = t * 3.2;
      fan.rotation.y = Math.sin(t * 0.4) * 0.35;
      bulb.rotation.y = t * 0.5;
      const glow = 1 + Math.sin(t * 2.2) * 0.25;
      bulb.userData.glassMat.emissiveIntensity = glow;
      bulb.userData.light.intensity = 5 * glow;
      sw.rotation.y = Math.sin(t * 0.6) * 0.45;
      const on = Math.floor(t / 1.6) % 2 === 0;
      const { r, led } = sw.userData.rockers[0];
      r.rotation.x += ((on ? -0.16 : 0.16) - r.rotation.x) * 0.25;
      led.material.emissiveIntensity = on ? 2 : 0;
      sw.userData.rockers[1].led.material.emissiveIntensity = 2;
    } else {
      fan.userData.rotor.rotation.y = 0.5;
      sw.userData.rockers[0].led.material.emissiveIntensity = 2;
    }
    controls.update();
    renderer.render(scene, camera);
    if (!ready) {
      ready = true;
      onReady?.();
    }
    if (visible && !reducedMotion) raf = requestAnimationFrame(frame);
  }
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  controls.addEventListener('change', kick);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  }).observe(canvas);
  window.addEventListener('resize', kick);
  kick();
}
