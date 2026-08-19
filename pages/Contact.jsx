import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Arrow, Btn, Eyebrow, FeatureList, PageHead, Section, SectionHead,
} from '../ui.jsx';
import { COMPANY, OFFICES, TENDER_DOCS } from '../data.js';

// ──────────────────────────────────────────────
// EmailJS configuration
// Sign up free at https://www.emailjs.com then:
//   1. Add a Gmail service  → paste the Service ID below
//   2. Create an email template → paste the Template ID below
//   3. Copy your Public Key from Account → General
// ──────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';   // e.g. 'AbCdEfGhIjKlMn'
const RECIPIENT_EMAIL = 'AlShafiENTerprises@gmail.com';

export function Contact({ go }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('sent');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

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

            <form ref={formRef} onSubmit={submit}>
              {/* Hidden field so the EmailJS template can use {{to_email}} */}
              <input type="hidden" name="to_email" value={RECIPIENT_EMAIL} />

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
              <Btn type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'} <Arrow />
              </Btn>
              <p className="form-note" style={{ marginTop: 14 }}>
                We reply to enquiries within two working days. For tenders with a closing date,
                call the head office directly.
              </p>

              {status === 'sent' && (
                <div className="notice notice--ok" style={{ marginTop: 18 }}>
                  ✅ Thank you — your enquiry has been sent to our team. We will get back to you
                  within two working days.
                </div>
              )}
              {status === 'error' && (
                <div className="notice notice--err" style={{ marginTop: 18 }}>
                  ⚠️ Something went wrong. Please email us directly at{' '}
                  <a href={`mailto:${RECIPIENT_EMAIL}`}>{RECIPIENT_EMAIL}</a> or call {COMPANY.phone}.
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
