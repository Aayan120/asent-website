import {
  Cards, CTA, Eyebrow, PageHead, Reveal, Section, SectionHead, Split,
} from '../ui.jsx';
import { HSE, LEADERS, ORG } from '../data.js';

export function About({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="About" title="Building Since 1966"
        lede="With over six decades of experience, ASENT is a premier engineering and contracting organization. Registered as PEC Category C-A, we have the resources to deliver infrastructure projects of any scale across Pakistan."
      />

      <Section grid>
        <Split media="sanofi" caption="Sanofi Aventis Pharma · Korangi, Karachi">
          <Eyebrow>Introduction</Eyebrow>
          <h2>BUILT ON LEGACY,<br />DRIVEN BY RELATIONSHIPS</h2>
          <br />
          <h2>ENGINEERED FOR THE FUTURE.</h2>
          <p>
            Founded in 1966 by Shafi Ahmed (Late), formerly Al-Shafi Enterprises —  ASENT has grown across three
            generations into an integrated engineering and construction company serving clients across Pakistan.
            The business was further expanded
            and strengthened by his sons, Jamil Shafi and Tahir Shafi, building on the foundation he established
          </p>
          <p>
            Our clients are at the heart of our business. Many relationships have continued for decades, built on
            trust, quality, competitive value, timely delivery, and a commitment to meeting each client's specific
            requirements.For us, a project is more than a contract — it is the beginning of a lasting relationship
          </p>
          <p>
            With experienced engineers, skilled teams, owned equipment, in-house capabilities, 100+ projects
            delivered, and over 20 million sq. ft. constructed, ASENT is equipped to undertake projects of
            significant scale.With six decades behind us, we are building towards an even bigger future in
            Pakistan and beyond.
          </p>
        </Split>
      </Section>

      <Section tone="paper2">
        <Reveal><SectionHead eyebrow="Position" title="Our capabilites" /></Reveal>
        <Reveal delay="1">
          <div className="spec-list">
            {[
              ['PEC CATEGORY C-A — NO FINANCIAL LIMIT', 'Registered with the Pakistan Engineering Council under Category C-A, enabling ASENT to undertake projects without a financial limit on contract value.'],
              ['CERTIFIED MANAGEMENT SYSTEMS', 'Our quality, environmental, and occupational health and safety systems are supported by internationally recognised ISO standards and implemented across our operations.'],
              ['IN-HOUSE EXPERTISE', 'Civil, MEP, HVAC, piling, finishing, and interior works are managed through our own teams, keeping coordination, quality, and accountability under one organisation'],
              ['IN-HOUSE MANUFACTURING', 'Our manufacturing capabilities cover custom furniture, fixtures, and upholstery, giving us greater control over quality, coordination, and interior project timelines.'],
              ['NATIONAL REACH', 'Our experience extends across major cities and regions throughout Pakistan, with projects delivered across diverse sectors and locations.'],
              ['OWNED PLANT & EQUIPMENT', 'Our fleet includes batching plants, concrete pumps, mixers, earthmoving equipment, surveying instruments, site laboratory facilities and many more , allowing us to support our projects with resources under our own control.'],
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
            split eyebrow="ONE TEAM" title="CLEAR RESPONSIBILITY. COMPLETE CONTROL"
            aside="Every ASENT project is supported by coordinated commercial, technical, procurement, and site teams, working together to deliver quality within the agreed programme. From planning to completion, clear leadership, quality assurance, and HSE oversight ensure every discipline remains aligned and accountable."
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
            eyebrow="HSE & quality assurance" title="BUILT RIGHT. BUILT RESPONSIBLY"
            lede="At ASENT, quality, safety, and environmental responsibility are part of how we deliver — not separate from it. Our systems are built into every stage of a project, from planning and procurement to execution and completion."
          />
        </Reveal>
        <Reveal delay="1"><Cards items={HSE} /></Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Ask for the documents"
        title="Ready to work with ASENT?"
        lede="We can furnish completion certificates, a detailed equipment schedule and client references on request."
      />
    </>
  );
}
