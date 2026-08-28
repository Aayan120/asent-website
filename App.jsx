import { useEffect, useState } from 'react';
import { CSS } from './theme.js';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { About, Achievements, Admin, Blog, Career, Careers, Contact, Equipment, Events, Event, Home, HSEPolicy, Post, Projects, Services } from './pages.jsx';

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
  else if (path.startsWith('/projects')) {
    const sub = path === '/projects/ongoing' ? 'ongoing' : path === '/projects/completed' ? 'completed' : 'all';
    page = <Projects go={go} subPath={sub} />;
  }
  else if (path === '/equipment') page = <Equipment go={go} />;
  else if (path === '/careers' || path === '/career') page = <Career go={go} />;
  else if (path === '/events' || path === '/event') page = <Events go={go} />;
  else if (path === '/hse' || path === '/hse-policy' || path === '/hsepolicy') page = <HSEPolicy go={go} />;
  else if (path === '/blog' || path === '/achievements') page = <Achievements go={go} />;
  else if (path === '/admin') page = <Admin go={go} />;
  else if (path === '/contact') page = <Contact go={go} />;
  else page = <Home go={go} />;

  return (
    <div className={isHome ? 'has-hero' : ''}>
      <style>{CSS}</style>

      <Header
        path={path}
        go={go}
        stuck={stuck}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>{page}</main>

      <Footer go={go} />
    </div>
  );
}
