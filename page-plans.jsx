/* eslint-disable */
// Web hosting, VPS hosting, and Pricing comparison pages

const { useState: uS3, useMemo: uM3 } = React;

function PlanCard({ plan, yearly, onPick, featured, type }) {
  const price = yearly ? (plan.yearly / 12) : plan.price;
  return (
    <div className={`plan-card ${featured || plan.featured ? 'featured' : ''}`}>
      {(featured || plan.featured) && <div className="ribbon">★ POPULAR</div>}
      <div className="plan-id">┌─ {plan.id} ─┐</div>
      <div className="plan-name">{plan.name}</div>
      <div className="plan-price">
        ${price.toFixed(2)}<span className="u">/mo{yearly ? ' · billed yearly' : ''}</span>
      </div>
      <ul className="plan-feat">
        {type === 'web' ? (
          <>
            <li><span className="check">✓</span> {plan.storage}</li>
            <li><span className="check">✓</span> {plan.sites} site{plan.sites === 1 ? '' : 's'}</li>
            <li><span className="check">✓</span> {plan.db} database{plan.db === 1 ? '' : 's'}</li>
            <li><span className="check">✓</span> {plan.email} mailbox{plan.email === 1 ? '' : 'es'}</li>
            <li><span className={plan.ssl ? 'check' : 'miss'}>{plan.ssl ? '✓' : '×'}</span> Free SSL & CDN</li>
            <li><span className={plan.dedip ? 'check' : 'miss'}>{plan.dedip ? '✓' : '×'}</span> Dedicated IPv4</li>
            <li><span className={plan.prio ? 'check' : 'miss'}>{plan.prio ? '✓' : '×'}</span> Priority support</li>
          </>
        ) : (
          <>
            <li><span className="check">✓</span> {plan.cpu}</li>
            <li><span className="check">✓</span> {plan.ram} RAM</li>
            <li><span className="check">✓</span> {plan.storage}</li>
            <li><span className="check">✓</span> {plan.bw} bandwidth</li>
            <li><span className="check">✓</span> {plan.os} · full root</li>
            <li><span className="check">✓</span> {plan.ipv4} IPv4 + IPv6</li>
            <li><span className={plan.snapshot ? 'check' : 'miss'}>{plan.snapshot ? '✓' : '×'}</span> Snapshot backups</li>
            <li><span className="check">✓</span> {plan.ddos} DDoS shield</li>
          </>
        )}
      </ul>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onPick}>
        Choose {plan.name} ▸
      </button>
    </div>
  );
}

function WebPage({ setRoute }) {
  const { WEB_PLANS } = window.BF;
  const [yearly, setYearly] = uS3(true);
  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="web" />
        <span className="eyebrow">// 0x02 · Web Hosting</span>
        <h1 className="section-title">Web hosting, no compromises.</h1>
        <p className="section-sub">
          Static sites, WordPress, custom Node apps — all on NVMe-backed
          containers with automatic SSL, daily backups, and global CDN.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <div className="toggle">
            <button className={`toggle-opt ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
            <button className={`toggle-opt ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>Yearly <span className="toggle-badge">−17%</span></button>
          </div>
        </div>

        <div className="plan-grid">
          {WEB_PLANS.map(p => <PlanCard key={p.id} plan={p} yearly={yearly} type="web" />)}
        </div>

        <window.BFChrome.AsciiDivider />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            ['NVMe SSDs', 'Tier-1 datacenter NVMe — 6× faster than SATA. No noisy neighbors.'],
            ['Free SSL', 'Lets Encrypt + ZeroSSL auto-provisioning. Wildcard included.'],
            ['Git Deploy', 'Push to deploy. GitHub, GitLab, Bitbucket. Build hooks supported.'],
            ['One-click Stacks', 'WordPress, Ghost, Astro, Next.js, Strapi, Laravel — clean installs.'],
            ['Daily Backups', '30-day retention, cross-region replicated. One-click restore.'],
            ['DDoS Armor', '500 Gbps mitigation network. Always on. No "DDoS-protected" upsell.'],
          ].map(([k, v]) => (
            <div key={k} className="card">
              <div style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.14em' }}>// {k.toUpperCase()}</div>
              <p style={{ color: 'var(--fg)', fontSize: 13, marginTop: 8 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VPSPage({ setRoute }) {
  const { VPS_PLANS } = window.BF;
  const [yearly, setYearly] = uS3(true);
  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="vps" />
        <span className="eyebrow">// 0x03 · VPS Hosting</span>
        <h1 className="section-title">Root access. NVMe metal. Yours.</h1>
        <p className="section-sub">
          KVM-virtualized VPS with full root, snapshot backups, and one-click OS
          images. Deploy in 30 seconds, scale vertically without downtime.
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <div className="toggle">
            <button className={`toggle-opt ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
            <button className={`toggle-opt ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>Yearly <span className="toggle-badge">−17%</span></button>
          </div>
        </div>

        <div className="plan-grid">
          {VPS_PLANS.map(p => <PlanCard key={p.id} plan={p} yearly={yearly} type="vps" />)}
        </div>

        <window.BFChrome.AsciiDivider />

        <div className="card" style={{ padding: 28 }}>
          <span className="eyebrow">// os_images · one_click</span>
          <h3 style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--fg-bright)', margin: '8px 0 16px' }}>
            Pick an image. Boot in 30 seconds.
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
            {[
              ['Debian',   '12 · stable'],
              ['Ubuntu',   '24.04 LTS'],
              ['Alpine',   '3.20'],
              ['Arch',     'rolling'],
              ['Rocky',    '9'],
              ['Fedora',   '40'],
              ['NixOS',    '24.05'],
              ['Windows',  'Server 2022'],
              ['FreeBSD',  '14'],
              ['Docker',   'on Debian'],
              ['Coolify',  'pre-baked'],
              ['Custom',   'ISO upload'],
            ].map(([n, v]) => (
              <div key={n} style={{ border: '1px solid var(--line)', padding: '10px 12px', background: 'var(--bg)' }}>
                <div style={{ color: 'var(--fg-bright)', fontSize: 13 }}>{n}</div>
                <div style={{ color: 'var(--mid)', fontSize: 11 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingPage({ setRoute }) {
  const { GAMES, WEB_PLANS, VPS_PLANS } = window.BF;
  const [yearly, setYearly] = uS3(true);
  const [tab, setTab] = uS3('game');

  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="pricing" />
        <span className="eyebrow">// 0x04 · Pricing</span>
        <h1 className="section-title">All plans, side by side.</h1>
        <p className="section-sub">
          No hidden fees, no setup costs, no surprise renewals. What you see is
          exactly what you pay.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div className="toggle">
            <button className={`toggle-opt ${tab === 'game' ? 'active' : ''}`} onClick={() => setTab('game')}>Game</button>
            <button className={`toggle-opt ${tab === 'web' ? 'active' : ''}`} onClick={() => setTab('web')}>Web</button>
            <button className={`toggle-opt ${tab === 'vps' ? 'active' : ''}`} onClick={() => setTab('vps')}>VPS</button>
          </div>
          <div className="toggle">
            <button className={`toggle-opt ${!yearly ? 'active' : ''}`} onClick={() => setYearly(false)}>Monthly</button>
            <button className={`toggle-opt ${yearly ? 'active' : ''}`} onClick={() => setYearly(true)}>Yearly <span className="toggle-badge">−17%</span></button>
          </div>
        </div>

        {tab === 'game' && (
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ width: 200 }}>Game tier</th>
                <th>Starter</th>
                <th className="featured-col">Standard ★</th>
                <th>Performance</th>
                <th>Dedicated</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="row-label">Price{yearly && ' / mo (yearly)'}</td>
                <td>${(yearly ? 4 : 5).toFixed(2)}</td>
                <td className="featured-col" style={{ color: 'var(--green)', fontWeight: 600 }}>${(yearly ? 9 : 11).toFixed(2)}</td>
                <td>${(yearly ? 18 : 22).toFixed(2)}</td>
                <td>${(yearly ? 49 : 59).toFixed(2)}</td></tr>
              <tr><td className="row-label">RAM</td><td>2 GB</td><td className="featured-col">8 GB</td><td>16 GB</td><td>32 GB</td></tr>
              <tr><td className="row-label">CPU</td><td>2 vCore</td><td className="featured-col">4 vCore</td><td>6 vCore</td><td>8 vCore</td></tr>
              <tr><td className="row-label">Storage</td><td>20 GB NVMe</td><td className="featured-col">60 GB NVMe</td><td>150 GB NVMe</td><td>500 GB NVMe</td></tr>
              <tr><td className="row-label">Slots (MC)</td><td>20</td><td className="featured-col">80</td><td>200</td><td>500+</td></tr>
              <tr><td className="row-label">Backups</td><td><span className="no">×</span></td><td className="featured-col"><span className="yes">✓</span> daily</td><td><span className="yes">✓</span> hourly</td><td><span className="yes">✓</span> realtime</td></tr>
              <tr><td className="row-label">DDoS protect</td><td><span className="yes">✓</span> 100G</td><td className="featured-col"><span className="yes">✓</span> 500G</td><td><span className="yes">✓</span> 500G</td><td><span className="yes">✓</span> 1Tbps</td></tr>
              <tr><td className="row-label">Mod loaders</td><td><span className="yes">✓</span></td><td className="featured-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td className="row-label">Dedicated IP</td><td><span className="no">×</span></td><td className="featured-col"><span className="no">×</span></td><td><span className="yes">✓</span></td><td><span className="yes">✓</span></td></tr>
              <tr><td className="row-label">Priority support</td><td><span className="no">×</span></td><td className="featured-col"><span className="yes">✓</span></td><td><span className="yes">✓</span></td><td><span className="yes">✓</span> 24/7</td></tr>
            </tbody>
          </table>
        )}

        {tab === 'web' && (
          <div className="plan-grid">
            {WEB_PLANS.map(p => <PlanCard key={p.id} plan={p} yearly={yearly} type="web" />)}
          </div>
        )}

        {tab === 'vps' && (
          <div className="plan-grid">
            {VPS_PLANS.map(p => <PlanCard key={p.id} plan={p} yearly={yearly} type="vps" />)}
          </div>
        )}

        <window.BFChrome.AsciiDivider />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            ['30-day refund', 'Try anything for 30 days. Hate it? Full refund, no questions.'],
            ['No setup fee', 'Zero. Always. Even on dedicated boxes.'],
            ['Switch any time', 'Upgrade, downgrade, or cancel from the dashboard. Pro-rated.'],
            ['Student & open-source', '50% off — email proof@binaryfall.io with your .edu or repo.'],
          ].map(([k, v]) => (
            <div key={k} className="card">
              <div style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.14em' }}>// {k.toUpperCase()}</div>
              <p style={{ color: 'var(--fg)', fontSize: 13, marginTop: 8 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.WebPage = WebPage;
window.VPSPage = VPSPage;
window.PricingPage = PricingPage;
