import {
  Cards, CTA, Eyebrow, FeatureList, PageHead, Reveal, Section, SectionHead, Split,
} from '../ui.jsx';
import { SERVICE_DETAIL, SERVICES_MORE } from '../data.js';

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
        <Reveal><SectionHead eyebrow="Turnkey Delivery" title={<>Systems, infrastructure<br />and turnkey delivery</>} /></Reveal>
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
