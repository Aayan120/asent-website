import { IMAGES } from './images.js';

export const CONFIG = {
  key: 'asent_achievements_v3',
  adminPass: 'asent2026',
};

export const SEED = [
  {
    id: 'p-mangrove', slug: 'mangrove-piling-ground-improvement',
    title: 'PILING AND GROUND IMPROVEMENT BEGIN AT THE MANGROVE',
    category: 'Project Update', author: 'ASENT Technical Department', date: '2026-04-18',
    cover: IMAGES['hero-mangrove-aerial'], status: 'published',
    excerpt: 'Work is under way on the 44-acre gated development at Korangi Creek, where our scope covers piling, ground improvement and the infrastructure everything above ground depends on.',
    body:
      '<p>The Mangrove is a 44-acre gated community for TPL Properties, planned around high-rise apartment towers, a sports arena, offices and a road network. ASENT is executing the works that decide whether the rest of the master plan can be built on schedule: piling, ground improvement and site infrastructure.</p>' +
      '<h2>Why the ground comes first</h2>' +
      '<p>Reclaimed and soft coastal ground near the creek carries far less load than it appears to. Before the first tower column is cast, the soil has to be tested, improved and proven. Our sequence runs load tests on trial piles, records the results against design assumptions, and only then releases each zone for production piling.</p>' +
      '<h2>What is on site now</h2>' +
      '<ul><li>Production piling for the Lagoon View Apartments, a 32-floor tower</li><li>Ground improvement across the tower and podium footprints</li><li>Infrastructure works, road network and the main entrance gate</li><li>LGS and pre-engineered building works for the sports arena</li></ul>' +
      '<p>Concrete is supplied from our own batching plants, which lets us hold mix design and pour timing rather than wait on a third party during a continuous raft pour.</p>',
  },
  {
    id: 'p-gilgit', slug: 'gilgit-medical-centre-phase-two-complete',
    title: 'AGA KHAN MEDICAL CENTRE PHASE II, GILGIT — SUBSTANTIALLY COMPLETE',
    category: 'Milestone', author: 'ASENT Project Team', date: '2026-02-09',
    cover: IMAGES['gilgit-medical'], status: 'published',
    excerpt: 'A 110,000 sq ft medical facility in the mountains, delivered with civil, architecture, MEP and medical gas works, and taken over by Aga Khan Health Services.',
    body:
      '<p>Gilgit Medical Centre was designed by Arcop (Pvt) Ltd for Aga Khan Health Services, Pakistan. The facility covers roughly 110,000 sq ft and includes OPD, emergency, CT scan, CCU, ICU and isolation blocks, general wards, waiting areas, cafeteria and landscaping.</p>' +
      '<h2>Building at altitude</h2>' +
      '<p>Working in Gilgit-Baltistan changes the plan more than the drawings do. Material convoys move on a single highway that weather can close. Concrete cannot be poured through the coldest weeks. Our programme was written around those windows: structure through the working season, then a shift to interiors and medical gas installation once the envelope was closed.</p>' +
      '<h2>Scope delivered</h2>' +
      '<ul><li>Civil and architectural works, internal and external development</li><li>MEP and HVAC installation</li><li>Medical gas pipeline systems for clinical areas</li><li>Fit-out of wards, nurse stations, consulting and dining spaces</li></ul>' +
      '<p>The client issued a substantial completion certificate with the facility taken over for beneficial use, and our regional office in Jutial continues to support the punch list and defect liability period.</p>',
  },
  {
    id: 'p-pec', slug: 'pec-category-c-a-explained',
    title: 'WHAT A PEC CATEGORY C-A LICENCE MEANS FOR YOUR PROJECT',
    category: 'Industry Note', author: 'ASENT Commercial Team', date: '2025-12-02',
    cover: IMAGES['centerpoint'], status: 'published',
    excerpt: 'Contractor categories decide who is allowed to bid for what. A plain reading of the licence classes and what a no-limit registration changes for a client.',
    body:
      '<p>The Pakistan Engineering Council registers constructors in categories that cap the value of work a firm may undertake. Categories run from the smallest local class up to C-A, which carries no financial limit. ASENT holds PEC registration CA-00175 (No Limit).</p>' +
      '<h2>Why the category matters before tender day</h2>' +
      '<p>A bid from a contractor whose category sits below the project value can be rejected at the technical stage no matter how competitive the price is. Checking the licence class early saves a re-tender later.</p>' +
      '<h2>What to verify in a prequalification</h2>' +
      '<ul><li>Current PEC registration number and category, and its validity date</li><li>Completed works of comparable value and building type, with completion certificates</li><li>Owned plant and equipment, not only hired capacity</li><li>Quality and HSE systems, and whether they are certified</li><li>Financial standing and bonding capacity</li></ul>' +
      '<p>Alongside its PEC registration, ASENT maintains ISO 9001, ISO 14001 and ISO 18001 systems, and can furnish a detailed equipment schedule and client completion certificates on request.</p>',
  },
  {
    id: 'p-peace', slug: 'peace-apartments-tower-a-tops-out',
    title: 'PEACE APARTMENTS TOWER A STRUCTURE TOPS OUT AT 24 STOREYS',
    category: 'High-Rise Milestone', author: 'ASENT Structural Team', date: '2025-10-14',
    cover: IMAGES['arkadian'], status: 'published',
    excerpt: 'Successfully poured over 35,000 cubic meters of high-strength concrete for the main structural core, completing raft and superstructure ahead of monsoon schedule.',
    body:
      '<p>Peace Apartments is a premier residential complex in Karachi spanning 1.65M sq ft. Tower A has officially reached structural completion at 24 storeys.</p>' +
      '<h2>Engineering Highlights</h2>' +
      '<ul><li>Heavy raft foundation executed with continuous 72-hour concrete pours</li><li>High-grade 6000 PSI concrete mix design monitored with real-time maturity sensors</li><li>Advanced climbing formwork system utilized for high-speed core wall construction</li></ul>',
  },
  {
    id: 'p-centerpoint', slug: 'centerpoint-commercial-tower-handover',
    title: 'CENTERPOINT 28-STOREY COMMERCIAL TOWER HANDOVER EXCELLENCE',
    category: 'Infrastructure', author: 'ASENT Engineering Division', date: '2025-08-28',
    cover: IMAGES['centerpoint'], status: 'published',
    excerpt: 'Karachi\'s landmark 385-foot commercial tower completed with zero-incident record, featuring advanced seismic engineering, curtain walling, and grade-A interior decor.',
    body:
      '<p>Centerpoint stands at 385 feet, making it one of Karachi\'s iconic corporate towers. Delivered to TPL Properties, the project highlights ASENT\'s capabilities in multi-storey high-rise execution.</p>' +
      '<h2>Scope & Delivery</h2>' +
      '<ul><li>28 storeys of structural steel & reinforced concrete framed design</li><li>Complete interior fit-out, double-glazed curtain wall façade, and automated building management systems</li><li>Zero lost-time safety record across 3.2 million worked hours</li></ul>',
  },
  {
    id: 'p-hse-milestone', slug: 'five-million-man-hours-without-lti',
    title: '5 MILLION MAN-HOURS WITHOUT LOST TIME INJURY (LTI) ACHIEVED',
    category: 'Health & Safety', author: 'ASENT HSE Department', date: '2025-06-15',
    cover: IMAGES['mangrove'], status: 'published',
    excerpt: 'ASENT safety management protocol celebrates 5M continuous safe man-hours across all active high-rise, commercial, and industrial sites nationwide.',
    body:
      '<p>Safety remains the foundational pillar of ASENT operations. Achieving 5 Million LTI-free man-hours demonstrates our rigorous adherence to international ISO 18001 safety guidelines.</p>' +
      '<h2>Key Safety Practices</h2>' +
      '<ul><li>Mandatory daily toolbox talks across all operational site units</li><li>Full fall-arrest systems and perimeter netting on high-rise structures</li><li>Zero-tolerance policy on PPE compliance and uninspected plant machinery</li></ul>',
  },
  {
    id: 'p-liaquat', slug: 'liaquat-national-hospital-specialty-block',
    title: 'LIAQUAT NATIONAL HOSPITAL NEW SPECIALTY BLOCK CIVIL STRUCTURE DELIVERED',
    category: 'Healthcare Works', author: 'ASENT Medical Infra Team', date: '2025-04-03',
    cover: IMAGES['gilgit-medical'], status: 'published',
    excerpt: 'State-of-the-art 6-storey surgical and diagnostic facility constructed under active hospital environment standards, fully integrated with cleanroom MEP.',
    body:
      '<p>Constructing within an operating hospital requires extreme noise control, dust mitigation, and continuous infection control barriers. ASENT successfully delivered the 6-storey specialty surgical block on target.</p>',
  },
  {
    id: 'p-sbp', slug: 'state-bank-currency-vault-data-center',
    title: 'STATE BANK OF PAKISTAN CURRENCY VAULT & DATA CENTER COMPLETED',
    category: 'Banking Infrastructure', author: 'ASENT Projects Division', date: '2025-01-19',
    cover: IMAGES['centerpoint'], status: 'published',
    excerpt: 'High-security subterranean reinforced concrete bunker and mission-critical financial facility constructed in compliance with federal vault security guidelines.',
    body:
      '<p>Commissioned for the State Bank of Pakistan, this specialized project involved heavy reinforced concrete security walls, blast doors, and redundant MEP backup systems.</p>',
  },
  {
    id: 'p-sukkur', slug: 'sukkur-iba-university-auditorium',
    title: 'SUKKUR IBA UNIVERSITY ACADEMIC BLOCK & AUDITORIUM INAUGURATED',
    category: 'Educational Campus', author: 'ASENT Institutional Division', date: '2024-11-11',
    cover: IMAGES['arkadian'], status: 'published',
    excerpt: 'Multi-purpose 1200-seat auditorium and 4-storey academic block delivered with sustainable thermal insulation and acoustics for interior spaces.',
    body:
      '<p>Designed for extreme climate conditions in Sukkur, the academic block features energy-efficient double-brick cavity walls, solar shading louvers, and state-of-the-art acoustic paneling.</p>',
  },
  {
    id: 'p-parco', slug: 'parco-refinery-heavy-equipment-foundations',
    title: 'PARCO REFINERY HEAVY EQUIPMENT FOUNDATION & SILO BASES CAST',
    category: 'Industrial & Energy', author: 'ASENT Heavy Infra Team', date: '2024-09-05',
    cover: IMAGES['hero-mangrove-aerial'], status: 'published',
    excerpt: 'Precision foundation engineering with mass concrete pours and anti-vibration anchor installations executed for heavy petrochemical refinery units.',
    body:
      '<p>Heavy industrial foundations require continuous anti-crack mix formulations and precision anchor bolt placement tolerances under 2mm. Delivered ahead of plant assembly schedules.</p>',
  },
];

const FORCE_MEMORY = false;
const hasLocal = !FORCE_MEMORY && (() => {
  try {
    window.localStorage.setItem('__t', '1');
    window.localStorage.removeItem('__t');
    return true;
  } catch (e) { return false; }
})();

let memory = null;
const clone = (v) => JSON.parse(JSON.stringify(v));

function read() {
  if (hasLocal) {
    try {
      const raw = window.localStorage.getItem(CONFIG.key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* fall through to seed */ }
  }
  return memory;
}

function write(posts) {
  memory = clone(posts);
  if (hasLocal) {
    try { window.localStorage.setItem(CONFIG.key, JSON.stringify(posts)); } catch (e) { /* quota */ }
  }
  return posts;
}

export const store = {
  persistent: hasLocal,
  all() {
    let p = read();
    if (!p || p.length < 10) p = write(clone(SEED));
    return p.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  },
  published() { return store.all().filter((p) => p.status !== 'draft'); },
  bySlug(slug) { return store.all().find((p) => p.slug === slug) || null; },
  byId(id) { return store.all().find((p) => p.id === id) || null; },
  slugify(t) {
    return String(t).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 70) || `post-${Date.now()}`;
  },
  save(post) {
    const list = store.all();
    const isNew = !post.id;
    const next = { ...post, id: post.id || `p-${Date.now().toString(36)}` };
    let slug = store.slugify(next.slug || next.title);
    const taken = list.filter((p) => p.id !== next.id).map((p) => p.slug);
    let base = slug, n = 2;
    while (taken.includes(slug)) { slug = `${base}-${n}`; n += 1; }
    next.slug = slug;
    write(isNew ? [next, ...list] : list.map((p) => (p.id === next.id ? next : p)));
    return next;
  },
  remove(id) { write(store.all().filter((p) => p.id !== id)); },
  replaceAll(posts) { write(posts); },
  reset() { write(clone(SEED)); },
};

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
