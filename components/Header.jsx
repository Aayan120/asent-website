import { IMAGES } from '../images.js';
import { COMPANY } from '../data.js';

const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/equipment', 'Equipment'],
  ['/events', 'Events'],
  ['/careers', 'Careers'],
  ['/blog', 'Achievements'],
  ['/contact', 'Contact'],
];

export function Header({ path, go, stuck, menuOpen, setMenuOpen }) {
  return (
    <header className={`site-nav${stuck ? ' is-stuck' : ''}`}>
      <div className="wrap nav-inner">
        <a className="brand" href="#/" onClick={go('/')}>
          <img src="./images/cropped-Logo-asent.png" alt="ASENT" />
          <span className="brand-tag">
            Formerly<br />Al-Shafi Enterprises
          </span>
        </a>

        <nav>
          <ul className={`nav-links${menuOpen ? ' is-open' : ''}`}>
            {NAV.map(([to, label]) => {
              const isActive =
                path === to ||
                (to === '/projects' && path.startsWith('/projects')) ||
                (to === '/blog' && (path === '/achievements' || path.startsWith('/post/'))) ||
                (to === '/careers' && (path === '/career' || path === '/careers')) ||
                (to === '/events' && (path === '/event' || path === '/events'));
              return (
                <li key={to}>
                  <a
                    href={`#${to}`}
                    onClick={go(to)}
                    className={isActive ? 'is-active' : ''}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-cta">
          <a
            className="btn btn--light btn--sm"
            href="./ASENT Profile.pdf"
            download="ASENT-Company-Profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Company Profile
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
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
  );
}
