import { useMemo, useState } from 'react';
import { IMAGES } from './images.js';
import {
  Arrow, Btn, Cards, CTA, DataTable, Eyebrow, FeatureList, PageHead, Reveal,
  Section, SectionHead, Split,
} from './ui.jsx';
import {
  CAPABILITY, CLIENTS, COMPANY, EQUIPMENT, FILTERS, HSE, LEADERS, MARQUEE, OFFICES,
  ORG, PROCESS, PROJECTS, QUOTES, REGISTER_DONE, REGISTER_PROGRESS,
  SERVICE_DETAIL, SERVICES, SERVICES_MORE, STATS, TENDER_DOCS,
} from './data.js';

/* ============================ HOME ============================ */
export function Home({ go }) {
  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img src={IMAGES['hero-mangrove-aerial']} alt="Aerial view of The Mangrove development, Karachi" />
        </div>
        <div className="hero-wedge" />
        <div className="wrap hero-inner">
          <Eyebrow>{COMPANY.former} · Karachi</Eyebrow>
          <h1><span className="thin">We build</span>the future</h1>
          <p className="lede">
            Fifty-one years of civil construction in Pakistan: high-rise towers, hospitals,
            campuses, five-star hotels, infrastructure and the interiors inside them —
            delivered under one contract by our own engineers, plant and crews.
          </p>
          <div className="hero-actions">
            <Btn variant="light" href="#/projects" onClick={go('/projects')}>See the projects <Arrow /></Btn>
            <Btn variant="outline-light" href="#/contact" onClick={go('/contact')}>Talk to our team</Btn>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          {STATS.map(([num, lbl]) => {
            const m = num.match(/^([\d.]+)(.*)$/);
            return (
              <div className="stat" key={lbl}>
                <span className="num">{m ? <>{m[1]}<em>{m[2]}</em></> : num}</span>
                <span className="lbl">{lbl}</span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="marquee" aria-label="Selected clients">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <Section grid>
        <Split media="mangrove-interior" caption="Residential interior · The Mangrove, Karachi">
          <Eyebrow>Who we are</Eyebrow>
          <h2>A contractor built around its engineers</h2>
          <p className="lede">
            ASENT is one of the leading executors of civil construction works in Pakistan,
            registered with the Pakistan Engineering Council in Category C-A, which carries
            no financial limit on the work we may undertake.
          </p>
          <p>
            Behind that licence is a group of qualified, experienced engineers supported by
            skilled supervisory staff and crews who know their trade. We take on demanding
            jobs because we keep the disciplines that decide them — civil, MEP, HVAC, piling,
            finishing and interior decoration — inside the same company.
          </p>
          <p>
            We are also the manufacturer of the custom furniture, fixtures and upholstery
            that complete our interior work, so a fit-out does not stall waiting on a supplier.
          </p>
          <p><Btn variant="ghost" href="#/about" onClick={go('/about')}>More about the company <Arrow /></Btn></p>
        </Split>
      </Section>

      <Section tone="paper2">
        <Reveal>
          <SectionHead
            split
            eyebrow="What we do"
            title={<>From piling rig to<br />the last light fitting</>}
            aside="Nine service lines that can be taken separately or bundled into a single turnkey contract."
          />
        </Reveal>
        <Reveal delay="1"><Cards items={SERVICES} /></Reveal>
        <p style={{ marginTop: 34 }}>
          <Btn variant="ghost" href="#/services" onClick={go('/services')}>All services in detail <Arrow /></Btn>
        </p>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            split
            eyebrow="Selected work"
            title="Projects on the ground"
            aside="A sample from a portfolio that runs from Karachi and Gwadar to Sukkur, Multan, Lahore and Gilgit-Baltistan."
          />
        </Reveal>
        <div className="project-grid">
          {PROJECTS.slice(0, 6).map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
        <p style={{ marginTop: 34 }}>
          <Btn variant="ghost" href="#/projects" onClick={go('/projects')}>Every project, completed and ongoing <Arrow /></Btn>
        </p>
      </Section>

      <Section tone="dark">
        <Split media="menzies-ras" caption="Menzies RAS · Terminal 3, Karachi Airport" flip>
          <Eyebrow>Capability</Eyebrow>
          <h2>We own the plant we schedule</h2>
          <p className="lede">Programmes slip when a contractor is queuing for someone else&rsquo;s equipment. Ours is on our books.</p>
          <FeatureList items={CAPABILITY} numbered />
          <p style={{ marginTop: 26 }}>
            <Btn variant="outline-light" href="#/equipment" onClick={go('/equipment')}>Full equipment schedule <Arrow /></Btn>
          </p>
        </Split>
      </Section>

      <Section tone="ink">
        <Reveal>
          <SectionHead
            eyebrow="Appreciations"
            title="What clients have put in writing"
            aside=""
          />
          <p className="muted" style={{ marginTop: -28, marginBottom: 34 }}>
            Summarised from completion and appreciation certificates held on file. Originals available on request.
          </p>
        </Reveal>
        <Reveal delay="1">
          <div className="quote-grid">
            {QUOTES.map(([text, who]) => (
              <div className="quote" key={who}>
                <p>{text}</p>
                <cite>{who}</cite>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Request a proposal"
        title="Have drawings on the table?"
        lede="Send us the scope and the site. We will come back with a method, a programme and a price."
      />
    </>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="project">
      <div className="project-thumb">
        <img src={IMAGES[p.img]} alt={p.title} loading="lazy" />
        <span className="project-status" data-s={p.live ? 'progress' : undefined}>{p.status}</span>
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p className="project-meta">
          {p.meta.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </p>
        <p className="project-scope">{p.scope}</p>
      </div>
    </article>
  );
}

/* ============================ ABOUT ============================ */
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
          <h2>Fifty-one years,<br />and still on site</h2>
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
        <Reveal><SectionHead eyebrow="Management" title="The people who sign for the work" /></Reveal>
        <Reveal delay="1">
          <div className="leaders">
            {LEADERS.map(([role, name, text]) => (
              <div className="leader" key={name}>
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

/* ============================ SERVICES ============================ */
export function Services({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="Services" title="Valuable services"
        lede="Nine service lines, taken package by package or bundled into one turnkey contract. The same engineers, plant and quality system apply to all of them."
      />

      {SERVICE_DETAIL.map((s, i) => (
        <Section key={s.title} tone={s.dark ? 'dark' : i % 2 ? 'paper2' : ''} grid={i === 0}>
          <Split media={s.img} caption={s.caption} flip={s.flip}>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2>{s.title}</h2>
            <p className="lede">{s.lede}</p>
            <p>{s.body}</p>
            <FeatureList items={s.points} />
          </Split>
        </Section>
      ))}

      <Section tone="paper2">
        <Reveal><SectionHead eyebrow="05 – 09" title={<>Systems, infrastructure<br />and turnkey delivery</>} /></Reveal>
        <Reveal delay="1"><Cards items={SERVICES_MORE} /></Reveal>
      </Section>

      <Section>
        <Reveal>
          <SectionHead
            split eyebrow="How a contract runs" title="Five stages, in order"
            aside="Each stage produces the document the next one depends on."
          />
        </Reveal>
        <Reveal delay="1"><FeatureList items={PROCESS.map(([a, b]) => [`${a}.`, b])} numbered /></Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Request a proposal"
        title="Tell us the scope"
        lede="Send drawings, a bill of quantities or just a description of the site. We will tell you how we would build it."
      />
    </>
  );
}

/* ============================ PROJECTS ============================ */
export function Projects({ go }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const shown = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(filter))),
    [filter]
  );

  const match = (row) => !query || row.join(' ').toLowerCase().includes(query.toLowerCase());

  return (
    <>
      <PageHead
        go={go} crumb="Projects" title="Projects"
        lede="Towers, hospitals, campuses, hotels, banks and infrastructure — built from Karachi and Gwadar to Sukkur, Muzaffargarh, Lahore and Gilgit-Baltistan."
      />

      <Section>
        <div className="filters">
          {FILTERS.map(([k, label]) => (
            <button
              key={k} type="button"
              className={`filter${filter === k ? ' is-active' : ''}`}
              onClick={() => setFilter(k)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="post-meta" style={{ marginBottom: 24 }}>
          Showing {shown.length} of {PROJECTS.length} projects
        </p>
        <div className="project-grid">
          {shown.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
      </Section>

      <Section tone="paper2" id="register">
        <SectionHead
          split eyebrow="The register" title="Every contract on record"
          aside=""
        />
        <div className="field" style={{ maxWidth: 420, marginTop: -20, marginBottom: 34 }}>
          <label htmlFor="reg-search">Search the register</label>
          <input
            id="reg-search" type="search" value={query}
            placeholder="Try “hospital”, “Allied Bank”, “Gilgit”"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <h3 style={{ marginBottom: 16 }}>Works in progress</h3>
        <div style={{ marginBottom: 52 }}>
          <DataTable head={REGISTER_PROGRESS.head} rows={REGISTER_PROGRESS.rows.filter(match)} />
        </div>

        <h3 style={{ marginBottom: 16 }}>Works completed</h3>
        <DataTable head={REGISTER_DONE.head} rows={REGISTER_DONE.rows.filter(match)} yearCol={2} />
        <p className="form-note" style={{ marginTop: 14 }}>
          Work orders, appreciation letters and completion certificates for the projects above
          are available on request.
        </p>
      </Section>

      <Section id="clients">
        <Reveal>
          <SectionHead
            split eyebrow="Clients" title="Who we build for"
            aside="Developers, banks, hospitals, universities, foundations, diplomatic missions, industry and government."
          />
        </Reveal>
        <Reveal delay="1">
          <ul className="client-grid">
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Ask us"
        title="Want the details on a project?"
        lede="We can share drawings-level scope, programme performance and the client reference for any project listed here."
      />
    </>
  );
}

/* ============================ EQUIPMENT ============================ */
export function Equipment({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="Equipment" title="Plant & equipment"
        lede="Owned, maintained and allocated to our own programme. A comprehensive maintenance schedule keeps this fleet at optimum capacity and avoids surprise failure mid-pour."
      />

      <Section>
        {EQUIPMENT.map(([title, head, rows]) => (
          <div key={title} style={{ marginBottom: 48 }}>
            <h2 style={{ marginBottom: 18 }}>{title}</h2>
            <DataTable head={head} rows={rows} />
          </div>
        ))}
        <p className="form-note">
          A detailed equipment list, with serial numbers and current deployment, can be
          furnished on request.
        </p>
      </Section>

      <CTA
        go={go} href="/contact" label="Request the schedule"
        title="Need capacity confirmed for a tender?"
        lede="We can issue a signed equipment schedule and plant availability statement for your prequalification file."
      />
    </>
  );
}

/* ============================ CONTACT ============================ */
export function Contact({ go }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); };

  return (
    <>
      <PageHead
        go={go} crumb="Contact" title="Contact us"
        lede="Three offices, one team. Tell us about the site and the scope, and the right engineer will come back to you."
      />

      <Section>
        <div className="contact-grid">
          <div>
            <Eyebrow>Send an enquiry</Eyebrow>
            <h2>Start a conversation</h2>
            <p className="muted" style={{ marginBottom: 26 }}>
              The more you can tell us about scope, location and programme, the more useful our
              first reply will be.
            </p>

            <form onSubmit={submit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-org">Company or organisation</label>
                  <input id="c-org" name="company" type="text" autoComplete="organization" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone</label>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-type">What do you need</label>
                  <select id="c-type" name="type">
                    {['New construction', 'Interior decoration or fit-out', 'Renovation or refurbishment',
                      'MEP, HVAC or medical gas', 'Infrastructure works', 'Turnkey EPC contract',
                      'Prequalification documents', 'Something else'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-loc">Project location</label>
                  <input id="c-loc" name="location" type="text" placeholder="City or site" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-msg">Scope and programme</label>
                <textarea
                  id="c-msg" name="message"
                  placeholder="Building type, approximate area or floors, target start and completion dates, and anything unusual about the site."
                />
              </div>
              <Btn type="submit">Send enquiry <Arrow /></Btn>
              <p className="form-note" style={{ marginTop: 14 }}>
                We reply to enquiries within two working days. For tenders with a closing date,
                call the head office directly.
              </p>
              {sent && (
                <div className="notice notice--ok" style={{ marginTop: 18 }}>
                  Thanks — your enquiry is ready to send. Connect this form to your mail service
                  or CRM to deliver it. In the meantime, email{' '}
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or call {COMPANY.phone}.
                </div>
              )}
            </form>
          </div>

          <div>
            <Eyebrow>Our offices</Eyebrow>
            {OFFICES.map(([name, addr, phone, href]) => (
              <div className="office" key={name}>
                <h4>{name}</h4>
                <p>{addr.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</p>
                {phone && <p style={{ marginTop: 8 }}><a href={`tel:${href}`}>{phone}</a></p>}
              </div>
            ))}
            <div className="office">
              <h4>General</h4>
              <p><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />{COMPANY.site}</p>
            </div>
            <div className="office">
              <h4>Registrations</h4>
              <p>Pakistan Engineering Council — CA-00175, Category C-A (No Limit)<br />{COMPANY.iso}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <SectionHead eyebrow="For tender teams" title="What we can send you" />
        <FeatureList items={TENDER_DOCS} numbered />
      </Section>
    </>
  );
}
