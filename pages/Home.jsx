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
          <div className="hero-header-row">
            <div className="hero-title-col">
              <h1><span className="thin">A New Chapter</span><span className="legacy">BUILT ON LEGACY</span></h1>
            </div>
            <div className="hero-pillars">
              <span>Builders</span>
              <span>Contractors</span>
              <span>Interior Decorators</span>
              <span>Turnkey Solutions</span>
            </div>
          </div>
          <p className="lede">
            60 years of engineering excellence in Pakistan.
          </p>
          <p className="lede">
            From high-rise developments and healthcare facilities to hospitality, infrastructure,
            and complex turnkey projects, ASENT delivers integrated construction solutions through
            its own engineering expertise, equipment, and skilled workforce.
          </p>
          <div className="hero-bottom-row">
            <div className="hero-actions">
              <Btn variant="light" href="#/projects" onClick={go('/projects')}>Explore Our Projects <Arrow /></Btn>
              <Btn variant="outline-light" href="#/contact" onClick={go('/contact')}>Connect With Our Team</Btn>
            </div>
            <div className="hero-partner-logos">
              <img
                src={IMAGES['asconBD'] || './images/asconBD.png'}
                alt="Ascon Builders & Developers"
                className="hero-partner-logo"
                onError={(e) => {
                  if (!e.target.dataset.tried) {
                    e.target.dataset.tried = '1';
                    e.target.src = './images/AsconBD.png';
                  }
                }}
              />
              <img
                src={IMAGES['p2f'] || './images/p2f.png'}
                alt="Plinth 2 Finish"
                className="hero-partner-logo"
                onError={(e) => {
                  if (!e.target.dataset.tried) {
                    e.target.dataset.tried = '1';
                    e.target.src = './images/P2FLOGO.png';
                  }
                }}
              />
              <img
                src={IMAGES['ascon'] || './images/ascon.png'}
                alt="Ascon"
                className="hero-partner-logo"
                onError={(e) => {
                  if (!e.target.dataset.tried) {
                    e.target.dataset.tried = '1';
                    e.target.src = './images/Asconlogo.png';
                  }
                }}
              />
            </div>
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
            Established in 1966, ASENT is a Pakistani engineering and construction contractor built on over six decades of experience, trust, and project delivery. Registered with the Pakistan Engineering Council under Category C-A, we continue to undertake projects of every scale — contributing to the development of Pakistan's residential, commercial, institutional, and infrastructure landscape.
          </p>
          <p>
            Behind this legacy is a team of experienced engineers, technical specialists, supervisors, and skilled professionals committed to disciplined project execution. Our integrated expertise spans civil construction, MEP, HVAC, piling, finishing, and interior solutions — bringing multiple disciplines together under one organization to deliver reliable, end-to-end project solutions.
          </p>
          <p>
            Our in-house manufacturing capabilities for custom furniture, fixtures, and upholstery further strengthen our ability to deliver complete interior solutions while maintaining control over quality, coordination, and project timelines. Through every project, ASENT remains committed to engineering excellence, trusted partnerships, and creating structures that stand the test of time.
          </p>
          <p><Btn variant="ghost" href="#/about" onClick={go('/about')}>More about the company <Arrow /></Btn></p>
        </Split>
      </Section>

      <Section tone="paper2">
        <Reveal>
          <SectionHead
            split
            eyebrow="What we do"
            title="From Foundation to Finish"
            aside="ASENT provides individual services and complete turnkey solutions from a single point of contact."
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
            title="PROJECT PORTFOLIO"
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
          <p className="lede">ASENT commands full control over project lifecycles and delivery timelines through our fully integrated, in-house technical infrastructure.</p>
          <FeatureList items={CAPABILITY} numbered />
          <p style={{ marginTop: 26 }}>
            <Btn variant="outline-light" href="#/equipment" onClick={go('/equipment')}>Full equipment schedule <Arrow /></Btn>
          </p>
        </Split>
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
