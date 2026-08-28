import { useEffect, useRef, useState } from 'react';
import { IMAGES } from './images.js';

/* ---------------------------------------------------------------
   Small shared pieces used across every page.
   --------------------------------------------------------------- */

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

export function Section({ tone = '', grid = false, id, children }) {
  const cls = ['section', tone && `section--${tone}`, grid && 'grid-bg'].filter(Boolean).join(' ');
  return (
    <section className={cls} id={id}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, aside, lede, split }) {
  return (
    <div className={`section-head${split ? ' section-head--split' : ''}`}>
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </div>
      {aside && <p className="muted">{aside}</p>}
    </div>
  );
}

export function PageHead({ crumb, title, lede, go }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <p className="crumbs">
          <a href="#/" onClick={go('/')}>Home</a> / {crumb}
        </p>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  );
}

/* Reveal on scroll — content is visible by default and only animates
   once the observer confirms it can run, so nothing can stay hidden. */
export function Reveal({ delay, className = '', children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    io.observe(el);
    const t = setTimeout(() => setSeen(true), 2000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return (
    <div ref={ref} className={`reveal${seen ? ' is-in' : ''} ${className}`} data-d={delay}>
      {children}
    </div>
  );
}

export function Btn({ href, onClick, variant = '', children, type, small, ...rest }) {
  const cls = ['btn', variant && `btn--${variant}`, small && 'btn--sm'].filter(Boolean).join(' ');
  if (type) return <button className={cls} type={type} onClick={onClick} {...rest}>{children}</button>;
  return <a className={cls} href={href} onClick={onClick} {...rest}>{children}</a>;
}

export function Arrow() { return <span className="arrow">→</span>; }

export function Split({ media, caption, flip, children }) {
  const pic = (
    <div className="split-media">
      <img src={IMAGES[media]} alt={caption || ''} loading="lazy" />
      {caption && <span className="caption">{caption}</span>}
    </div>
  );
  return (
    <div className={`split${flip ? ' split--media-first' : ''}`}>
      {flip && <Reveal>{pic}</Reveal>}
      <Reveal delay={flip ? '1' : undefined}>{children}</Reveal>
      {!flip && <Reveal delay="1">{pic}</Reveal>}
    </div>
  );
}

export function Cards({ items }) {
  return (
    <div className="cards">
      {items.map(([tag, title, text]) => (
        <article className="card" key={title}>
          <span className="num-tag">{tag}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function FeatureList({ items, numbered }) {
  return (
    <ul className="feature-list">
      {items.map((it, i) => {
        const [a, b] = Array.isArray(it) ? it : [null, it];
        return (
          <li key={i}>
            <span className="idx">{numbered ? String(i + 1).padStart(2, '0') : '·'}</span>
            <span>{a ? <><strong>{a}</strong> {b}</> : b}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function DataTable({ head, rows, yearCol }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={j === yearCol ? 'yr' : undefined}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CTA({ title, lede, label, href, go, download, target }) {
  const isFileOrExternal = download || (href && (href.endsWith('.pdf') || href.startsWith('http')));
  const linkHref = isFileOrExternal ? href : `#${href}`;
  const handleClick = (!isFileOrExternal && go) ? go(href) : undefined;

  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          <p className="lede">{lede}</p>
        </div>
        <div>
          <Btn
            variant="light"
            href={linkHref}
            onClick={handleClick}
            download={download}
            target={target || (isFileOrExternal ? '_blank' : undefined)}
            rel={isFileOrExternal ? 'noopener noreferrer' : undefined}
          >
            {label} <Arrow />
          </Btn>
        </div>
      </div>
    </section>
  );
}
