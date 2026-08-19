import {
  Cards, CTA, Eyebrow, PageHead, Reveal, Section, SectionHead, Split,
} from '../ui.jsx';
import { HSE, LEADERS, ORG } from '../data.js';

export function About({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="About" title="About ASENT"
        lede="One of the leading executors of civil construction works in Pakistan — registered with the Pakistan Engineering Council in Category C-A, which sets no financial limit on the work we may undertake."
      />

      <Section grid>
        <Split media="sanofi" caption="Sanofi Aventis Pharma · Korangi, Karachi">
          <Eyebrow>Introduction</Eyebrow>
          <h2>Fifty-Six years,<br />and still on site</h2>
          <p>
            ASENT — for most of its history Al-Shafi Enterprises — has been building in
            Pakistan since 1966. The company brings together qualified, experienced engineers
            and a team of skilled supervisory staff and workers, each with full command of
            their field.
          </p>
          <p>
            Once work is entrusted to us, we accomplish it within the agreed period and to the
            satisfaction of the client. That has produced a long list of completed and ongoing
            construction and interior decoration projects, and a file of work orders,
            appreciation letters and completion certificates issued by clients and consultants.
          </p>
          <p>
            We are proud of having worked on many prestigious projects, and of clients who are
            satisfied with our performance, our punctuality and our way of working.
          </p>
        </Split>
      </Section>

      <Section tone="paper2">
        <Reveal><SectionHead eyebrow="Position" title="What that licence covers" /></Reveal>
        <Reveal delay="1">
          <div className="spec-list">
            {[
              ['Category C-A, no limit', 'PEC registration CA-00175 places no ceiling on contract value, so tower, campus and infrastructure packages can be bid directly rather than through a joint venture.'],
              ['Certified systems', 'ISO 9001 for quality management, ISO 14001 for environment and ISO 18001 for occupational health and safety, applied on site rather than kept in a binder.'],
              ['All trades in house', 'Civil, MEP, HVAC, piling, finishing and interior decoration are carried by our own staff, which keeps interfaces and responsibility in one place.'],
              ['Our own manufacturing', 'Custom furniture, fixtures and upholstery are made by us for our interior contracts, so fit-out schedules are not hostage to a supplier queue.'],
              ['National reach', 'Projects delivered in Karachi, Gwadar, Quetta, Sukkur, Muzaffargarh, Multan, Bahawalpur, D.I. Khan, Uthal, Lahore, Rawalpindi, Islamabad and Gilgit-Baltistan.'],
              ['Plant on our books', 'Batching plants, pumps, mixers, earthmoving equipment, survey instruments and a site laboratory, available to our programme first.'],
            ].map(([h, p]) => (
              <div className="spec" key={h}><h4>{h}</h4><p>{p}</p></div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="dark" id="management">
        <Reveal><SectionHead eyebrow="Management" title="Our Leadership" /></Reveal>
        <Reveal delay="1">
          <div className="leaders">
            {LEADERS.map(([role, name, text, photo]) => (
              <div className="leader" key={name}>
                <img className="leader-photo" src={photo} alt={name} />
                <p className="role">{role}</p>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            split eyebrow="Organisation" title="How a project is staffed"
            aside="Two partners over five departments. Every site gets a project manager or site in charge, with HSE and quality assurance reporting alongside them, not underneath the programme."
          />
        </Reveal>
        <Reveal delay="1">
          <div className="org-chart">
            {ORG.map(([dept, roles]) => (
              <div className="org-col" key={dept}>
                <h4>{dept}</h4>
                <ul>{roles.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="paper2" id="hse">
        <Reveal>
          <SectionHead
            eyebrow="HSE & quality assurance" title="Control and policy"
            lede="Safety, health and environmental protection have always been of foremost importance in ASENT policy. Quality of work and HSE go hand in hand, and we do what is required to achieve both."
          />
        </Reveal>
        <Reveal delay="1"><Cards items={HSE} /></Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Ask for the documents"
        title="Prequalifying a contractor?"
        lede="We can furnish completion certificates, a detailed equipment schedule and client references on request."
      />
    </>
  );
}
