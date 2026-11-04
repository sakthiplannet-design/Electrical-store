// DEMO CATALOGUE: temporary, for showing the client.
// Built from the official product ranges of brands the shop carries (Fybros, GM, Philips),
// read from fybros.com, gmmodular.com and philips.co.in on 2026-11-04. Not the shop's stock list.
// When the client sends their catalogue, replace `products` (and `categories` if needed)
// and set DEMO_CATALOG to false; the "sample range" note on the site follows that flag.
export const DEMO_CATALOG = true;

export const categories = [
  { id: 'switches', tone: 'marigold', kind: 'switch', name: { en: 'Switches & accessories', ta: 'சுவிட்சுகள் & துணைப் பொருட்கள்' } },
  { id: 'lighting', tone: 'gold', kind: 'bulb', name: { en: 'LED lighting', ta: 'LED விளக்குகள்' } },
  { id: 'fans', tone: 'peacock', kind: 'fan', name: { en: 'Fans', ta: 'மின்விசிறிகள்' } },
  { id: 'wires', tone: 'rani', kind: 'wire', name: { en: 'Wires & cables', ta: 'வயர்கள் & கேபிள்கள்' } },
  { id: 'switchgear', tone: 'indigo', kind: 'mcb', name: { en: 'MCB, RCCB & boards', ta: 'MCB, RCCB & போர்டுகள்' } },
  { id: 'appliances', tone: 'chilli', kind: 'mixer', name: { en: 'Home appliances', ta: 'வீட்டு உபகரணங்கள்' } },
  { id: 'pipes', tone: 'lagoon', kind: 'pipe', name: { en: 'Pipes & fittings', ta: 'பைப் & ஃபிட்டிங்ஸ்' } },
  { id: 'smart', tone: 'violet', kind: 'smart', name: { en: 'Smart home', ta: 'ஸ்மார்ட் ஹோம்' } },
];

const sizesWire = ['0.75 sq mm', '1.0 sq mm', '1.5 sq mm', '2.5 sq mm', '4.0 sq mm', '6.0 sq mm'];
const p = (id, cat, brand, kind, en, ta, specEn, specTa, options) => ({
  id,
  cat,
  brand,
  kind,
  name: { en, ta },
  spec: { en: specEn, ta: specTa },
  options: options || null,
});

export const products = [
  // Switches & accessories
  p('fy-zine', 'switches', 'Fybros', 'switch', 'Zine modular switches', 'Zine மாடுலர் சுவிட்சுகள்', 'Modular range, 6 A & 16 A', 'மாடுலர் வகை, 6 A & 16 A', ['6 A one-way', '6 A two-way', '16 A']),
  p('fy-fourx', 'switches', 'Fybros', 'switch', 'Four-x switches', 'Four-x சுவிட்சுகள்', 'Modular switches with matching plates', 'பொருந்தும் பிளேட்களுடன் மாடுலர் சுவிட்சுகள்'),
  p('fy-woodem', 'switches', 'Fybros', 'plate', 'Wood-em switches & plates', 'Wood-em சுவிட்சுகள் & பிளேட்கள்', 'Wood-finish designer range', 'மர நிற டிசைனர் வகை'),
  p('fy-series11', 'switches', 'Fybros', 'switch', 'Series 11 switches', 'Series 11 சுவிட்சுகள்', 'Everyday modular range', 'தினசரி மாடுலர் வகை'),
  p('gm-plates', 'switches', 'GM', 'plate', 'Cover plates', 'கவர் பிளேட்கள்', 'Modular plates for any board size', 'எந்த போர்டுக்கும் மாடுலர் பிளேட்கள்', ['2 module', '4 module', '6 module', '8 module', '12 module', '18 module']),
  p('gm-spike', 'switches', 'GM', 'spike', 'Spike guard', 'ஸ்பைக் கார்டு', 'Multi-socket extension with surge protection', 'சர்ஜ் பாதுகாப்புடன் பல சாக்கெட் எக்ஸ்டென்ஷன்'),
  p('gm-bell', 'switches', 'GM', 'bell', 'Door bell', 'டோர் பெல்', 'Musical door bell', 'இசை டோர் பெல்'),
  p('gm-night', 'switches', 'GM', 'bulb', 'Night lamp', 'இரவு விளக்கு', 'Plug-in LED night lamp', 'பிளக்-இன் LED இரவு விளக்கு'),

  // LED lighting
  p('fy-lamp', 'lighting', 'Fybros', 'bulb', 'LED lamp', 'LED பல்பு', 'B22 base, cool day light', 'B22 பேஸ், கூல் டே லைட்', ['9 W', '12 W', '15 W', '20 W']),
  p('fy-tube', 'lighting', 'Fybros', 'tube', 'LED tubelight', 'LED டியூப் லைட்', 'Batten tubelight', 'பேட்டன் டியூப் லைட்', ['2 ft', '4 ft']),
  p('fy-panel', 'lighting', 'Fybros', 'panel', 'Slim panel light', 'ஸ்லிம் பேனல் லைட்', 'Recessed ceiling panel, round or square', 'சீலிங் பேனல், வட்டம் அல்லது சதுரம்', ['6 W', '12 W', '18 W']),
  p('fy-cob', 'lighting', 'Fybros', 'spot', 'COB spot light', 'COB ஸ்பாட் லைட்', 'Focused accent lighting', 'குவிந்த அலங்கார ஒளி', ['3 W', '7 W']),
  p('fy-junction', 'lighting', 'Fybros', 'panel', 'Junction downlight', 'ஜங்ஷன் டவுன்லைட்', 'Fits a standard junction box', 'சாதாரண ஜங்ஷன் பெட்டியில் பொருந்தும்'),
  p('fy-strip', 'lighting', 'Fybros', 'strip', 'LED strip light', 'LED ஸ்ட்ரிப் லைட்', 'For coves, shelves and Diwali décor', 'கோவ், அலமாரி & தீபாவளி அலங்காரத்திற்கு'),
  p('gm-flood', 'lighting', 'GM', 'flood', 'LED flood light', 'LED ஃப்ளட் லைட்', 'Gate, compound and building', 'கேட், காம்பவுண்ட் & கட்டடம்', ['50 W', '100 W']),
  p('fy-street', 'lighting', 'Fybros', 'flood', 'Street light', 'தெரு விளக்கு', 'For streets, layouts and campuses', 'தெருக்கள், லேஅவுட் & வளாகங்களுக்கு'),

  // Fans
  p('fy-fwave', 'fans', 'Fybros', 'fan', 'F-Wave ceiling fan', 'F-Wave சீலிங் ஃபேன்', 'Ceiling fan for homes and shops', 'வீடு & கடைகளுக்கான சீலிங் ஃபேன்'),
  p('fy-bladeless', 'fans', 'Fybros', 'bladeless', 'Bladeless fan', 'பிளேடு இல்லா ஃபேன்', 'Safe, quiet tower design', 'பாதுகாப்பான, அமைதியான டவர் வடிவம்'),
  p('fy-portable', 'fans', 'Fybros', 'tablefan', 'Portable fan', 'போர்ட்டபிள் ஃபேன்', 'Carry it room to room', 'அறை அறையாக எடுத்துச் செல்லலாம்'),
  p('gm-pedestal', 'fans', 'GM', 'tablefan', 'Pedestal fan', 'பெடஸ்டல் ஃபேன்', 'Height-adjustable, oscillating', 'உயரம் மாற்றக்கூடியது, சுழலும்'),
  p('gm-wall', 'fans', 'GM', 'tablefan', 'Wall fan', 'சுவர் ஃபேன்', 'For kitchens, shops and offices', 'சமையலறை, கடை & அலுவலகத்திற்கு'),
  p('fy-exhaust', 'fans', 'Fybros', 'exhaust', 'Exhaust fan', 'எக்ஸாஸ்ட் ஃபேன்', 'Kitchen and bathroom ventilation', 'சமையலறை & குளியலறை காற்றோட்டம்'),

  // Wires & cables
  p('fy-domestic', 'wires', 'Fybros', 'wire', 'Domestic house wire', 'வீட்டு வயர்', 'For home wiring', 'வீட்டு வயரிங்கிற்கு', sizesWire),
  p('gm-fr', 'wires', 'GM', 'wire', 'Flame retardant cable', 'தீ தடுப்பு கேபிள்', 'FR insulated house wire', 'FR இன்சுலேஷன் வீட்டு வயர்', sizesWire),
  p('fy-industrial', 'wires', 'Fybros', 'cable', 'Industrial cable', 'தொழிற்சாலை கேபிள்', 'Multicore, for motors and panels', 'மல்டிகோர், மோட்டார் & பேனல்களுக்கு'),
  p('gm-coax', 'wires', 'GM', 'cable', 'Coaxial cable', 'கோஆக்சியல் கேபிள்', 'For TV and CCTV', 'TV & CCTV-க்கு'),
  p('fy-comm', 'wires', 'Fybros', 'cable', 'Communication cable', 'கம்யூனிகேஷன் கேபிள்', 'LAN and telephone', 'LAN & டெலிபோன்'),
  p('gm-sub', 'wires', 'GM', 'wire', 'Submersible wire', 'சப்மெர்சிபிள் வயர்', 'For borewell pumps', 'போர்வெல் பம்புகளுக்கு'),

  // Switchgear
  p('fy-mcb', 'switchgear', 'Fybros', 'mcb', 'MCB', 'MCB', 'Miniature circuit breaker', 'மினியேச்சர் சர்க்யூட் பிரேக்கர்', ['SP 6 A', 'SP 16 A', 'SP 32 A', 'DP 32 A', 'DP 63 A']),
  p('fy-rccb', 'switchgear', 'Fybros', 'mcb', 'RCCB', 'RCCB', 'Shock protection, 30 mA', 'அதிர்ச்சிப் பாதுகாப்பு, 30 mA', ['2 pole', '4 pole']),
  p('fy-db', 'switchgear', 'Fybros', 'db', 'Distribution box', 'விநியோகப் பெட்டி', 'MCB enclosure for homes', 'வீடுகளுக்கான MCB பெட்டி', ['4 way', '8 way', '12 way']),
  p('gm-tpn', 'switchgear', 'GM', 'db', 'GV MCB TPN', 'GV MCB TPN', 'Three phase + neutral protection', 'த்ரீ ஃபேஸ் + நியூட்ரல் பாதுகாப்பு'),

  // Home appliances (Philips)
  p('ph-mixer', 'appliances', 'Philips', 'mixer', 'HL7756 mixer grinder', 'HL7756 மிக்ஸர் கிரைண்டர்', '750 W, 3 jars', '750 W, 3 ஜார்கள்'),
  p('ph-kettle', 'appliances', 'Philips', 'kettle', 'HD9306 electric kettle', 'HD9306 எலக்ட்ரிக் கெட்டில்', '1.5 L, stainless steel', '1.5 லி, ஸ்டெயின்லெஸ் ஸ்டீல்'),
  p('ph-dryiron', 'appliances', 'Philips', 'iron', 'HD1172 dry iron', 'HD1172 ட்ரை அயர்ன்', '1000 W', '1000 W'),
  p('ph-steamiron', 'appliances', 'Philips', 'iron', 'GC1905 steam iron', 'GC1905 ஸ்டீம் அயர்ன்', '1440 W', '1440 W'),
  p('ph-handsteam', 'appliances', 'Philips', 'steamer', '3000 Series handheld steamer', '3000 சீரிஸ் கையடக்க ஸ்டீமர்', 'STH3010/70', 'STH3010/70'),
  p('ph-standsteam', 'appliances', 'Philips', 'steamer', 'Easy Touch stand steamer', 'ஈஸி டச் ஸ்டாண்ட் ஸ்டீமர்', 'GC487/89', 'GC487/89'),

  // Pipes & fittings
  p('gm-pipe', 'pipes', 'GM', 'pipe', 'PVC conduit pipe', 'PVC கண்ட்யூட் பைப்', 'For concealed and surface wiring', 'கன்சீல்டு & சர்ஃபேஸ் வயரிங்கிற்கு', ['20 mm', '25 mm']),
  p('gm-fittings', 'pipes', 'GM', 'fitting', 'Conduit fittings', 'கண்ட்யூட் ஃபிட்டிங்ஸ்', 'Bends, junction boxes, couplers', 'பெண்ட், ஜங்ஷன் பெட்டி, கப்ளர்'),
  p('gm-oval', 'pipes', 'GM', 'pipe', 'Oval conduit', 'ஓவல் கண்ட்யூட்', 'Neat surface runs', 'சுத்தமான சர்ஃபேஸ் வயரிங்'),
  p('pvc-water', 'pipes', 'Plumbing', 'pipe', 'PVC water pipes', 'PVC தண்ணீர் பைப்புகள்', 'Supply and drainage', 'நீர் விநியோகம் & வடிகால்'),
  p('taps', 'pipes', 'Plumbing', 'tap', 'Taps & valves', 'குழாய்கள் & வால்வுகள்', 'Kitchen, bathroom and garden', 'சமையலறை, குளியலறை & தோட்டம்'),

  // Smart home
  p('gm-wifibox', 'smart', 'GM', 'smart', 'GM Wifi Box', 'GM Wifi Box', 'Retro-fit app control for existing boards', 'இருக்கும் போர்டுகளுக்கு ஆப் கட்டுப்பாடு'),
  p('gm-knx', 'smart', 'GM', 'smart', 'KNX home automation', 'KNX ஹோம் ஆட்டோமேஷன்', 'Wired automation for new homes', 'புதிய வீடுகளுக்கான வயர்டு ஆட்டோமேஷன்'),
];
