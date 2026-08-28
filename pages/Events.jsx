import { useState } from 'react';
import { Arrow, Btn, Eyebrow, PageHead, Reveal, Section, SectionHead } from '../ui.jsx';

/* =========================================================================
   EVENTS & EXHIBITIONS DATA
   Edit, add, or remove events easily by modifying the items below.
   ========================================================================= */
export const EVENTS_DATA = [
  {
    id: 'ev-1',
    title: 'Pakistan Construction & Infrastructure Expo 2026',
    category: 'EXHIBITION',
    status: 'Upcoming',
    date: '15 - 17 OCT 2026',
    time: '10:00 AM - 06:00 PM PKT',
    location: 'Expo Centre, Karachi — Hall 4, Stall A-12',
    overview: 'ASENT will showcase high-rise engineering breakthroughs, deep piling technologies, and smart structural execution at Pakistan\'s premier construction conference.',
    highlights: [
      'Interactive scale models of 30+ storey towers and healthcare campuses.',
      'Keynote session by ASENT Chief Structural Engineer on high-seismic foundation designs.',
      'One-on-one consultation with ASENT commercial and tendering directors.'
    ],
    contact: 'events@asent.com.pk'
  },
  {
    id: 'ev-2',
    title: 'Symposium: Sustainable High-Rise Engineering & Green Concrete',
    category: 'CONFERENCE',
    status: 'Upcoming',
    date: '28 NOV 2026',
    time: '02:00 PM - 05:30 PM PKT',
    location: 'Marriott Hotel, Karachi / Live Stream',
    overview: 'An executive engineering seminar bringing together PEC registered consultants, architects, and constructors to discuss carbon-reduction concrete mixes and energy-efficient building envelopes.',
    highlights: [
      'Panel discussion on low-carbon fly ash concrete in high-load foundations.',
      'Case study: Achieving LEED certification standards in Pakistan commercial towers.',
      'CPD credit certification for attending engineers.'
    ],
    contact: 'symposium@asent.com.pk'
  },
  {
    id: 'ev-3',
    title: 'Groundbreaking Ceremony: The Mangrove Coastal Development',
    category: 'CEREMONY',
    status: 'Past',
    date: '12 MAR 2026',
    time: '11:00 AM PKT',
    location: 'Korangi Creek, Karachi',
    overview: 'Commencement of piling, deep diaphragm walls, and ground improvement works across the 44-acre mixed-use coastal development for TPL Properties.',
    highlights: [
      'Official site mobilization of continuous flight auger (CFA) piling rigs.',
      'Dignitaries and senior engineers from developer and design consortiums present.',
      'Review of 24-month master infrastructure delivery roadmap.'
    ],
    contact: 'info@asent.com.pk'
  },
  {
    id: 'ev-4',
    title: 'ASENT Annual HSE & Zero-Incident Safety Summit',
    category: 'INTERNAL / HSE',
    status: 'Past',
    date: '18 JAN 2026',
    time: '09:00 AM - 04:00 PM PKT',
    location: 'ASENT Training Academy, Karachi Head Office',
    overview: 'Annual gathering recognizing site safety supervisors and engineering teams for achieving over 5 million safe man-hours without Lost Time Injury (LTI).',
    highlights: [
      'Safety Leadership Awards presented to site project managers.',
      'Refresher workshop on ISO 45001:2018 high-altitude safety standards.',
      'Launch of ASENT Digital Site Safety Inspection App.'
    ],
    contact: 'hse@asent.com.pk'
  },
  {
    id: 'ev-5',
    title: 'IBA Sukkur Campus Expansion Handover & Inauguration',
    category: 'INAUGURATION',
    status: 'Past',
    date: '04 NOV 2025',
    time: '10:30 AM PKT',
    location: 'Sukkur IBA University, Sindh',
    overview: 'Formal handover of academic blocks, auditorium, and modern faculty residential towers delivered turnkey under category C-A contract.',
    highlights: [
      'Tour of specialized acoustic auditoriums and smart classrooms.',
      'Commemoration plaque unveiled by university leadership and ASENT directors.',
      'Recognition of on-time delivery in regional extreme climate conditions.'
    ],
    contact: 'projects@asent.com.pk'
  }
];

/* =========================================================================
   EVENTS PAGE COMPONENT
   ========================================================================= */
export function Events({ go }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const tabs = ['All', 'Upcoming', 'Past'];
  const filteredEvents = activeTab === 'All' 
    ? EVENTS_DATA 
    : EVENTS_DATA.filter(ev => ev.status === activeTab);

  return (
    <>
      <PageHead
        go={go}
        crumb="Events"
        title="Events &amp; Industry Engagements"
        lede="Stay informed on ASENT groundbreaking ceremonies, international construction exhibitions, engineering symposiums, and corporate milestones."
      />

      <Section tone="paper2">
        <Reveal>
          <SectionHead
            split
            eyebrow="Corporate Calendar"
            title={<>Engaging the construction industry<br />and civil engineering community</>}
            aside="From international construction expos to academic symposiums, discover where ASENT is shaping the future of building."
          />
        </Reveal>
      </Section>

      <Section grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <Eyebrow>Browse Schedule</Eyebrow>
            <h2 style={{ margin: '6px 0 0' }}>All Engagements</h2>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`btn btn--sm ${activeTab === tab ? 'btn--dark' : 'btn--ghost'}`}
                style={{ borderRadius: 6, padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {tab} Events ({tab === 'All' ? EVENTS_DATA.length : EVENTS_DATA.filter(e => e.status === tab).length})
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
          {filteredEvents.map((ev) => {
            const isUpcoming = ev.status === 'Upcoming';
            return (
              <article
                key={ev.id}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: '30px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isUpcoming ? '0 8px 24px rgba(23,25,63,0.06)' : 'none'
                }}
              >
                {/* Top status & category tag */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--navy)',
                      background: 'rgba(23,25,63,0.06)',
                      padding: '4px 10px',
                      borderRadius: 4
                    }}>
                      {ev.category}
                    </span>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: isUpcoming ? '#1b7a43' : '#666',
                      background: isUpcoming ? 'rgba(39,174,96,0.12)' : 'rgba(0,0,0,0.05)',
                      padding: '4px 10px',
                      borderRadius: 4
                    }}>
                      {ev.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.28rem', margin: '0 0 14px', lineHeight: 1.35 }}>
                    {ev.title}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.86rem', color: 'var(--muted)', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600, color: 'var(--ink)' }}>📅 {ev.date}</span>
                      {ev.time && <span>· {ev.time}</span>}
                    </div>
                    <div>📍 {ev.location}</div>
                  </div>

                  <p style={{ fontSize: '0.92rem', color: '#444', lineHeight: 1.55, marginBottom: 20 }}>
                    {ev.overview}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(ev)}
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
                    View Highlights &amp; Schedule <Arrow />
                  </button>

                  <a
                    href={`mailto:${ev.contact}?subject=Inquiry regarding: ${encodeURIComponent(ev.title)}`}
                    className="btn btn--sm btn--outline"
                    style={{ textDecoration: 'none' }}
                  >
                    Inquire
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedEvent(null)}
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
              onClick={() => setSelectedEvent(null)}
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
              {selectedEvent.category} · {selectedEvent.status}
            </span>
            <h2 style={{ fontSize: '1.6rem', marginTop: 6, marginBottom: 12 }}>{selectedEvent.title}</h2>
            
            <div style={{ background: 'var(--paper2)', padding: '14px 18px', borderRadius: 6, marginBottom: 22, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div><strong>Date &amp; Time:</strong> {selectedEvent.date} {selectedEvent.time ? `(${selectedEvent.time})` : ''}</div>
              <div><strong>Location:</strong> {selectedEvent.location}</div>
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginBottom: 8 }}>
                About the Event
              </h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#333' }}>{selectedEvent.overview}</p>

              <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink)', marginTop: 22, marginBottom: 10 }}>
                Key Highlights &amp; Agenda
              </h4>
              <ul style={{ paddingLeft: 20, fontSize: '0.92rem', lineHeight: 1.6, color: '#444' }}>
                {selectedEvent.highlights.map((h, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>{h}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 32, borderTop: '1px solid var(--line)', paddingTop: 20, display: 'flex', gap: 14, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </button>
              <a
                href={`mailto:${selectedEvent.contact}?subject=Inquiry: ${encodeURIComponent(selectedEvent.title)}&body=Dear ASENT Events Team,%0D%0A%0D%0AI would like more information or to register for ${encodeURIComponent(selectedEvent.title)}.%0D%0A%0D%0ABest regards,%0D%0A[Name]%0D%0A[Organization]`}
                className="btn btn--primary"
                style={{ textDecoration: 'none' }}
              >
                Contact Events Team <Arrow />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HOST OR COLLABORATE CTA */}
      <section className="cta-band">
        <div className="wrap">
          <div>
            <h2>Partner or Invite ASENT to Your Event</h2>
            <p className="lede">
              Looking for expert speakers in high-rise civil construction, piling engineering, or large-scale project execution? Contact our communications office.
            </p>
          </div>
          <div>
            <Btn variant="light" href="#/contact" onClick={go('/contact')}>
              Get in Touch <Arrow />
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}

export const Event = Events;
export default Events;
