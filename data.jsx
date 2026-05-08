/* eslint-disable */
// Static data for the BinaryFall site.

const GAMES = [
  {
    id: 'MC',
    code: '01',
    name: 'Minecraft',
    tag: 'Java + Bedrock · Modded · Forge · Paper',
    glyph:
`  ███████   
  █  ▒▒  █  
  █▒▒  ▒▒█  
  █  ▒▒  █  
  ███████   `,
    fromGB: 2,
    fromPrice: 3.50,
    primary: true,
    versions: ['1.21.x', '1.20.x', 'Forge', 'Fabric', 'Paper', 'Spigot'],
  },
  {
    id: 'RU',
    code: '02',
    name: 'Rust',
    tag: 'Vanilla · Modded · Oxide · 250 slot',
    glyph:
`  ░░▓▓░░░  
  ░▓▓▓▓░░  
  ▓▓▓▓▓░░  
  ░▓▓▓░░░  
  ░░▓░░░░  `,
    fromGB: 8,
    fromPrice: 14.00,
  },
  {
    id: 'PW',
    code: '03',
    name: 'Palworld',
    tag: 'Dedicated · 32 slot · CrossPlay',
    glyph:
`   ▄▀▀▄    
  █ ◉◉ █   
  █ ▄▄ █   
   ▀██▀    
   ░██░    `,
    fromGB: 16,
    fromPrice: 12.00,
  },
  {
    id: 'AR',
    code: '04',
    name: 'ARK',
    tag: 'Survival Ascended · Cluster · Mods',
    glyph:
`   ╱▔▔╲    
  ╱ ◢◣ ╲   
 ╱  ╲╱  ╲  
 ▔▔▔▔▔▔▔▔  
  ░░░░░░   `,
    fromGB: 16,
    fromPrice: 18.00,
  },
];

const COMING_SOON = [
  { id: '05', name: 'Valheim' },
  { id: '06', name: 'Project Zomboid' },
  { id: '07', name: 'Satisfactory' },
  { id: '08', name: 'Enshrouded' },
];

const LOCATIONS = [
  { id: 'NYC', city: 'New York', region: 'US East · Tier IV',     ping: 12, capacity: 78 },
  { id: 'DAL', city: 'Dallas',   region: 'US Central',             ping: 24, capacity: 42 },
  { id: 'LAX', city: 'Los Angeles', region: 'US West',             ping: 41, capacity: 61 },
  { id: 'FRA', city: 'Frankfurt', region: 'EU Central · DE',       ping: 88, capacity: 53 },
  { id: 'AMS', city: 'Amsterdam', region: 'EU West · NL',          ping: 92, capacity: 35 },
  { id: 'LON', city: 'London',    region: 'EU West · UK',          ping: 96, capacity: 47 },
  { id: 'SGP', city: 'Singapore', region: 'APAC',                  ping: 198, capacity: 28 },
  { id: 'SYD', city: 'Sydney',    region: 'OCE',                   ping: 220, capacity: 18 },
  { id: 'GRU', city: 'São Paulo', region: 'LATAM',                 ping: 132, capacity: 22, soon: true },
];

const SERVICES = [
  { name: 'Minecraft / minecraft.bf',     status: 'ok',   uptime: 99.998 },
  { name: 'Rust nodes / rust.bf',         status: 'ok',   uptime: 99.991 },
  { name: 'Palworld nodes / pal.bf',      status: 'ok',   uptime: 99.984 },
  { name: 'ARK cluster / ark.bf',         status: 'warn', uptime: 99.812 },
  { name: 'Web hosting / web.bf',         status: 'ok',   uptime: 99.999 },
  { name: 'VPS / vps.bf',                 status: 'ok',   uptime: 99.996 },
  { name: 'Panel / panel.bf',             status: 'ok',   uptime: 99.995 },
  { name: 'API / api.bf',                 status: 'ok',   uptime: 99.998 },
  { name: 'Backups / vault.bf',           status: 'ok',   uptime: 100.000 },
];

const WEB_PLANS = [
  { id: 'BIT',   name: 'Bit',     price: 2.50,  yearly: 24,  storage: '10 GB NVMe', sites: 1, db: 1, ssl: true, email: 5, dedip: false, prio: false },
  { id: 'BYTE',  name: 'Byte',    price: 6.00,  yearly: 60,  storage: '50 GB NVMe', sites: 5, db: 10, ssl: true, email: 25, dedip: false, prio: false, featured: true },
  { id: 'WORD',  name: 'Word',    price: 14.00, yearly: 140, storage: '200 GB NVMe', sites: 25, db: 'Unlimited', ssl: true, email: 100, dedip: true, prio: true },
  { id: 'BLOCK', name: 'Block',   price: 32.00, yearly: 320, storage: '1 TB NVMe',   sites: 'Unlimited', db: 'Unlimited', ssl: true, email: 500, dedip: true, prio: true },
];

const VPS_PLANS = [
  { id: 'NIBBLE', name: 'Nibble', price: 5.00,  yearly: 50,  cpu: '1 vCore',  ram: '2 GB',  storage: '40 GB NVMe',  bw: '2 TB',  os: 'Linux', root: true,  ipv4: 1, snapshot: false, ddos: '100G' },
  { id: 'BYTE',   name: 'Byte',   price: 12.00, yearly: 120, cpu: '2 vCore',  ram: '4 GB',  storage: '80 GB NVMe',  bw: '4 TB',  os: 'Linux', root: true,  ipv4: 1, snapshot: true,  ddos: '500G', featured: true },
  { id: 'KILO',   name: 'Kilo',   price: 28.00, yearly: 280, cpu: '4 vCore',  ram: '8 GB',  storage: '160 GB NVMe', bw: '8 TB',  os: 'Linux/Win', root: true,  ipv4: 1, snapshot: true, ddos: '500G' },
  { id: 'MEGA',   name: 'Mega',   price: 64.00, yearly: 640, cpu: '8 vCore',  ram: '16 GB', storage: '320 GB NVMe', bw: '16 TB', os: 'Linux/Win', root: true,  ipv4: 2, snapshot: true, ddos: '1Tbps' },
];

window.BF = { GAMES, COMING_SOON, LOCATIONS, SERVICES, WEB_PLANS, VPS_PLANS };
