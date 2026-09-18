import {
  Cards, CTA, Eyebrow, FeatureList, PageHead, Reveal, Section, SectionHead, Split,
} from '../ui.jsx';
import { SERVICE_DETAIL, SERVICES_MORE } from '../data.js';

export function Services({ go }) {
  return (
    <>
      <PageHead
        go={go} crumb="Services" title="FROM GROUNDWORK TO FINISHING"
        lede="ASENT brings engineering, expertise, equipment, and specialist capabilities together under one roof — delivering individual services or complete turnkey solutions with one point of responsibility."
      />

      {SERVICE_DETAIL.map((s, i) => (
        <Section key={s.title} tone={s.dark ? 'dark' : i % 2 ? 'paper2' : ''} grid={i === 0}>
          <Split media={s.img} caption={s.caption} flip={s.flip}>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2>{s.title}</h2>
            <p className="lede">{s.lede}</p>
            {s.body && <p>{s.body}</p>}
            <FeatureList items={s.points} />
          </Split>
        </Section>
      ))}

      <Section tone="paper2">
        <Reveal>
          <SectionHead
            eyebrow="Turnkey Delivery"
            title={<>Engineering, infrastructure<br />& turnkey delivery</>}
            lede="Integrated engineering and construction capabilities, delivered through one coordinated team and a single point of responsibility."
          />
        </Reveal>
        <Reveal delay="1"><Cards items={SERVICES_MORE} /></Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Request a proposal"
        title="Tell us the scope"
        lede="Send drawings, a bill of quantities or just a description of the site. We will tell you how we would build it."
      />
    </>
  );
}
