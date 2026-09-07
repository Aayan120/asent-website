import { useEffect, useState, useCallback, useRef } from 'react';
import { projectStore } from '../projectStore.js';
import { careerStore } from '../careerStore.js';
import { eventStore } from '../eventStore.js';
import { IMAGES } from '../images.js';
import { CONFIG } from '../store.js';
import { FILTERS } from '../data.js';

/* ================================================================
   ASENT ADMIN CONSOLE — Multi-Entity Management Panel
   Supported Entities:
     - 🏗️ Projects (CRUD)
     - 💼 Careers & Vacancies (CRUD)
     - 📅 Events & Engagements (CRUD)
   ================================================================ */

/* ---------- Password Gate ---------- */
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (pw === CONFIG.adminPass) {
      sessionStorage.setItem('admin_auth', '1');
      onAuth();
    } else {
      setError('Incorrect password');
      setPw('');
    }
  };

  return (
    <div className="admin-gate">
      <div className="admin-gate-card">
        <div className="admin-gate-icon">🔐</div>
        <h2>Admin Access</h2>
        <p className="muted">Enter the admin password to manage ASENT website content.</p>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="admin-pw">Password</label>
            <input
              id="admin-pw" type="password" value={pw}
              onChange={(e) => { setPw(e.target.value); setError(''); }}
              placeholder="Enter password"
              autoFocus
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- Confirm Dialog ---------- */
function ConfirmDialog({ title, message, onConfirm, onCancel, danger }) {
  return (
    <div className="admin-overlay" onClick={onCancel}>
      <div className="admin-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="admin-dialog-actions">
          <button className="btn btn--outline btn--sm" onClick={onCancel}>Cancel</button>
          <button
            className={`btn btn--sm ${danger ? 'btn--danger' : 'btn--primary'}`}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Toast Notification ---------- */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`admin-toast admin-toast--${type || 'success'}`}>
      <span>{type === 'error' ? '✕' : '✓'}</span>
      {message}
    </div>
  );
}

/* ---------- Dynamic String List Editor (Responsibilities / Requirements / Highlights) ---------- */
function DynamicListEditor({ label, items = [], onChange, placeholder = 'Add an item…', hint }) {
  const [val, setVal] = useState('');

  const add = () => {
    const v = val.trim();
    if (v) {
      onChange([...items, v]);
      setVal('');
    }
  };

  const remove = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const moveDown = (idx) => {
    if (idx >= items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  return (
    <div className="admin-features" style={{ marginBottom: 20 }}>
      <label>{label} ({items.length})</label>
      {hint && <span className="form-hint" style={{ marginTop: -4, marginBottom: 8 }}>{hint}</span>}
      
      {items.length > 0 && (
        <ul className="admin-features-list" style={{ marginBottom: 12 }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--steel)', fontWeight: 700, minWidth: 20 }}>
                {i + 1}.
              </span>
              <span style={{ flex: 1, fontSize: '0.9rem', lineHeight: 1.4 }}>{item}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  title="Move up"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  style={{ opacity: i === 0 ? 0.3 : 0.8, cursor: i === 0 ? 'default' : 'pointer' }}
                >
                  ▲
                </button>
                <button
                  type="button"
                  title="Move down"
                  onClick={() => moveDown(i)}
                  disabled={i >= items.length - 1}
                  style={{ opacity: i >= items.length - 1 ? 0.3 : 0.8, cursor: i >= items.length - 1 ? 'default' : 'pointer' }}
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  title="Remove item"
                  style={{ color: '#dc2626', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="admin-features-add" style={{ display: 'flex', gap: 8 }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn btn--outline btn--sm" onClick={add}>
          + Add
        </button>
      </div>
    </div>
  );
}

/* ---------- Image Picker ---------- */
function ImagePicker({ value, onChange, label }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const resolved = projectStore.resolveImage(value);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await projectStore.uploadImage(file);
      if (url) onChange(url);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const imageKeys = projectStore.getImageKeys();

  return (
    <div className="admin-img-picker">
      <label>{label || 'Image'}</label>
      <div className="admin-img-picker-preview">
        {resolved ? (
          <img src={resolved} alt="Preview" />
        ) : (
          <div className="admin-img-placeholder">No image</div>
        )}
      </div>
      <div className="admin-img-picker-controls">
        <select value={IMAGES[value] ? value : '__custom'} onChange={(e) => {
          if (e.target.value !== '__custom') onChange(e.target.value);
        }}>
          <option value="__custom">— Select existing —</option>
          {imageKeys.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <span className="admin-or">or</span>
        <button
          type="button" className="btn btn--outline btn--sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Processing…' : 'Upload New'}
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} hidden />
      </div>
    </div>
  );
}

/* ---------- Gallery Manager ---------- */
function GalleryManager({ gallery = [], onChange, defaultImg }) {
  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [replaceIdx, setReplaceIdx] = useState(null);
  const [uploading, setUploading] = useState(false);
  const imageKeys = projectStore.getImageKeys();

  const initFromThumbnail = () => {
    if (!defaultImg) return;
    onChange([defaultImg, defaultImg, defaultImg, defaultImg]);
  };

  const handleAddFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const newUrls = await Promise.all(
        files.map((file) => projectStore.uploadImage(file))
      );
      onChange([...gallery, ...newUrls.filter(Boolean)]);
    } catch (err) {
      console.error('Gallery add error:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerReplace = (idx) => {
    setReplaceIdx(idx);
    replaceInputRef.current?.click();
  };

  const handleReplaceFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || replaceIdx === null) return;
    setUploading(true);
    try {
      const url = await projectStore.uploadImage(file);
      if (url) {
        const next = [...gallery];
        next[replaceIdx] = url;
        onChange(next);
      }
    } catch (err) {
      console.error('Gallery replace error:', err);
    } finally {
      setUploading(false);
      setReplaceIdx(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleSelectAssetReplace = (idx, assetKey) => {
    if (!assetKey) return;
    const next = [...gallery];
    next[idx] = assetKey;
    onChange(next);
  };

  const removeImage = (idx) => {
    onChange(gallery.filter((_, i) => i !== idx));
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const arr = [...gallery];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    onChange(arr);
  };

  const moveDown = (idx) => {
    if (idx >= gallery.length - 1) return;
    const arr = [...gallery];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    onChange(arr);
  };

  return (
    <div className="admin-gallery-mgr">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
            Gallery Slider Images ({gallery.length})
          </label>
          <span className="form-hint" style={{ marginTop: 2 }}>
            These photos show when visitors open the project's gallery slider.
          </span>
        </div>
        {gallery.length === 0 && defaultImg && (
          <button type="button" className="btn btn--outline btn--sm" onClick={initFromThumbnail}>
            + Fill from Thumbnail
          </button>
        )}
      </div>

      {gallery.length === 0 ? (
        <div style={{ padding: '24px 16px', background: 'var(--paper)', borderRadius: 8, textAlign: 'center', border: '1.5px dashed var(--line)' }}>
          <p style={{ margin: '0 0 10px', color: 'var(--steel)', fontSize: '0.9rem' }}>
            No gallery images added yet. The lightbox will show the thumbnail image by default.
          </p>
          <button
            type="button" className="btn btn--primary btn--sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Uploading…' : '+ Add Gallery Images'}
          </button>
        </div>
      ) : (
        <div className="admin-gallery-grid-v2">
          {gallery.map((src, idx) => {
            const resolved = projectStore.resolveImage(src) || src;
            return (
              <div key={idx} className="admin-gallery-card">
                <div className="admin-gallery-card-head">
                  <span className="admin-gallery-card-badge">Image {idx + 1}</span>
                  <div className="admin-gallery-card-arrows">
                    <button type="button" title="Move left / up" onClick={() => moveUp(idx)} disabled={idx === 0}>‹</button>
                    <button type="button" title="Move right / down" onClick={() => moveDown(idx)} disabled={idx >= gallery.length - 1}>›</button>
                    <button type="button" title="Remove image" className="danger" onClick={() => removeImage(idx)}>✕</button>
                  </div>
                </div>

                <div className="admin-gallery-card-preview">
                  <img src={resolved} alt={`Gallery ${idx + 1}`} />
                </div>

                <div className="admin-gallery-card-actions">
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '5px 8px' }}
                    onClick={() => triggerReplace(idx)}
                    disabled={uploading}
                  >
                    🔄 Replace Image
                  </button>

                  <select
                    style={{ width: '100%', marginTop: 6, fontSize: '0.75rem', padding: '4px 6px' }}
                    value={IMAGES[src] ? src : ''}
                    onChange={(e) => handleSelectAssetReplace(idx, e.target.value)}
                  >
                    <option value="">— or pick existing asset —</option>
                    {imageKeys.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <input ref={replaceInputRef} type="file" accept="image/*" onChange={handleReplaceFile} hidden />

      <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
        <button
          type="button" className="btn btn--outline btn--sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading…' : '+ Add More Gallery Images'}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleAddFiles} hidden />
        <span className="form-hint">You can select multiple images at once.</span>
      </div>
    </div>
  );
}

/* ================================================================
   1. PROJECTS SECTION (CRUD)
   ================================================================ */

function ProjectEditor({ projectId, go, onSaved, onLogout }) {
  const isNew = !projectId;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const emptyProject = {
    img: '', title: '', status: 'Under construction', live: true,
    cats: [], meta: '', scope: '', gallery: [],
    description: '', features: [], client: '', consultant: '', area: '', year: '',
  };

  const [form, setForm] = useState(emptyProject);

  useEffect(() => {
    if (!isNew && projectId) {
      projectStore.byId(projectId).then((p) => {
        if (p) setForm(p);
        setLoading(false);
      });
    }
  }, [projectId, isNew]);

  const set = (key) => (e) => {
    const val = e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const toggleCat = (cat) => {
    setForm((prev) => ({
      ...prev,
      cats: prev.cats.includes(cat) ? prev.cats.filter((c) => c !== cat) : [...prev.cats, cat],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setToast({ message: 'Project title is required', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await projectStore.save(form);
      setToast({ message: isNew ? 'Project created!' : 'Project updated!' });
      if (onSaved) onSaved();
      setTimeout(() => go('/admin/projects')(), 800);
    } catch (err) {
      setToast({ message: 'Save failed: ' + err.message, type: 'error' });
    }
    setSaving(false);
  };

  const catOptions = FILTERS.filter(([k]) => k !== 'all' && k !== 'progress' && k !== 'completed');
  const statusCats = FILTERS.filter(([k]) => k === 'progress' || k === 'completed');

  if (loading) {
    return <div className="admin-wrap"><div className="admin-loading">Loading project…</div></div>;
  }

  return (
    <div className="admin-wrap">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="admin-editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button className="btn btn--outline btn--sm" onClick={go('/admin/projects')}>← Back to Projects</button>
          <h2 style={{ marginTop: 12 }}>{isNew ? 'Add New Project' : `Edit: ${form.title}`}</h2>
        </div>
        {onLogout && (
          <button className="btn btn--outline btn--sm" onClick={onLogout} style={{ color: '#dc2626' }}>
            Sign Out 🚪
          </button>
        )}
      </div>

      <form className="admin-editor-form" onSubmit={handleSave}>
        <div className="admin-editor-grid">
          <div className="admin-editor-main">
            <div className="admin-card">
              <h3 className="admin-card-title">Basic Information</h3>

              <div className="field">
                <label htmlFor="proj-title">Project Title *</label>
                <input id="proj-title" value={form.title} onChange={set('title')} placeholder="e.g. The Mangrove" required />
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="proj-status">Status</label>
                  <input id="proj-status" value={form.status} onChange={set('status')} placeholder="e.g. Under construction / Completed 2024" />
                </div>
                <div className="field">
                  <label htmlFor="proj-year">Year</label>
                  <input id="proj-year" value={form.year} onChange={set('year')} placeholder="e.g. 2024" />
                </div>
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="proj-client">Client</label>
                  <input id="proj-client" value={form.client} onChange={set('client')} placeholder="e.g. TPL Properties" />
                </div>
                <div className="field">
                  <label htmlFor="proj-consultant">Consultant</label>
                  <input id="proj-consultant" value={form.consultant} onChange={set('consultant')} placeholder="e.g. Arcop Associates" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="proj-area">Area / Size</label>
                <input id="proj-area" value={form.area} onChange={set('area')} placeholder="e.g. 44 acres / 110,000 sq ft" />
              </div>

              <div className="field">
                <label htmlFor="proj-meta">Meta Information</label>
                <textarea id="proj-meta" value={form.meta} onChange={set('meta')} rows={3}
                  placeholder="Client · Location&#10;Size · Details (use line breaks)" />
                <span className="form-hint">This appears below the title on project cards.</span>
              </div>

              <div className="field">
                <label htmlFor="proj-scope">Scope of Work</label>
                <textarea id="proj-scope" value={form.scope} onChange={set('scope')} rows={4}
                  placeholder="Describe the scope of work…" />
              </div>

              <div className="field">
                <label htmlFor="proj-description">Detailed Description (optional)</label>
                <textarea id="proj-description" value={form.description} onChange={set('description')} rows={5}
                  placeholder="Extended project description…" />
              </div>
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Features & Key Points</h3>
              <DynamicListEditor
                label="Features"
                items={form.features || []}
                onChange={set('features')}
                placeholder="e.g. Continuous 72-hour raft concrete pour"
              />
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Gallery Images</h3>
              <GalleryManager gallery={form.gallery || []} onChange={set('gallery')} defaultImg={form.img} />
            </div>
          </div>

          <div className="admin-editor-sidebar">
            <div className="admin-card">
              <h3 className="admin-card-title">Thumbnail</h3>
              <ImagePicker value={form.img} onChange={set('img')} label="Project Thumbnail" />
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Status & Visibility</h3>
              <label className="admin-checkbox">
                <input type="checkbox" checked={form.live} onChange={set('live')} />
                <span>Live / Under construction badge</span>
              </label>

              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: 8 }}>
                  Status Categories
                </label>
                {statusCats.map(([k, label]) => (
                  <label key={k} className="admin-checkbox">
                    <input type="checkbox" checked={form.cats.includes(k)} onChange={() => toggleCat(k)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Categories</h3>
              {catOptions.map(([k, label]) => (
                <label key={k} className="admin-checkbox">
                  <input type="checkbox" checked={form.cats.includes(k)} onChange={() => toggleCat(k)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="admin-card">
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={saving}>
                {saving ? 'Saving…' : (isNew ? 'Create Project' : 'Save Changes')}
              </button>
              <button type="button" className="btn btn--outline" style={{ width: '100%', marginTop: 10 }} onClick={go('/admin/projects')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function ProjectList({ go, onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await projectStore.all();
    setProjects(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = (p) => {
    setConfirm({
      title: 'Delete Project',
      message: `Are you sure you want to delete "${p.title}"? This cannot be undone.`,
      danger: true,
      onConfirm: async () => {
        await projectStore.remove(p.id);
        setConfirm(null);
        setToast({ message: `"${p.title}" deleted` });
        load();
      },
    });
  };

  const handleReset = () => {
    setConfirm({
      title: 'Reset All Projects',
      message: 'This will restore the original default projects. Are you sure?',
      danger: true,
      onConfirm: async () => {
        await projectStore.reset();
        setConfirm(null);
        setToast({ message: 'All projects reset to defaults' });
        load();
      },
    });
  };

  const filtered = projects.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.status?.toLowerCase().includes(search.toLowerCase()) ||
    p.cats?.join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const ongoing = projects.filter((p) => p.cats?.includes('progress'));
  const completed = projects.filter((p) => !p.cats?.includes('progress'));

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirm && (
        <ConfirmDialog
          title={confirm.title} message={confirm.message} danger={confirm.danger}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)}
        />
      )}

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-num">{projects.length}</span>
          <span className="admin-stat-label">Total Projects</span>
        </div>
        <div className="admin-stat-card admin-stat-card--live">
          <span className="admin-stat-num">{ongoing.length}</span>
          <span className="admin-stat-label">Under Construction</span>
        </div>
        <div className="admin-stat-card admin-stat-card--done">
          <span className="admin-stat-num">{completed.length}</span>
          <span className="admin-stat-label">Completed</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="field" style={{ flex: 1, maxWidth: 420, margin: 0 }}>
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, category, status…"
          />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn--outline btn--sm" onClick={handleReset} title="Reset all projects to defaults">
            ↺ Reset Defaults
          </button>
          <button className="btn btn--primary btn--sm" onClick={go('/admin/projects/new')}>
            + Add New Project
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading projects from database…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 72 }}>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Categories</th>
                <th style={{ width: 80 }}>Gallery</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--steel)' }}>
                    {search ? 'No projects match your search.' : 'No projects found. Add one or reset to defaults.'}
                  </td>
                </tr>
              ) : filtered.map((p) => {
                const thumb = projectStore.resolveImage(p.img);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-table-thumb">
                        {thumb ? <img src={thumb} alt="" /> : <span className="admin-no-img">—</span>}
                      </div>
                    </td>
                    <td>
                      <strong className="admin-project-title">{p.title}</strong>
                      {p.meta && <span className="admin-project-meta">{p.meta.split('\n')[0]}</span>}
                    </td>
                    <td>
                      <span className={`admin-badge ${p.live ? 'admin-badge--live' : 'admin-badge--done'}`}>
                        {p.status || '—'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-cat-tags">
                        {(p.cats || []).map((c) => (
                          <span key={c} className="admin-cat-tag">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {(p.gallery || []).length > 0 ? `${p.gallery.length} imgs` : '—'}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn--outline btn--sm" onClick={go(`/admin/projects/edit/${p.id}`)}>
                          Edit
                        </button>
                        <button className="btn btn--danger btn--sm" onClick={() => handleDelete(p)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   2. CAREERS & VACANCIES SECTION (CRUD)
   ================================================================ */

function CareerEditor({ jobId, go, onSaved, onLogout }) {
  const isNew = !jobId;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const departments = careerStore.getDepartments();
  const jobTypes = careerStore.getJobTypes();

  const emptyJob = {
    title: '',
    department: 'Engineering & Design',
    location: 'Karachi Head Office / Site',
    type: 'Full-time',
    experience: '5+ Years',
    deadline: 'Open until filled',
    overview: '',
    responsibilities: [],
    requirements: [],
  };

  const [form, setForm] = useState(emptyJob);

  useEffect(() => {
    if (!isNew && jobId) {
      careerStore.byId(jobId).then((j) => {
        if (j) setForm(j);
        setLoading(false);
      });
    }
  }, [jobId, isNew]);

  const set = (key) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setToast({ message: 'Job title is required', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await careerStore.save(form);
      setToast({ message: isNew ? 'Job posting created!' : 'Job posting updated!' });
      if (onSaved) onSaved();
      setTimeout(() => go('/admin/careers')(), 800);
    } catch (err) {
      setToast({ message: 'Save failed: ' + err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="admin-wrap"><div className="admin-loading">Loading career opening…</div></div>;
  }

  return (
    <div className="admin-wrap">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="admin-editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button className="btn btn--outline btn--sm" onClick={go('/admin/careers')}>← Back to Careers</button>
          <h2 style={{ marginTop: 12 }}>{isNew ? 'Post New Career Opportunity' : `Edit: ${form.title}`}</h2>
        </div>
        {onLogout && (
          <button className="btn btn--outline btn--sm" onClick={onLogout} style={{ color: '#dc2626' }}>
            Sign Out 🚪
          </button>
        )}
      </div>

      <form className="admin-editor-form" onSubmit={handleSave}>
        <div className="admin-editor-grid">
          <div className="admin-editor-main">
            <div className="admin-card">
              <h3 className="admin-card-title">Position Overview</h3>

              <div className="field">
                <label htmlFor="job-title">Job Title *</label>
                <input
                  id="job-title"
                  value={form.title}
                  onChange={set('title')}
                  placeholder="e.g. Senior Structural Engineer"
                  required
                />
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="job-dept">Department</label>
                  <input
                    id="job-dept"
                    list="dept-options"
                    value={form.department}
                    onChange={set('department')}
                    placeholder="e.g. Engineering & Design"
                  />
                  <datalist id="dept-options">
                    {departments.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </div>

                <div className="field">
                  <label htmlFor="job-type">Employment Type</label>
                  <select id="job-type" value={form.type} onChange={set('type')}>
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="job-loc">Location</label>
                  <input
                    id="job-loc"
                    value={form.location}
                    onChange={set('location')}
                    placeholder="e.g. Karachi Head Office / Site"
                  />
                </div>

                <div className="field">
                  <label htmlFor="job-exp">Experience Required</label>
                  <input
                    id="job-exp"
                    value={form.experience}
                    onChange={set('experience')}
                    placeholder="e.g. 8+ Years"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="job-deadline">Application Deadline</label>
                <input
                  id="job-deadline"
                  value={form.deadline}
                  onChange={set('deadline')}
                  placeholder="e.g. Open until filled or 30 Nov 2026"
                />
              </div>

              <div className="field">
                <label htmlFor="job-overview">Role Summary / Overview</label>
                <textarea
                  id="job-overview"
                  value={form.overview}
                  onChange={set('overview')}
                  rows={4}
                  placeholder="Brief summary of the role, team context, and high-level mission…"
                />
              </div>
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Key Responsibilities</h3>
              <DynamicListEditor
                label="Responsibilities"
                items={form.responsibilities || []}
                onChange={set('responsibilities')}
                placeholder="e.g. Perform detailed structural analysis for high-rise superstructure…"
                hint="Add key day-to-day duties and core milestones for this role."
              />
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Candidate Requirements & Qualifications</h3>
              <DynamicListEditor
                label="Requirements"
                items={form.requirements || []}
                onChange={set('requirements')}
                placeholder="e.g. B.E. / B.Sc. in Civil Engineering (PEC Registered)…"
                hint="Add education, certifications, years of experience, and software proficiencies."
              />
            </div>
          </div>

          <div className="admin-editor-sidebar">
            <div className="admin-card">
              <h3 className="admin-card-title">Publishing & Actions</h3>
              <p className="form-hint" style={{ marginBottom: 16 }}>
                Positions published here are instantly displayed on the public Careers page with one-click email application buttons.
              </p>

              <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={saving}>
                {saving ? 'Saving…' : (isNew ? 'Post Job Opening' : 'Save Changes')}
              </button>
              <button type="button" className="btn btn--outline" style={{ width: '100%', marginTop: 10 }} onClick={go('/admin/careers')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function CareerList({ go, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await careerStore.all();
    setJobs(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = (job) => {
    setConfirm({
      title: 'Delete Job Posting',
      message: `Are you sure you want to delete "${job.title}"? This cannot be undone.`,
      danger: true,
      onConfirm: async () => {
        await careerStore.remove(job.id);
        setConfirm(null);
        setToast({ message: `"${job.title}" removed` });
        load();
      },
    });
  };

  const handleReset = () => {
    setConfirm({
      title: 'Reset All Careers',
      message: 'This will restore the original default job openings. Are you sure?',
      danger: true,
      onConfirm: async () => {
        await careerStore.reset();
        setConfirm(null);
        setToast({ message: 'All job openings reset to defaults' });
        load();
      },
    });
  };

  const departments = ['All', ...new Set(jobs.map((j) => j.department).filter(Boolean))];

  const filtered = jobs.filter((j) => {
    const matchesDept = filterDept === 'All' || j.department === filterDept;
    const matchesSearch = !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase()) ||
      j.experience.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const fullTimeCount = jobs.filter((j) => j.type?.toLowerCase().includes('full')).length;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirm && (
        <ConfirmDialog
          title={confirm.title} message={confirm.message} danger={confirm.danger}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)}
        />
      )}

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-num">{jobs.length}</span>
          <span className="admin-stat-label">Active Vacancies</span>
        </div>
        <div className="admin-stat-card admin-stat-card--live">
          <span className="admin-stat-num">{departments.length - 1}</span>
          <span className="admin-stat-label">Departments</span>
        </div>
        <div className="admin-stat-card admin-stat-card--done">
          <span className="admin-stat-num">{fullTimeCount}</span>
          <span className="admin-stat-label">Full-Time Positions</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1, maxWidth: 600 }}>
          <div className="field" style={{ flex: 1, margin: 0 }}>
            <input
              type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title, department, location…"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            style={{ width: 'auto', minWidth: 160, padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--line)' }}
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn--outline btn--sm" onClick={handleReset} title="Reset careers to default list">
            ↺ Reset Defaults
          </button>
          <button className="btn btn--primary btn--sm" onClick={go('/admin/careers/new')}>
            + Post New Job
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading career listings…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Job Title & Department</th>
                <th>Location & Type</th>
                <th>Experience</th>
                <th>Deadline</th>
                <th style={{ width: 100 }}>Scope</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--steel)' }}>
                    {search ? 'No vacancies match your search.' : 'No job vacancies found. Post one or reset defaults.'}
                  </td>
                </tr>
              ) : filtered.map((j) => (
                <tr key={j.id}>
                  <td>
                    <strong className="admin-project-title" style={{ fontSize: '1rem' }}>{j.title}</strong>
                    <span className="admin-cat-tag" style={{ marginTop: 4 }}>{j.department}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--ink)' }}>📍 {j.location}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>{j.type}</span>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge--done">{j.experience}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.85rem', color: 'var(--steel)' }}>{j.deadline}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>
                      {(j.responsibilities || []).length} resp. / {(j.requirements || []).length} req.
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button className="btn btn--outline btn--sm" onClick={go(`/admin/careers/edit/${j.id}`)}>
                        Edit
                      </button>
                      <button className="btn btn--danger btn--sm" onClick={() => handleDelete(j)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   3. EVENTS & ENGAGEMENTS SECTION (CRUD)
   ================================================================ */

function EventEditor({ eventId, go, onSaved, onLogout }) {
  const isNew = !eventId;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const categories = eventStore.getCategories();
  const statuses = eventStore.getStatuses();

  const emptyEvent = {
    title: '',
    category: 'EXHIBITION',
    status: 'Upcoming',
    date: '',
    time: '',
    location: '',
    overview: '',
    highlights: [],
    contact: 'events@asent.com.pk',
  };

  const [form, setForm] = useState(emptyEvent);

  useEffect(() => {
    if (!isNew && eventId) {
      eventStore.byId(eventId).then((ev) => {
        if (ev) setForm(ev);
        setLoading(false);
      });
    }
  }, [eventId, isNew]);

  const set = (key) => (e) => {
    const val = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setToast({ message: 'Event title is required', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await eventStore.save(form);
      setToast({ message: isNew ? 'Event created!' : 'Event updated!' });
      if (onSaved) onSaved();
      setTimeout(() => go('/admin/events')(), 800);
    } catch (err) {
      setToast({ message: 'Save failed: ' + err.message, type: 'error' });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="admin-wrap"><div className="admin-loading">Loading event…</div></div>;
  }

  return (
    <div className="admin-wrap">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="admin-editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button className="btn btn--outline btn--sm" onClick={go('/admin/events')}>← Back to Events</button>
          <h2 style={{ marginTop: 12 }}>{isNew ? 'Create New Event / Engagement' : `Edit: ${form.title}`}</h2>
        </div>
        {onLogout && (
          <button className="btn btn--outline btn--sm" onClick={onLogout} style={{ color: '#dc2626' }}>
            Sign Out 🚪
          </button>
        )}
      </div>

      <form className="admin-editor-form" onSubmit={handleSave}>
        <div className="admin-editor-grid">
          <div className="admin-editor-main">
            <div className="admin-card">
              <h3 className="admin-card-title">Event Overview</h3>

              <div className="field">
                <label htmlFor="ev-title">Event Title *</label>
                <input
                  id="ev-title"
                  value={form.title}
                  onChange={set('title')}
                  placeholder="e.g. Pakistan Construction & Infrastructure Expo 2026"
                  required
                />
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="ev-cat">Category</label>
                  <input
                    id="ev-cat"
                    list="cat-options"
                    value={form.category}
                    onChange={set('category')}
                    placeholder="e.g. EXHIBITION / CONFERENCE"
                  />
                  <datalist id="cat-options">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div className="field">
                  <label htmlFor="ev-status">Status</label>
                  <select id="ev-status" value={form.status} onChange={set('status')}>
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-row-2">
                <div className="field">
                  <label htmlFor="ev-date">Date *</label>
                  <input
                    id="ev-date"
                    value={form.date}
                    onChange={set('date')}
                    placeholder="e.g. 15 - 17 OCT 2026 or 28 NOV 2026"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="ev-time">Time</label>
                  <input
                    id="ev-time"
                    value={form.time}
                    onChange={set('time')}
                    placeholder="e.g. 10:00 AM - 06:00 PM PKT"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="ev-loc">Location</label>
                <input
                  id="ev-loc"
                  value={form.location}
                  onChange={set('location')}
                  placeholder="e.g. Expo Centre, Karachi — Hall 4, Stall A-12"
                />
              </div>

              <div className="field">
                <label htmlFor="ev-contact">Contact Email for Inquiries</label>
                <input
                  id="ev-contact"
                  type="email"
                  value={form.contact}
                  onChange={set('contact')}
                  placeholder="e.g. events@asent.com.pk"
                />
              </div>

              <div className="field">
                <label htmlFor="ev-overview">Event Description & Purpose</label>
                <textarea
                  id="ev-overview"
                  value={form.overview}
                  onChange={set('overview')}
                  rows={4}
                  placeholder="Overview of the event, ASENT presence, speaking sessions, or project inaugurations…"
                />
              </div>
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Key Highlights & Agenda Points</h3>
              <DynamicListEditor
                label="Highlights"
                items={form.highlights || []}
                onChange={set('highlights')}
                placeholder="e.g. Interactive scale models of 30+ storey towers and healthcare campuses…"
                hint="Add key speaking topics, presentations, VIP ceremonies, or attendee benefits."
              />
            </div>
          </div>

          <div className="admin-editor-sidebar">
            <div className="admin-card">
              <h3 className="admin-card-title">Publishing & Actions</h3>
              <p className="form-hint" style={{ marginBottom: 16 }}>
                Events are listed immediately in the corporate calendar under Upcoming or Past tabs.
              </p>

              <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={saving}>
                {saving ? 'Saving…' : (isNew ? 'Create Event' : 'Save Changes')}
              </button>
              <button type="button" className="btn btn--outline" style={{ width: '100%', marginTop: 10 }} onClick={go('/admin/events')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function EventList({ go, onLogout }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await eventStore.all();
    setEvents(data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = (ev) => {
    setConfirm({
      title: 'Delete Event',
      message: `Are you sure you want to delete "${ev.title}"? This cannot be undone.`,
      danger: true,
      onConfirm: async () => {
        await eventStore.remove(ev.id);
        setConfirm(null);
        setToast({ message: `"${ev.title}" removed` });
        load();
      },
    });
  };

  const handleReset = () => {
    setConfirm({
      title: 'Reset All Events',
      message: 'This will restore the original default event schedule. Are you sure?',
      danger: true,
      onConfirm: async () => {
        await eventStore.reset();
        setConfirm(null);
        setToast({ message: 'All events reset to defaults' });
        load();
      },
    });
  };

  const filtered = events.filter((ev) => {
    const matchesStatus = filterStatus === 'All' || ev.status === filterStatus;
    const matchesSearch = !search ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      ev.date.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const upcomingCount = events.filter((e) => e.status === 'Upcoming').length;
  const pastCount = events.filter((e) => e.status === 'Past').length;

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirm && (
        <ConfirmDialog
          title={confirm.title} message={confirm.message} danger={confirm.danger}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)}
        />
      )}

      {/* Stats Cards */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-num">{events.length}</span>
          <span className="admin-stat-label">Total Engagements</span>
        </div>
        <div className="admin-stat-card admin-stat-card--live">
          <span className="admin-stat-num">{upcomingCount}</span>
          <span className="admin-stat-label">Upcoming Events</span>
        </div>
        <div className="admin-stat-card admin-stat-card--done">
          <span className="admin-stat-num">{pastCount}</span>
          <span className="admin-stat-label">Past Milestones</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, flex: 1, maxWidth: 600 }}>
          <div className="field" style={{ flex: 1, margin: 0 }}>
            <input
              type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by title, category, location, date…"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: 'auto', minWidth: 140, padding: '8px 12px', borderRadius: 8, border: '1.5px solid var(--line)' }}
          >
            <option value="All">All Statuses</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Past">Past</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn--outline btn--sm" onClick={handleReset} title="Reset events to default list">
            ↺ Reset Defaults
          </button>
          <button className="btn btn--primary btn--sm" onClick={go('/admin/events/new')}>
            + Add New Event
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="admin-loading">Loading events…</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Title & Category</th>
                <th>Status</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th style={{ width: 100 }}>Highlights</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--steel)' }}>
                    {search ? 'No events match your search.' : 'No events found. Add one or reset defaults.'}
                  </td>
                </tr>
              ) : filtered.map((ev) => {
                const isUpcoming = ev.status === 'Upcoming';
                return (
                  <tr key={ev.id}>
                    <td>
                      <strong className="admin-project-title" style={{ fontSize: '1rem' }}>{ev.title}</strong>
                      <span className="admin-cat-tag" style={{ marginTop: 4 }}>{ev.category}</span>
                    </td>
                    <td>
                      <span className={`admin-badge ${isUpcoming ? 'admin-badge--live' : 'admin-badge--done'}`}>
                        {ev.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: 'var(--ink)' }}>📅 {ev.date}</div>
                      {ev.time && <span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>{ev.time}</span>}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>📍 {ev.location}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>
                        {(ev.highlights || []).length} items
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button className="btn btn--outline btn--sm" onClick={go(`/admin/events/edit/${ev.id}`)}>
                          Edit
                        </button>
                        <button className="btn btn--danger btn--sm" onClick={() => handleDelete(ev)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   MAIN ADMIN CONSOLE CONTAINER (Navigation Tabs & Auth)
   ================================================================ */
export function ProjectAdmin({ go, editId, path = '/admin' }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
    if (typeof window !== 'undefined') {
      window.location.hash = '/admin';
    }
  };

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />;
  }

  // Determine sub-route / entity / action
  // 1. Check direct path / subPath
  let tab = 'projects';
  let mode = 'list';
  let targetId = null;

  if (path.startsWith('/admin/careers')) {
    tab = 'careers';
    if (path === '/admin/careers/new') {
      mode = 'new';
    } else if (path.startsWith('/admin/careers/edit/')) {
      mode = 'edit';
      targetId = path.replace('/admin/careers/edit/', '');
    }
  } else if (path.startsWith('/admin/events')) {
    tab = 'events';
    if (path === '/admin/events/new') {
      mode = 'new';
    } else if (path.startsWith('/admin/events/edit/')) {
      mode = 'edit';
      targetId = path.replace('/admin/events/edit/', '');
    }
  } else {
    // Default / Projects
    tab = 'projects';
    if (path === '/admin/new' || path === '/admin/projects/new' || editId === 'new') {
      mode = 'new';
    } else if (path.startsWith('/admin/edit/') || path.startsWith('/admin/projects/edit/') || editId) {
      mode = 'edit';
      targetId = editId || path.replace('/admin/projects/edit/', '').replace('/admin/edit/', '');
    }
  }

  // Handle specific editors if in new/edit mode
  if (mode === 'new' || mode === 'edit') {
    if (tab === 'careers') {
      return (
        <CareerEditor
          jobId={mode === 'new' ? null : targetId}
          go={go}
          onSaved={() => setRefreshKey((k) => k + 1)}
          onLogout={handleLogout}
        />
      );
    }
    if (tab === 'events') {
      return (
        <EventEditor
          eventId={mode === 'new' ? null : targetId}
          go={go}
          onSaved={() => setRefreshKey((k) => k + 1)}
          onLogout={handleLogout}
        />
      );
    }
    return (
      <ProjectEditor
        projectId={mode === 'new' ? null : targetId}
        go={go}
        onSaved={() => setRefreshKey((k) => k + 1)}
        onLogout={handleLogout}
      />
    );
  }

  // Dashboard with Top Tab Navigation
  return (
    <div className="admin-wrap" key={refreshKey}>
      {/* Top Header */}
      <div className="admin-header" style={{ alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 24, marginBottom: 24 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🛠️</span> ASENT Admin Console
          </h1>
          <p className="muted" style={{ margin: 0 }}>
            Manage projects, career opportunities, and corporate events across the website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a
            href="#/"
            className="btn btn--outline btn--sm"
            onClick={go('/')}
            style={{ textDecoration: 'none' }}
          >
            ↗ View Public Site
          </a>
          <button
            className="btn btn--outline btn--sm"
            onClick={handleLogout}
            title="Log out of admin session"
            style={{ color: '#dc2626', borderColor: 'rgba(220,38,38,0.3)' }}
          >
            Sign Out 🚪
          </button>
        </div>
      </div>

      {/* Modern Navigation Tabs */}
      <div style={{ display: 'flex', gap: 12, borderBottom: '2px solid var(--line)', marginBottom: 28, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={go('/admin/projects')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: tab === 'projects' ? '3px solid var(--navy)' : '3px solid transparent',
            marginBottom: -2,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: tab === 'projects' ? 'var(--navy)' : 'var(--steel)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
        >
          <span>🏗️</span> Projects &amp; Works
        </button>

        <button
          type="button"
          onClick={go('/admin/careers')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: tab === 'careers' ? '3px solid var(--navy)' : '3px solid transparent',
            marginBottom: -2,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: tab === 'careers' ? 'var(--navy)' : 'var(--steel)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
        >
          <span>💼</span> Careers &amp; Vacancies
        </button>

        <button
          type="button"
          onClick={go('/admin/events')}
          style={{
            background: 'none',
            border: 'none',
            borderBottom: tab === 'events' ? '3px solid var(--navy)' : '3px solid transparent',
            marginBottom: -2,
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: tab === 'events' ? 'var(--navy)' : 'var(--steel)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
        >
          <span>📅</span> Events &amp; Engagements
        </button>
      </div>

      {/* Render Active Tab */}
      {tab === 'projects' && <ProjectList go={go} onLogout={handleLogout} />}
      {tab === 'careers' && <CareerList go={go} onLogout={handleLogout} />}
      {tab === 'events' && <EventList go={go} onLogout={handleLogout} />}

      <div className="admin-footer-note" style={{ marginTop: 40 }}>
        <p>
          <strong>Tip:</strong> All edits, new posts, and removals made here are updated in real-time on the public website.
        </p>
      </div>
    </div>
  );
}

export const AdminPanel = ProjectAdmin;
export default ProjectAdmin;
