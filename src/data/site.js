// Shop facts: Google Maps listing, the business card on it, and the shop's promo video (2026-11-04).
// Product types come from the card (switches, wires & cables, LED, fans, MCBs) and the video
// (Philips appliances, PVC pipes). No prices or stock levels are claimed; every item asks.

export const shop = {
  name: { en: 'Sri Ambica Electricals', ta: 'ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ்' },
  legal: { en: 'Sri Ambica Marketing', ta: 'ஶ்ரீ அம்பிகா மார்கெட்டிங்' },
  tagline: { en: 'Good ideas for a better living', ta: 'சிறந்த வாழ்க்கைக்கு நல்ல யோசனைகள்' },
  // Sri Ambica Electricals' own card (Fybros co-branded): contact Arun Jain.
  contactPerson: 'Arun Jain',
  phones: [
    { display: '0427 226 5201', tel: '+914272265201' },
    { display: '0427 497 1954', tel: '+914274971954' }, // number on the Google listing
  ],
  phoneTel: '+914272265201',
  mobile: { display: '97895 20634', tel: '+919789520634' },
  whatsapp: '919789520634',
  email: 'ambicamkt.salem@gmail.com', // Sri Ambica Marketing's address (sister concern, same premises)
  gstin: '33AFAPP3283P1Z3', // Sri Ambica Electricals
  address: {
    en: ['No. 20/72, Siva Complex (Old Hema Lodge)', 'Near Kirthika Pipes', 'Chittu Koil Street', 'Salem 636 001, Tamil Nadu'],
    ta: ['எண் 20/72, சிவா காம்ப்ளக்ஸ் (பழைய ஹேமா லாட்ஜ்)', 'கிருத்திகா பைப்ஸ் அருகில்', 'சிட்டு கோயில் தெரு', 'சேலம் 636 001, தமிழ்நாடு'],
  },
  mapsUrl: 'https://maps.google.com/?cid=10179459627126105073',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=11.6516393,78.1608556',
  // Google shows 10 AM – 9:30 PM; the same hours are assumed for every day.
  hours: { open: [10, 0], close: [21, 30] },
  rating: '4.8',
};

export const promises = [
  {
    en: 'Authorised distributor for Salem & Namakkal districts',
    ta: 'சேலம் & நாமக்கல் மாவட்டங்களுக்கான அங்கீகரிக்கப்பட்ட விநியோகஸ்தர்',
  },
  { en: 'Trade prices for electricians and contractors', ta: 'எலக்ட்ரீஷியன்கள் & ஒப்பந்ததாரர்களுக்கு வணிக விலை' },
  { en: 'Wide stock across trusted brands: GM, Fybros, Philips and more', ta: 'GM, Fybros, Philips உள்ளிட்ட நம்பகமான பிராண்டுகளின் விரிவான இருப்பு' },
  { en: 'Expert advice at the counter', ta: 'கடையிலேயே நிபுணர் ஆலோசனை' },
  { en: 'Quick local delivery', ta: 'விரைவான உள்ளூர் டெலிவரி' },
];

export const categories = [
  {
    id: 'switches',
    symbol: 'switch',
    name: { en: 'Switches & sockets', ta: 'சுவிட்சுகள் & சாக்கெட்டுகள்' },
    note: {
      en: 'GM and Fybros modular ranges from the authorised distributor, plus plates and boxes to finish the job.',
      ta: 'அங்கீகரிக்கப்பட்ட விநியோகஸ்தரிடமிருந்து GM & Fybros மாடுலர் வகைகள், அதோடு பிளேட்கள் & பெட்டிகள்.',
    },
    items: [
      { en: 'GM modular switches', ta: 'GM மாடுலர் சுவிட்சுகள்', spec: { en: '6 A & 16 A · one-way, two-way, bell push', ta: '6 A & 16 A · ஒன்-வே, டூ-வே, பெல் புஷ்' } },
      { en: 'Sockets', ta: 'சாக்கெட்டுகள்', spec: { en: '6 A & 16 A · universal and USB charging', ta: '6 A & 16 A · யுனிவர்சல் & USB சார்ஜிங்' } },
      { en: 'Cover plates & boxes', ta: 'கவர் பிளேட்கள் & பெட்டிகள்', spec: { en: '1 to 18 module · concealed and surface', ta: '1 முதல் 18 மாடுல் · கன்சீல்டு & சர்ஃபேஸ்' } },
      { en: 'Fan regulators & dimmers', ta: 'ஃபேன் ரெகுலேட்டர் & டிம்மர்', spec: { en: 'Step and touch types', ta: 'ஸ்டெப் & டச் வகைகள்' } },
    ],
  },
  {
    id: 'wires',
    symbol: 'cable',
    name: { en: 'Wires & cables', ta: 'வயர்கள் & கேபிள்கள்' },
    note: {
      en: 'Tell us the load and the run length; we will tell you the size.',
      ta: 'லோடு & நீளத்தைச் சொல்லுங்கள்; சரியான அளவை நாங்கள் சொல்கிறோம்.',
    },
    items: [
      { en: 'House wires (FR / FRLS)', ta: 'ஹவுஸ் வயர்கள் (FR / FRLS)', spec: { en: '0.75 to 6 sq mm · 90 m coils', ta: '0.75 முதல் 6 சதுர மி.மீ · 90 மீ காயில்' } },
      { en: 'Flexible & multicore cables', ta: 'ஃப்ளெக்ஸிபிள் & மல்டிகோர் கேபிள்கள்', spec: { en: 'For appliances, motors and panels', ta: 'உபகரணங்கள், மோட்டார் & பேனல்களுக்கு' } },
      { en: 'TV, LAN & telephone cables', ta: 'TV, LAN & டெலிபோன் கேபிள்கள்', spec: { en: 'Coaxial and Cat 6', ta: 'கோஆக்சியல் & Cat 6' } },
      { en: 'PVC conduits & accessories', ta: 'PVC கண்ட்யூட் & துணைப் பொருட்கள்', spec: { en: 'Pipes, bends, junction boxes', ta: 'பைப்புகள், பெண்டுகள், ஜங்ஷன் பெட்டிகள்' } },
    ],
  },
  {
    id: 'lighting',
    symbol: 'lamp',
    name: { en: 'LED lighting', ta: 'LED விளக்குகள்' },
    note: {
      en: 'From a single bulb to a whole building: bring the room size, we will match the wattage.',
      ta: 'ஒரு பல்பு முதல் முழு கட்டடம் வரை: அறையின் அளவைச் சொல்லுங்கள், வாட்டேஜை நாங்கள் பொருத்துகிறோம்.',
    },
    items: [
      { en: 'LED bulbs', ta: 'LED பல்புகள்', spec: { en: 'Cool and warm white', ta: 'கூல் & வார்ம் வைட்' } },
      { en: 'LED battens', ta: 'LED பேட்டன்கள்', spec: { en: '2 ft and 4 ft tube lights', ta: '2 அடி & 4 அடி டியூப் லைட்கள்' } },
      { en: 'Panel & down lights', ta: 'பேனல் & டவுன் லைட்கள்', spec: { en: 'Recessed and surface · round and square', ta: 'ரிசெஸ்டு & சர்ஃபேஸ் · வட்டம் & சதுரம்' } },
      { en: 'Outdoor & flood lights', ta: 'வெளிப்புற & ஃப்ளட் லைட்கள்', spec: { en: 'Gate, garden and building', ta: 'கேட், தோட்டம் & கட்டடம்' } },
    ],
  },
  {
    id: 'fans',
    symbol: 'fan',
    name: { en: 'Fans', ta: 'மின்விசிறிகள்' },
    note: {
      en: 'Ask us about energy-saving BLDC ceiling fans for lower bills.',
      ta: 'மின் கட்டணம் குறைய, ஆற்றல் சேமிக்கும் BLDC சீலிங் ஃபேன் பற்றி கேளுங்கள்.',
    },
    items: [
      { en: 'Ceiling fans', ta: 'சீலிங் ஃபேன்கள்', spec: { en: 'Regular, decorative and BLDC', ta: 'சாதாரண, அலங்கார & BLDC' } },
      { en: 'Wall & pedestal fans', ta: 'சுவர் & பெடஸ்டல் ஃபேன்கள்', spec: { en: 'Oscillating, for shops and homes', ta: 'சுழலும் வகை, கடை & வீட்டிற்கு' } },
      { en: 'Exhaust fans', ta: 'எக்ஸாஸ்ட் ஃபேன்கள்', spec: { en: 'Kitchen and bathroom', ta: 'சமையலறை & குளியலறை' } },
    ],
  },
  {
    id: 'protection',
    symbol: 'breaker',
    name: { en: 'MCBs & distribution boards', ta: 'MCB & விநியோகப் பெட்டிகள்' },
    note: {
      en: 'Protection sized to your wiring, single phase or three phase.',
      ta: 'உங்கள் வயரிங்கிற்கு ஏற்ற பாதுகாப்பு, சிங்கிள் அல்லது த்ரீ ஃபேஸ்.',
    },
    items: [
      { en: 'MCBs', ta: 'MCB-கள்', spec: { en: 'SP, DP and TP · B and C curve', ta: 'SP, DP & TP · B & C கர்வ்' } },
      { en: 'RCCB / ELCB', ta: 'RCCB / ELCB', spec: { en: 'Earth-leakage shock protection', ta: 'மின்கசிவு அதிர்ச்சிப் பாதுகாப்பு' } },
      { en: 'Distribution boards', ta: 'விநியோகப் பெட்டிகள் (DB)', spec: { en: 'Single and three phase, multiple ways', ta: 'சிங்கிள் & த்ரீ ஃபேஸ், பல வழிகள்' } },
      { en: 'Changeovers & isolators', ta: 'சேஞ்ச்ஓவர் & ஐசோலேட்டர்கள்', spec: { en: 'For inverter and generator lines', ta: 'இன்வர்ட்டர் & ஜெனரேட்டர் இணைப்புகளுக்கு' } },
    ],
  },
  {
    id: 'appliances',
    symbol: 'socket',
    name: { en: 'Home appliances', ta: 'வீட்டு உபயோகப் பொருட்கள்' },
    note: {
      en: 'Philips and more on the shelves: see them working at the counter before you buy.',
      ta: 'Philips மற்றும் பல பிராண்டுகள்: வாங்கும் முன் கடையிலேயே பார்த்துக்கொள்ளலாம்.',
    },
    items: [
      { en: 'Steam & dry irons', ta: 'ஸ்டீம் & ட்ரை அயர்ன் பெட்டிகள்', spec: { en: 'Philips and more', ta: 'Philips மற்றும் பல' } },
      { en: 'Mixer grinders', ta: 'மிக்ஸர் கிரைண்டர்கள்', spec: { en: 'Philips and more', ta: 'Philips மற்றும் பல' } },
      { en: 'Electric kettles', ta: 'எலக்ட்ரிக் கெட்டில்கள்', spec: { en: 'For home and office', ta: 'வீடு & அலுவலகத்திற்கு' } },
      { en: 'Kitchen appliances', ta: 'சமையலறை உபகரணங்கள்', spec: { en: 'Ask what is in stock this week', ta: 'இந்த வாரம் என்ன இருப்பு என்று கேளுங்கள்' } },
    ],
  },
  {
    id: 'plumbing',
    symbol: 'tap',
    name: { en: 'Pipes & plumbing', ta: 'பைப்புகள் & பிளம்பிங்' },
    note: {
      en: 'Wiring and water lines from one counter, for new builds and repairs.',
      ta: 'புதிய கட்டடம் & பழுது பார்ப்புக்கு, வயரிங் & தண்ணீர் இணைப்புகள் ஒரே இடத்தில்.',
    },
    items: [
      { en: 'PVC pipes', ta: 'PVC பைப்புகள்', spec: { en: 'Water supply and drainage', ta: 'நீர் விநியோகம் & வடிகால்' } },
      { en: 'Pipe fittings', ta: 'பைப் ஃபிட்டிங்ஸ்', spec: { en: 'Elbows, tees, couplers, valves', ta: 'எல்போ, டீ, கப்ளர், வால்வுகள்' } },
      { en: 'Taps', ta: 'குழாய்கள்', spec: { en: 'Kitchen, bathroom and garden', ta: 'சமையலறை, குளியலறை & தோட்டம்' } },
    ],
  },
];

export const t = {
  en: {
    langName: 'English',
    other: { label: 'தமிழ்', href: '/ta/' },
    title: 'Sri Ambica Electricals, Salem · Switches, wires, lighting, fans, plumbing',
    description:
      'Sri Ambica Electricals, 20/72 Siva Complex, Chittu Koil Street, Salem. Authorised distributor for Salem & Namakkal: switches, wires & cables, LED lights, fans, MCBs, Philips home appliances and PVC pipes. Ask prices on WhatsApp.',
    nav: { products: 'Products', offers: 'Offers', visit: 'Visit' },
    promise: 'Electricals, lighting, plumbing and home appliances for Salem homes and the trade.',
    whatsapp: 'WhatsApp us',
    call: 'Call the shop',
    askPrice: 'Ask price',
    askLabel: (item) => `Ask the price of ${item} on WhatsApp`,
    waGreeting: 'Hello Sri Ambica Electricals, please share the price and availability of:',
    waGeneral: 'Hello Sri Ambica Electricals, I have a question:',
    waHelp: 'Hello Sri Ambica Electricals, I am not sure which product I need. Here is a photo of the job:',
    board: 'Product board',
    boardHint: 'Switch a circuit to jump to it',
    open: (close) => `OPEN NOW · CLOSES ${close}`,
    closed: (open) => `CLOSED · OPENS ${open}`,
    hoursLine: 'Open 10 AM – 9:30 PM · call before visiting on Sundays and holidays',
    rating: 'Google rating',
    helpTitle: 'Not sure which one you need?',
    helpBody: 'Send a photo of the job on WhatsApp. We will tell you exactly what to buy, and what it costs.',
    helpCta: 'Send a photo',
    offersTitle: 'Offers on the board',
    offersLoading: 'Checking today’s offers…',
    offersEmpty: 'No offers on the board right now. Ask us on WhatsApp for this week’s best rates.',
    offersCta: 'Ask for this week’s rates',
    offerUntil: (d) => `Till ${d}`,
    plateTitle: 'Why Sri Ambica',
    visitTitle: 'Visit the shop',
    visitBody: 'Walk in, bring a sample or a photo, and pick up the same day.',
    directions: 'Get directions',
    photoAlt: 'The counter at Sri Ambica Electricals with the lit shop logo and shelves of appliances, pipes and fittings',
    phone: 'Phone',
    cell: 'Mobile',
    askFor: (n) => `Ask for ${n}`,
    email: 'Email',
    gstin: 'GSTIN',
    footer: 'Sri Ambica Marketing · Sri Ambica Electricals, Salem',
  },
  ta: {
    langName: 'தமிழ்',
    other: { label: 'English', href: '/' },
    title: 'ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், சேலம் · சுவிட்ச், வயர், விளக்குகள், ஃபேன், பிளம்பிங்',
    description:
      'ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், 20/72 சிவா காம்ப்ளக்ஸ், சிட்டு கோயில் தெரு, சேலம். சேலம் & நாமக்கல் மாவட்டங்களுக்கான அங்கீகரிக்கப்பட்ட விநியோகஸ்தர்: சுவிட்சுகள், வயர்கள், LED விளக்குகள், ஃபேன்கள், MCB, Philips வீட்டு உபகரணங்கள், PVC பைப்புகள். WhatsApp-ல் விலை கேளுங்கள்.',
    nav: { products: 'பொருட்கள்', offers: 'சலுகைகள்', visit: 'கடை முகவரி' },
    promise: 'சேலம் வீடுகளுக்கும் வணிகர்களுக்கும் மின்சாதனங்கள், விளக்குகள், பிளம்பிங் & வீட்டு உபகரணங்கள்.',
    whatsapp: 'WhatsApp-ல் கேளுங்கள்',
    call: 'கடைக்கு அழைக்க',
    askPrice: 'விலை கேட்க',
    askLabel: (item) => `${item} விலையை WhatsApp-ல் கேளுங்கள்`,
    waGreeting: 'வணக்கம் ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், இதன் விலை & இருப்பைத் தெரிவிக்கவும்:',
    waGeneral: 'வணக்கம் ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், எனக்கு ஒரு கேள்வி:',
    waHelp: 'வணக்கம் ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், எனக்கு எந்தப் பொருள் தேவை என்று தெரியவில்லை. வேலையின் புகைப்படம் இதோ:',
    board: 'பொருள் பலகை',
    boardHint: 'ஒரு சர்க்யூட்டை அழுத்தினால் அந்தப் பகுதிக்குச் செல்லும்',
    open: (close) => `இப்போது திறந்துள்ளது · ${close}க்கு மூடப்படும்`,
    closed: (open) => `மூடப்பட்டுள்ளது · ${open}க்கு திறக்கும்`,
    hoursLine: 'காலை 10 – இரவு 9:30 வரை · ஞாயிறு & விடுமுறை நாட்களில் வருமுன் அழைக்கவும்',
    rating: 'Google மதிப்பீடு',
    helpTitle: 'எது தேவை என்று தெரியவில்லையா?',
    helpBody: 'வேலையின் புகைப்படத்தை WhatsApp-ல் அனுப்புங்கள். என்ன வாங்க வேண்டும், எவ்வளவு ஆகும் என்று சரியாகச் சொல்கிறோம்.',
    helpCta: 'புகைப்படம் அனுப்ப',
    offersTitle: 'இன்றைய சலுகைகள்',
    offersLoading: 'இன்றைய சலுகைகளைப் பார்க்கிறோம்…',
    offersEmpty: 'இப்போது சலுகைகள் எதுவும் இல்லை. இந்த வாரத்தின் சிறந்த விலைக்கு WhatsApp-ல் கேளுங்கள்.',
    offersCta: 'இந்த வார விலை கேட்க',
    offerUntil: (d) => `${d} வரை`,
    plateTitle: 'ஏன் ஶ்ரீ அம்பிகா?',
    visitTitle: 'கடைக்கு வாருங்கள்',
    visitBody: 'நேரில் வாருங்கள், மாதிரி அல்லது புகைப்படம் கொண்டு வாருங்கள், அன்றே வாங்கிச் செல்லுங்கள்.',
    directions: 'வழி காட்டு',
    photoAlt: 'ஒளிரும் லோகோவுடன் ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ் கடையின் கவுண்டர், உபகரணங்கள், பைப்புகள் & ஃபிட்டிங்ஸ் அடுக்குகள்',
    phone: 'தொலைபேசி',
    cell: 'கைபேசி',
    askFor: (n) => `${n} அவர்களைக் கேளுங்கள்`,
    email: 'மின்னஞ்சல்',
    gstin: 'GSTIN',
    footer: 'ஶ்ரீ அம்பிகா மார்கெட்டிங் · ஶ்ரீ அம்பிகா எலக்ட்ரிக்கல்ஸ், சேலம்',
  },
};

export const waLink = (text) => `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(text)}`;
