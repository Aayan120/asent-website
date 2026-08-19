import { CTA, DataTable, PageHead, Section } from '../ui.jsx';
import { EQUIPMENT } from '../data.js';

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
