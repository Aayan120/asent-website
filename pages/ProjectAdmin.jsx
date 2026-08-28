import { useEffect, useState, useCallback, useRef } from 'react';
import { projectStore } from '../projectStore.js';
import { IMAGES } from '../images.js';
import { CONFIG } from '../store.js';
import { FILTERS } from '../data.js';

/* ================================================================
   PROJECT ADMIN — Full CRUD panel for managing projects
   Route: #/admin  |  #/admin/edit/:id  |  #/admin/new
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
        <p className="muted">Enter the admin password to manage projects.</p>
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

  // If gallery is empty, provide a button to initialize with 4 slots of the default/thumbnail image
  const initFromThumbnail = () => {
    if (!defaultImg) return;
    onChange([defaultImg, defaultImg, defaultImg, defaultImg]);
  };

  // Add one or more images from file input in parallel
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

  // Replace a specific image at index `idx`
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
            These are the photos shown when a visitor opens this project's photo gallery slider.
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
            No gallery images added yet. The lightbox will repeat the thumbnail image by default.
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

      {/* Hidden replace input */}
      <input ref={replaceInputRef} type="file" accept="image/*" onChange={handleReplaceFile} hidden />

      {/* Add more button */}
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

/* ---------- Feature List Editor ---------- */
function FeatureEditor({ features, onChange }) {
  const [val, setVal] = useState('');

  const add = () => {
    const v = val.trim();
    if (v) { onChange([...features, v]); setVal(''); }
  };

  return (
    <div className="admin-features">
      <label>Features / Key Points</label>
      {features.length > 0 && (
        <ul className="admin-features-list">
          {features.map((f, i) => (
            <li key={i}>
              <span>{f}</span>
              <button type="button" onClick={() => onChange(features.filter((_, j) => j !== i))} title="Remove">✕</button>
            </li>
          ))}
        </ul>
      )}
      <div className="admin-features-add">
        <input
          value={val} onChange={(e) => setVal(e.target.value)}
          placeholder="Add a feature…"
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button type="button" className="btn btn--outline btn--sm" onClick={add}>Add</button>
      </div>
    </div>
  );
}

/* ================================================================
   PROJECT EDITOR
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
      setTimeout(() => go('/admin')(), 800);
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
          <button className="btn btn--outline btn--sm" onClick={go('/admin')}>← Back to Projects</button>
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
          {/* Left column — Main fields */}
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
                <span className="form-hint">This appears below the title on project cards. Use line breaks for multi-line display.</span>
              </div>

              <div className="field">
                <label htmlFor="proj-scope">Scope of Work</label>
                <textarea id="proj-scope" value={form.scope} onChange={set('scope')} rows={4}
                  placeholder="Describe the scope of work…" />
              </div>

              <div className="field">
                <label htmlFor="proj-description">Detailed Description (optional)</label>
                <textarea id="proj-description" value={form.description} onChange={set('description')} rows={5}
                  placeholder="Extended project description for detail pages…" />
              </div>
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Features & Key Points</h3>
              <FeatureEditor features={form.features || []} onChange={set('features')} />
            </div>

            <div className="admin-card">
              <h3 className="admin-card-title">Gallery Images</h3>
              <GalleryManager gallery={form.gallery || []} onChange={set('gallery')} defaultImg={form.img} />
            </div>
          </div>

          {/* Right column — Image + categories */}
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
              <button type="button" className="btn btn--outline" style={{ width: '100%', marginTop: 10 }} onClick={go('/admin')}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ================================================================
   PROJECT LIST — Admin Dashboard
   ================================================================ */
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
      message: 'This will delete all current projects and restore the original defaults. Are you sure?',
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
    <div className="admin-wrap">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {confirm && (
        <ConfirmDialog
          title={confirm.title} message={confirm.message} danger={confirm.danger}
          onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)}
        />
      )}

      {/* Dashboard Header */}
      <div className="admin-header">
        <div>
          <h1>Project Manager</h1>
          <p className="muted">Manage all projects shown on the website.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn--primary" onClick={go('/admin/new')}>
            + Add New Project
          </button>
          {onLogout && (
            <button className="btn btn--outline" onClick={onLogout} title="Log out of admin session" style={{ color: '#dc2626', borderColor: 'rgba(220,38,38,0.3)' }}>
              Sign Out 🚪
            </button>
          )}
        </div>
      </div>

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

      {/* Search + Actions */}
      <div className="admin-toolbar">
        <div className="field" style={{ flex: 1, maxWidth: 400, margin: 0 }}>
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, status or category…"
          />
        </div>
        <button className="btn btn--outline btn--sm" onClick={handleReset} title="Reset all projects to defaults">
          ↺ Reset Defaults
        </button>
      </div>

      {/* Project Table */}
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
                        <button className="btn btn--outline btn--sm" onClick={go(`/admin/edit/${p.id}`)}>
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

      <div className="admin-footer-note">
        <p>
          <strong>Tip:</strong> Changes you make here are live — they will appear on the public website immediately.
          Use "Reset Defaults" to restore the original project list.
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN EXPORT — handles auth + routing between list/editor
   ================================================================ */
export function ProjectAdmin({ go, editId }) {
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

  // If editing or creating
  if (editId || editId === 'new') {
    return (
      <ProjectEditor
        projectId={editId === 'new' ? null : editId}
        go={go}
        onSaved={() => setRefreshKey((k) => k + 1)}
        onLogout={handleLogout}
      />
    );
  }

  return <ProjectList key={refreshKey} go={go} onLogout={handleLogout} />;
}
