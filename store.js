import { IMAGES } from './images.js';

export const CONFIG = {
  key: 'asent_blog_v2',
  // Change this before publishing. It hides the panel; it does not secure it.
  adminPass: 'asent2026',
};

export const SEED = [
  {
    id: 'p-mangrove', slug: 'mangrove-piling-ground-improvement',
    title: 'Piling and ground improvement begin at The Mangrove',
    category: 'Project update', author: 'ASENT Technical Department', date: '2026-04-18',
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
    title: 'Aga Khan Medical Centre Phase II, Gilgit — substantially complete',
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
    title: 'What a PEC Category C-A licence means for your project',
    category: 'Industry note', author: 'ASENT Commercial Team', date: '2025-12-02',
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
    id: 'p-hse', slug: 'hse-plan-high-rise-pour',
    title: 'Safety on a high-rise pour: how our HSE plan actually runs',
    category: 'Health & safety', author: 'ASENT HSE Department', date: '2025-10-21',
    cover: IMAGES['arkadian'], status: 'published',
    excerpt: 'A project safety plan is only worth the toolbox talk it survives. How ASENT keeps an incident and injury free environment on tower sites.',
    body:
      '<p>Every ASENT site opens with a project safety plan issued for that site alone, and a safety officer assigned to keep watch on hazardous conditions. The plan is not filed and forgotten: it is the basis of the toolbox meetings held regularly with the crews who do the work.</p>' +
      '<h2>The routine</h2>' +
      '<ul><li>Daily toolbox talks before the shift, in the language the crew speaks</li><li>Safety audits that test whether the programme is working, not whether the file is complete</li><li>Hazardous materials stored separately and handled under control</li><li>Signage placed where the hazard is, not where the wall is convenient</li><li>First aid services with trained personnel at major sites</li></ul>' +
      '<h2>Environment on the same sheet</h2>' +
      '<p>Dust and fume barriers, controlled dewatering into public drains or tankered off site, protection of trees where they can be kept, and calibrated plant to hold down emissions. Health, safety and environment sit under one policy because on site they are the same decision.</p>',
  },
];

const FORCE_MEMORY = false; // preview build sets this true
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
    if (!p) p = write(clone(SEED));
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
