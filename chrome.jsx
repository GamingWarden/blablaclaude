/* eslint-disable */
// Shared chrome: topbar, footer, route handler. Hero terminal.

const { useState, useEffect, useRef, useMemo } = React;

const ROUTES = [
  { id: 'home',    label: '~/home',          path: '/' },
  { id: 'games',   label: '~/games',         path: '/games' },
  { id: 'config',  label: '~/configurator',  path: '/configure' },
  { id: 'web',     label: '~/web',           path: '/web' },
  { id: 'vps',     label: '~/vps',           path: '/vps' },
  { id: 'pricing', label: '~/pricing',       path: '/pricing' },
  { id: 'status',  label: '~/status',        path: '/status' },
  { id: 'locations', label: '~/locations',   path: '/locations' },
  { id: 'dash',    label: '~/dashboard',     path: '/dashboard' },
  { id: 'support', label: '~/support',       path: '/support' },
];

function useTypewriter(text, speed = 28, startDelay = 0) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0; let timer; let start;
    start = setTimeout(() => {
      timer = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(timer); setOut(''); };
  }, [text, speed, startDelay]);
  return out;
}

function Brand({ onClick }) {
  return (
    <div className="brand" onClick={onClick}>
      <span className="brand-glyph">10</span>
      <span className="brand-text"><span className="b">Binary</span>Fall</span>
    </div>
  );
}

function Topbar({ route, setRoute }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function go(id) {
    setRoute(id);
    setOpen(false);
  }

  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Brand onClick={() => go('home')} />
        <nav className="nav nav-desktop">
          {ROUTES.slice(0, 7).map(r => (
            <div
              key={r.id}
              className={`nav-link ${route === r.id ? 'active' : ''}`}
              onClick={() => setRoute(r.id)}
            >
              {r.label}
            </div>
          ))}
        </nav>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span className="meta-status">ALL_SYSTEMS_OK</span>
          <div
            className={`nav-link nav-dash-desktop ${route === 'dash' ? 'active' : ''}`}
            onClick={() => setRoute('dash')}
          >
            ~/dashboard
          </div>
          <button className="btn btn-primary btn-deploy" onClick={() => setRoute('config')}>
            Deploy ▸
          </button>
          <button
            className={`nav-toggle ${open ? 'open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nav-drawer ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <div className="nav-drawer-panel" onClick={e => e.stopPropagation()}>
          <div className="nav-drawer-head">
            <span style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.16em' }}>// NAVIGATION</span>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>✕ close</button>
          </div>
          {ROUTES.map(r => (
            <div
              key={r.id}
              className={`nav-drawer-link ${route === r.id ? 'active' : ''}`}
              onClick={() => go(r.id)}
            >
              <span>{r.label}</span>
              <span style={{ color: route === r.id ? 'var(--green)' : 'var(--dim)' }}>›</span>
            </div>
          ))}
          <div style={{ padding: '20px 24px 24px', borderTop: '1px solid var(--line)', marginTop: 8 }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => go('config')}>
              ▸ Deploy a server
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer({ setRoute }) {
  const yr = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p style={{ fontSize: 12, color: 'var(--mid)', maxWidth: 320, marginTop: 12 }}>
              High-performance servers for gamers and builders.
              Bare-metal NVMe nodes, anti-DDoS, deployed in seconds.
            </p>
            <div className="tag-row">
              <span className="tag green">99.99% UPTIME</span>
              <span className="tag">DDOS PROTECTED</span>
              <span className="tag">NVME ONLY</span>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Game Hosting</div>
            <a className="footer-link" onClick={() => setRoute('games')}>Minecraft</a>
            <a className="footer-link" onClick={() => setRoute('games')}>Rust</a>
            <a className="footer-link" onClick={() => setRoute('games')}>Palworld</a>
            <a className="footer-link" onClick={() => setRoute('games')}>ARK</a>
            <a className="footer-link" onClick={() => setRoute('config')}>Configurator</a>
          </div>
          <div>
            <div className="footer-col-title">Hosting</div>
            <a className="footer-link" onClick={() => setRoute('web')}>Web Hosting</a>
            <a className="footer-link" onClick={() => setRoute('vps')}>VPS Hosting</a>
            <a className="footer-link" onClick={() => setRoute('pricing')}>Pricing</a>
            <a className="footer-link" onClick={() => setRoute('locations')}>Locations</a>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <a className="footer-link" onClick={() => setRoute('status')}>Status</a>
            <a className="footer-link" onClick={() => setRoute('support')}>Support</a>
            <a className="footer-link" onClick={() => setRoute('dash')}>Dashboard</a>
            <a className="footer-link">Docs</a>
            <a className="footer-link">API</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {yr} BinaryFall Hosting · ASN 0xBF · Built on bare metal</span>
          <span>v3.14.159 · sha:0xCAFE · 0100 0010 0100 0110</span>
        </div>
      </div>
    </footer>
  );
}

function Crumbs({ path }) {
  const parts = path.split('/').filter(Boolean);
  return (
    <div className="crumbs">
      <span>$</span> cd <span className="path">~/{parts.join('/')}</span>
    </div>
  );
}

function AsciiDivider() {
  const s = '─'.repeat(200);
  return <div className="ascii-divider">{s}</div>;
}

window.BFChrome = { Topbar, Footer, Brand, Crumbs, AsciiDivider, useTypewriter, ROUTES };
