/* eslint-disable */
// Game hosting page + Configurator page

const { useState: uS2, useMemo: uM2, useEffect: uE2 } = React;

function GamesPage({ setRoute }) {
  const { GAMES, COMING_SOON } = window.BF;
  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="games" />
        <span className="eyebrow">// 0x01 · Game Hosting</span>
        <h1 className="section-title">Game servers, ready in 30s.</h1>
        <p className="section-sub">
          Bare-metal nodes, automatic mod loaders, snapshot rollbacks, and a control
          panel that doesn't make you cry. Pick a game, configure, deploy.
        </p>

        <div className="game-grid">
          {GAMES.map(g => (
            <div className="game-card" key={g.id} onClick={() => setRoute('config')}>
              <div className="game-card-id">┌─ {g.code} · {g.id} ─┐</div>
              <h3 className="game-card-name">{g.name}</h3>
              <p className="game-card-tag">{g.tag}</p>
              <pre className="game-glyph">{g.glyph}</pre>
              <div className="tag-row">
                {g.versions && g.versions.slice(0, 4).map(v => <span key={v} className="tag">{v}</span>)}
              </div>
              <div className="game-card-meta">
                <span>from {g.fromGB} GB RAM</span>
                <span className="price">${g.fromPrice.toFixed(2)}/mo</span>
              </div>
            </div>
          ))}
        </div>

        <window.BFChrome.AsciiDivider />

        <span className="eyebrow">// queued</span>
        <h2 className="section-title" style={{ fontSize: 24 }}>Coming soon</h2>
        <div className="game-grid" style={{ marginTop: 16 }}>
          {COMING_SOON.map(c => (
            <div className="game-card" key={c.id} style={{ opacity: 0.55, cursor: 'default' }}>
              <div className="game-card-id">┌─ {c.id} · queued ─┐</div>
              <h3 className="game-card-name">{c.name}<span className="coming-soon">SOON</span></h3>
              <p className="game-card-tag">Notify me when ready</p>
              <pre className="game-glyph">{`▒░▒░▒░▒░\n░▒░▒░▒░▒\n▒░▒░▒░▒░`}</pre>
              <button className="btn btn-ghost" style={{ width: '100%' }}>◇ Notify</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Configurator({ setRoute }) {
  const { GAMES, LOCATIONS } = window.BF;
  const [game, setGame] = uS2('MC');
  const [ram, setRam] = uS2(8);
  const [slots, setSlots] = uS2(40);
  const [storage, setStorage] = uS2(50);
  const [loc, setLoc] = uS2('NYC');
  const [yearly, setYearly] = uS2(false);
  const [backups, setBackups] = uS2(true);
  const [ddos, setDdos] = uS2(true);
  const [dedip, setDedip] = uS2(false);

  const game_def = GAMES.find(g => g.id === game);

  const price = uM2(() => {
    const base = { MC: 1.0, RU: 1.6, PW: 1.4, AR: 1.8 }[game] || 1;
    const ramPrice = ram * 1.2 * base;
    const slotPrice = slots * 0.04;
    const storagePrice = Math.max(0, storage - 20) * 0.08;
    const addons = (backups ? 2 : 0) + (ddos ? 0 : -1.5) + (dedip ? 4 : 0);
    let total = ramPrice + slotPrice + storagePrice + addons;
    if (yearly) total *= 0.83;
    return Math.max(2, total);
  }, [game, ram, slots, storage, backups, ddos, dedip, yearly]);

  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="configure" />
        <span className="eyebrow">// 0x10 · Configurator</span>
        <h1 className="section-title">Build your server.</h1>
        <p className="section-sub">
          Drag the sliders. Watch the price update in real-time. No hidden fees,
          no setup costs, cancel any time.
        </p>

        <div className="config-grid">
          <div className="config-panel">
            <div className="config-row">
              <div className="config-label">
                <span>$ select --game</span>
                <span className="val">{game_def && game_def.name}</span>
              </div>
              <div className="config-game-row">
                {GAMES.map(g => (
                  <div
                    key={g.id}
                    className={`config-game-pick ${game === g.id ? 'active' : ''}`}
                    onClick={() => setGame(g.id)}
                  >
                    {g.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            <div className="config-row">
              <div className="config-label">
                <span>$ allocate --ram</span>
                <span className="val">{ram} GB</span>
              </div>
              <input type="range" min="2" max="64" step="1" value={ram} onChange={e => setRam(+e.target.value)} />
              <div className="tickline">
                <span>2GB</span><span>16GB</span><span>32GB</span><span>48GB</span><span>64GB</span>
              </div>
            </div>

            <div className="config-row">
              <div className="config-label">
                <span>$ set --slots</span>
                <span className="val">{slots} players</span>
              </div>
              <input type="range" min="4" max="250" step="2" value={slots} onChange={e => setSlots(+e.target.value)} />
              <div className="tickline">
                <span>4</span><span>50</span><span>100</span><span>175</span><span>250</span>
              </div>
            </div>

            <div className="config-row">
              <div className="config-label">
                <span>$ alloc --storage</span>
                <span className="val">{storage} GB NVMe</span>
              </div>
              <input type="range" min="20" max="500" step="10" value={storage} onChange={e => setStorage(+e.target.value)} />
              <div className="tickline">
                <span>20</span><span>120</span><span>250</span><span>375</span><span>500</span>
              </div>
            </div>

            <div className="config-row">
              <div className="config-label"><span>$ region --pick</span><span className="val">{loc}</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 6 }}>
                {LOCATIONS.filter(l => !l.soon).map(l => (
                  <div
                    key={l.id}
                    className={`config-game-pick ${loc === l.id ? 'active' : ''}`}
                    onClick={() => setLoc(l.id)}
                  >
                    {l.id} · {l.ping}ms
                  </div>
                ))}
              </div>
            </div>

            <div className="config-row">
              <div className="config-label"><span>$ addons</span><span className="val">{[backups,ddos,dedip].filter(Boolean).length} enabled</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <div className={`config-game-pick ${backups ? 'active' : ''}`} onClick={() => setBackups(!backups)}>
                  ☐ BACKUPS{backups && ' ✓'}
                </div>
                <div className={`config-game-pick ${ddos ? 'active' : ''}`} onClick={() => setDdos(!ddos)}>
                  ☐ DDOS{ddos && ' ✓'}
                </div>
                <div className={`config-game-pick ${dedip ? 'active' : ''}`} onClick={() => setDedip(!dedip)}>
                  ☐ DEDICATED IP{dedip && ' ✓'}
                </div>
              </div>
            </div>

            <div className="config-row">
              <div className="config-label"><span>$ billing --cycle</span><span className="val">{yearly ? '12mo · save 17%' : '1mo'}</span></div>
              <div className="toggle">
                <button className={`toggle-opt ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
                <button className={`toggle-opt ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>Yearly <span className="toggle-badge">−17%</span></button>
              </div>
            </div>
          </div>

          <div className="config-summary">
            <div className="eyebrow">// estimated_total</div>
            <div className="summary-price">
              ${price.toFixed(2)}<span className="unit">/{yearly ? 'mo · billed yearly' : 'mo'}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', margin: '20px 0' }} />
            <div className="summary-line"><span className="k">Game</span><span className="v">{game_def && game_def.name}</span></div>
            <div className="summary-line"><span className="k">RAM</span><span className="v">{ram} GB DDR5</span></div>
            <div className="summary-line"><span className="k">Slots</span><span className="v">{slots}</span></div>
            <div className="summary-line"><span className="k">Storage</span><span className="v">{storage} GB NVMe</span></div>
            <div className="summary-line"><span className="k">Region</span><span className="v">{loc}</span></div>
            <div className="summary-line"><span className="k">Backups</span><span className="v" style={{ color: backups ? 'var(--green)' : 'var(--dim)' }}>{backups ? 'daily' : 'off'}</span></div>
            <div className="summary-line"><span className="k">DDoS</span><span className="v" style={{ color: ddos ? 'var(--green)' : 'var(--dim)' }}>{ddos ? '500 Gbps' : 'off'}</span></div>
            <div className="summary-line"><span className="k">Ded. IP</span><span className="v" style={{ color: dedip ? 'var(--green)' : 'var(--dim)' }}>{dedip ? 'yes' : 'no'}</span></div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}>
              ▸ Deploy now
            </button>
            <p style={{ fontSize: 10, color: 'var(--dim)', textAlign: 'center', marginTop: 12, letterSpacing: '0.1em' }}>
              30-DAY MONEY BACK · NO SETUP FEE · CANCEL ANY TIME
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

window.GamesPage = GamesPage;
window.Configurator = Configurator;
