import { useState } from 'react';
import { Arrow, Btn, Eyebrow, FeatureList, PageHead, Reveal, Section, SectionHead, Split } from '../ui.jsx';

/* =========================================================================
   CAREERS & JOB OPENINGS DATA
   Edit, add, or remove job listings easily by modifying the items below.
   ========================================================================= */
export const CAREERS_DATA = [
  {
    id: 'job-1',
    title: 'Senior Structural Engineer',
    department: 'Engineering & Design',
    location: 'Karachi Head Office / Site',
    type: 'Full-time',
    experience: '8+ Years',
    deadline: 'Open until filled',
    overview: 'Lead the structural engineering review and site execution coordination for high-rise commercial and residential towers.',
    responsibilities: [
      'Perform detailed structural analysis, reviewing raft foundations and high-rise superstructure designs.',
      'Coordinate with consulting engineers, client representatives, and on-site construction managers.',
      'Ensure compliance with Building Code of Pakistan, ACI 318, and seismic design standards.',
      'Supervise quality testing of concrete, post-tensioned tendons, and high-yield reinforcement steel.'
    ],
    requirements: [
      'B.E. / B.Sc. in Civil / Structural Engineering (M.Sc. preferred).',
      'Registered with Pakistan Engineering Council (PEC).',
      'Minimum 8 years of proven experience in high-rise RCC building construction.',
      'Proficiency in ETABS, SAFE, AutoCAD, and structural QA/QC workflows.'
    ]
  },
  {
    id: 'job-2',
    title: 'Project Manager — High-Rise Construction',
    department: 'Project Management',
    location: 'Karachi, Pakistan',
    type: 'Full-time',
    experience: '10+ Years',
    deadline: 'Open until filled',
    overview: 'Direct turnkey construction execution of large-scale commercial towers from excavation and piling through MEP and finishing.',
    responsibilities: [
      'Manage end-to-end site operations, master schedules, resource allocation, and budget controls.',
      'Oversee sub-contractors, MEP coordination, procurement cycles, and plant mobilization.',
      'Enforce zero-compromise Health, Safety & Environmental (HSE) protocols on site.',
      'Deliver milestone reports and chair coordination meetings with project architects and clients.'
    ],
    requirements: [
      'B.E. in Civil Engineering (PMP or post-graduate qualification is an advantage).',
      '10+ years in civil contracting, with at least 2 completed high-rise/turnkey projects as lead PM.',
      'Strong leadership, commercial awareness, and contract management (FIDIC) skills.'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior MEP Coordinator',
    department: 'MEP & HVAC Systems',
    location: 'Karachi / Regional Sites',
    type: 'Full-time',
    experience: '6+ Years',
    deadline: 'Open until filled',
    overview: 'Coordinate mechanical, electrical, plumbing, firefighting, and HVAC installations across ongoing hospital and commercial projects.',
    responsibilities: [
      'Review and integrate combined MEP services drawings (CSD) with civil/structural layouts.',
      'Supervise installation, testing, and commissioning of central chillers, generators, and switchgear.',
      'Coordinate medical gas and cleanroom installations for healthcare projects.',
      'Liaise with utility authorities and third-party inspection agencies.'
    ],
    requirements: [
      'B.E. in Mechanical or Electrical Engineering.',
      '6+ years of specialized MEP execution experience in hospitals, hotels, or corporate towers.',
      'Hands-on expertise in HVAC distribution, BIM/Revit MEP coordination, and testing protocols.'
    ]
  },
  {
    id: 'job-4',
    title: 'HSE & Safety Manager',
    department: 'Quality & HSE',
    location: 'Project Sites (Karachi)',
    type: 'Full-time',
    experience: '5+ Years',
    deadline: 'Open until filled',
    overview: 'Champion and implement ISO 14001 and ISO 45001 safety frameworks, conducting daily risk audits across heavy plant and high-altitude operations.',
    responsibilities: [
      'Formulate site-specific HSE plans, hazard identifications, and risk assessments (HIRA).',
      'Conduct regular safety tool-box talks, emergency mock drills, and scaffolding inspections.',
      'Maintain incident-free records and prepare comprehensive monthly HSE audits.',
      'Ensure strict compliance with environmental protection and waste mitigation regulations.'
    ],
    requirements: [
      'NEBOSH IGC certified with a relevant Engineering or Science degree.',
      '5+ years of active field safety experience on high-rise construction sites.',
      'Thorough knowledge of scaffolding, lifting operations, and deep excavation protocols.'
    ]
  },
  {
    id: 'job-5',
    title: 'Interior Fit-Out & Joinery Site Engineer',
    department: 'Interior Decoration & Finishing',
    location: 'Karachi, Pakistan',
    type: 'Full-time',
    experience: '4+ Years',
    deadline: 'Open until filled',
    overview: 'Supervise premium architectural finishing, custom joinery, acoustic ceilings, and interior turnkey fit-outs.',
    responsibilities: [
      'Coordinate custom millwork and furniture installation from ASENT\'s in-house manufacturing units.',
      'Inspect dry lining, marble/granite cladding, acoustic paneling, and high-end paint finishes.',
      'Manage snagging lists, material approvals, and architectural punch-lists to perfection.'
    ],
    requirements: [
      'B.Arch or B.E. Civil / Interior Design diploma.',
      '4+ years executing Grade-A corporate offices, 5-star hotels, or luxury residential interiors.',
      'Sharp attention to micro-details, materials, and luxury finishes.'
    ]
  },
  {
    id: 'job-6',
    title: 'Quantity Surveyor / Cost Estimator',
    department: 'Commercial & Tendering',
    location: 'Karachi Head Office',
    type: 'Full-time',
    experience: '4+ Years',
    deadline: 'Open until filled',
    overview: 'Prepare accurate Bills of Quantities (BOQ), rate analysis, progress billings, and subcontractor reconciliations.',
    responsibilities: [
      'Extract quantity take-offs from architectural and structural drawings for tendering.',
      'Prepare interim payment certificates (IPC), variation claims, and final accounts.',
      'Perform monthly material reconciliation for cement, steel, concrete, and finishing items.'
    ],
    requirements: [
      'B.Tech / B.E. Civil or DAE (Civil) / Quantity Surveying certificate.',
      '4+ years in cost estimation, tendering, and contract measurement for civil works.',
      'Expert in MS Excel, PlanSwift / Bluebeam, and AutoCAD.'
    ]
  }
];

export const CAREER_PERKS = [
  ['01', 'Iconic Engineering Scope', 'Work on Category C-A (no financial limit) projects including 30+ storey towers, regional campuses, and healthcare landmarks.'],
  ['02', 'Professional Development', 'Continuous mentorship from veteran chief engineers, leadership training, and sponsorships for technical certifications.'],
  ['03', 'Safety First Culture', 'Strict adherence to ISO 9001, ISO 14001, and ISO 18001 standards with industry-leading safety track records.'],
  ['04', 'In-House Turnkey Resources', 'Collaborate directly with our own heavy plant fleet, soil laboratories, and custom joinery manufacturing factories.'],
];

/* =========================================================================
   CAREER PAGE COMPONENT
   ========================================================================= */
export function Career({ go }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterDept, setFilterDept] = useState('All');

  const departments = ['All', ...new Set(CAREERS_DATA.map(j => j.department))];
  const filteredJobs = filterDept === 'All' ? CAREERS_DATA : CAREERS_DATA.filter(j => j.department === filterDept);

  return (
    <>
      <PageHead
        go={go}
        crumb="Careers"
        title="Build Pakistan's Future With Us"
        lede="Join a team of passionate engineers, construction managers, and builders executing landmark civil infrastructure, high-rise towers, and turnkey interiors across Pakistan."
      />

      {/* WHY ASENT SECTION */}
      <Section tone="paper2">
        <Reveal>
          <SectionHead
            split
            eyebrow="Why Work At ASENT"
            title={<>A legacy of engineering excellence<br />and human empowerment</>}
            aside="We believe world-class infrastructure is built by empowered people. Join a 60-year legacy of engineering integrity."
          />
        </Reveal>
        <Reveal delay="1">
          <div className="cards">
            {CAREER_PERKS.map(([tag, title, text]) => (
              <article className="card" key={title}>
                <span className="num-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* OPEN POSITIONS LIST */}
      <Section grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <Eyebrow>Open Opportunities</Eyebrow>
            <h2 style={{ margin: '8px 0 0' }}>Current Vacancies</h2>
            <p className="muted" style={{ margin: '8px 0 0' }}>Explore open positions across our engineering, project management, and execution teams.</p>
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setFilterDept(dept)}
                className={`btn btn--sm ${filterDept === dept ? 'btn--dark' : 'btn--ghost'}`}
                style={{ borderRadius: 6, fontSize: '0.82rem', padding: '6px 14px' }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius)',
                padding: '30px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)', background: 'rgba(23,25,63,0.06)', padding: '4px 10px', borderRadius: 4 }}>
                    {job.department}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {job.type}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px', lineHeight: 1.3 }}>{job.title}</h3>
                
                <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 14 }}>
                  <span>📍 {job.location}</span>
                  <span>⏳ {job.experience}</span>
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--ink)', opacity: 0.85, lineHeight: 1.5, marginBottom: 20 }}>
                  {job.overview}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--navy)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  View Details &amp; Apply <Arrow />
                </button>
                <a
                  href={`mailto:careers@asent.com.pk?subject=Application for ${encodeURIComponent(job.title)}&body=Dear ASENT Hiring Team,%0D%0A%0D%0AI am applying for the position of ${encodeURIComponent(job.title)}.%0D%0A%0D%0APlease find attached my CV / Resume.`}
                  className="btn btn--sm btn--outline"
                  style={{ textDecoration: 'none' }}
                >
                  Apply Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* JOB DETAIL MODAL */}
      {selectedJob && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedJob(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11,13,32,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              maxWidth: 680,
              width: '100%',
              borderRadius: 8,
              padding: '36px 32px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <button
              onClick={() => setSelectedJob(null)}
              type="button"
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'var(--paper2)',
                border: 'none',
                width: 36,
                height: 36,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--navy)' }}>
              {selectedJob.department} · {selectedJob.type}
            </span>
            <h2 style={{ fontSize: '1.6rem', marginTop: 6, marginBottom: 8 }}>{selectedJob.title}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 20 }}>
              📍 {selectedJob.location} &nbsp;|&nbsp; ⏳ Experience: {selectedJob.experience} &nbsp;|&nbsp; 📅 {selectedJob.deadline}
            </p>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18 }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginBottom: 8 }}>
                Role Overview
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#333' }}>{selectedJob.overview}</p>

              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginTop: 22, marginBottom: 10 }}>
                Key Responsibilities
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: '0.92rem', lineHeight: 1.6, color: '#444' }}>
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{r}</li>
                ))}
              </ul>

              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginTop: 22, marginBottom: 10 }}>
                Candidate Requirements
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: '0.92rem', lineHeight: 1.6, color: '#444' }}>
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{req}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 32, borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', gap: 14, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
              <a
                href={`mailto:careers@asent.com.pk?subject=Application for ${encodeURIComponent(selectedJob.title)}&body=Dear ASENT Hiring Team,%0D%0A%0D%0AI am writing to express my interest in the ${encodeURIComponent(selectedJob.title)} position.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]%0D%0A[Contact Number]`}
                className="btn btn--primary"
                style={{ textDecoration: 'none' }}
              >
                Send CV to careers@asent.com.pk <Arrow />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* GENERAL INQUIRY / RESUME SUBMISSION CTA */}
      <section className="cta-band">
        <div className="wrap">
          <div>
            <h2>Don't see a matching position?</h2>
            <p className="lede">
              We are constantly seeking outstanding civil engineers, project managers, HSE professionals, and MEP specialists. Send your CV to our talent database.
            </p>
          </div>
          <div>
            <a
              className="btn btn--light"
              href="mailto:careers@asent.com.pk?subject=General Career Application - ASENT&body=Dear ASENT Hiring Team,%0D%0A%0D%0APlease consider my resume for upcoming engineering and construction opportunities at ASENT.%0D%0A%0D%0AAttached is my resume for your review."
            >
              Email Your Resume <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export const Careers = Career;
export default Career;
