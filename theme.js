export const CSS = `/* =========================================================
   ASENT — Builders · Contractors · Interior Decorators
   Design tokens sampled from the company profile:
   navy #17193F, rust marker #B8462A, blueprint white #F1F3F8
   ========================================================= */

:root{
  --ink:#0B0D20;
  --navy:#17193F;
  --navy-2:#242863;
  --navy-3:#33377C;
  --paper:#F1F3F8;
  --paper-2:#E3E7EF;
  --white:#FFFFFF;
  --rust:#B8462A;
  --rust-2:#D4633F;
  --steel:#767F9C;
  --line:rgba(23,25,63,.14);
  --line-dark:rgba(255,255,255,.16);

  --display:"Archivo","Arial Narrow",Helvetica,sans-serif;
  --body:"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;

  --wrap:1240px;
  --pad:clamp(20px,4vw,32px);
  --sec:clamp(64px,8vw,116px);
  --radius:2px;
  --ease:cubic-bezier(.22,.61,.36,1);
}

*,*::before,*::after{box-sizing:border-box}

html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}

body{
  margin:0;
  background:var(--paper);
  color:var(--navy);
  font-family:var(--body);
  font-size:16.5px;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}

img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font:inherit}

::selection{background:var(--rust);color:#fff}

:focus-visible{outline:2px solid var(--rust);outline-offset:3px}

/* ---------- type ---------- */
h1,h2,h3,h4{
  font-family:var(--display);
  font-weight:800;
  font-stretch:118%;
  line-height:.98;
  letter-spacing:-.015em;
  margin:0 0 .5em;
  text-transform:uppercase;
  color:var(--navy);
}
h1{font-size:clamp(2.6rem,7vw,5.4rem)}
h2{font-size:clamp(2rem,4.4vw,3.4rem)}
h3{font-size:clamp(1.15rem,2vw,1.5rem);letter-spacing:.005em}
h4{font-size:1rem;font-stretch:105%;letter-spacing:.04em}
p{margin:0 0 1.1em}
p:last-child{margin-bottom:0}

.lede{font-size:clamp(1.05rem,1.5vw,1.28rem);line-height:1.55;color:var(--navy-2)}
.muted{color:var(--steel)}
strong{font-weight:600}

/* eyebrow: mono label with the rust marker bar from the printed profile */
.eyebrow, h1.eyebrow{
  font-family:var(--mono);
  font-size:.74rem;
  font-weight:700;
  font-stretch:normal;
  line-height:1.4;
  letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--rust);
  display:flex;
  align-items:center;
  gap:.7rem;
  margin:0 0 1.1rem;
}
.eyebrow::before, h1.eyebrow::before{
  content:"";
  width:26px;height:3px;
  background:var(--rust);
  flex:none;
}
.section--dark .eyebrow, .section--dark h1.eyebrow{color:var(--rust-2)}

/* ---------- layout ---------- */
.wrap{width:100%;max-width:var(--wrap);margin-inline:auto;padding-inline:var(--pad)}
.section{padding-block:var(--sec);position:relative}
.section--tight{padding-block:clamp(44px,5vw,70px)}
.section--dark{background:var(--navy);color:#EAECF5}
.section--dark h1,.section--dark h2,.section--dark h3,.section--dark h4{color:#fff}
.section--dark .lede{color:#EAECF5}
.section--ink{background:var(--ink);color:#D9DCEA}
.section--ink h1,.section--ink h2,.section--ink h3,.section--ink h4{color:#fff}
.section--ink .lede{color:#EAECF5}
.section--paper2{background:var(--paper-2)}

.section-head{max-width:760px;margin-bottom:clamp(32px,4vw,56px)}
.section-head--split{
  max-width:none;display:grid;gap:24px;
  grid-template-columns:minmax(0,1fr) minmax(0,380px);
  align-items:end;
}
.section-head--split p{margin:0}

/* faint blueprint grid used on light sections */
.grid-bg{position:relative}
.grid-bg::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),
                   linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:72px 72px;
  -webkit-mask-image:radial-gradient(120% 80% at 50% 0%,#000 20%,transparent 78%);
          mask-image:radial-gradient(120% 80% at 50% 0%,#000 20%,transparent 78%);
  opacity:.5;
}
.grid-bg > *{position:relative}

/* ---------- buttons ---------- */
.btn{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:var(--mono);font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;
  padding:14px 22px;border:1px solid var(--navy);background:var(--navy);color:#fff;
  border-radius:var(--radius);cursor:pointer;
  transition:background .25s var(--ease),color .25s var(--ease),border-color .25s var(--ease),transform .25s var(--ease);
}
.btn:hover{background:var(--rust);border-color:var(--rust);transform:translateY(-2px)}
.btn--ghost{background:transparent;color:var(--navy)}
.btn--ghost:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
.btn--light{background:#fff;color:var(--navy);border-color:#fff}
.btn--light:hover{background:var(--rust);border-color:var(--rust);color:#fff}
.btn--outline-light{background:transparent;color:#fff;border-color:rgba(255,255,255,.4)}
.btn--outline-light:hover{background:#fff;color:var(--navy);border-color:#fff}
.btn--sm{padding:10px 16px;font-size:.7rem}

.arrow{transition:transform .25s var(--ease)}
.btn:hover .arrow{transform:translateX(4px)}

/* ---------- top utility bar ---------- */
.utility{
  background:var(--ink);color:#9FA6C2;
  font-family:var(--mono);font-size:.7rem;letter-spacing:.08em;
}
.utility .wrap{display:flex;justify-content:space-between;gap:16px;padding-block:9px;flex-wrap:wrap}
.utility a:hover{color:#fff}
.utility span+span{margin-left:18px}

/* ---------- navigation ---------- */
.site-nav{
  position:sticky;top:0;z-index:60;
  background:var(--navy);
  border-bottom:1px solid rgba(255,255,255,.08);
  transition:background .3s var(--ease),box-shadow .3s var(--ease);
}
body.has-hero .site-nav{background:transparent;border-bottom-color:transparent}
body.has-hero .hero{margin-top:-76px}
body.has-hero .site-nav.is-stuck{background:rgba(11,13,32,.94);backdrop-filter:blur(10px);box-shadow:0 10px 30px rgba(0,0,0,.28)}

.nav-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-block:14px}
.brand{display:flex;align-items:center;gap:12px}
.brand img{height:44px;width:auto}
.brand-tag{
  font-family:var(--mono);font-size:.58rem;letter-spacing:.18em;color:#9BA3C4;
  text-transform:uppercase;border-left:1px solid var(--line-dark);padding-left:12px;line-height:1.5;
}

.nav-links{display:flex;align-items:center;gap:clamp(8px,1.3vw,20px);list-style:none;margin:0;padding:0}
.nav-links a{
  font-family:var(--mono);font-size:.71rem;letter-spacing:.1em;text-transform:uppercase;color:#C6CBE0;
  padding:6px 0;position:relative;transition:color .2s var(--ease);white-space:nowrap;
}
.nav-links a::after{
  content:"";position:absolute;left:0;bottom:0;height:2px;width:0;background:var(--rust);
  transition:width .28s var(--ease);
}
.nav-links a:hover{color:#fff}
.nav-links a:hover::after,.nav-links a.is-active::after{width:100%}
.nav-links a.is-active{color:#fff}

.nav-cta{display:flex;align-items:center;gap:12px}
.nav-toggle{
  display:none;background:transparent;border:1px solid var(--line-dark);color:#fff;
  padding:10px 12px;border-radius:var(--radius);cursor:pointer;line-height:0;
}
.nav-toggle svg{width:20px;height:20px}

/* ---------- hero ---------- */
.hero{
  position:relative;min-height:min(94vh,880px);display:flex;align-items:flex-end;
  background:var(--ink);color:#fff;overflow:hidden;padding-top:120px;
}
.hero-media{position:absolute;inset:0}
.hero-media img, .hero-media video{width:100%;height:100%;object-fit:cover;opacity:.62;transform:scale(1.06);animation:heroDrift 18s var(--ease) forwards}
@keyframes heroDrift{to{transform:scale(1)}}
.hero-media::after{
  content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(11,13,32,.86) 0%,rgba(11,13,32,.35) 42%,rgba(11,13,32,.92) 100%),
             linear-gradient(90deg,rgba(23,25,63,.9) 0%,rgba(23,25,63,.15) 62%);
}
/* signature: the triangular wedge lifted from the profile cover + logo mark */
.hero-wedge{
  position:absolute;right:-6%;top:0;bottom:0;width:58%;
  background:linear-gradient(140deg,rgba(36,40,99,.55),rgba(11,13,32,.1));
  clip-path:polygon(38% 0,100% 0,100% 100%,0 100%);
  border-left:1px solid rgba(255,255,255,.12);
  pointer-events:none;
}
.hero-inner{position:relative;width:100%;padding-bottom:clamp(40px,6vw,84px)}
.hero-header-row{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;margin-bottom:.35em}
.hero-header-row .hero-title-col h1{margin-bottom:0}
.hero-pillars{
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  text-align:right;
  gap:6px;
  padding-bottom:10px;
  border-right:2px solid var(--rust);
  padding-right:16px;
  flex-shrink:0;
}
.hero-pillars span{
  font-family:var(--display);
  font-weight:700;
  font-stretch:115%;
  font-size:clamp(0.92rem,1.4vw,1.2rem);
  letter-spacing:.14em;
  text-transform:uppercase;
  color:#AEB5D6;
  line-height:1.25;
}
.hero-pillars span:hover{color:var(--paper)}
.hero h1{margin-bottom:.35em}
.hero h1 .thin{display:block;font-weight:400;font-stretch:112%;color:#AEB5D6}
.hero h1 .legacy{color:#E3E7EF}
.hero p{max-width:56ch;color:#D3D7EA}
.hero-bottom-row{display:flex;justify-content:space-between;align-items:center;gap:28px;margin-top:34px;flex-wrap:wrap}
.hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:0}
.hero-partner-logos{display:flex;align-items:center;gap:clamp(20px,3vw,44px);flex-wrap:wrap}
.hero-partner-logo{
  height:clamp(48px,5.5vw,72px);
  width:auto;
  max-width:clamp(140px,16vw,220px);
  object-fit:contain;
  filter:drop-shadow(0 4px 16px rgba(0,0,0,.45));
  transition:transform .25s var(--ease),opacity .25s var(--ease);
}
.hero-partner-logo:hover{transform:translateY(-3px)}

.reveal{opacity:0;transform:translateY(26px);transition:opacity .8s var(--ease),transform .8s var(--ease)}
.reveal.is-in{opacity:1;transform:none}
.reveal[data-d="1"]{transition-delay:.12s}
.reveal[data-d="2"]{transition-delay:.24s}
.reveal[data-d="3"]{transition-delay:.36s}
.reveal[data-d="4"]{transition-delay:.48s}

/* ---------- stat strip ---------- */
.stats{background:var(--ink);color:#fff;border-top:1px solid rgba(255,255,255,.08)}
.stats-grid{display:flex;justify-content:center;align-items:center;margin-inline:auto;flex-wrap:wrap}
.stat{flex:0 1 380px;text-align:center;padding:clamp(24px,3vw,38px) clamp(20px,3vw,36px);border-left:1px solid rgba(255,255,255,.1)}
.stat:first-child{border-left:0}
.stat .num{font-family:var(--display);font-weight:800;font-stretch:120%;font-size:clamp(2rem,4vw,3.2rem);line-height:1;display:block}
.stat .num em{font-style:normal;color:var(--rust-2)}
.stat .lbl{font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#9AA2C4;margin-top:10px;display:block;padding-right:0}

/* ---------- marquee (clients) ---------- */
.clients-marquee-section{background:transparent;border-top:1px solid var(--line);padding-top:32px;padding-bottom:12px}
.clients-marquee-head{text-align:center;margin-bottom:16px}
.clients-marquee-title{
  font-family:var(--display);
  font-weight:800;
  font-stretch:118%;
  font-size:clamp(1.4rem,2.8vw,2.2rem);
  text-transform:uppercase;
  color:var(--navy);
  margin:0;
  letter-spacing:.04em;
}
.clients-marquee-section .marquee{border-top:0;padding-top:16px;padding-bottom:32px}
.marquee{overflow:hidden;border-block:1px solid var(--line);background:transparent;padding-block:26px}
.marquee-track{display:flex;align-items:center;gap:clamp(48px,5vw,72px);width:max-content;animation:slide 60s linear infinite}
.marquee:hover .marquee-track{animation-play-state:paused}
.marquee-item{display:flex;align-items:center;gap:clamp(48px,5vw,72px);white-space:nowrap}
.marquee-item img{
  height:clamp(56px,5.5vw,76px);
  width:auto;
  max-width:clamp(180px,18vw,260px);
  object-fit:contain;
  mix-blend-mode:multiply;
  filter:grayscale(100%) opacity(0.85);
  transition:filter .3s var(--ease), opacity .3s var(--ease), transform .3s var(--ease);
}
.marquee-item span{
  font-family:var(--mono);
  font-size:clamp(0.85rem,1.1vw,1rem);
  letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--steel);
}
.marquee-item img:hover{filter:grayscale(0%) opacity(1);transform:scale(1.08)}
.marquee-item::after{content:"";width:8px;height:8px;background:var(--rust);flex:none;border-radius:1px}
@keyframes slide{to{transform:translateX(-50%)}}

/* ---------- intro / split ---------- */
.split{display:grid;gap:clamp(32px,5vw,72px);grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center}
.split--media-first .split-media{order:-1}
.split-media{position:relative}
.split-media img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/3}
.split-media .caption{
  position:absolute;left:0;bottom:0;background:var(--navy);color:#fff;
  font-family:var(--mono);font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;padding:10px 16px;
}
.split-media::before{
  content:"";position:absolute;inset:auto -14px -14px auto;width:46%;height:46%;
  border-right:2px solid var(--rust);border-bottom:2px solid var(--rust);z-index:-1;
}

/* ---------- feature list ---------- */
.feature-list{list-style:none;margin:0;padding:0;display:grid;gap:2px}
.feature-list li{
  display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;
  padding:16px 0;border-bottom:1px solid var(--line);
}
.feature-list li .idx{font-family:var(--mono);font-size:.72rem;color:var(--rust);padding-top:.35em}
.section--dark .feature-list li{border-color:var(--line-dark)}

/* ---------- service cards ---------- */
.cards{display:grid;gap:2px;grid-template-columns:repeat(3,1fr);background:var(--line)}
.card{
  background:var(--paper);padding:clamp(24px,3vw,36px);
  transition:background .3s var(--ease),transform .3s var(--ease);
  position:relative;overflow:hidden;
}
.card::after{
  content:"";position:absolute;right:-30px;bottom:-30px;width:90px;height:90px;
  background:var(--rust);opacity:0;transform:rotate(45deg);
  transition:opacity .35s var(--ease),transform .35s var(--ease);
}
.card:hover{background:#fff;transform:translateY(-4px)}
.card:hover::after{opacity:.12;transform:rotate(45deg) translateY(-14px)}
.card h3{color:var(--navy);margin-bottom:.6em}
.card p{font-size:.95rem;color:var(--navy-2);margin:0;line-height:1.6}
.card .num-tag{font-family:var(--mono);font-size:.7rem;letter-spacing:.16em;color:var(--rust);display:block;margin-bottom:18px}
.section--dark .card{background:#ffffff}
.section--dark .card h3{color:var(--navy) !important}
.section--dark .card p{color:var(--navy-2)}

/* ---------- project cards ---------- */
.project-grid{display:grid;gap:clamp(18px,2.4vw,30px);grid-template-columns:repeat(3,1fr)}
.project-grid--wide{grid-template-columns:repeat(2,1fr)}
.project{
  position:relative;background:#fff;border:1px solid var(--line);overflow:hidden;
  display:flex;flex-direction:column;transition:transform .35s var(--ease),box-shadow .35s var(--ease);
}
.project:hover{transform:translateY(-6px);box-shadow:0 24px 50px -28px rgba(11,13,32,.55)}
.project-thumb{position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--navy)}
.project-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .7s var(--ease),opacity .4s var(--ease)}
.project:hover .project-thumb img{transform:scale(1.06)}
.project-status{
  position:absolute;top:0;left:0;background:var(--navy);color:#fff;
  font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;padding:7px 12px;
}
.project-status[data-s="progress"]{background:var(--rust)}
.project-body{padding:22px;flex:1;display:flex;flex-direction:column;gap:8px}
.project-body h3{font-size:1.12rem;margin:0}
.project-meta{font-family:var(--mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--steel);line-height:1.8}
.project-scope{margin-top:auto;padding-top:14px;border-top:1px solid var(--line);font-size:.85rem;color:var(--navy-2)}

/* filter buttons */
.filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:34px}
.filter{
  font-family:var(--mono);font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;
  padding:9px 15px;border:1px solid var(--line);background:transparent;color:var(--navy);cursor:pointer;border-radius:var(--radius);
  transition:all .22s var(--ease);
}
.filter:hover{border-color:var(--rust);color:var(--rust)}
.filter.is-active{background:var(--rust);color:#fff;border-color:var(--rust)}

/* ---------- tables ---------- */
.table-wrap{overflow-x:auto;border:1px solid var(--line);background:#fff}
table{width:100%;border-collapse:collapse;font-size:.9rem;min-width:640px}
thead th{
  background:var(--navy);color:#fff;text-align:left;font-family:var(--mono);
  font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;padding:14px 16px;font-weight:500;
}
tbody td{padding:13px 16px;border-bottom:1px solid var(--line);vertical-align:top}
tbody tr:nth-child(even){background:#FAFBFD}
tbody tr:hover{background:#F3F5FA}
td .yr{font-family:var(--mono);color:var(--rust)}

/* ---------- clients grid ---------- */
.client-grid{display:grid;gap:2px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));background:var(--line)}
.client-grid li{
  list-style:none;background:var(--paper);padding:18px 20px;font-size:.9rem;
  display:flex;align-items:center;gap:10px;transition:background .25s var(--ease),color .25s var(--ease);
}
.client-grid li::before{content:"";width:6px;height:6px;background:var(--rust);flex:none}
.client-grid li:hover{background:var(--navy);color:#fff}

/* ---------- quotes ---------- */
.quote-grid{display:grid;gap:2px;grid-template-columns:repeat(3,1fr);background:var(--line-dark)}
.quote{background:var(--navy);padding:clamp(24px,3vw,34px)}
.quote p{font-size:1rem;line-height:1.6;color:#DDE0EE}
.quote cite{
  display:block;margin-top:18px;font-style:normal;font-family:var(--mono);
  font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:var(--rust-2);
}

/* ---------- CTA band ---------- */
.cta-band{position:relative;background:var(--ink);color:#fff;overflow:hidden}
.cta-band .wrap{position:relative;display:grid;gap:28px;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding-block:clamp(44px,6vw,72px)}
.cta-band::before{
  content:"";position:absolute;right:0;top:0;bottom:0;width:40%;
  background:linear-gradient(135deg,var(--navy-2),transparent 70%);
  clip-path:polygon(30% 0,100% 0,100% 100%,0 100%);
}
.cta-band h2{margin-bottom:.25em;color:#fff}
.cta-band .lede,.cta-band p{color:#EAECF5}

/* ---------- blog ---------- */
.post-grid{display:grid;gap:clamp(18px,2.4vw,28px);grid-template-columns:repeat(3,1fr)}
.post-card{background:#fff;border:1px solid var(--line);display:flex;flex-direction:column;transition:transform .3s var(--ease),box-shadow .3s var(--ease)}
.post-card:hover{transform:translateY(-5px);box-shadow:0 22px 44px -26px rgba(11,13,32,.5)}
.post-card .thumb{aspect-ratio:16/9;overflow:hidden;background:var(--paper-2)}
.post-card .thumb img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.post-card:hover .thumb img{transform:scale(1.05)}
.post-card .body{padding:22px;display:flex;flex-direction:column;gap:10px;flex:1}
.post-card h3{font-size:1.1rem;margin:0}
.post-card p{font-size:.92rem;color:var(--steel);margin:0}
.post-meta{font-family:var(--mono);font-size:.67rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rust)}
.post-more{margin-top:auto;padding-top:14px;font-family:var(--mono);font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:var(--navy)}

.article{max-width:760px;margin-inline:auto}
.article img{margin-block:28px}
.article h2{font-size:clamp(1.5rem,3vw,2.1rem);margin-top:1.6em}
.article h3{margin-top:1.6em}
.article ul,.article ol{padding-left:1.2em}
.article li{margin-bottom:.5em}
.article blockquote{
  margin:32px 0;padding:4px 0 4px 22px;border-left:3px solid var(--rust);
  font-size:1.1rem;color:var(--navy-2);
}

/* ---------- forms ---------- */
.field{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.field label{font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--steel)}
.field input,.field select,.field textarea{
  font:inherit;font-size:.95rem;color:var(--navy);background:#fff;
  border:1px solid var(--line);border-radius:var(--radius);padding:13px 14px;width:100%;
  transition:border-color .2s var(--ease),box-shadow .2s var(--ease);
}
.field input:focus,.field select:focus,.field textarea:focus{
  outline:none;border-color:var(--navy);box-shadow:0 0 0 3px rgba(36,40,99,.12);
}
.field textarea{min-height:150px;resize:vertical;line-height:1.6}
.field-row{display:grid;gap:18px;grid-template-columns:1fr 1fr}
.form-note{font-size:.82rem;color:var(--steel)}

.notice{
  padding:14px 16px;border-left:3px solid var(--rust);background:#fff;
  font-size:.9rem;margin-bottom:22px;
}
.notice--ok{border-color:#2F7D5B}
.notice--warn{border-color:#B8862A}

/* ---------- admin ---------- */
.admin-shell{display:grid;grid-template-columns:250px minmax(0,1fr);gap:0;min-height:calc(100vh - 62px)}
.admin-side{background:var(--navy);color:#C9CDE3;padding:28px 22px}
.admin-side h4{color:#fff;margin-bottom:20px}
.admin-side nav{display:flex;flex-direction:column;gap:4px}
.admin-side button{
  text-align:left;background:transparent;border:0;color:#C9CDE3;padding:11px 12px;cursor:pointer;
  font-family:var(--mono);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;border-radius:var(--radius);
  transition:background .2s var(--ease),color .2s var(--ease);
}
.admin-side button:hover{background:rgba(255,255,255,.08);color:#fff}
.admin-side button.is-active{background:var(--rust);color:#fff}
.admin-main{padding:clamp(24px,3vw,42px);background:var(--paper)}
.admin-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:26px}
.admin-panel{display:none}
.admin-panel.is-open{display:block}

.post-row{
  display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:18px;align-items:center;
  background:#fff;border:1px solid var(--line);padding:14px;margin-bottom:10px;
}
.post-row img{width:64px;height:48px;object-fit:cover;background:var(--paper-2)}
.post-row .info{min-width:0}
.post-row .info strong{display:block;font-size:1rem;line-height:1.3}
.post-row .actions{display:flex;gap:8px;flex-wrap:wrap}
.chip{
  font-family:var(--mono);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;
  padding:4px 8px;border:1px solid var(--line);color:var(--steel);
}
.chip--draft{border-color:var(--rust);color:var(--rust)}

.login-box{max-width:420px;margin:clamp(50px,10vh,110px) auto;background:#fff;border:1px solid var(--line);padding:clamp(26px,4vw,40px)}

/* ---------- page header (interior pages) ---------- */
.page-head{position:relative;background:var(--navy);color:#fff;padding:clamp(70px,9vw,120px) 0 clamp(40px,5vw,64px);overflow:hidden}
.page-head::after{
  content:"";position:absolute;right:-4%;top:-30%;width:46%;height:180%;
  background:linear-gradient(150deg,rgba(51,55,124,.55),transparent 65%);
  clip-path:polygon(42% 0,100% 0,100% 100%,0 100%);
}
.page-head .wrap{position:relative}
.page-head p{max-width:60ch;color:#C8CDE4;margin-top:14px}
.crumbs{font-family:var(--mono);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#8F97BC;margin-bottom:18px}
.crumbs a:hover{color:#fff}

/* ---------- footer ---------- */
.site-footer{background:var(--ink);color:#9AA2C4;padding-top:clamp(50px,6vw,80px)}
.footer-grid{display:grid;gap:36px;grid-template-columns:1.6fr 1fr 1fr 1.3fr;padding-bottom:44px}
.site-footer h4{color:#fff;font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;font-weight:500;margin-bottom:16px;font-stretch:100%}
.site-footer a:hover{color:#fff}
.site-footer ul{list-style:none;margin:0;padding:0;display:grid;gap:9px;font-size:.9rem}
.footer-brand img{height:52px;margin-bottom:18px}
.footer-brand p{font-size:.9rem;max-width:34ch}
.footer-bottom{
  border-top:1px solid rgba(255,255,255,.1);padding-block:20px;
  display:flex;justify-content:center;align-items:center;text-align:center;gap:14px;flex-wrap:wrap;position:relative;
  font-family:var(--mono);font-size:.68rem;letter-spacing:.1em;
}
.badges{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.badge{
  border:1px solid rgba(255,255,255,.18);padding:6px 10px;
  font-family:var(--mono);font-size:.62rem;letter-spacing:.1em;color:#B9C0DC;
}

/* ---------- misc ---------- */
.org-chart{display:grid;gap:2px;background:var(--line);grid-template-columns:repeat(5,1fr)}
.org-col{background:var(--paper);padding:20px}
.org-col h4{color:var(--navy);margin-bottom:14px;font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;font-stretch:100%}
.org-col ul{list-style:none;margin:0;padding:0;display:grid;gap:8px;font-size:.86rem;color:var(--navy-2)}
.org-col li{padding-left:14px;position:relative}
.org-col li::before{content:"";position:absolute;left:0;top:.62em;width:6px;height:1px;background:var(--rust)}

.leaders{display:grid;gap:2px;grid-template-columns:repeat(3,1fr);background:var(--line-dark)}
.leader{background:var(--navy-2);padding:clamp(24px,3vw,34px);display:flex;flex-direction:column;align-items:flex-start}
.leader-photo{width:100px;height:100px;border-radius:50%;object-fit:cover;margin-bottom:18px;border:3px solid var(--rust-2);filter:grayscale(20%)}
.leader .role{font-family:var(--mono);font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rust-2);margin-bottom:14px}
.leader h3{margin-bottom:.4em}
.leader p{font-size:.92rem;color:#CFD3E6}

.contact-grid{display:grid;gap:clamp(24px,4vw,56px);grid-template-columns:1fr 1fr}
.office{border-top:2px solid var(--navy);padding-top:18px;margin-bottom:28px}
.office h4{color:var(--navy);margin-bottom:8px}
.office p{font-size:.92rem;color:var(--navy-2);margin:0}

.spec-list{display:grid;gap:2px;grid-template-columns:repeat(2,1fr);background:var(--line)}
.spec{background:var(--paper);padding:24px;transition:background .25s var(--ease),transform .25s var(--ease)}
.spec h4{margin-bottom:10px;color:var(--navy);font-size:1.05rem;font-weight:800;letter-spacing:.02em}
.spec p{font-size:.92rem;color:var(--navy-2);margin:0;line-height:1.6}
.spec:hover{background:#ffffff}

.section--dark .spec-list{background:var(--line-dark)}
.section--dark .spec{background:#ffffff;border:1px solid rgba(255,255,255,.08)}
.section--dark .spec h4{color:var(--navy) !important}
.section--dark .spec p{color:var(--navy-2)}

/* ---------- responsive ---------- */
@media (max-width:1080px){
  .cards,.project-grid,.post-grid,.quote-grid{grid-template-columns:repeat(2,1fr)}
  .org-chart{grid-template-columns:repeat(2,1fr)}
  .footer-grid{grid-template-columns:1fr 1fr}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .stat:nth-child(3){border-left:0}
  .stat{border-top:1px solid rgba(255,255,255,.1)}
  .stat:nth-child(-n+2){border-top:0}
  /* Fix 4: Footer bottom — prevent absolute overlap */
  .footer-bottom{flex-direction:column;align-items:center;text-align:center}
  .footer-bottom span:last-child{position:static}
}

@media (max-width:960px){
  .nav-toggle{display:inline-flex}
  .nav-links{
    position:absolute;left:0;right:0;top:100%;background:var(--ink);
    flex-direction:column;align-items:stretch;gap:0;padding:10px var(--pad) 22px;
    display:none;border-top:1px solid rgba(255,255,255,.1);
  }
  .nav-links.is-open{display:flex}
  .nav-links a{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.08);display:block}
  .nav-cta .btn{display:none}
  .split,.contact-grid,.section-head--split{grid-template-columns:1fr}
  .split--media-first .split-media{order:0}
  .cta-band .wrap{grid-template-columns:1fr}
  .hero-header-row{flex-direction:column;align-items:flex-start;gap:20px}
  .hero-pillars{align-items:flex-start;text-align:left;border-right:0;border-left:2px solid var(--rust);padding-right:0;padding-left:14px;padding-bottom:0}
  .hero-bottom-row{flex-direction:column;align-items:flex-start;gap:24px}
  .hero-partner-logos{gap:20px;align-items:center}
  .admin-shell{grid-template-columns:1fr}
  .admin-side{padding:18px}
  .admin-side nav{flex-direction:row;flex-wrap:wrap}
  /* Fix 3: Hide brand tagline on tablet/mobile */
  .brand-tag{display:none}
  /* Fix 1: Lightbox tablet adjustments */
  .lightbox-backdrop{padding:16px}
  .lightbox-stage{gap:12px}
  .lightbox-nav-btn{width:42px;height:42px;font-size:1.3rem}
  .lightbox-title h3{font-size:1.15rem}
  .lightbox-img{max-height:clamp(280px, 48vh, 460px)}
  /* Fix 2: Project status tabs — ensure proper wrapping */
  .project-status-tabs{gap:8px !important}
  .project-status-tabs .btn{padding:8px 14px !important;font-size:.72rem !important}
}

@media (max-width:620px){
  .cards,.project-grid,.project-grid--wide,.post-grid,.quote-grid,.leaders,
  .org-chart,.footer-grid,.field-row,.spec-list{grid-template-columns:1fr}
  .stats-grid{flex-direction:column;align-items:center}
  .stat{border-left:0;border-bottom:1px solid rgba(255,255,255,.08);width:100%;max-width:none;padding:18px 0}
  .stat:last-child{border-bottom:0}
  .post-row{grid-template-columns:1fr;gap:12px}
  .post-row img{width:100%;height:120px}
  body{font-size:16px}
  /* Fix 1: Lightbox fully mobile-optimised */
  .lightbox-backdrop{padding:12px 10px}
  .lightbox-header{flex-direction:column;align-items:flex-start;gap:8px;margin-bottom:8px}
  .lightbox-close-btn{position:absolute;top:10px;right:10px;width:36px;height:36px;font-size:1rem}
  .lightbox-stage{flex-direction:row;gap:8px}
  .lightbox-nav-btn{width:36px;height:36px;font-size:1.1rem}
  .lightbox-img{max-height:clamp(220px, 42vh, 340px)}
  .lightbox-details{margin-top:8px}
  .lightbox-details p{font-size:.82rem}
  .lightbox-details .project-scope{font-size:.82rem}
  .lightbox-thumbnails{gap:8px;padding-top:8px}
  .lightbox-thumb-item{width:52px;height:38px}
  .lightbox-title h3{font-size:1rem;padding-right:40px}
  .lightbox-counter{font-size:.65rem}
  /* Fix 2: Project status tabs — stack on phones */
  .project-status-tabs{flex-direction:column !important;gap:6px !important}
  .project-status-tabs .btn{width:100% !important;text-align:center !important;padding:10px !important}
  /* Fix 4: Footer bottom on small screens */
  .footer-bottom{gap:8px;font-size:.6rem}
}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms !important;animation-iteration-count:1 !important;transition-duration:.001ms !important}
  html{scroll-behavior:auto}
  .reveal{opacity:1;transform:none}
}

/* React build additions */
.admin-shell{min-height:60vh}
.marquee-track span{white-space:nowrap}
.project-meta span{display:block}
.brand-tag span{display:block}
img{background:var(--paper-2)}
.hero-media img, .brand img, .site-footer .footer-brand img, .lightbox-img, .lightbox-thumb-item img{background:transparent !important}
.site-footer .footer-brand img{height:44px;width:auto;margin-bottom:16px}

/* ---------- Lightbox Modal & Slider ---------- */
.project-thumb{cursor:pointer;position:relative;overflow:hidden}
.project-thumb-overlay{
  position:absolute;inset:0;background:rgba(11,13,32,.45);
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity .3s var(--ease);z-index:2;
}
.project-thumb:hover .project-thumb-overlay{opacity:1}
.project-thumb:hover img{transform:scale(1.05)}
.project-thumb img{transition:transform .4s var(--ease)}
.lightbox-btn-zoom{
  background:rgba(255,255,255,.95);color:var(--navy);
  font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  padding:8px 16px;border-radius:var(--radius);font-weight:600;
  display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(0,0,0,.3);
}

.lightbox-backdrop{
  position:fixed;inset:0;z-index:999;
  background:rgba(11,13,32,.95);backdrop-filter:blur(16px);
  display:flex;flex-direction:column;justify-content:space-between;
  padding:14px 20px;animation:fadeIn .25s var(--ease);
  overflow-y:auto;
}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

.lightbox-header{display:flex;align-items:center;justify-content:space-between;color:#fff;z-index:1000;max-width:min(1380px, 94vw);width:100%;margin:0 auto 6px}
.lightbox-title h3{margin:0;color:#fff;font-size:1.35rem;font-weight:800;letter-spacing:.02em}
.lightbox-counter{font-family:var(--mono);font-size:.76rem;letter-spacing:.14em;color:var(--rust-2);margin-top:2px;display:block}
.lightbox-close-btn{
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#fff;
  width:44px;height:44px;border-radius:50%;cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:1.2rem;
  transition:background .2s var(--ease),transform .2s var(--ease);
}
.lightbox-close-btn:hover{background:var(--rust);border-color:var(--rust);transform:scale(1.1)}

.lightbox-stage{
  flex:1;display:flex;align-items:center;justify-content:center;
  position:relative;max-width:min(1480px, 96vw);width:100%;margin:0 auto;gap:16px;
}
.lightbox-nav-btn{
  background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;
  width:52px;height:52px;border-radius:50%;cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-size:1.6rem;flex-shrink:0;
  transition:background .25s var(--ease),transform .25s var(--ease);
}
.lightbox-nav-btn:hover{background:var(--rust);border-color:var(--rust);transform:scale(1.1)}

.lightbox-media-wrapper{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;width:100%;max-width:min(1380px, 94vw);
}
.lightbox-img{
  width:min(1307px, 90vw);
  max-height:min(760px, 68vh);
  aspect-ratio:1307 / 760;
  object-fit:cover;
  background:transparent !important;
  border-radius:8px;
  box-shadow:0 24px 64px rgba(0,0,0,.85);
  border:1px solid rgba(255,255,255,.12);
  display:block;
  margin:0 auto;
  image-rendering:auto;
  animation:slideFade .28s var(--ease);
}
@keyframes slideFade{from{opacity:.4;transform:scale(.98)}to{opacity:1;transform:scale(1)}}

.lightbox-details{margin-top:10px;text-align:center;width:100%;max-width:min(1307px, 90vw);color:#EAECF5}
.lightbox-details p{margin:2px 0;font-size:.92rem}
.lightbox-details .project-meta{color:#FFFFFF;font-size:.82rem;letter-spacing:.12em;margin-bottom:4px;font-weight:600}
.lightbox-details .project-scope{color:#D5DAEB;border-top:none;padding-top:2px;font-size:.92rem;line-height:1.5}

.lightbox-thumbnails{display:flex;justify-content:center;gap:12px;padding-top:10px;overflow-x:auto}
.lightbox-thumb-item{
  width:72px;height:50px;border-radius:4px;overflow:hidden;cursor:pointer;
  border:2px solid transparent;opacity:.5;transition:opacity .25s var(--ease),border-color .25s var(--ease),transform .25s var(--ease);
}
.lightbox-thumb-item.is-active,.lightbox-thumb-item:hover{opacity:1;border-color:var(--rust);transform:scale(1.08)}
.lightbox-thumb-item img{width:100%;height:100%;object-fit:cover;background:transparent !important}

/* ================================================================
   ADMIN PANEL STYLES
   ================================================================ */

/* ---- Gate / Login ---- */
.admin-gate{
  min-height:80vh;display:flex;align-items:center;justify-content:center;
  padding:40px var(--pad);
}
.admin-gate-card{
  background:var(--white);border-radius:16px;padding:48px 40px;
  max-width:420px;width:100%;
  box-shadow:0 8px 40px rgba(23,25,63,.08);
  text-align:center;
}
.admin-gate-icon{font-size:2.8rem;margin-bottom:16px}
.admin-gate-card h2{margin-bottom:6px;text-transform:none;font-size:1.6rem}
.admin-gate-card .muted{margin-bottom:28px;font-size:.95rem}
.admin-gate-card .field{text-align:left;margin-bottom:20px}
.admin-gate-card input{width:100%;padding:12px 16px;border:1.5px solid var(--line);border-radius:8px;font-size:1rem;transition:border-color .2s}
.admin-gate-card input:focus{border-color:var(--navy);outline:none}
.admin-error{color:#dc2626;font-size:.88rem;margin:0 0 14px;font-weight:500}

/* ---- Wrap ---- */
.admin-wrap{
  max-width:1280px;margin:0 auto;padding:32px var(--pad) 80px;
}

/* ---- Header ---- */
.admin-header{
  display:flex;align-items:flex-start;justify-content:space-between;
  flex-wrap:wrap;gap:16px;margin-bottom:32px;
}
.admin-header h1{font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:4px;text-transform:none}

/* ---- Stats ---- */
.admin-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:28px}
.admin-stat-card{
  background:var(--white);border-radius:12px;padding:24px 20px;
  border:1px solid var(--line);text-align:center;
  transition:transform .2s var(--ease),box-shadow .2s var(--ease);
}
.admin-stat-card:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(23,25,63,.07)}
.admin-stat-num{display:block;font-family:var(--display);font-size:2.2rem;font-weight:800;color:var(--navy);line-height:1.1}
.admin-stat-label{display:block;font-size:.82rem;color:var(--steel);margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
.admin-stat-card--live .admin-stat-num{color:#16a34a}
.admin-stat-card--done .admin-stat-num{color:var(--navy-2)}

/* ---- Toolbar ---- */
.admin-toolbar{
  display:flex;align-items:center;gap:12px;flex-wrap:wrap;
  margin-bottom:24px;
}
.admin-toolbar input{padding:10px 16px;border:1.5px solid var(--line);border-radius:8px;font-size:.95rem;width:100%}
.admin-toolbar input:focus{border-color:var(--navy);outline:none}

/* ---- Table ---- */
.admin-table-wrap{
  background:var(--white);border-radius:12px;border:1px solid var(--line);
  overflow-x:auto;margin-bottom:24px;
}
.admin-table{width:100%;border-collapse:collapse;font-size:.92rem}
.admin-table thead{background:var(--paper)}
.admin-table th{
  padding:14px 16px;text-align:left;font-weight:700;font-size:.78rem;
  text-transform:uppercase;letter-spacing:.06em;color:var(--steel);
  border-bottom:1.5px solid var(--line);white-space:nowrap;
}
.admin-table td{padding:14px 16px;border-bottom:1px solid var(--line);vertical-align:middle}
.admin-table tbody tr{transition:background .15s}
.admin-table tbody tr:hover{background:rgba(23,25,63,.02)}
.admin-table tbody tr:last-child td{border-bottom:none}

.admin-table-thumb{width:56px;height:40px;border-radius:6px;overflow:hidden;background:var(--paper)}
.admin-table-thumb img{width:100%;height:100%;object-fit:cover}
.admin-no-img{display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--steel);font-size:.8rem}

.admin-project-title{display:block;font-weight:600;color:var(--navy);margin-bottom:2px}
.admin-project-meta{display:block;font-size:.8rem;color:var(--steel);max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* ---- Badges ---- */
.admin-badge{
  display:inline-block;padding:4px 10px;border-radius:20px;font-size:.75rem;
  font-weight:600;white-space:nowrap;
}
.admin-badge--live{background:#dcfce7;color:#15803d}
.admin-badge--done{background:#e0e7ff;color:#3730a3}

/* ---- Category Tags ---- */
.admin-cat-tags{display:flex;flex-wrap:wrap;gap:4px}
.admin-cat-tag{
  display:inline-block;padding:2px 8px;border-radius:4px;
  font-size:.72rem;background:var(--paper);color:var(--navy-2);
  font-weight:500;
}

/* ---- Action Buttons ---- */
.admin-actions{display:flex;gap:6px}
.btn--danger{
  background:#dc2626;color:#fff;border:1.5px solid #dc2626;
  padding:6px 14px;border-radius:6px;font-size:.82rem;font-weight:600;
  cursor:pointer;transition:background .2s,transform .15s;
}
.btn--danger:hover{background:#b91c1c;transform:translateY(-1px)}

/* ---- Editor ---- */
.admin-editor-header{margin-bottom:28px}
.admin-editor-header h2{margin-top:16px;text-transform:none;font-size:clamp(1.3rem,2.5vw,1.8rem)}

.admin-editor-grid{display:grid;grid-template-columns:1fr 340px;gap:28px;align-items:start}
@media(max-width:900px){.admin-editor-grid{grid-template-columns:1fr}}

.admin-editor-main{display:flex;flex-direction:column;gap:24px}
.admin-editor-sidebar{display:flex;flex-direction:column;gap:20px}

.admin-card{
  background:var(--white);border-radius:12px;padding:28px 24px;
  border:1px solid var(--line);
}
.admin-card-title{
  font-size:1rem;text-transform:none;letter-spacing:0;
  margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--line);
}

.admin-row-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.admin-row-2{grid-template-columns:1fr}}

/* ---- Admin Form Fields ---- */
.admin-card .field{margin-bottom:18px}
.admin-card .field:last-child{margin-bottom:0}
.admin-card label{display:block;font-size:.85rem;font-weight:600;color:var(--navy);margin-bottom:6px}
.admin-card input[type=text],.admin-card input[type=search],.admin-card input:not([type]),.admin-card textarea,.admin-card select{
  width:100%;padding:10px 14px;border:1.5px solid var(--line);border-radius:8px;
  font-size:.95rem;font-family:var(--body);resize:vertical;transition:border-color .2s;
  background:var(--white);
}
.admin-card input:focus,.admin-card textarea:focus,.admin-card select:focus{border-color:var(--navy);outline:none}
.form-hint{display:block;font-size:.78rem;color:var(--steel);margin-top:4px}

/* ---- Checkbox ---- */
.admin-checkbox{
  display:flex;align-items:center;gap:10px;cursor:pointer;
  padding:6px 0;font-size:.9rem;
}
.admin-checkbox input[type=checkbox]{
  width:18px;height:18px;accent-color:var(--navy);cursor:pointer;flex-shrink:0;
}

/* ---- Image Picker ---- */
.admin-img-picker label{display:block;font-size:.85rem;font-weight:600;color:var(--navy);margin-bottom:8px}
.admin-img-picker-preview{
  width:100%;aspect-ratio:16/10;border-radius:8px;overflow:hidden;
  background:var(--paper);margin-bottom:12px;border:1.5px dashed var(--line);
}
.admin-img-picker-preview img{width:100%;height:100%;object-fit:cover}
.admin-img-placeholder{
  display:flex;align-items:center;justify-content:center;
  width:100%;height:100%;color:var(--steel);font-size:.9rem;
}
.admin-img-picker-controls{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.admin-img-picker-controls select{
  flex:1;min-width:140px;padding:8px 10px;border:1.5px solid var(--line);
  border-radius:6px;font-size:.85rem;background:var(--white);
}
.admin-or{font-size:.8rem;color:var(--steel)}

/* ---- Gallery Manager ---- */
.admin-gallery-mgr label{display:block;font-size:.85rem;font-weight:600;color:var(--navy);margin-bottom:10px}
.admin-gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;margin-bottom:8px}
.admin-gallery-grid-v2{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:14px;
  margin-bottom:8px;
}
.admin-gallery-card{
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:10px;
  padding:10px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.admin-gallery-card-head{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.admin-gallery-card-badge{
  font-size:.74rem;
  font-weight:700;
  color:var(--navy);
  background:var(--white);
  padding:2px 8px;
  border-radius:12px;
  border:1px solid var(--line);
}
.admin-gallery-card-arrows{
  display:flex;
  gap:3px;
}
.admin-gallery-card-arrows button{
  background:var(--white);
  border:1px solid var(--line);
  border-radius:4px;
  cursor:pointer;
  font-size:.78rem;
  padding:2px 6px;
  color:var(--navy);
  transition:all .15s;
}
.admin-gallery-card-arrows button:hover{
  background:var(--navy);
  color:#fff;
}
.admin-gallery-card-arrows button.danger:hover{
  background:#dc2626;
  border-color:#dc2626;
}
.admin-gallery-card-arrows button:disabled{
  opacity:.3;
  cursor:default;
}
.admin-gallery-card-preview{
  width:100%;
  aspect-ratio:16/10;
  border-radius:6px;
  overflow:hidden;
  background:#000;
}
.admin-gallery-card-preview img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.admin-gallery-card-actions{
  display:flex;
  flex-direction:column;
}

.admin-gallery-item{
  position:relative;border-radius:8px;overflow:hidden;
  aspect-ratio:1;background:var(--paper);border:1.5px solid var(--line);
}
.admin-gallery-item img{width:100%;height:100%;object-fit:cover}
.admin-gallery-item-actions{
  position:absolute;bottom:0;left:0;right:0;
  display:flex;gap:2px;background:rgba(0,0,0,.65);
  justify-content:center;padding:3px;
}
.admin-gallery-item-actions button{
  background:none;border:none;color:#fff;cursor:pointer;
  font-size:.8rem;padding:3px 7px;border-radius:3px;transition:background .15s;
}
.admin-gallery-item-actions button:hover{background:rgba(255,255,255,.2)}
.admin-gallery-item-actions button.danger:hover{background:#dc2626}
.admin-gallery-item-actions button:disabled{opacity:.3;cursor:default}
.admin-gallery-item-num{
  position:absolute;top:4px;left:4px;background:var(--navy);color:#fff;
  font-size:.65rem;font-weight:700;width:18px;height:18px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
}

/* ---- Features Editor ---- */
.admin-features label{display:block;font-size:.85rem;font-weight:600;color:var(--navy);margin-bottom:10px}
.admin-features-list{
  list-style:none;padding:0;margin:0 0 12px;
}
.admin-features-list li{
  display:flex;align-items:center;justify-content:space-between;
  padding:8px 12px;background:var(--paper);border-radius:6px;
  margin-bottom:6px;font-size:.9rem;
}
.admin-features-list li button{
  background:none;border:none;cursor:pointer;color:#dc2626;
  font-size:1rem;padding:2px 6px;border-radius:4px;transition:background .15s;
}
.admin-features-list li button:hover{background:rgba(220,38,38,.1)}
.admin-features-add{display:flex;gap:8px}
.admin-features-add input{
  flex:1;padding:8px 12px;border:1.5px solid var(--line);border-radius:6px;
  font-size:.9rem;
}
.admin-features-add input:focus{border-color:var(--navy);outline:none}

/* ---- Overlay / Dialog ---- */
.admin-overlay{
  position:fixed;inset:0;background:rgba(11,13,32,.55);
  display:flex;align-items:center;justify-content:center;
  z-index:9999;padding:20px;backdrop-filter:blur(4px);
}
.admin-dialog{
  background:var(--white);border-radius:14px;padding:32px 28px;
  max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.2);
}
.admin-dialog h3{text-transform:none;font-size:1.2rem;margin-bottom:10px}
.admin-dialog p{color:var(--steel);font-size:.95rem;margin-bottom:24px}
.admin-dialog-actions{display:flex;gap:10px;justify-content:flex-end}

/* ---- Toast ---- */
.admin-toast{
  position:fixed;top:24px;right:24px;z-index:10000;
  padding:14px 22px;border-radius:10px;
  font-size:.92rem;font-weight:600;
  display:flex;align-items:center;gap:10px;
  box-shadow:0 8px 32px rgba(0,0,0,.15);
  animation:toastIn .3s var(--ease);
}
.admin-toast--success{background:#16a34a;color:#fff}
.admin-toast--error{background:#dc2626;color:#fff}
@keyframes toastIn{from{opacity:0;transform:translateY(-12px) scale(.96)}to{opacity:1;transform:none}}

/* ---- Loading ---- */
.admin-loading{
  text-align:center;padding:60px 20px;font-size:1.05rem;color:var(--steel);
}

/* ---- Footer Note ---- */
.admin-footer-note{
  background:var(--paper);border-radius:10px;padding:18px 22px;
  margin-top:20px;
}
.admin-footer-note p{font-size:.88rem;color:var(--steel);margin:0}
.admin-footer-note strong{color:var(--navy)}

/* ---- Admin responsive ---- */
@media(max-width:700px){
  .admin-header{flex-direction:column}
  .admin-stats{grid-template-columns:1fr}
  .admin-toolbar{flex-direction:column}
  .admin-table th:nth-child(4),.admin-table td:nth-child(4),
  .admin-table th:nth-child(5),.admin-table td:nth-child(5){display:none}
  .admin-actions{flex-direction:column;gap:4px}
  .admin-row-2{grid-template-columns:1fr}
  .admin-img-picker-controls{flex-direction:column;align-items:stretch}
}
`;