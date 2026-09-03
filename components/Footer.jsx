import { IMAGES } from '../images.js';
import { COMPANY } from '../data.js';

export function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src="./images/cropped-Logo-asent.png" alt="ASENT" />
          <p>Builders, contractors and interior decorators. Formerly Al-Shafi Enterprises, working since 1966.</p>
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
            <li><a href="/about" onClick={go('/about')}>About ASENT</a></li>
            <li><a href="/about" onClick={go('/about')}>Management</a></li>
            <li><a href="/hse-policy" onClick={go('/hse-policy')}>HSE Policy</a></li>
            <li><a href="/blog" onClick={go('/blog')}>Achievements</a></li>
          </ul>
        </div>
        <div>
          <h4>Work</h4>
          <ul>
            <li><a href="/services" onClick={go('/services')}>Services</a></li>
            <li><a href="/projects" onClick={go('/projects')}>All Projects</a></li>
            <li><a href="/careers" onClick={go('/careers')}>Careers</a></li>
            <li><a href="/events" onClick={go('/events')}>Events</a></li>
            <li><a href="/equipment" onClick={go('/equipment')}>Equipment</a></li>
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
      </div>
    </footer>
  );
}
