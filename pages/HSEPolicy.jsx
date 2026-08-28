import { useState, useEffect } from 'react';
import {
  Cards, CTA, Eyebrow, FeatureList, PageHead, Reveal, Section, SectionHead, Split,
} from '../ui.jsx';
import { HSE } from '../data.js';
import { IMAGES } from '../images.js';

const HSE_CERTIFICATES = [
  {
    id: 'cert-agakhan',
    title: 'Aga Khan Health Service, Pakistan',
    subtitle: 'Aga Khan Medical Centre Phase II, Gilgit',
    category: 'Substantial Completion Certificate',
    issuer: 'Aga Khan Health Service, Pakistan (AKHS’P)',
    media: 'cert-agakhan',
    image: IMAGES['cert-agakhan'] || './images/HSEcertificates/Agakhangilgit.png',
    description: 'Substantial completion and safety milestone certificate for the 110,000 sq ft regional medical facility in Gilgit.',
  },
  {
    id: 'cert-lnh',
    title: 'Liaquat National Hospital',
    subtitle: 'OPD Building, Central Stores & Infrastructure',
    category: 'Performance & Safety Certificate',
    issuer: 'Liaquat National Hospital & Medical College',
    media: 'cert-lnh',
    image: IMAGES['cert-lnh'] || './images/HSEcertificates/LNH.png',
    description: 'Performance certificate commending strict infection control, advanced finishing, and zero-incident site safety in an active medical complex.',
  },
  {
    id: 'cert-kpt',
    title: 'Karachi Shipyard & Engineering Works',
    subtitle: 'Multi-Storey G+07 Accommodation & Office Complex',
    category: 'Marine Civil Performance Certificate',
    issuer: 'Karachi Shipyard & Engineering Works Ltd. (KSEW)',
    media: 'cert-kpt',
    image: IMAGES['cert-kpt'] || './images/HSEcertificates/KPT.png',
    description: 'Certified execution of coastal seashore piling, geotechnical engineering, and high-rise structural/MEP works.',
  },
  {
    id: 'cert-ibasukkur',
    title: 'Sukkur IBA University',
    subtitle: 'Central Cafeteria & Model School Complex',
    category: 'Performance & Quality Certificate',
    issuer: 'Sukkur Institute of Business Administration',
    media: 'cert-ibasukkur',
    image: IMAGES['cert-ibasukkur'] || './images/HSEcertificates/IBASUKKUR.png',
    description: 'Performance certificate from the Project Director for large-scale institutional construction delivered to the highest standards.',
  },
  {
    id: 'cert-usaid',
    title: 'USAID / EA Consulting',
    subtitle: 'Faculty of Education Complexes (South Package)',
    category: 'International Standards Recognition',
    issuer: 'USAID / EA Consulting Pvt. Ltd.',
    media: 'cert-usaid',
    image: IMAGES['cert-usaid'] || './images/HSEcertificates/USAID.png',
    description: 'Appreciation and completion certificate for USAID-funded multi-site educational complexes across Pakistan.',
  },
];

const HSE_GOLDEN_RULES = [
  [
    '1. Working at Height',
    'Full-body safety harnesses anchored to certified lifelines are mandatory for any work above 1.8 meters. All scaffolding is inspected and tagged before shift commencement.',
  ],
  [
    '2. Excavation & Shoring',
    'Trenches deeper than 1.2 meters require certified shoring or step-sloping. Edge barriers and dedicated ladders ensure safe entry, egress, and collapse prevention.',
  ],
  [
    '3. Heavy Lifting & Plant',
    'All cranes, hoists, and rigging gear undergo certified third-party load testing. Lifting paths are strictly demarcated and clear of personnel.',
  ],
  [
    '4. Electrical & Energy Isolation',
    'Temporary site power uses industrial weather-proof distribution boards with ELCB/GFCI breakers. Lockout/Tagout (LOTO) protocols apply during all maintenance.',
  ],
  [
    '5. Hazardous Material Storage',
    'Chemicals, fuels, and compressed gases are stored in ventilated, secondary-containment zones with mandatory Material Safety Data Sheets (MSDS) displayed.',
  ],
  [
    '6. Emergency Preparedness',
    'Sites maintain marked evacuation routes, operational fire points, certified first-aiders, and regular mock drills with local emergency services.',
  ],
];

const HSE_STATS = [
  ['5M+', 'Safe Man-Hours', 'Delivered across high-rise, industrial, and infrastructure sites without Lost Time Injury.'],
  ['ISO 9001 / 14001 / 18001', 'Certified Systems', 'Quality, environmental, and occupational safety frameworks audited and applied on site.'],
  ['PEC Category C-A', 'No-Limit Registration', 'Pakistan Engineering Council certified to manage projects of unlimited financial scale safely.'],
  ['100%', 'Induction & PPE', 'Mandatory safety orientation and full protective gear before any worker steps onto the site.'],
];

export function HSEPolicy({ go }) {
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedCertIndex === null) return;
      if (e.key === 'Escape') setSelectedCertIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedCertIndex((prev) => (prev + 1) % HSE_CERTIFICATES.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedCertIndex((prev) => (prev - 1 + HSE_CERTIFICATES.length) % HSE_CERTIFICATES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCertIndex]);

  const activeCert = selectedCertIndex !== null ? HSE_CERTIFICATES[selectedCertIndex] : null;

  return (
    <>
      <PageHead
        go={go}
        crumb="HSE Policy"
        title="Health, Safety & Environment Policy"
        lede="A zero-incident philosophy backed by ISO-certified systems, full-time site supervision, rigorous audits, and an uncompromising commitment to protecting every life on our sites."
      />

      <Section grid>
        <Split media="sanofi" caption="Sanofi Aventis Pharma · Zero-compromise site safety standards">
          <Eyebrow>Commitment to Safety</Eyebrow>
          <h2>Zero Incidents is Not a Target — It is Our Standard</h2>
          <p>
            At ASENT, the health and safety of our workers, engineers, client personnel, and the
            surrounding community take precedence over all other considerations. We operate under the
            conviction that every workplace accident, injury, and environmental hazard is preventable
            through rigorous planning, continuous training, and disciplined site management.
          </p>
          <p>
            Every project operates under a customized Project Safety Plan (PSP) managed by a dedicated
            Site Safety Officer who reports directly to corporate leadership, ensuring safety compliance
            is never compromised for schedule or cost.
          </p>
          <FeatureList
            items={[
              '100% Mandatory safety induction before any worker enters site zones',
              'Daily morning Toolbox Talks (TBT) addressing site-specific hazard risks',
              'Comprehensive Hazard Identification and Risk Assessments (HIRA)',
              'Unannounced monthly corporate safety and environmental audits',
            ]}
          />
        </Split>
      </Section>

      {/* ==================== HSE CERTIFICATES SECTION ==================== */}
      <Section tone="paper2" id="certificates">
        <Reveal>
          <SectionHead
            eyebrow="Third-Party & Client Verification"
            title="HSE Certificates & Commendations"
            lede="Original performance certificates, safety appreciation credentials, and completion records issued by leading institutional clients and development authorities."
          />
        </Reveal>

        <Reveal delay="1">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '28px',
              padding: '12px 0 24px',
            }}
          >
            {HSE_CERTIFICATES.map((cert, index) => (
              <div
                key={cert.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCertIndex(index)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCertIndex(index)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(23, 25, 63, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.25s cubic-bezier(0.22, 0.61, 0.36, 1)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(23, 25, 63, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Certificate Frame Preview */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    backgroundColor: '#0f132a',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(23, 25, 63, 0.08)',
                  }}
                >
                  <img
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: '4px',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.35)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  {/* Hover Overlay Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(23, 25, 63, 0.45)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🔍</span> Click to View Full Size
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--rust)',
                      fontWeight: 600,
                      marginBottom: '8px',
                    }}
                  >
                    {cert.category}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.18rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      margin: '0 0 6px',
                      lineHeight: '1.3',
                      textTransform: 'none',
                    }}
                  >
                    {cert.title}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: 'var(--steel)',
                      marginBottom: '12px',
                    }}
                  >
                    {cert.subtitle}
                  </div>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#4a5568',
                      lineHeight: '1.55',
                      margin: '0 0 16px',
                      flexGrow: 1,
                    }}
                  >
                    {cert.description}
                  </p>
                  <div
                    style={{
                      borderTop: '1px solid rgba(23, 25, 63, 0.08)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--mono)',
                      color: 'var(--navy-2)',
                    }}
                  >
                    <span>Verified Document</span>
                    <span style={{ color: 'var(--rust)', fontWeight: 600 }}>Enlarge ↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ==================== LIGHTBOX MODAL ==================== */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          onClick={() => setSelectedCertIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(11, 13, 32, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '92vh',
              backgroundColor: '#17193F',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.7rem',
                    color: '#D4633F',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  {activeCert.category}
                </span>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff', textTransform: 'none' }}>
                  {activeCert.title} — <span style={{ fontWeight: 400, color: '#A0AEC0' }}>{activeCert.subtitle}</span>
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertIndex(null)}
                aria-label="Close modal"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}
              >
                ✕
              </button>
            </div>

            {/* Modal Image Area */}
            <div
              style={{
                padding: '24px',
                backgroundColor: '#0c0e1e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: 'calc(92vh - 140px)',
                overflowY: 'auto',
              }}
            >
              <img
                src={activeCert.image}
                alt={`${activeCert.title} Certificate`}
                style={{
                  maxHeight: '68vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>

            {/* Modal Footer Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                backgroundColor: '#121432',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.85rem',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedCertIndex((prev) => (prev - 1 + HSE_CERTIFICATES.length) % HSE_CERTIFICATES.length)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                }}
              >
                ← Previous
              </button>

              <span style={{ fontFamily: 'var(--mono)', color: '#A0AEC0', fontSize: '0.8rem' }}>
                {selectedCertIndex + 1} of {HSE_CERTIFICATES.length}
              </span>

              <button
                type="button"
                onClick={() => setSelectedCertIndex((prev) => (prev + 1) % HSE_CERTIFICATES.length)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <Section tone="paper2">
        <Reveal>
          <SectionHead
            eyebrow="Policy Framework"
            title="Health, Safety & Quality Pillars"
            lede="Our integrated HSE framework covers personal health, operational safety, environmental stewardship, and total quality management across all project stages."
          />
        </Reveal>
        <Reveal delay="1">
          <Cards items={HSE} />
        </Reveal>
      </Section>

      <Section tone="dark">
        <Reveal>
          <SectionHead
            eyebrow="Mandatory Standards"
            title="Six Golden Rules of Site Safety"
            lede="Non-negotiable protocols enforced on every ASENT construction and interior decoration site across Pakistan."
          />
        </Reveal>
        <Reveal delay="1">
          <div className="spec-list">
            {HSE_GOLDEN_RULES.map(([title, desc]) => (
              <div className="spec" key={title}>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            split
            eyebrow="Record & Governance"
            title="Safety Governance & Milestones"
            aside="Our safety department conducts daily hazard logs, weekly site walks with client representatives, and structured root-cause analysis for any near-miss."
          />
        </Reveal>
        <Reveal delay="1">
          <div className="cards">
            {HSE_STATS.map(([title, subtitle, desc]) => (
              <article className="card" key={title}>
                <span className="num-tag" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{subtitle}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTA
        go={go}
        href="/contact"
        label="Request HSE documentation"
        title="Prequalifying for a safety-critical project?"
        lede="We can provide our complete HSE Manual, Project Safety Plan templates, incident logs, and ISO audit certifications on request."
      />
    </>
  );
}

// Named alias
export { HSEPolicy as HsePolicy };

