import { useEffect, useRef, useState } from 'react';
import { IMAGES } from '../images.js';
import { projectStore } from '../projectStore.js';
import {
  Arrow, Btn, Cards, CTA, Eyebrow, FeatureList, Reveal,
  Section, SectionHead, Split,
} from '../ui.jsx';
import {
  CAPABILITY, CLIENT_LOGOS, COMPANY, MARQUEE, PROJECTS, QUOTES, SERVICES, STATS,
} from '../data.js';

export function Home({ go }) {
  const videoRef = useRef(null);
  const [projectsList, setProjectsList] = useState(PROJECTS);

  useEffect(() => {
    projectStore.all().then((data) => {
      if (data && data.length > 0) setProjectsList(data);
    }).catch((e) => console.log('Home project load fallback:', e));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch((e) => console.log('Autoplay handled:', e));
      }
    }
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <video
            ref={videoRef}
            src="./videos/Homepage.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="./videos/Homepage.mp4" type="video/mp4" />
            <source src="Homepage.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-wedge" />
        <div className="wrap hero-inner">
          <Eyebrow>{COMPANY.former} · Karachi</Eyebrow>
          <h1><span className="thin">New Chapter</span>Old Legacy</h1>
          <p className="lede">
            Sixty-plus years of civil construction in Pakistan: high-rise towers, hospitals,
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

      <div className="clients-marquee-section">
        <div className="wrap clients-marquee-head">
          <h2 className="clients-marquee-title">Our Clients</h2>
        </div>
        <div className="marquee" aria-label="Our clients">
          <div className="marquee-track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((item, i) => (
              <span key={i} className="marquee-item">
                {item.file ? (
                  <img
                    src={`./logos/${item.file}`}
                    alt={item.name}
                    title={item.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                ) : null}
                <span style={{ display: item.file ? 'none' : 'inline' }}>{item.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <Section grid>
        <Split media="peace-apartments-site" caption="Peace Apartments · Naya Nazimabad, Karachi">
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
          {projectsList.slice(0, 6).map((p) => <ProjectCard key={p.id || p.title} p={p} />)}
        </div>
        <p style={{ marginTop: 34 }}>
          <Btn variant="ghost" href="#/projects" onClick={go('/projects')}>Every project, completed and ongoing <Arrow /></Btn>
        </p>
      </Section>

      <Section tone="dark">
        <Split media="one-hoshang" caption="One Hoshang · Architectural Model" flip>
          <Eyebrow>Capability</Eyebrow>
          <h2>Equipped to deliver</h2>
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
            title="Reviews"
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
        go={go}
        href="/ASENT Profile.pdf"
        download="ASENT-Company-Profile.pdf"
        label="Download Company Profile"
        title="Looking to prequalify ASENT for your project?"
        lede="Download our complete corporate profile, including PEC Category C-A registration, audited ISO certifications, owned plant schedule, and nationwide project portfolio."
      />
    </>
  );
}

export function ProjectCard({ p }) {
  const imgSrc = projectStore.resolveImage(p.img) || IMAGES[p.img];
  return (
    <article className="project">
      <div className="project-thumb">
        <img src={imgSrc} alt={p.title} loading="lazy" />
        <span className="project-status" data-s={p.live ? 'progress' : undefined}>{p.status}</span>
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p className="project-meta">
          {(p.meta || '').split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </p>
        <p className="project-scope">{p.scope}</p>
      </div>
    </article>
  );
}
