/* eslint-disable */
// Landing page — terminal hero, game cards, services strip.

const { useState: useS1, useEffect: useE1 } = React;

function HeroTerminal({ setRoute }) {
  const lines = [
    { p: '$', t: 'binaryfall --init --target=production', delay: 0 },
    { c: '# spinning up node fleet across 9 regions...', delay: 800 },
    { o: '✓ NYC.0 · 1.2ms', delay: 1100 },
    { o: '✓ FRA.0 · 1.4ms', delay: 1200 },
    { o: '✓ SGP.0 · 2.1ms', delay: 1300 },
    { p: '$', t: 'deploy --game=minecraft --ram=8 --slots=80', delay: 1700 },
    { c: '# server online → mc.binaryfall.io:25565', delay: 2200, last: true },
  ];
  const [step, setStep] = useS1(0);
  useE1(() => {
    const timers = lines.map((_, i) => setTimeout(() => setStep(i + 1), lines[i].delay + 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-bar">
        <span className="term-dot r" />
        <span className="term-dot a" />
        <span className="term-dot g" />
        <span className="term-title">root@binaryfall:~/deploy.sh</span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, step).map((l, i) => (
          <div key={i} className="term-line">
            {l.p && <span className="term-prompt">{l.p}</span>}
            {l.t && <span>{l.t}</span>}
            {l.c && <span className="term-comment">{l.c}</span>}
            {l.o && <span className="term-out">{l.o}</span>}
          </div>
        ))}
        <div className="term-line">
          <span className="term-prompt">$</span>
          <span><span className="cursor" /></span>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setRoute }) {
  const { GAMES, COMING_SOON } = window.BF;

  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <span className="eyebrow">// 0x00 · BinaryFall Hosting</span>
          <h1 className="hero-headline">
            Servers that fall<br />
            into <span className="accent">place.</span>
            <span className="ascii">{`{01101111}`}</span>
          </h1>
          <p className="hero-sub">
            Game servers, web hosting, and VPS — deployed on bare-metal NVMe nodes
            with sub-millisecond switching, automated backups, and DDoS armor that
            actually works. No bullshit, no upsells.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setRoute('config')}>
              ▸ Configure a server
            </button>
            <button className="btn" onClick={() => setRoute('pricing')}>
              ◇ View pricing
            </button>
            <button className="btn btn-ghost" onClick={() => setRoute('status')}>
              ● Live status
            </button>
          </div>

          <div style={{ marginTop: 48 }}>
            <HeroTerminal setRoute={setRoute} />
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">99.99%</div>
              <div className="stat-label">Uptime · 90d</div>
            </div>
            <div className="stat">
              <div className="stat-num">9</div>
              <div className="stat-label">Datacenters</div>
            </div>
            <div className="stat">
              <div className="stat-num">12,481</div>
              <div className="stat-label">Active servers</div>
            </div>
            <div className="stat">
              <div className="stat-num">0.42ms</div>
              <div className="stat-label">Median switch</div>
            </div>
          </div>
        </div>

        <window.BFChrome.AsciiDivider />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <span className="eyebrow">// 0x01 · Game Hosting</span>
            <h2 className="section-title">Pick your game.</h2>
            <p className="section-sub">
              Pre-tuned templates with one-click installers, automatic mod loaders, and
              instant rollback snapshots. Spin up in 30 seconds.
            </p>
          </div>
          <button className="btn" onClick={() => setRoute('games')}>All games ▸</button>
        </div>

        <div className="game-grid">
          {GAMES.map(g => (
            <div className="game-card" key={g.id} onClick={() => setRoute('config')}>
              <div className="game-card-id">┌─ {g.code} · {g.id} ─┐</div>
              <h3 className="game-card-name">{g.name}{g.primary && <span style={{ color: 'var(--green)', fontSize: 12, marginLeft: 8 }}>★</span>}</h3>
              <p className="game-card-tag">{g.tag}</p>
              <pre className="game-glyph">{g.glyph}</pre>
              <div className="game-card-meta">
                <span>from {g.fromGB} GB RAM</span>
                <span className="price">${g.fromPrice.toFixed(2)}/mo</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: '14px 18px', border: '1px dashed var(--line-bright)', fontSize: 12, color: 'var(--mid)' }}>
          <span style={{ color: 'var(--amber)', letterSpacing: '0.14em' }}>// COMING SOON: </span>
          {COMING_SOON.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <span style={{ color: 'var(--line-bright)' }}> · </span>}
              <span>{c.name}</span>
            </span>
          ))}
        </div>

        <window.BFChrome.AsciiDivider />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 28 }}>
            <span className="card-corner tl" />
            <span className="card-corner tr" />
            <span className="card-corner bl" />
            <span className="card-corner br" />
            <span className="eyebrow">// 0x02 · Web Hosting</span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--fg-bright)', margin: '8px 0', letterSpacing: '-0.01em' }}>
              Static, dynamic, weird.
            </h3>
            <p style={{ color: 'var(--mid)', fontSize: 13, marginBottom: 16 }}>
              NVMe-backed cPanel & DirectAdmin, free SSL, Node/PHP/Python/Go runtimes,
              git-deploy, and one-click WordPress / Ghost / Astro.
            </p>
            <div className="tag-row">
              <span className="tag green">FROM $2.50/mo</span>
              <span className="tag">FREE SSL</span>
              <span className="tag">GIT DEPLOY</span>
            </div>
            <button className="btn" onClick={() => setRoute('web')} style={{ marginTop: 12 }}>
              Web plans ▸
            </button>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <span className="card-corner tl" />
            <span className="card-corner tr" />
            <span className="card-corner bl" />
            <span className="card-corner br" />
            <span className="eyebrow">// 0x03 · VPS Hosting</span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--fg-bright)', margin: '8px 0', letterSpacing: '-0.01em' }}>
              Root, ssh, ship.
            </h3>
            <p style={{ color: 'var(--mid)', fontSize: 13, marginBottom: 16 }}>
              KVM-virtualized VPS with full root, NVMe storage, snapshot backups,
              and 1-click OS images: Debian, Ubuntu, Alpine, Arch, Rocky, Windows.
            </p>
            <div className="tag-row">
              <span className="tag green">FROM $5.00/mo</span>
              <span className="tag">KVM · FULL ROOT</span>
              <span className="tag">SNAPSHOTS</span>
            </div>
            <button className="btn" onClick={() => setRoute('vps')} style={{ marginTop: 12 }}>
              VPS plans ▸
            </button>
          </div>
        </div>

        <window.BFChrome.AsciiDivider />

        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <span className="eyebrow">// 0xFF · ready_</span>
          <h2 className="section-title" style={{ fontSize: 40 }}>
            01001011 01101111 ?
          </h2>
          <p className="section-sub" style={{ margin: '0 auto 24px' }}>
            "Ready" in binary. We are. Are you?
          </p>
          <button className="btn btn-primary" onClick={() => setRoute('config')}>
            ▸ Deploy your first server
          </button>
        </div>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
