import { useEffect, useState } from 'react';
import { IMAGES } from './images.js';
import { CSS } from './theme.js';
import { COMPANY } from './data.js';
import { About, Contact, Equipment, Home, Projects, Services } from './pages.jsx';
import { Admin, Blog, Post } from './blog.jsx';

const NAV = [
  ['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/projects', 'Projects'],
  ['/equipment', 'Equipment'], ['/blog', 'Insights'], ['/contact', 'Contact'],
];

function currentPath() {
  const h = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  return h || '/';
}

export default function App() {
  const [path, setPath] = useState(currentPath());
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onHash = () => { setPath(currentPath()); setMenuOpen(false); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [path]);

  // Navigate without a full page load. Works with the address bar hash too.
  const go = (to) => (e) => {
    if (e) e.preventDefault();
    if (typeof window !== 'undefined') window.location.hash = to;
    setPath(to);
    setMenuOpen(false);
  };

  const isHome = path === '/';
  let page;
  if (path.startsWith('/post/')) page = <Post go={go} slug={decodeURIComponent(path.slice(6))} />;
  else if (path === '/about') page = <About go={go} />;
  else if (path === '/services') page = <Services go={go} />;
  else if (path === '/projects') page = <Projects go={go} />;
  else if (path === '/equipment') page = <Equipment go={go} />;
  else if (path === '/blog') page = <Blog go={go} />;
  else if (path === '/admin') page = <Admin go={go} />;
  else if (path === '/contact') page = <Contact go={go} />;
  else page = <Home go={go} />;

  return (
    <div className={isHome ? 'has-hero' : ''}>
      <style>{CSS}</style>

      <header className={`site-nav${stuck ? ' is-stuck' : ''}`}>
        <div className="wrap nav-inner">
          <a className="brand" href="#/" onClick={go('/')}>
            <img src={IMAGES.logoWhite} alt="ASENT" />
            <span className="brand-tag">{COMPANY.tagline.map((t) => <span key={t}>{t}<br /></span>)}</span>
          </a>

          <nav>
            <ul className={`nav-links${menuOpen ? ' is-open' : ''}`}>
              {NAV.map(([to, label]) => (
                <li key={to}>
                  <a
                    href={`#${to}`} onClick={go(to)}
                    className={path === to || (to === '/blog' && path.startsWith('/post/')) ? 'is-active' : ''}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <a className="btn btn--light btn--sm" href="#/contact" onClick={go('/contact')}>Request a proposal</a>
            <button
              className="nav-toggle" type="button" aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>{page}</main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src={IMAGES.logoWhite} alt="ASENT" />
            <p>Builders, contractors and interior decorators. Formerly Al-Shafi Enterprises, working in Pakistan since 1966.</p>
            <div className="badges">
              <span className="badge">PEC CA-00175 · C-A No Limit</span>
              <span className="badge">ISO 9001</span>
              <span className="badge">ISO 14001</span>
              <span className="badge">ISO 18001</span>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#/about" onClick={go('/about')}>About ASENT</a></li>
              <li><a href="#/about" onClick={go('/about')}>Management</a></li>
              <li><a href="#/about" onClick={go('/about')}>HSE &amp; quality</a></li>
              <li><a href="#/blog" onClick={go('/blog')}>Insights</a></li>
            </ul>
          </div>
          <div>
            <h4>Work</h4>
            <ul>
              <li><a href="#/services" onClick={go('/services')}>Services</a></li>
              <li><a href="#/projects" onClick={go('/projects')}>Projects</a></li>
              <li><a href="#/projects" onClick={go('/projects')}>Clients</a></li>
              <li><a href="#/equipment" onClick={go('/equipment')}>Equipment</a></li>
            </ul>
          </div>
          <div>
            <h4>Head office</h4>
            <ul>
              <li>Building No. 7-C, Old Sunset Boulevard,<br />Phase II, DHA, Karachi</li>
              <li><a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><a href="#/contact" onClick={go('/contact')}>All three offices</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} ASENT · All rights reserved</span>
          <span>
            <a href="#/admin" onClick={go('/admin')}>Admin panel</a> ·{' '}
            <a href="#/contact" onClick={go('/contact')}>Request a proposal</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
