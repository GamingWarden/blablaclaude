/* eslint-disable */
// Dashboard — fully interactive: sidebar tabs, working buttons, typable console.

const { useState: uSD, useEffect: uED, useRef: uRD } = React;

const SERVERS = [
  { id: 'mc-prod', game: 'Minecraft', addr: 'mc.binaryfall.io:25565', stack: 'Paper 1.21.4', region: 'NYC.0', uptime: '14d 02h', status: 'online' },
  { id: 'mc-staging', game: 'Minecraft', addr: 'mc-stg.binaryfall.io:25566', stack: 'Paper 1.21.4', region: 'FRA.0', uptime: '06d 11h', status: 'online' },
  { id: 'rust-eu', game: 'Rust', addr: 'rust.binaryfall.io:28015', stack: 'Vanilla', region: 'AMS.0', uptime: '00d 00h', status: 'idle' },
  { id: 'palworld-friends', game: 'Palworld', addr: 'pal.binaryfall.io:8211', stack: 'Dedicated', region: 'NYC.0', uptime: '02d 18h', status: 'online' },
];

const FILE_TREE = {
  '/': [
    { n: 'world',         t: 'dir',  s: '—',         m: 'May 02 14:22' },
    { n: 'world_nether',  t: 'dir',  s: '—',         m: 'May 02 14:22' },
    { n: 'world_the_end', t: 'dir',  s: '—',         m: 'May 02 14:22' },
    { n: 'plugins',       t: 'dir',  s: '—',         m: 'May 04 09:18' },
    { n: 'logs',          t: 'dir',  s: '—',         m: 'May 04 11:01' },
    { n: 'server.properties', t: 'file', s: '1.4 KB', m: 'May 03 22:45' },
    { n: 'eula.txt',      t: 'file', s: '174 B',    m: 'Apr 18 03:11' },
    { n: 'whitelist.json',t: 'file', s: '2.1 KB',   m: 'May 02 19:20' },
    { n: 'ops.json',      t: 'file', s: '286 B',    m: 'Apr 18 03:11' },
    { n: 'paper.yml',     t: 'file', s: '8.7 KB',   m: 'May 03 22:45' },
    { n: 'spigot.yml',    t: 'file', s: '6.2 KB',   m: 'May 03 22:45' },
  ],
  '/plugins': [
    { n: '..',            t: 'dir',  s: '—', m: '' },
    { n: 'EssentialsX.jar',  t: 'file', s: '4.1 MB', m: 'May 01 09:18' },
    { n: 'WorldEdit.jar',    t: 'file', s: '6.8 MB', m: 'Apr 22 12:01' },
    { n: 'WorldGuard.jar',   t: 'file', s: '5.2 MB', m: 'Apr 22 12:01' },
    { n: 'LuckPerms.jar',    t: 'file', s: '3.4 MB', m: 'Apr 30 14:14' },
    { n: 'CoreProtect.jar',  t: 'file', s: '1.9 MB', m: 'Apr 18 03:11' },
    { n: 'Vault.jar',        t: 'file', s: '0.4 MB', m: 'Apr 18 03:11' },
  ],
};

const FILE_CONTENT = {
  'server.properties':
`# BinaryFall · auto-generated
motd=§a§lBinaryFall §7· §fa server falling into place
max-players=80
view-distance=12
simulation-distance=10
spawn-protection=8
difficulty=normal
gamemode=survival
hardcore=false
white-list=false
online-mode=true
server-port=25565
enable-rcon=true
rcon.port=25575
allow-flight=false
network-compression-threshold=256`,
  'eula.txt':
`#By changing this you agree the Mojang EULA.
eula=true`,
  'whitelist.json':
`[
  { "uuid": "f7c77d99-9f15-4a66-b21b-7654321cafe0", "name": "ZeroOne" },
  { "uuid": "d4e2a8bb-3c1a-4faa-8e7c-aa11bb22cc33", "name": "NullByte" },
  { "uuid": "c0ffee00-1010-1010-1010-101010101010", "name": "h3xCat" }
]`,
  'ops.json':
`[
  { "uuid": "f7c77d99-9f15-4a66-b21b-7654321cafe0", "name": "ZeroOne", "level": 4 }
]`,
  'paper.yml': '# Paper config (truncated)\nverbose: false\ntimings: { enabled: true, verbose: true }\n# 320 more lines...',
  'spigot.yml': '# Spigot config (truncated)\nsettings:\n  save-user-cache-on-stop-only: false\n  bungeecord: false\n# 180 more lines...',
};

const PLUGINS = [
  { name: 'EssentialsX',  v: '2.20.1', author: 'EssentialsX Team', desc: 'Core commands · /home, /tpa, /kit, /msg', enabled: true,  cmds: 142 },
  { name: 'WorldEdit',    v: '7.3.0',  author: 'EngineHub',        desc: 'In-game world editor · //wand, //set, //replace', enabled: true,  cmds: 88 },
  { name: 'WorldGuard',   v: '7.0.10', author: 'EngineHub',        desc: 'Region protection and flags', enabled: true,  cmds: 24 },
  { name: 'LuckPerms',    v: '5.4.130',author: 'lucko',            desc: 'Permissions framework', enabled: true,  cmds: 18 },
  { name: 'CoreProtect',  v: '22.4',   author: 'Intelli',          desc: 'Anti-griefing rollback · /co lookup', enabled: true,  cmds: 12 },
  { name: 'Vault',        v: '1.7.3',  author: 'creatorfromhell',  desc: 'Economy/permissions API bridge', enabled: true,  cmds: 0 },
  { name: 'DiscordSRV',   v: '1.28.0', author: 'Scarsz',           desc: 'Bridge chat to Discord', enabled: false, cmds: 6 },
  { name: 'dynmap',       v: '3.7',    author: 'webbukkit',        desc: 'Live web map of your world', enabled: false, cmds: 4 },
];

const SCHEDULES = [
  { name: 'Daily restart',     cron: '0 4 * * *',     last: '04:00 UTC',  next: 'in 16h 22m', on: true },
  { name: 'Hourly snapshot',   cron: '0 * * * *',     last: '11:00 UTC',  next: 'in 47m',     on: true },
  { name: 'Weekly cleanup',    cron: '0 5 * * 0',     last: 'Sun 05:00',  next: 'in 3d 18h',  on: true },
  { name: 'Send !announce',    cron: '*/30 * * * *',  last: '11:30 UTC',  next: 'in 17m',     on: false },
];

const BACKUPS = [
  { id: 'snap-0142', when: 'May 04 11:00', size: '1.24 GB', type: 'auto' },
  { id: 'snap-0141', when: 'May 04 10:00', size: '1.24 GB', type: 'auto' },
  { id: 'snap-0140', when: 'May 04 09:00', size: '1.23 GB', type: 'auto' },
  { id: 'snap-0139', when: 'May 04 08:00', size: '1.23 GB', type: 'auto' },
  { id: 'snap-pre-update', when: 'May 03 22:30', size: '1.18 GB', type: 'manual' },
  { id: 'snap-0137', when: 'May 03 22:00', size: '1.18 GB', type: 'auto' },
];

const PLAYERS_DATA = [
  { name: 'ZeroOne',  rank: 'OWNER',  ping: 18, time: '14d 02h', loc: 'Spawn (132, 64, -88)' },
  { name: 'NullByte', rank: 'MOD',    ping: 31, time: '08d 11h', loc: 'Nether (-2400, 88, 1200)' },
  { name: 'h3xCat',   rank: 'VIP',    ping: 22, time: '02d 18h', loc: 'End (88, 12, -2)' },
  { name: 'rootkid',  rank: 'PLAYER', ping: 47, time: '12h 04m', loc: 'Overworld (4800, 71, -3200)' },
  { name: '0xKitten', rank: 'PLAYER', ping: 119,time: '03h 22m', loc: 'Overworld (200, 65, 200)' },
  { name: 'segfault', rank: 'PLAYER', ping: 28, time: '01h 12m', loc: 'Overworld (-540, 80, 1024)' },
];

// ─── Sidebar helper ─────────────────────────────────────────

function DashSide({ activeServer, setActiveServer, panel, setPanel }) {
  const panels = ['Overview', 'Console', 'File Manager', 'Plugins', 'Schedules', 'Backups', 'Players', 'Settings'];
  return (
    <aside className="dash-side">
      <div className="dash-side-head">// SERVERS · {SERVERS.length}</div>
      {SERVERS.map(s => (
        <div
          key={s.id}
          className={`dash-nav-item ${activeServer.id === s.id ? 'active' : ''}`}
          onClick={() => setActiveServer(s)}
        >
          <span>{s.id}</span>
          <span style={{ color: s.status === 'online' ? 'var(--green)' : 'var(--dim)' }}>
            {s.status === 'online' ? '◉' : '◯'} {s.status}
          </span>
        </div>
      ))}
      <div className="dash-side-head" style={{ marginTop: 18 }}>// PANEL</div>
      {panels.map(p => (
        <div
          key={p}
          className={`dash-nav-item ${panel === p ? 'active' : ''}`}
          onClick={() => setPanel(p)}
        >
          <span>{p}</span>
          <span style={{ color: panel === p ? 'var(--green)' : 'var(--dim)' }}>›</span>
        </div>
      ))}
    </aside>
  );
}

// ─── Console panel (typable) ────────────────────────────────

function ConsolePanel({ srv, log, setLog, runCommand, tick }) {
  const [input, setInput] = uSD('');
  const [history, setHistory] = uSD([]);
  const [hIdx, setHIdx] = uSD(-1);
  const scrollRef = uRD(null);

  uED(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  function submit(e) {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    setHistory(h => [cmd, ...h].slice(0, 50));
    setHIdx(-1);
    runCommand(cmd);
    setInput('');
  }

  function onKey(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(hIdx + 1, history.length - 1);
      if (history[ni]) { setHIdx(ni); setInput(history[ni]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(hIdx - 1, -1);
      setHIdx(ni);
      setInput(ni === -1 ? '' : history[ni]);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em' }}>// LIVE CONSOLE · {srv.id}</div>
        <div style={{ fontSize: 10, color: 'var(--dim)' }}>{log.length} lines · ↑/↓ history</div>
      </div>
      <div className="console" style={{ height: 360 }} ref={scrollRef}>
        {log.map((l, i) => (
          <div key={i} className="console-line">
            <span className="t">[{l.t}]</span> <span className={l.cls}>{l.m}</span>
          </div>
        ))}
      </div>
      <form onSubmit={submit} style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <span style={{
          fontFamily: 'var(--mono)', color: 'var(--green)', padding: '10px 4px 10px 12px',
          background: 'var(--bg)', border: '1px solid var(--line)', borderRight: 'none', fontSize: 13
        }}>{srv.id} $</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="type a command  ·  try: help, list, time set day, give @p diamond, save-all"
          style={{
            flex: 1, background: 'var(--bg)', border: '1px solid var(--line)',
            color: 'var(--fg-bright)', padding: '10px 12px', fontFamily: 'var(--mono)',
            fontSize: 13, outline: 'none'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--green)'}
          onBlur={e => e.target.style.borderColor = 'var(--line)'}
        />
        <button className="btn btn-primary" type="submit">▸ send</button>
      </form>
      <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 8, lineHeight: 1.7 }}>
        <span style={{ color: 'var(--amber)', letterSpacing: '0.14em' }}>// HINT: </span>
        type <code style={{ color: 'var(--green)' }}>help</code> to list commands ·
        every command yields a <span style={{ color: 'var(--amber)' }}>20% discount</span> notice (this is a test panel)
      </div>
    </div>
  );
}

// ─── File Manager panel ─────────────────────────────────────

function FilePanel({ pushLog }) {
  const [path, setPath] = uSD('/');
  const [open, setOpen] = uSD(null);

  const list = FILE_TREE[path] || FILE_TREE['/'];

  function clickItem(it) {
    if (it.t === 'dir') {
      if (it.n === '..') setPath('/');
      else if (FILE_TREE['/' + it.n]) setPath('/' + it.n);
      else pushLog('warn', `[Files] cd ${it.n} · directory empty`);
    } else {
      setOpen(it);
      pushLog('info', `[Files] opened ${path === '/' ? '' : path + '/'}${it.n}`);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.1em' }}>
          /home/binaryfall/mc-prod<span style={{ color: 'var(--green)' }}>{path === '/' ? '' : path}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn" onClick={() => { pushLog('ok', '[Files] uploaded 1 file · /uploads/skin.png'); }}>↑ Upload</button>
          <button className="btn" onClick={() => { pushLog('ok', `[Files] new file created · ${path}/untitled.txt`); }}>＋ New</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: open ? '1fr 1.6fr' : '1fr', gap: 12 }}>
        <div style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 130px', padding: '8px 12px', borderBottom: '1px solid var(--line)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>
            <span>NAME</span><span>SIZE</span><span>MODIFIED</span>
          </div>
          {list.map(it => (
            <div
              key={it.n}
              onClick={() => clickItem(it)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 80px 130px',
                padding: '8px 12px', borderBottom: '1px dashed var(--line)',
                fontSize: 12, color: 'var(--fg)', cursor: 'pointer',
                background: open && open.n === it.n ? 'var(--bg-3)' : 'transparent'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
              onMouseLeave={e => e.currentTarget.style.background = open && open.n === it.n ? 'var(--bg-3)' : 'transparent'}
            >
              <span style={{ color: it.t === 'dir' ? 'var(--green)' : 'var(--fg-bright)' }}>
                {it.t === 'dir' ? '▸ ' : '  '}{it.n}
              </span>
              <span style={{ color: 'var(--dim)' }}>{it.s}</span>
              <span style={{ color: 'var(--dim)' }}>{it.m}</span>
            </div>
          ))}
        </div>

        {open && (
          <div style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}>
            <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <span style={{ color: 'var(--green)' }}>{open.n}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button className="btn btn-ghost" onClick={() => { pushLog('ok', `[Files] saved ${open.n}`); }}>save</button>
                <button className="btn btn-ghost" onClick={() => setOpen(null)}>✕</button>
              </div>
            </div>
            <pre style={{
              margin: 0, padding: 14, fontFamily: 'var(--mono)', fontSize: 12,
              color: 'var(--fg)', whiteSpace: 'pre-wrap', maxHeight: 360, overflow: 'auto'
            }}>{FILE_CONTENT[open.n] || `// ${open.n}\n// binary file · ${open.s}\n// preview unavailable`}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Plugins panel ──────────────────────────────────────────

function PluginsPanel({ pushLog }) {
  const [plugins, setPlugins] = uSD(PLUGINS);
  const [sel, setSel] = uSD(PLUGINS[0]);

  function toggle(p) {
    setPlugins(arr => arr.map(x => x.name === p.name ? { ...x, enabled: !x.enabled } : x));
    pushLog(p.enabled ? 'warn' : 'ok', `[Plugins] ${p.name} ${p.enabled ? 'disabled' : 'enabled'}`);
    if (sel.name === p.name) setSel({ ...p, enabled: !p.enabled });
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 12 }}>
      <div style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--line)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em', display: 'flex', justifyContent: 'space-between' }}>
          <span>INSTALLED · {plugins.length}</span>
          <span style={{ color: 'var(--green)' }}>{plugins.filter(p => p.enabled).length} ENABLED</span>
        </div>
        {plugins.map(p => (
          <div
            key={p.name}
            onClick={() => setSel(p)}
            style={{
              padding: '12px',
              borderBottom: '1px dashed var(--line)',
              cursor: 'pointer',
              background: sel.name === p.name ? 'var(--bg-3)' : 'transparent',
              borderLeft: sel.name === p.name ? '2px solid var(--green)' : '2px solid transparent',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--fg-bright)', fontSize: 13 }}>{p.name}</span>
              <span style={{ fontSize: 9, color: p.enabled ? 'var(--green)' : 'var(--dim)', letterSpacing: '0.14em', border: '1px solid', borderColor: p.enabled ? 'var(--green-dim)' : 'var(--line-bright)', padding: '1px 6px' }}>
                {p.enabled ? 'ON' : 'OFF'}
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 2 }}>v{p.v} · {p.cmds} cmds</div>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid var(--line)', background: 'var(--bg)', padding: 20 }}>
        <div style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.14em' }}>// PLUGIN_DETAIL</div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--fg-bright)', margin: '6px 0 2px', letterSpacing: '-0.01em' }}>
          {sel.name}
        </h3>
        <div style={{ fontSize: 11, color: 'var(--mid)', marginBottom: 14 }}>
          v{sel.v} · by {sel.author}
        </div>
        <p style={{ color: 'var(--fg)', fontSize: 13, margin: '0 0 16px' }}>{sel.desc}</p>

        <div className="kv-list" style={{ marginBottom: 16 }}>
          <div className="kv-row"><span className="k">status</span><span className="v" style={{ color: sel.enabled ? 'var(--green)' : 'var(--dim)' }}>{sel.enabled ? 'enabled' : 'disabled'}</span></div>
          <div className="kv-row"><span className="k">version</span><span className="v">{sel.v}</span></div>
          <div className="kv-row"><span className="k">author</span><span className="v">{sel.author}</span></div>
          <div className="kv-row"><span className="k">commands</span><span className="v">{sel.cmds}</span></div>
          <div className="kv-row"><span className="k">load order</span><span className="v">{plugins.findIndex(p => p.name === sel.name) + 1} / {plugins.length}</span></div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => toggle(sel)}>
            {sel.enabled ? '◯ Disable' : '◉ Enable'}
          </button>
          <button className="btn" onClick={() => pushLog('info', `[Plugins] ${sel.name} reloaded`)}>⟳ Reload</button>
          <button className="btn" onClick={() => pushLog('ok', `[Plugins] ${sel.name} updated to latest`)}>↑ Update</button>
          <button className="btn" onClick={() => pushLog('info', `[Plugins] viewing config for ${sel.name}`)}>⚙ Config</button>
          <button className="btn" onClick={() => pushLog('warn', `[Plugins] ${sel.name} uninstalled`)}>✕ Remove</button>
        </div>
      </div>
    </div>
  );
}

// ─── Schedules panel ────────────────────────────────────────

function SchedulesPanel({ pushLog }) {
  const [sched, setSched] = uSD(SCHEDULES);
  function toggle(s) {
    setSched(arr => arr.map(x => x.name === s.name ? { ...x, on: !x.on } : x));
    pushLog(s.on ? 'warn' : 'ok', `[Schedules] ${s.name} ${s.on ? 'paused' : 'resumed'}`);
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>// CRON · {sched.length} entries</div>
        <button className="btn" onClick={() => pushLog('ok', '[Schedules] new schedule template opened')}>＋ New schedule</button>
      </div>
      {sched.map(s => (
        <div key={s.name} style={{ border: '1px solid var(--line)', background: 'var(--bg)', padding: 16, marginBottom: 8, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: 14, alignItems: 'center' }}>
          <div>
            <div style={{ color: 'var(--fg-bright)', fontSize: 13 }}>{s.name}</div>
            <div style={{ color: 'var(--green)', fontSize: 11, fontFamily: 'var(--mono)' }}>{s.cron}</div>
          </div>
          <div><span style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>LAST</span><div style={{ fontSize: 12 }}>{s.last}</div></div>
          <div><span style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>NEXT</span><div style={{ fontSize: 12, color: 'var(--green)' }}>{s.next}</div></div>
          <div><span style={{ fontSize: 9, letterSpacing: '0.14em', color: s.on ? 'var(--green)' : 'var(--dim)', border: '1px solid', borderColor: s.on ? 'var(--green-dim)' : 'var(--line-bright)', padding: '2px 8px' }}>{s.on ? 'ACTIVE' : 'PAUSED'}</span></div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn btn-ghost" onClick={() => toggle(s)}>{s.on ? '⏸' : '▶'}</button>
            <button className="btn btn-ghost" onClick={() => pushLog('info', `[Schedules] ran "${s.name}" manually`)}>▸ run</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Backups panel ──────────────────────────────────────────

function BackupsPanel({ pushLog }) {
  const [busy, setBusy] = uSD(false);
  function takeNew() {
    setBusy(true);
    pushLog('info', '[Backups] capturing snapshot...');
    setTimeout(() => { pushLog('ok', '[Backups] snapshot saved · 1.24 GB · vault://manual/0143'); setBusy(false); }, 1100);
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>// VAULT · {BACKUPS.length} snapshots · 7.36 GB used</div>
        <button className="btn btn-primary" onClick={takeNew} disabled={busy}>
          {busy ? '⟳ working...' : '＋ New snapshot'}
        </button>
      </div>
      {BACKUPS.map(b => (
        <div key={b.id} style={{ border: '1px solid var(--line)', background: 'var(--bg)', padding: 14, marginBottom: 6, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr auto', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--fg-bright)', fontSize: 12 }}>{b.id}</span>
          <span style={{ fontSize: 11, color: 'var(--mid)' }}>{b.when}</span>
          <span style={{ fontSize: 11, color: 'var(--green)' }}>{b.size}</span>
          <span style={{ fontSize: 9, letterSpacing: '0.14em', color: b.type === 'manual' ? 'var(--amber)' : 'var(--dim)' }}>
            {b.type.toUpperCase()}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn btn-ghost" onClick={() => pushLog('ok', `[Backups] downloading ${b.id}.tar.gz`)}>↓</button>
            <button className="btn btn-ghost" onClick={() => pushLog('warn', `[Backups] restored ${b.id} · server restarting...`)}>⟲ restore</button>
            <button className="btn btn-ghost" onClick={() => pushLog('warn', `[Backups] deleted ${b.id}`)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Players panel ──────────────────────────────────────────

function PlayersPanel({ pushLog }) {
  const [players, setPlayers] = uSD(PLAYERS_DATA);
  function kick(p) { setPlayers(arr => arr.filter(x => x.name !== p.name)); pushLog('warn', `[Players] kicked ${p.name}`); }
  function op(p)   { pushLog('ok', `[Players] ${p.name} promoted to OP`); }
  function tp(p)   { pushLog('info', `[Players] teleporting to ${p.name} → ${p.loc}`); }
  return (
    <div>
      <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em', marginBottom: 8 }}>// ONLINE · {players.length}</div>
      <div style={{ border: '1px solid var(--line)', background: 'var(--bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.6fr 1.4fr 1fr', padding: '8px 14px', borderBottom: '1px solid var(--line)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.12em' }}>
          <span>PLAYER</span><span>RANK</span><span>PING</span><span>POSITION</span><span>ACTIONS</span>
        </div>
        {players.map(p => (
          <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.6fr 1.4fr 1fr', padding: '10px 14px', borderBottom: '1px dashed var(--line)', alignItems: 'center', fontSize: 12 }}>
            <span style={{ color: 'var(--magenta)' }}>● {p.name}</span>
            <span style={{ color: p.rank === 'OWNER' ? 'var(--amber)' : p.rank === 'MOD' ? 'var(--green)' : 'var(--mid)', fontSize: 10, letterSpacing: '0.14em' }}>{p.rank}</span>
            <span style={{ color: p.ping > 100 ? 'var(--amber)' : 'var(--green)' }}>{p.ping}ms</span>
            <span style={{ color: 'var(--mid)', fontSize: 11 }}>{p.loc}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn btn-ghost" onClick={() => tp(p)}>▸ tp</button>
              <button className="btn btn-ghost" onClick={() => op(p)}>↑ op</button>
              <button className="btn btn-ghost" onClick={() => kick(p)}>✕ kick</button>
            </div>
          </div>
        ))}
        {players.length === 0 && (
          <div style={{ padding: 24, color: 'var(--dim)', fontSize: 12, textAlign: 'center' }}>
            // no players online
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Settings panel ─────────────────────────────────────────

function SettingsPanel({ srv, pushLog }) {
  const [name, setName] = uSD(srv.id);
  const [motd, setMotd] = uSD('§a§lBinaryFall §7· §fa server falling into place');
  const [max, setMax] = uSD(80);
  const [whitelist, setWl] = uSD(false);
  const [diff, setDiff] = uSD('normal');
  return (
    <form onSubmit={e => { e.preventDefault(); pushLog('ok', `[Settings] ${srv.id} configuration saved`); }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="field">
          <label>server name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>max players</label>
          <input type="number" value={max} onChange={e => setMax(+e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>motd</label>
        <input value={motd} onChange={e => setMotd(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="field">
          <label>difficulty</label>
          <select value={diff} onChange={e => setDiff(e.target.value)}>
            <option>peaceful</option><option>easy</option><option>normal</option><option>hard</option>
          </select>
        </div>
        <div className="field">
          <label>whitelist</label>
          <select value={whitelist ? 'on' : 'off'} onChange={e => setWl(e.target.value === 'on')}>
            <option value="off">off</option><option value="on">on</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
        <button className="btn btn-primary" type="submit">▸ Save & reload</button>
        <button className="btn" type="button" onClick={() => pushLog('warn', '[Settings] reset to defaults')}>↺ Reset</button>
        <button className="btn" type="button" onClick={() => pushLog('info', '[Settings] config exported · settings.toml')}>↓ Export</button>
      </div>
    </form>
  );
}

// ─── Overview panel (the original stats grid) ──────────────

function OverviewPanel({ srv, log, pushLog, tick }) {
  return (
    <>
      <div className="dash-stats">
        <div className="dash-stat">
          <div className="dash-stat-k">CPU</div>
          <div className="dash-stat-v">{34 + (tick % 6)}%</div>
          <div className="dash-stat-bar"><span style={{ transform: `scaleX(${0.34 + (tick % 6) / 100})` }} /></div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-k">RAM</div>
          <div className="dash-stat-v">5.4/8 GB</div>
          <div className="dash-stat-bar"><span style={{ transform: 'scaleX(0.67)' }} /></div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-k">PLAYERS</div>
          <div className="dash-stat-v">{12 + (tick % 4)}/80</div>
          <div className="dash-stat-bar"><span style={{ transform: `scaleX(${(12 + (tick % 4)) / 80})` }} /></div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-k">TPS</div>
          <div className="dash-stat-v">{(19.8 + (tick % 3) * 0.1).toFixed(1)}</div>
          <div className="dash-stat-bar"><span style={{ transform: 'scaleX(0.99)' }} /></div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em', marginBottom: 6 }}>// RECENT EVENTS</div>
          <div className="console" style={{ height: 240 }}>
            {log.slice(-10).map((l, i) => (
              <div key={i} className="console-line">
                <span className="t">[{l.t}]</span> <span className={l.cls}>{l.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: 'var(--dim)', letterSpacing: '0.14em', marginBottom: 6 }}>// PLAYERS ONLINE</div>
          <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', height: 240, overflow: 'auto', padding: '8px 0' }}>
            {PLAYERS_DATA.map(p => (
              <div key={p.name} style={{ padding: '6px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 12, borderBottom: '1px dashed var(--line)' }}>
                <span style={{ color: 'var(--magenta)' }}>● {p.name}</span>
                <span style={{ color: 'var(--dim)' }}>{p.ping}ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page shell ─────────────────────────────────────────────

function DashboardPage({ setRoute }) {
  const [activeServer, setActiveServer] = uSD(SERVERS[0]);
  const [panel, setPanel] = uSD('Overview');
  const [tick, setTick] = uSD(0);
  const [log, setLog] = uSD([
    { t: '0.0s', cls: 'info', m: '[Server] Done (12.4s)! For help, type "help"' },
    { t: '4.1s', cls: 'ok',   m: '[Server] World loaded · 1.21.4 · seed: 0xBF31415' },
    { t: '6.2s', cls: 'player', m: '→ ZeroOne joined the game' },
    { t: '8.0s', cls: 'info', m: '[Backups] snapshot taken · 1.2 GB · vault://daily/0142' },
    { t: '11s',  cls: 'player', m: '→ NullByte joined the game' },
    { t: '14s',  cls: 'info', m: '[Plugins] EssentialsX loaded · 12 commands registered' },
    { t: '18s',  cls: 'warn', m: '[Watchdog] tick took 78ms · still healthy' },
    { t: '22s',  cls: 'player', m: '→ h3xCat joined the game' },
    { t: '24s',  cls: 'ok',   m: '[Auto-restart] scheduled for 04:00 UTC' },
  ]);
  const startRef = uRD(Date.now());

  uED(() => {
    const i = setInterval(() => setTick(t => t + 1), 1500);
    return () => clearInterval(i);
  }, []);

  function pushLog(cls, m) {
    const t = ((Date.now() - startRef.current) / 1000).toFixed(0) + 's';
    setLog(l => [...l, { t, cls, m }].slice(-200));
  }

  function runCommand(raw) {
    const cmd = raw.replace(/^\//, '');
    const tag = `[${activeServer.id}]`;
    pushLog('info', `${tag} > ${cmd}`);

    // Built-in command parser
    const [head, ...rest] = cmd.split(/\s+/);
    const head_l = head.toLowerCase();

    if (head_l === 'help') {
      pushLog('ok', '[Help] available: help, list, time, save-all, stop, kick, give, op, deop, weather, gamemode, broadcast, plugins, ban, whitelist');
    } else if (head_l === 'list') {
      pushLog('info', `[Server] ${PLAYERS_DATA.length}/80 online: ${PLAYERS_DATA.map(p => p.name).join(', ')}`);
    } else if (head_l === 'time') {
      pushLog('ok', `[Time] set to ${rest.join(' ') || 'day'}`);
    } else if (head_l === 'save-all' || head_l === 'save') {
      pushLog('ok', '[Server] saved · 1247 chunks written');
    } else if (head_l === 'stop') {
      pushLog('warn', '[Server] stop initiated · server going down NOW');
    } else if (head_l === 'kick') {
      pushLog('warn', `[Server] kicked ${rest[0] || '<player>'}`);
    } else if (head_l === 'give') {
      pushLog('ok', `[Server] gave ${rest[1] || 'diamond'} ×${rest[2] || 1} to ${rest[0] || 'player'}`);
    } else if (head_l === 'op') {
      pushLog('ok', `[Server] ${rest[0] || 'player'} is now an op`);
    } else if (head_l === 'deop') {
      pushLog('ok', `[Server] ${rest[0] || 'player'} is no longer an op`);
    } else if (head_l === 'weather') {
      pushLog('ok', `[Weather] set to ${rest[0] || 'clear'}`);
    } else if (head_l === 'gamemode' || head_l === 'gm') {
      pushLog('ok', `[GameMode] ${rest[1] || rest[0] || 'survival'}`);
    } else if (head_l === 'broadcast' || head_l === 'say') {
      pushLog('info', `[Broadcast] ${rest.join(' ')}`);
    } else if (head_l === 'plugins') {
      pushLog('info', `[Plugins] ${PLUGINS.filter(p => p.enabled).map(p => p.name).join(', ')}`);
    } else if (head_l === 'ban') {
      pushLog('warn', `[Server] banned ${rest[0] || '<player>'}`);
    } else if (head_l === 'whitelist') {
      pushLog('ok', `[Whitelist] ${rest.join(' ') || 'list'}`);
    } else if (head_l === 'clear') {
      setLog([]); return;
    } else if (head_l) {
      pushLog('err', `[Server] unknown command: ${head}. type "help".`);
    }

    // Test panel notice + discount — every command, per request
    setTimeout(() => {
      pushLog('warn', '[Notice] this is a test panel · commands are simulated');
      pushLog('ok',   '[Promo] use code  BINARYFALL20  for 20% OFF your first month');
    }, 240);
  }

  const headerActions = [
    { l: '⟳ Restart', cls: 'warn', m: '[Server] restart initiated · ETA 12s' },
    { l: '⏏ Stop',    cls: 'warn', m: '[Server] stop initiated · server going down NOW' },
    { l: '▶ Start',   cls: 'ok',   m: '[Server] starting up...' },
    { l: '✓ Save',    cls: 'ok',   m: '[Server] saved · 1247 chunks written' },
  ];

  return (
    <div className="page">
      <div className="container">
        <window.BFChrome.Crumbs path="dashboard" />
        <span className="eyebrow">// 0x07 · Control Panel</span>
        <h1 className="section-title">Your dashboard.</h1>
        <p className="section-sub">
          Test panel — every button works, every tab opens a real view, and the
          console takes typed commands. Try it.
        </p>

        <div className="dash">
          <DashSide
            activeServer={activeServer}
            setActiveServer={(s) => { setActiveServer(s); pushLog('info', `[Panel] switched to ${s.id}`); }}
            panel={panel}
            setPanel={(p) => { setPanel(p); pushLog('info', `[Panel] opened "${p}"`); }}
          />
          <main className="dash-main">
            <div className="dash-head">
              <div>
                <div className="dash-server-name">
                  {activeServer.id} {activeServer.status === 'online' ? '◉' : '◯'}
                </div>
                <div className="dash-server-meta">
                  {activeServer.addr} · {activeServer.stack} · {activeServer.region} · uptime {activeServer.uptime}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {headerActions.map(a => (
                  <button key={a.l} className="btn" onClick={() => pushLog(a.cls, a.m)}>{a.l}</button>
                ))}
              </div>
            </div>

            {panel === 'Overview'    && <OverviewPanel srv={activeServer} log={log} pushLog={pushLog} tick={tick} />}
            {panel === 'Console'     && <ConsolePanel srv={activeServer} log={log} setLog={setLog} runCommand={runCommand} tick={tick} />}
            {panel === 'File Manager'&& <FilePanel pushLog={pushLog} />}
            {panel === 'Plugins'     && <PluginsPanel pushLog={pushLog} />}
            {panel === 'Schedules'   && <SchedulesPanel pushLog={pushLog} />}
            {panel === 'Backups'     && <BackupsPanel pushLog={pushLog} />}
            {panel === 'Players'     && <PlayersPanel pushLog={pushLog} />}
            {panel === 'Settings'    && <SettingsPanel srv={activeServer} pushLog={pushLog} />}
          </main>
        </div>
      </div>
    </div>
  );
}

window.DashboardPage = DashboardPage;
