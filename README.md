# ASENT — React website

A responsive React site for ASENT (formerly Al-Shafi Enterprises), built from the content
of the 2026 company profile.

You have been given three things:

| What | Where | Use it for |
|---|---|---|
| **Single-file preview** | `ASENT-website-preview.jsx` | Seeing the finished site immediately. Every image is embedded, so it needs no folder, no server and no install. |
| **Ready-to-upload build** | `asent-site-build/` | Putting the site online today. Upload the folder to any host, or open `index.html` to view it locally. Nothing to install. |
| **React source project** | `asent-react/` | Editing the site. Vite + React 18, normal components, real image files. |

---

## Running the source project

```bash
cd asent-react
npm install
npm run dev      # development server, opens on http://localhost:5173
npm run build    # production build into dist/
```

`npm run build` writes a `dist/` folder — that is exactly what `asent-site-build/`
contains. Upload the contents of `dist/` to your host and the site is live. The build is
configured with `base: './'`, so it works at a domain root, in a subfolder, or opened
straight from disk.

### File map

```
asent-react/
├── index.html          Vite entry, page title, meta description, Google Fonts
├── vite.config.js
├── public/img/         All 40 images (35 project photos + logo files)
└── src/
    ├── main.jsx        Mounts <App />
    ├── App.jsx         Hash router, header navigation, footer
    ├── pages.jsx       Home, About, Services, Projects, Equipment, Contact
    ├── blog.jsx        Blog listing, single post, admin panel
    ├── ui.jsx          Shared pieces: Section, Split, Cards, DataTable, Reveal, Btn…
    ├── data.js         All site content — text, projects, registers, equipment tables
    ├── store.js        Blog post storage + the admin passphrase
    ├── images.js       Maps image names to paths
    └── theme.js        The complete stylesheet as a string, injected by <App />
```

**To change wording, numbers, projects or table rows, edit `src/data.js`.** It holds the
content for every page in one file, so nothing needs hunting through JSX.

**To change colours, fonts or spacing, edit the `:root` block at the top of
`src/theme.js`.** Every value on the site derives from those tokens.

### Routing

Navigation is hash-based (`#/projects`, `#/blog`, `#/post/some-slug`). That was a
deliberate choice: hash routes work on any static host with no server rewrite rules, and
they work when the built file is opened directly from disk. If you later move to a server
that can rewrite URLs, swap in React Router and drop the `#`.

---

## The admin panel

Reach it at `#/admin`, or from the link at the bottom of every page.

**Default passphrase: `asent2026`**

- **New post** — title, category, author, date, cover image, summary, body
- **Edit** and **Delete** any post, with a confirmation before deleting
- **Draft vs Published** — drafts stay off the public blog until you switch them
- Slugs are generated from the title and made unique automatically
- Cover images are chosen from a dropdown of every image in the site
- **Export / Import** posts as JSON, and **Reset** to the four sample posts

### Two limits, stated plainly

1. **The passphrase is checked in the browser.** It keeps the panel out of casual view; it
   does not secure anything, because anyone can read it in the source. Change
   `CONFIG.adminPass` in `src/store.js`, and for a public site put the admin route behind
   server-side authentication.
2. **Posts save to the browser's local storage.** They are visible on the machine that
   wrote them, not to visitors, and they survive until browsing data is cleared. Export a
   backup regularly. When you want posts published for everyone, replace the `read` and
   `write` functions in `src/store.js` with calls to your API or CMS — the components above
   them need no changes. In the single-file preview, storage is switched to memory only, so
   posts you create there last until the tab reloads.

---

## The contact form

It validates and confirms on screen but does not send yet. Point it at Formspree, Netlify
Forms, an SMTP endpoint or your CRM by editing the `submit` handler in the `Contact`
component in `src/pages.jsx`. Until then the confirmation directs people to
`info@asent.com.pk` and the head office number.

---

## What was verified before delivery

The previous static version was handed over without being run, which is why it appeared as
plain text — opening one `.html` file on its own broke every `assets/…` link. This build
was checked:

- `npm run build` completes with no errors (37 modules, 250 kB JS, 78 kB gzipped)
- All 40 images are copied into the build output
- Every route — Home, About, Services, Projects, Equipment, Insights, a single post, a
  missing post, Contact and Admin — was server-rendered and confirmed to produce content
  and images. This caught a real bug (an import alias that broke the Services page), which
  was fixed.
- Blog create / duplicate-slug / edit / delete / draft-hiding tested through the same store
  the interface uses

## Where the content came from

- **Logo** — extracted from the top right of the profile's cover page, cleaned to a
  transparent PNG. White for dark backgrounds, navy for light, plus the monogram alone.
- **Photography** — 35 images cropped from the renders and site photographs in the profile.
- **Colours** — navy `#17193F` sampled from the profile's back cover; the rust accent
  `#B8462A` is the marker bar that precedes each project title in the PDF.
- **Text** — introduction, services, management statements, organisation chart, HSE and
  quality policy, project registers, client list and equipment schedule.

Two details to confirm before launch: the "51 years / since 1966" figures come straight
from the profile and may need updating, and Gilgit Medical Center is dated 2024 from its
completion certificate because the register table left that cell blank.

## Responsiveness and accessibility

Layouts collapse at 1080px, 860px and 620px: the navigation becomes a toggle menu, split
sections stack, card grids go from three columns to two to one, and the wide register
tables scroll horizontally rather than squashing. Focus outlines are visible for keyboard
users, and all motion is disabled for anyone with reduced-motion turned on. Content is
never hidden waiting for JavaScript — the reveal animation only runs once it is confirmed
it can, with a two-second fallback.
