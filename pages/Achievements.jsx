import { useState } from 'react';
import { Btn, Eyebrow, PageHead, Section } from '../ui.jsx';
/* ============================
   ACHIEVEMENTS POST DATA (internal — used by the Post detail page only)
   Not displayed on the Achievements listing page.
   ============================ */
const ACHIEVEMENTS_DATA = [
  {
    id: 'p-1',
    slug: 'mangrove-piling-ground-improvement',
    category: 'PROJECT UPDATE',
    date: '18 APR 2026',
    title: 'PILING AND GROUND IMPROVEMENT BEGIN AT THE MANGROVE',
    excerpt: 'Work is under way on the 44-acre gated development at Korangi Creek, where our scope covers piling, ground improvement and the infrastructure everything above ground depends on.',
    author: 'ASENT Technical Department',
    body: '<p>The Mangrove is a 44-acre gated community for TPL Properties, planned around high-rise apartment towers, a sports arena, offices and a road network. ASENT is executing the works that decide whether the rest of the master plan can be built on schedule: piling, ground improvement and site infrastructure.</p><h2>Why the ground comes first</h2><p>Reclaimed and soft coastal ground near the creek carries far less load than it appears to. Before the first tower column is cast, the soil has to be tested, improved and proven.</p>'
  },
  {
    id: 'p-2',
    slug: 'gilgit-medical-centre-phase-two-complete',
    category: 'MILESTONE',
    date: '9 FEB 2026',
    title: 'AGA KHAN MEDICAL CENTRE PHASE II, GILGIT — SUBSTANTIALLY COMPLETE',
    excerpt: 'A 110,000 sq ft medical facility in the mountains, delivered with civil, architecture, MEP and medical gas works, and taken over by Aga Khan Health Services.',
    author: 'ASENT Project Team',
    body: '<p>Gilgit Medical Centre was designed by Arcop (Pvt) Ltd for Aga Khan Health Services, Pakistan. The facility covers roughly 110,000 sq ft and includes OPD, emergency, CT scan, CCU, ICU and isolation blocks.</p>'
  },
  {
    id: 'p-3',
    slug: 'pec-category-c-a-explained',
    category: 'INDUSTRY NOTE',
    date: '2 DEC 2025',
    title: 'WHAT A PEC CATEGORY C-A LICENCE MEANS FOR YOUR PROJECT',
    excerpt: 'Contractor categories decide who is allowed to bid for what. A plain reading of the licence classes and what a no-limit registration changes for a client.',
    author: 'ASENT Commercial Team',
    body: '<p>The Pakistan Engineering Council registers constructors in categories that cap the value of work a firm may undertake. Categories run from the smallest local class up to C-A, which carries no financial limit. ASENT holds PEC registration CA-00175 (No Limit).</p>'
  },
  {
    id: 'p-4',
    slug: 'peace-apartments-tower-a-tops-out',
    category: 'HIGH-RISE MILESTONE',
    date: '14 OCT 2025',
    title: 'PEACE APARTMENTS TOWER A STRUCTURE TOPS OUT AT 24 STOREYS',
    excerpt: 'Successfully poured over 35,000 cubic meters of high-strength concrete for the main structural core, completing raft and superstructure ahead of monsoon schedule.',
    author: 'ASENT Structural Team',
    body: '<p>Peace Apartments is a premier residential complex in Karachi spanning 1.65M sq ft. Tower A has officially reached structural completion at 24 storeys.</p>'
  },
  {
    id: 'p-5',
    slug: 'centerpoint-commercial-tower-handover',
    category: 'INFRASTRUCTURE',
    date: '28 AUG 2025',
    title: 'CENTERPOINT 28-STOREY COMMERCIAL TOWER HANDOVER EXCELLENCE',
    excerpt: 'Karachi\'s landmark 385-foot commercial tower completed with zero-incident record, featuring advanced seismic engineering, curtain walling, and grade-A interior decor.',
    author: 'ASENT Engineering Division',
    body: '<p>Centerpoint stands at 385 feet, making it one of Karachi\'s iconic corporate towers. Delivered to TPL Properties, the project highlights ASENT\'s capabilities in multi-storey high-rise execution.</p>'
  },
  {
    id: 'p-6',
    slug: 'five-million-man-hours-without-lti',
    category: 'HEALTH & SAFETY',
    date: '15 JUN 2025',
    title: '5 MILLION MAN-HOURS WITHOUT LOST TIME INJURY (LTI) ACHIEVED',
    excerpt: 'ASENT safety management protocol celebrates 5M continuous safe man-hours across all active high-rise, commercial, and industrial sites nationwide.',
    author: 'ASENT HSE Department',
    body: '<p>Safety remains the foundational pillar of ASENT operations. Achieving 5 Million LTI-free man-hours demonstrates our rigorous adherence to international ISO 18001 safety guidelines.</p>'
  },
  {
    id: 'p-7',
    slug: 'liaquat-national-hospital-specialty-block',
    category: 'HEALTHCARE WORKS',
    date: '3 APR 2025',
    title: 'LIAQUAT NATIONAL HOSPITAL NEW SPECIALTY BLOCK DELIVERED',
    excerpt: 'State-of-the-art 6-storey surgical and diagnostic facility constructed under active hospital environment standards, fully integrated with cleanroom MEP.',
    author: 'ASENT Medical Infra Team',
    body: '<p>Constructing within an operating hospital requires extreme noise control, dust mitigation, and continuous infection control barriers. ASENT successfully delivered the 6-storey specialty surgical block on target.</p>'
  },
  {
    id: 'p-8',
    slug: 'state-bank-currency-vault-data-center',
    category: 'BANKING INFRASTRUCTURE',
    date: '19 JAN 2025',
    title: 'STATE BANK OF PAKISTAN CURRENCY VAULT & DATA CENTER COMPLETED',
    excerpt: 'High-security subterranean reinforced concrete bunker and mission-critical financial facility constructed in compliance with federal vault security guidelines.',
    author: 'ASENT Projects Division',
    body: '<p>Commissioned for the State Bank of Pakistan, this specialized project involved heavy reinforced concrete security walls, blast doors, and redundant MEP backup systems.</p>'
  },
  {
    id: 'p-9',
    slug: 'sukkur-iba-university-auditorium',
    category: 'EDUCATIONAL CAMPUS',
    date: '11 NOV 2024',
    title: 'SUKKUR IBA UNIVERSITY ACADEMIC BLOCK & AUDITORIUM INAUGURATED',
    excerpt: 'Multi-purpose 1200-seat auditorium and 4-storey academic block delivered with sustainable thermal insulation and acoustics for interior spaces.',
    author: 'ASENT Institutional Division',
    body: '<p>Designed for extreme climate conditions in Sukkur, the academic block features energy-efficient double-brick cavity walls, solar shading louvers, and state-of-the-art acoustic paneling.</p>'
  },
  {
    id: 'p-10',
    slug: 'parco-refinery-heavy-equipment-foundations',
    category: 'INDUSTRIAL & ENERGY',
    date: '5 SEP 2024',
    title: 'PARCO REFINERY HEAVY EQUIPMENT FOUNDATION & SILO BASES CAST',
    excerpt: 'Precision foundation engineering with mass concrete pours and anti-vibration anchor installations executed for heavy petrochemical refinery units.',
    author: 'ASENT Heavy Infra Team',
    body: '<p>Heavy industrial foundations require continuous anti-crack mix formulations and precision anchor bolt placement tolerances under 2mm. Delivered ahead of plant assembly schedules.</p>'
  }
];


/* ============================
   ACHIEVEMENT CARDS DATA
   ——————————————————————————————
   To update any card, edit the 'number', 'title' or 'description'
   fields below. The component renders them automatically.
   ============================ */
export const ACHIEVEMENT_CARDS = [
  {
    id: 1,
    number: '01',
    title: 'Decades of Experience',
    description: '50+ years of construction and contracting experience.'
  },
  {
    id: 2,
    number: '02',
    title: 'Projects Delivered',
    description: '100+ completed projects across Pakistan.'
  },
  {
    id: 3,
    number: '03',
    title: 'Construction Scale',
    description: '1.65 million+ sq. ft. constructed.'
  },
  {
    id: 4,
    number: '04',
    title: 'Challenging Environments',
    description: 'Successfully executed projects in remote, coastal and extreme environmental conditions.'
  },
  {
    id: 5,
    number: '05',
    title: 'Retrofitting Expertise',
    description: 'Successfully rehabilitated and upgraded existing structures while maintaining operational requirements.'
  },
  {
    id: 6,
    number: '06',
    title: 'Safety',
    description: 'Half million man-hours without a lost-time incident.'
  },
  {
    id: 7,
    number: '07',
    title: 'On-Time Delivery',
    description: '100% of projects delivered within contractual schedules.'
  },
  {
    id: 8,
    number: '08',
    title: 'Repeat Clients',
    description: '85% of clients have awarded multiple projects.'
  },
  {
    id: 9,
    number: '09',
    title: 'Technical Capability',
    description: 'Experience spanning civil construction, structural works, MEP, interiors, rehabilitation and specialized construction.'
  },
  {
    id: 10,
    number: '10',
    title: 'Geographic Reach',
    description: 'Projects executed across Karachi, Gawadar, Muzafargarh and Gilgit of Pakistan.'
  }
];

/* ============================ ACHIEVEMENTS PAGE ============================ */
export function Achievements({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="Achievements" title="Achievements"
        lede="Key operational milestones, leadership strategies, and engineering excellence in construction contracting."
      />

      <Section>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '28px',
            padding: '16px 0'
          }}
        >
          {ACHIEVEMENT_CARDS.map((card) => (
            <div
              key={card.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(23, 25, 63, 0.08)',
                borderRadius: '16px',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(23, 25, 63, 0.09)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
              }}
            >
              {/* ---- Number + Title ---- */}
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: '#17193F',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.3',
                  margin: '0 0 14px',
                  textAlign: 'center',
                  textTransform: 'none'
                }}
              >
                {card.title}
              </h3>

              {/* ---- Accent divider ---- */}
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  backgroundColor: '#7dd3fc',
                  borderRadius: '2px',
                  margin: '0 auto 20px'
                }}
              />

              {/* ---- Description ---- */}
              <p
                style={{
                  fontFamily: 'var(--body)',
                  fontSize: '0.98rem',
                  lineHeight: '1.7',
                  color: '#475569',
                  margin: 0,
                  textAlign: 'center'
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

// Aliases for seamless backward compatibility
export const Blog = Achievements;
export const Insights = Achievements;

/* ============================ SINGLE POST ============================ */
export function Post({ go, slug }) {
  const post = ACHIEVEMENTS_DATA.find((s) => s.slug === slug);

  if (!post) {
    return (
      <>
        <PageHead go={go} crumb="Achievements" title="Achievement not found" lede="That entry may have been moved or removed." />
        <Section>
          <p className="lede">
            Try the <a href="#/blog" onClick={go('/blog')}>full list of achievements</a>.
          </p>
        </Section>
      </>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="crumbs">
            <a href="#/" onClick={go('/')}>Home</a> / <a href="#/blog" onClick={go('/blog')}>Achievements</a> / {post.category}
          </p>
          <h1 style={{ textTransform: 'uppercase' }}>{post.title}</h1>
          <p>{post.author} &nbsp;·&nbsp; {post.date}</p>
        </div>
      </section>

      <Section>
        <article className="article">
          {post.excerpt && <p className="lede">{post.excerpt}</p>}
          <div dangerouslySetInnerHTML={{ __html: post.body || '' }} />
          <p style={{ marginTop: 44 }}>
            <Btn variant="ghost" href="#/blog" onClick={go('/blog')}>← All achievements</Btn>
          </p>
        </article>
      </Section>
    </>
  );
}

/* ============================ ADMIN ============================ */
export function Admin({ go }) {
  return (
    <div className="wrap" style={{ padding: '60px 0' }}>
      <h2>Achievements Admin</h2>
      <p>All achievements are managed directly in <code>pages/Achievements.jsx</code>.</p>
      <Btn href="#/blog" onClick={go('/blog')}>View achievements</Btn>
    </div>
  );
}
