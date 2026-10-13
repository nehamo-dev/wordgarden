/*
 * Little Lanterns: persistent game menu.
 * Include on every game page:  <script src="../shared/nav.js" defer></script>
 * Adds a "Little Lanterns" menu pill (top-right, in its own strip above the page) that opens a menu with Home and every game.
 * Add new games to GAMES below.
 */
(function () {
  // Site root, resolved from this script's own URL so it works locally and on GitHub Pages.
  const script = document.currentScript;
  const root = new URL('../', script ? script.src : location.href);

  const GAMES = [
    { name: 'Word Garden', note: 'Sight words', path: 'word-garden/', color: '#79D2B2' },
    { name: 'Table Talk', note: 'Dinner trivia', path: 'table-talk/', color: '#B7A3F3' },
    { name: 'Peekaworld', note: 'The world', href: 'https://peekaworld.vercel.app/#world', color: '#8CC4FF' },
  ];

  const here = location.href.split('#')[0].split('?')[0];
  const urlOf = g => g.href || new URL(g.path, root).href;
  const isCurrent = g => !g.href && here.startsWith(urlOf(g));

  const CHEV = `<svg class="chev" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#3B3355" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;
  const LANTERN = `<svg class="lantern" viewBox="-40 -14 80 106" aria-hidden="true"><path d="M0 -14V0" stroke="#B58863" stroke-width="3"/>
    <rect x="-13" y="0" width="26" height="9" rx="3" fill="#3B3355"/><ellipse cx="0" cy="34" rx="34" ry="27" fill="#FF8B7B"/>
    <ellipse cx="0" cy="34" rx="17" ry="27" fill="none" stroke="#3B3355" stroke-opacity=".14" stroke-width="2"/>
    <rect x="-13" y="59" width="26" height="9" rx="3" fill="#3B3355"/><path d="M0 68v9" stroke="#3B3355" stroke-width="2.5"/><path d="M-4 77h8l-1.5 12h-5z" fill="#FFC95E"/>
    <circle cx="-9" cy="35" r="3.3" fill="#3B3355"/><circle cx="9" cy="35" r="3.3" fill="#3B3355"/>
    <path d="M-5 42q5 5 10 0" stroke="#3B3355" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
  const HOME = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#3B3355" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/></svg>`;
  const OUT = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#7A7194" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`;

  const host = document.createElement('div');
  host.id = 'll-nav';
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host{all:initial}
      *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
      .wrap{position:fixed;right:max(14px,env(safe-area-inset-right));top:calc(12px + env(safe-area-inset-top));z-index:2147483000;font-family:'Outfit',system-ui,sans-serif;color:#3B3355}
      .fab{height:52px;border-radius:99px;border:0;background:#FFD8CF;cursor:pointer;display:flex;align-items:center;gap:8px;padding:0 16px 0 10px;
        font:inherit;font-size:18px;font-weight:600;color:#3B3355;letter-spacing:-.01em;
        box-shadow:0 5px 0 #F4B2A4,0 10px 24px -12px rgba(59,51,85,.45);transition:transform .12s,box-shadow .12s}
      .fab:active{transform:translateY(3px);box-shadow:0 2px 0 #F4B2A4}
      .fab .lantern{width:26px;height:36px;transform-origin:50% 0;animation:sway 5s ease-in-out infinite}
      .fab .chev{width:18px;height:18px;transition:transform .2s}
      .open .fab .chev{transform:rotate(180deg)}
      .fab:focus-visible,.item:focus-visible{outline:3px solid #3B3355;outline-offset:3px}
      .menu{position:absolute;right:0;top:64px;width:min(300px,calc(100vw - 28px));background:#FFFBF5;border-radius:26px;padding:10px;
        box-shadow:0 18px 44px -14px rgba(59,51,85,.45),0 0 0 1px rgba(59,51,85,.06);transform-origin:100% 0;
        transform:scale(.85) translateY(-8px);opacity:0;pointer-events:none;transition:transform .2s cubic-bezier(.3,.8,.3,1.2),opacity .15s}
      .open .menu{transform:none;opacity:1;pointer-events:auto}
      .title{font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#7A7194;padding:8px 12px 6px}
      .item{display:flex;align-items:center;gap:12px;padding:12px;border-radius:18px;text-decoration:none;color:inherit;font-size:18px;font-weight:600}
      .item:hover{background:rgba(59,51,85,.05)}
      .item.current{background:#F1ECF8}
      .icon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;flex:none}
      .icon svg{width:22px;height:22px}
      .dot{width:16px;height:16px;border-radius:50%}
      .item small{display:block;font-size:13px;font-weight:400;color:#7A7194}
      .item .grow{flex:1}
      .out svg{width:18px;height:18px}
      .here{font-size:12px;font-weight:600;color:#7A7194;background:#fff;padding:3px 8px;border-radius:99px}
      hr{border:0;border-top:1px solid #ECE5F3;margin:4px 10px}
      @keyframes sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
      @media (prefers-reduced-motion:reduce){.fab svg{animation:none}.menu{transition:none}}
    </style>
    <div class="wrap">
      <nav class="menu" id="menu" aria-label="Little Lanterns games">
        <div class="title">Little Lanterns</div>
        <a class="item" href="${root.href}"><span class="icon" style="background:#FFE7AE">${HOME}</span><span class="grow">All games</span></a>
        <hr>
        ${GAMES.map(g => `
          <a class="item ${isCurrent(g) ? 'current' : ''}" href="${urlOf(g)}" ${isCurrent(g) ? 'aria-current="page"' : ''}>
            <span class="icon" style="background:#fff"><span class="dot" style="background:${g.color}"></span></span>
            <span class="grow">${g.name}<small>${g.note}</small></span>
            ${isCurrent(g) ? '<span class="here">Playing</span>' : g.href ? `<span class="out">${OUT}</span>` : ''}
          </a>`).join('')}
      </nav>
      <button class="fab" id="fab" aria-label="Little Lanterns menu" aria-expanded="false" aria-controls="menu">${LANTERN}<span>Little Lanterns</span>${CHEV}</button>
    </div>`;

  const wrap = shadow.querySelector('.wrap');
  const fab = shadow.getElementById('fab');
  const setOpen = open => { wrap.classList.toggle('open', open); fab.setAttribute('aria-expanded', String(open)); };
  fab.addEventListener('click', e => { e.stopPropagation(); setOpen(!wrap.classList.contains('open')); });
  shadow.getElementById('menu').addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  // Reserve a strip at the top of the page so the pill never covers game content.
  const space = document.createElement('style');
  space.textContent = 'body{padding-top:calc(72px + env(safe-area-inset-top))}';
  document.head.appendChild(space);

  const mount = () => document.body.appendChild(host);
  document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);
})();
