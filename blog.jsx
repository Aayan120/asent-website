import { useEffect, useState } from 'react';
import { IMAGES } from './images.js';
import { CONFIG, formatDate, store } from './store.js';
import { Arrow, Btn, CTA, Eyebrow, PageHead, Section, SectionHead } from './ui.jsx';

/* ============================ BLOG LIST ============================ */
export function Blog({ go }) {
  const [cat, setCat] = useState('all');
  const posts = store.published();
  const cats = ['all', ...Array.from(new Set(posts.map((p) => p.category || 'General')))];
  const shown = cat === 'all' ? posts : posts.filter((p) => (p.category || 'General') === cat);

  return (
    <>
      <PageHead
        go={go} crumb="Insights" title="Insights"
        lede="Site reports, completion milestones, safety practice and plain notes on how construction contracting works in Pakistan. Written by the people doing the work."
      />

      <Section>
        {posts.length === 0 ? (
          <p className="lede">
            No posts yet. Open the <a href="#/admin" onClick={go('/admin')}>admin panel</a> to publish the first one.
          </p>
        ) : (
          <>
            <div className="filters">
              {cats.map((c) => (
                <button
                  key={c} type="button"
                  className={`filter${cat === c ? ' is-active' : ''}`}
                  onClick={() => setCat(c)}
                >
                  {c === 'all' ? 'All posts' : c}
                </button>
              ))}
            </div>
            <div className="post-grid">
              {shown.map((p) => (
                <a
                  className="post-card" key={p.id}
                  href={`#/post/${p.slug}`} onClick={go(`/post/${p.slug}`)}
                >
                  {p.cover && <div className="thumb"><img src={p.cover} alt="" loading="lazy" /></div>}
                  <div className="body">
                    <span className="post-meta">{p.category || 'Update'} &nbsp;·&nbsp; {formatDate(p.date)}</span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="post-more">Read the post →</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </Section>

      <CTA
        go={go} href="/admin" label="Open the admin panel"
        title="Publishing from the site office?"
        lede="The admin panel writes, edits and removes posts on this page — no developer needed."
      />
    </>
  );
}

/* ============================ SINGLE POST ============================ */
export function Post({ go, slug }) {
  const post = store.bySlug(slug);

  if (!post) {
    return (
      <>
        <PageHead go={go} crumb="Insights" title="Post not found" lede="That post may have been moved or removed." />
        <Section>
          <p className="lede">
            Try the <a href="#/blog" onClick={go('/blog')}>full list of posts</a>.
          </p>
        </Section>
      </>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <p className="crumbs">
            <a href="#/" onClick={go('/')}>Home</a> / <a href="#/blog" onClick={go('/blog')}>Insights</a> / {post.category}
          </p>
          <h1>{post.title}</h1>
          <p>{post.author} &nbsp;·&nbsp; {formatDate(post.date)}</p>
        </div>
      </section>

      <Section>
        <article className="article">
          {post.cover && <img src={post.cover} alt="" />}
          {post.excerpt && <p className="lede">{post.excerpt}</p>}
          <div dangerouslySetInnerHTML={{ __html: post.body || '' }} />
          <p style={{ marginTop: 44 }}>
            <Btn variant="ghost" href="#/blog" onClick={go('/blog')}>← All insights</Btn>
          </p>
        </article>
      </Section>
    </>
  );
}

/* ============================ ADMIN ============================ */
const blank = () => ({
  id: '', title: '', slug: '', category: 'Project update', author: 'ASENT',
  date: new Date().toISOString().slice(0, 10), cover: IMAGES.mangrove,
  excerpt: '', body: '', status: 'published',
});

export function Admin({ go }) {
  const [signedIn, setSignedIn] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState(blank());
  const [flash, setFlash] = useState(null);

  const refresh = () => setPosts(store.all());
  useEffect(() => { refresh(); }, []);
  useEffect(() => {
    if (!flash) return undefined;
    const t = setTimeout(() => setFlash(null), 5000);
    return () => clearTimeout(t);
  }, [flash]);

  const signIn = (e) => {
    e.preventDefault();
    if (pass === CONFIG.adminPass) { setSignedIn(true); setPass(''); setError(''); }
    else setError('That passphrase does not match. Check CONFIG.adminPass in src/store.js if you have changed it.');
  };

  const set = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  const setTitle = (e) => {
    const title = e.target.value;
    const autoSlug = !draft.id && (!draft.slug || draft.slug === store.slugify(draft.title));
    setDraft({ ...draft, title, slug: autoSlug ? store.slugify(title) : draft.slug });
  };

  const save = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) { setFlash(['warn', 'Give the post a title before saving.']); return; }
    let body = draft.body.trim();
    if (body && !body.includes('<')) {
      body = body.split(/\n{2,}/).map((p) => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`).join('');
    }
    const saved = store.save({ ...draft, body });
    refresh();
    setDraft(saved);
    setTab('posts');
    setFlash(['ok', `Saved “${saved.title}”.`]);
  };

  const del = (p) => {
    if (window.confirm(`Delete “${p.title}”? This cannot be undone.`)) {
      store.remove(p.id); refresh(); setFlash(['warn', `Deleted “${p.title}”.`]);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(store.all(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'asent-posts.json';
    document.body.appendChild(a); a.click(); a.remove();
    setFlash(['ok', 'Exported asent-posts.json.']);
  };

  const importJson = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error('bad');
        store.replaceAll(data); refresh();
        setFlash(['ok', `Imported ${data.length} posts.`]);
      } catch (err) {
        setFlash(['warn', 'That file could not be read. Import a JSON file exported from this panel.']);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!signedIn) {
    return (
      <div className="wrap">
        <div className="login-box">
          <Eyebrow>Restricted</Eyebrow>
          <h2 style={{ fontSize: '1.8rem' }}>Sign in to manage posts</h2>
          <p className="muted" style={{ fontSize: '.92rem' }}>
            Enter the site passphrase to add, edit or remove blog posts.
          </p>
          {error && <div className="notice notice--warn">{error}</div>}
          <form onSubmit={signIn}>
            <div className="field">
              <label htmlFor="a-pass">Passphrase</label>
              <input
                id="a-pass" type="password" value={pass} autoComplete="current-password"
                onChange={(e) => setPass(e.target.value)} required
              />
            </div>
            <Btn type="submit">Sign in <Arrow /></Btn>
          </form>
          <p className="form-note" style={{ marginTop: 22 }}>
            Default passphrase: <strong>asent2026</strong>. Change it in <code>src/store.js</code> before
            the site goes live, and move authentication to your server for real protection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <h4>Blog administration</h4>
        <nav>
          {[['posts', 'All posts'], ['editor', 'Write / edit'], ['tools', 'Backup & tools']].map(([k, label]) => (
            <button
              key={k} type="button"
              className={tab === k ? 'is-active' : ''}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
          <button type="button" onClick={() => setSignedIn(false)}>Sign out</button>
        </nav>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', letterSpacing: '.1em', marginTop: 26, lineHeight: 1.8, color: '#8F97BC' }}>
          Posts are stored in this browser.<br />Export a backup before switching machines.
        </p>
      </aside>

      <main className="admin-main">
        {flash && <div className={`notice notice--${flash[0]}`}>{flash[1]}</div>}
        {!store.persistent && (
          <div className="notice notice--warn">
            This browser is blocking local storage, so changes will last only until you close
            the tab. Export your posts before leaving.
          </div>
        )}

        {tab === 'posts' && (
          <>
            <div className="admin-bar">
              <div>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>All posts</h2>
                <span className="post-meta">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
              </div>
              <Btn type="button" onClick={() => { setDraft(blank()); setTab('editor'); }}>New post</Btn>
            </div>

            {posts.length === 0 && <div className="notice">No posts yet. Choose “New post” to write the first one.</div>}

            {posts.map((p) => (
              <div className="post-row" key={p.id}>
                <img src={p.cover || IMAGES.markNavy} alt="" />
                <div className="info">
                  <strong>{p.title}</strong>
                  <span className="post-meta">{formatDate(p.date)} &nbsp;·&nbsp; {p.category}</span>{' '}
                  <span className={`chip${p.status === 'draft' ? ' chip--draft' : ''}`}>
                    {p.status === 'draft' ? 'Draft' : 'Published'}
                  </span>
                </div>
                <div className="actions">
                  <Btn small variant="ghost" href={`#/post/${p.slug}`} onClick={go(`/post/${p.slug}`)}>View</Btn>
                  <Btn small variant="ghost" type="button" onClick={() => { setDraft(p); setTab('editor'); }}>Edit</Btn>
                  <Btn small type="button" onClick={() => del(p)}>Delete</Btn>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'editor' && (
          <>
            <div className="admin-bar">
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{draft.id ? 'Edit post' : 'New post'}</h2>
              <Btn variant="ghost" type="button" onClick={() => setTab('posts')}>Back to all posts</Btn>
            </div>

            <form onSubmit={save}>
              <div className="field">
                <label htmlFor="f-title">Title</label>
                <input id="f-title" type="text" value={draft.title} onChange={setTitle} placeholder="Piling begins at The Mangrove" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-slug">Web address (slug)</label>
                  <input id="f-slug" type="text" value={draft.slug} onChange={set('slug')} placeholder="mangrove-piling-begins" />
                </div>
                <div className="field">
                  <label htmlFor="f-cat">Category</label>
                  <input id="f-cat" type="text" list="cat-list" value={draft.category} onChange={set('category')} />
                  <datalist id="cat-list">
                    {['Project update', 'Milestone', 'Health & safety', 'Industry note', 'Company news']
                      .map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-author">Author</label>
                  <input id="f-author" type="text" value={draft.author} onChange={set('author')} />
                </div>
                <div className="field">
                  <label htmlFor="f-date">Publish date</label>
                  <input id="f-date" type="date" value={draft.date} onChange={set('date')} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-cover">Cover image</label>
                  <select id="f-cover" value={draft.cover} onChange={set('cover')}>
                    <option value="">No cover image</option>
                    {Object.keys(IMAGES)
                      .filter((k) => k !== 'logoWhite' && k !== 'markNavy')
                      .map((k) => <option key={k} value={IMAGES[k]}>{k.replace(/-/g, ' ')}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-status">Status</label>
                  <select id="f-status" value={draft.status} onChange={set('status')}>
                    <option value="published">Published — visible on the blog</option>
                    <option value="draft">Draft — hidden from the blog</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-excerpt">Summary</label>
                <textarea id="f-excerpt" style={{ minHeight: 90 }} value={draft.excerpt} onChange={set('excerpt')} placeholder="One or two sentences shown on the blog listing." />
              </div>

              <div className="field">
                <label htmlFor="f-body">Post</label>
                <textarea
                  id="f-body" style={{ minHeight: 320 }} value={draft.body} onChange={set('body')}
                  placeholder="Write the post here. Leave a blank line between paragraphs, or paste HTML (<h2>, <p>, <ul>) for more control."
                />
              </div>

              {draft.cover && (
                <div className="field">
                  <label>Cover preview</label>
                  <img src={draft.cover} alt="" style={{ maxWidth: 320, border: '1px solid var(--line)' }} />
                </div>
              )}

              <Btn type="submit">Save post <Arrow /></Btn>{' '}
              <Btn variant="ghost" type="button" onClick={() => setTab('posts')}>Cancel</Btn>
            </form>
          </>
        )}

        {tab === 'tools' && (
          <>
            <h2 style={{ fontSize: '1.8rem' }}>Backup & tools</h2>
            <div className="notice">
              Posts live in this browser&rsquo;s local storage. Export a JSON backup before you clear
              browsing data, change computers, or hand the site to a developer for a server-side
              content system.
            </div>
            <div className="spec-list" style={{ marginBottom: 26 }}>
              <div className="spec">
                <h4>Export posts</h4>
                <p>Downloads every post, including drafts, as <code>asent-posts.json</code>.</p>
                <p style={{ marginTop: 14 }}><Btn small variant="ghost" type="button" onClick={exportJson}>Export JSON</Btn></p>
              </div>
              <div className="spec">
                <h4>Import posts</h4>
                <p>Replaces the current posts with a file exported from this panel.</p>
                <p style={{ marginTop: 14 }}><input type="file" accept="application/json" onChange={importJson} /></p>
              </div>
              <div className="spec">
                <h4>Reset to samples</h4>
                <p>Restores the four sample posts that ship with the site.</p>
                <p style={{ marginTop: 14 }}>
                  <Btn small variant="ghost" type="button" onClick={() => {
                    if (window.confirm('Replace all posts with the four sample posts?')) {
                      store.reset(); refresh(); setFlash(['warn', 'Posts reset to the samples.']);
                    }
                  }}>Reset posts</Btn>
                </p>
              </div>
              <div className="spec">
                <h4>Change the passphrase</h4>
                <p>Open <code>src/store.js</code> and edit <code>CONFIG.adminPass</code>. For a public site, replace this check with server-side authentication.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
