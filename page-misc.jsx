/* eslint-disable */
// Status, Locations, Dashboard, Support pages

const { useState: uS4, useEffect: uE4, useRef: uR4 } = React;

function StatusPage({ setRoute }) {
  const { SERVICES } = window.BF;

  const ticks = (status, uptime) => {
    const arr = new Array(60).fill('ok');
    const downCount = status === 'down' ? 6 : status === 'warn' ? 2 : 0;
    for (let i = 0; i < downCount; i++) {
      const idx = 50 + i;
      if (idx < 60) arr[idx] = status;
    }
    if (uptime < 99.99) {
      const seed = Math.floor(uptime * 10) % 60;
      arr[seed] = 'warn';
    }
    return arr;
  };

  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="status" />
        <span className="eyebrow">// 0x05 · System Status</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="section-title">All systems operational.</h1>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Live status of every BinaryFall service. Ticks = last 60 minutes.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
              <span className="status-dot" />
              <span style={{ color: 'var(--green)', fontSize: 13, letterSpacing: '0.1em' }}>OPERATIONAL</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>last refresh · 0.3s ago</div>
          </div>
        </div>

        <div className="status-grid">
          {SERVICES.map(s => (
            <div key={s.name} className="status-row">
              <div className="status-head">
                <span className="status-name">{s.name}</span>
                <span className={`status-pill ${s.status}`}>{s.status === 'ok' ? 'OPERATIONAL' : s.status === 'warn' ? 'DEGRADED' : 'DOWN'}</span>
              </div>
              <div className="uptime-bar">
                {ticks(s.status, s.uptime).map((t, i) => (
                  <div key={i} className={`tick ${t === 'ok' ? '' : t}`} title={`-${60 - i}m`} />
                ))}
              </div>
              <div className="status-meta">
                <span>uptime · {s.uptime.toFixed(3)}%</span>
                <span>response · {(20 + Math.floor(Math.random() * 80))}ms</span>
              </div>
            </div>
          ))}
        </div>

        <window.BFChrome.AsciiDivider />

        <span className="eyebrow">// recent_incidents</span>
        <h2 className="section-title" style={{ fontSize: 22 }}>Recent incidents</h2>
        <div style={{ marginTop: 16 }}>
          {[
            ['MAY 02 14:22Z', 'ARK cluster · degraded performance', 'Investigating elevated tick latency on ARK-EU. Mitigation in progress.', 'warn'],
            ['APR 28 09:14Z', 'Panel · brief 502s', 'Resolved · cause: orchestrator failover. RCA published.', 'ok'],
            ['APR 19 02:10Z', 'NYC.0 · network blip', 'Resolved · upstream BGP flap. <90s impact.', 'ok'],
          ].map(([t, title, body, st]) => (
            <div key={t} style={{ borderLeft: '2px solid ' + (st === 'warn' ? 'var(--amber)' : 'var(--green-dim)'), padding: '10px 16px', marginBottom: 10, background: 'var(--bg-2)' }}>
              <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>{t}</div>
              <div style={{ color: 'var(--fg-bright)', fontSize: 14, margin: '4px 0' }}>{title}</div>
              <div style={{ color: 'var(--mid)', fontSize: 12 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationsPage({ setRoute }) {
  const { LOCATIONS } = window.BF;
  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="locations" />
        <span className="eyebrow">// 0x06 · Datacenters</span>
        <h1 className="section-title">9 regions, 1 network.</h1>
        <p className="section-sub">
          Tier-III+ datacenters with redundant power, multi-homed BGP, and direct
          peering with the major game backbones. Pick the closest one — or let
          smart routing do it for you.
        </p>

        <div className="loc-grid">
          {LOCATIONS.map(l => (
            <div key={l.id} className="loc-card">
              <span className="card-corner tl" />
              <span className="card-corner tr" />
              <span className="card-corner bl" />
              <span className="card-corner br" />
              <div className="loc-id">┌─ {l.id} ─┐</div>
              <h3 className="loc-city">{l.city}{l.soon && <span className="coming-soon">SOON</span>}</h3>
              <div className="loc-region">{l.region}</div>
              <div className="loc-stat"><span className="k">est. ping</span><span className="loc-ping">{l.ping}ms</span></div>
              <div className="loc-stat"><span className="k">capacity</span><span>{l.capacity}% used</span></div>
              <div style={{ height: 6, background: 'var(--bg-3)', marginTop: 6, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, width: l.capacity + '%', background: l.capacity > 80 ? 'var(--amber)' : 'var(--green)' }} />
              </div>
              <div className="loc-stat" style={{ marginTop: 12 }}><span className="k">network</span><span>40 Gbps</span></div>
              <div className="loc-stat"><span className="k">DDoS</span><span style={{ color: 'var(--green)' }}>500 Gbps shield</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportPage({ setRoute }) {
  const [sent, setSent] = uS4(false);
  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="support" />
        <span className="eyebrow">// 0x08 · Support</span>
        <h1 className="section-title">Talk to a human.</h1>
        <p className="section-sub">
          Real engineers, not chatbots. Median first-response: 4 minutes.
          24/7 for game and dedicated tiers.
        </p>

        <div className="support-grid">
          <div className="card" style={{ padding: 28 }}>
            <span className="eyebrow">// open_a_ticket</span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 20, color: 'var(--fg-bright)', margin: '8px 0 16px' }}>
              Open a ticket
            </h3>

            {sent ? (
              <div style={{ padding: 24, textAlign: 'center', border: '1px dashed var(--green-dim)' }}>
                <div style={{ fontSize: 32, color: 'var(--green)', marginBottom: 8 }}>✓</div>
                <div style={{ color: 'var(--fg-bright)', fontSize: 14, marginBottom: 4 }}>Ticket #BF-{Math.floor(Math.random() * 99999)} opened</div>
                <div style={{ color: 'var(--mid)', fontSize: 12 }}>We'll reply within 4 minutes.</div>
                <button className="btn" onClick={() => setSent(false)} style={{ marginTop: 14 }}>◇ Open another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="field">
                  <label>email</label>
                  <input type="email" placeholder="you@host.tld" defaultValue="" />
                </div>
                <div className="field">
                  <label>category</label>
                  <select defaultValue="game">
                    <option value="game">Game hosting</option>
                    <option value="web">Web hosting</option>
                    <option value="vps">VPS hosting</option>
                    <option value="billing">Billing</option>
                    <option value="abuse">Abuse / security</option>
                  </select>
                </div>
                <div className="field">
                  <label>server id (optional)</label>
                  <input type="text" placeholder="bf-12481" />
                </div>
                <div className="field">
                  <label>describe the issue</label>
                  <textarea placeholder="What broke? What did you expect? Include logs if you have them." />
                </div>
                <button className="btn btn-primary" type="submit">▸ Submit ticket</button>
              </form>
            )}
          </div>

          <div>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <span className="eyebrow">// channels</span>
              <div className="kv-list" style={{ marginTop: 12 }}>
                <div className="kv-row copyable"><span className="k">discord</span><span className="v">discord.gg/binaryfall</span></div>
                <div className="kv-row copyable"><span className="k">email</span><span className="v">help@binaryfall.io</span></div>
                <div className="kv-row copyable"><span className="k">irc</span><span className="v">irc.binaryfall.io #help</span></div>
                <div className="kv-row copyable"><span className="k">phone (24/7 plans)</span><span className="v">+1 ███ ███ 0xBF</span></div>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <span className="eyebrow">// response_times</span>
              <div className="kv-list" style={{ marginTop: 12 }}>
                <div className="kv-row"><span className="k">free / community</span><span className="v">~ 24 hr</span></div>
                <div className="kv-row"><span className="k">standard tiers</span><span className="v" style={{ color: 'var(--green)' }}>~ 4 min median</span></div>
                <div className="kv-row"><span className="k">performance / dedicated</span><span className="v" style={{ color: 'var(--green)' }}>{'<'} 60 sec · 24/7</span></div>
                <div className="kv-row"><span className="k">incident hotline</span><span className="v">always-on</span></div>
              </div>
            </div>
            <div className="card" style={{ padding: 24, marginTop: 16 }}>
              <span className="eyebrow">// faq</span>
              <details style={{ marginTop: 10, cursor: 'pointer' }}>
                <summary style={{ color: 'var(--fg-bright)', fontSize: 13, padding: '8px 0', borderBottom: '1px dashed var(--line)' }}>
                  ▸ Can I switch plans without downtime?
                </summary>
                <div style={{ color: 'var(--mid)', fontSize: 12, padding: '10px 0' }}>
                  Yes. Vertical scaling is hot for game and web hosting — 0 downtime.
                </div>
              </details>
              <details style={{ cursor: 'pointer' }}>
                <summary style={{ color: 'var(--fg-bright)', fontSize: 13, padding: '8px 0', borderBottom: '1px dashed var(--line)' }}>
                  ▸ Do you offer student discounts?
                </summary>
                <div style={{ color: 'var(--mid)', fontSize: 12, padding: '10px 0' }}>
                  50% off everything. Email proof@binaryfall.io with .edu address.
                </div>
              </details>
              <details style={{ cursor: 'pointer' }}>
                <summary style={{ color: 'var(--fg-bright)', fontSize: 13, padding: '8px 0', borderBottom: '1px dashed var(--line)' }}>
                  ▸ Can I bring my own domain?
                </summary>
                <div style={{ color: 'var(--mid)', fontSize: 12, padding: '10px 0' }}>
                  Always. Free transfer, free DNS, automatic SSL.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.StatusPage = StatusPage;
window.LocationsPage = LocationsPage;
window.SupportPage = SupportPage;
