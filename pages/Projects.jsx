import { useEffect, useMemo, useState } from 'react';
import { IMAGES } from '../images.js';
import {
  CTA, DataTable, PageHead, Reveal, Section, SectionHead,
} from '../ui.jsx';
import {
  CLIENTS, FILTERS, REGISTER_DONE, REGISTER_PROGRESS,
} from '../data.js';
import { projectStore } from '../projectStore.js';

export function Projects({ go, subPath }) {
  // Projects data from Firebase (or fallback)
  const [allProjects, setAllProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Primary status view tab: 'all' | 'ongoing' | 'completed'
  const [statusTab, setStatusTab] = useState(() => {
    if (subPath === 'ongoing') return 'ongoing';
    if (subPath === 'completed') return 'completed';
    return 'all';
  });

  // Category filter (residential, healthcare, etc.)
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  // Lightbox State
  const [activeProject, setActiveProject] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Load projects from Firebase
  useEffect(() => {
    let cancelled = false;
    setDataLoading(true);
    projectStore.all().then((data) => {
      if (!cancelled) {
        setAllProjects(data);
        setDataLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (subPath === 'ongoing') setStatusTab('ongoing');
    else if (subPath === 'completed') setStatusTab('completed');
    else setStatusTab('all');
  }, [subPath]);

  const handleStatusChange = (tab) => {
    setStatusTab(tab);
    if (tab === 'ongoing') go('/projects/ongoing')();
    else if (tab === 'completed') go('/projects/completed')();
    else go('/projects')();
  };

  const categoryOptions = useMemo(() => {
    return FILTERS.filter(([k]) => k !== 'progress' && k !== 'completed');
  }, []);

  const shownProjects = useMemo(() => {
    return allProjects.filter((p) => {
      // Primary status filter
      if (statusTab === 'ongoing' && !p.cats.includes('progress')) return false;
      if (statusTab === 'completed' && p.cats.includes('progress')) return false;

      // Category filter
      if (categoryFilter !== 'all' && !p.cats.includes(categoryFilter)) return false;

      return true;
    });
  }, [statusTab, categoryFilter, allProjects]);

  const matchQuery = (row) => !query || row.join(' ').toLowerCase().includes(query.toLowerCase());

  const openLightbox = (project) => {
    setActiveProject(project);
    setPhotoIndex(0);
  };

  const closeLightbox = () => {
    setActiveProject(null);
    setPhotoIndex(0);
  };

  return (
    <>
      <PageHead
        go={go} crumb="Projects" title="Building Since 1966"
        lede="Towers, hospitals, campuses, hotels, banks and infrastructure — built from Karachi and Gwadar to Sukkur, Muzaffargarh, Lahore and Gilgit-Baltistan.100+ projects completed and 15+ projects are on going."
      />

      <Section>
        {/* Main Status Tabs: All | On Going | Completed Projects */}
        <div className="project-status-tabs" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            type="button"
            className={`btn ${statusTab === 'all' ? 'btn--primary' : 'btn--outline'}`}
            style={{ borderRadius: '6px', padding: '10px 20px', fontWeight: 600 }}
            onClick={() => handleStatusChange('all')}
          >
            All Projects
          </button>
          <button
            type="button"
            className={`btn ${statusTab === 'ongoing' ? 'btn--primary' : 'btn--outline'}`}
            style={{ borderRadius: '6px', padding: '10px 20px', fontWeight: 600 }}
            onClick={() => handleStatusChange('ongoing')}
          >
            On Going Projects
          </button>
          <button
            type="button"
            className={`btn ${statusTab === 'completed' ? 'btn--primary' : 'btn--outline'}`}
            style={{ borderRadius: '6px', padding: '10px 20px', fontWeight: 600 }}
            onClick={() => handleStatusChange('completed')}
          >
            Completed Projects
          </button>
        </div>

        {/* Sub-Category Filters */}
        <div className="filters" style={{ marginBottom: '16px' }}>
          {categoryOptions.map(([k, label]) => (
            <button
              key={k} type="button"
              className={`filter${categoryFilter === k ? ' is-active' : ''}`}
              onClick={() => setCategoryFilter(k)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="post-meta" style={{ marginBottom: 24 }}>
          Showing {shownProjects.length} of {allProjects.length} projects · Click any project image to open the gallery slider.
        </p>

        <div className="project-grid">
          {shownProjects.length > 0 ? (
            shownProjects.map((p) => <ProjectCard key={p.title} p={p} onOpen={() => openLightbox(p)} />)
          ) : (
            <p className="muted" style={{ gridColumn: '1 / -1', padding: '32px 0' }}>
              No projects match the selected status and category criteria.
            </p>
          )}
        </div>
      </Section>

      <Section tone="paper2" id="register">
        <SectionHead
          split eyebrow="The register" title="Every contract on record"
          aside="Filterable record of works in progress and completed projects across Pakistan."
        />
        <div className="field" style={{ maxWidth: 420, marginTop: -20, marginBottom: 34 }}>
          <label htmlFor="reg-search">Search the register</label>
          <input
            id="reg-search" type="search" value={query}
            placeholder="Try “hospital”, “Allied Bank”, “Gilgit”"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {(statusTab === 'all' || statusTab === 'ongoing') && (
          <div style={{ marginBottom: statusTab === 'all' ? 52 : 24 }}>
            <h3 style={{ marginBottom: 16 }}>Works in progress</h3>
            <DataTable head={REGISTER_PROGRESS.head} rows={REGISTER_PROGRESS.rows.filter(matchQuery)} />
          </div>
        )}

        {(statusTab === 'all' || statusTab === 'completed') && (
          <div>
            <h3 style={{ marginBottom: 16 }}>Works completed</h3>
            <DataTable head={REGISTER_DONE.head} rows={REGISTER_DONE.rows.filter(matchQuery)} yearCol={2} />
          </div>
        )}

        <p className="form-note" style={{ marginTop: 14 }}>
          Work orders, appreciation letters and completion certificates for the projects above
          are available on request.
        </p>
      </Section>

      <Section id="clients">
        <Reveal>
          <SectionHead
            split eyebrow="Clients" title="Who we build for"
            aside="Developers, banks, hospitals, universities, foundations, diplomatic missions, industry and government."
          />
        </Reveal>
        <Reveal delay="1">
          <ul className="client-grid">
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </Reveal>
      </Section>

      <CTA
        go={go} href="/contact" label="Ask us"
        title="Want the details on a project?"
        lede="We can share drawings-level scope, programme performance and the client reference for any project listed here."
      />

      {/* Lightbox Slider Modal */}
      {activeProject && (
        <LightboxModal
          project={activeProject}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

function resolveImage(key, fallbackKey) {
  if (!key) return IMAGES[fallbackKey] || '';
  if (IMAGES[key]) return IMAGES[key];
  return key; // Direct path e.g. '/images/projects/mangrove-1.jpg'
}

function ProjectCard({ p, onOpen }) {
  const thumbSrc = resolveImage(p.img, 'mangrove');

  return (
    <article className="project">
      <div className="project-thumb" onClick={onOpen} title="Click to view image gallery slider">
        <img src={thumbSrc} alt={p.title} loading="lazy" />
        <div className="project-thumb-overlay">
          <span className="lightbox-btn-zoom">
            🔍 View Gallery
          </span>
        </div>
        <span className="project-status" data-s={p.live ? 'progress' : undefined}>{p.status}</span>
      </div>
      <div className="project-body">
        <h3 onClick={onOpen} style={{ cursor: 'pointer' }}>{p.title}</h3>
        <p className="project-meta">
          {p.meta.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
        </p>
        <p className="project-scope">{p.scope}</p>
      </div>
    </article>
  );
}

function LightboxModal({ project, photoIndex, setPhotoIndex, onClose }) {
  // Use the project's gallery array if available; otherwise fall back to repeating the thumbnail
  const gallery = project.gallery || [project.img, project.img, project.img, project.img];

  const total = gallery.length;
  const currentKey = gallery[photoIndex] || project.img;

  const nextPhoto = () => setPhotoIndex((prev) => (prev + 1) % total);
  const prevPhoto = () => setPhotoIndex((prev) => (prev - 1 + total) % total);

  // Lock scroll & handle keyboard navigation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-title">
          <h3>{project.title}</h3>
          <span className="lightbox-counter">
            Image {photoIndex + 1} of {total} · {project.status}
          </span>
        </div>
        <button type="button" className="lightbox-close-btn" onClick={onClose} aria-label="Close Lightbox">
          ✕
        </button>
      </div>

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-nav-btn" onClick={prevPhoto} aria-label="Previous Image">
          ‹
        </button>

        <div className="lightbox-media-wrapper">
          <img
            key={photoIndex}
            src={resolveImage(currentKey, project.img)}
            alt={`${project.title} photo ${photoIndex + 1}`}
            className="lightbox-img"
          />
          <div className="lightbox-details">
            <p className="project-meta">{project.meta.replace('\n', ' · ')}</p>
            <p className="project-scope">{project.scope}</p>
          </div>
        </div>

        <button type="button" className="lightbox-nav-btn" onClick={nextPhoto} aria-label="Next Image">
          ›
        </button>
      </div>

      <div className="lightbox-thumbnails" onClick={(e) => e.stopPropagation()}>
        {gallery.map((imgKey, idx) => (
          <div
            key={idx}
            className={`lightbox-thumb-item ${idx === photoIndex ? 'is-active' : ''}`}
            onClick={() => setPhotoIndex(idx)}
          >
            <img src={resolveImage(imgKey, project.img)} alt={`Thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
