/* Aurora Atelier — produkter, filter/sök/sort, detaljmodal, varukorg, rabatt & frakt */
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' });
  const money = n => fmt.format(n);

  // Demo-produkter
  const products = [
    // Halsband
    {
      id: 'N-AURA',
      name: 'Aura Necklace',
      category: 'Halsband',
      price: 1490,
      tones: ['silver', 'gold'],
      images: {
        silver: 'https://designtorget.se/image/14222/dearsilverhalsband1.jpg',
        gold: 'https://designtorget.se/image/14231/dearguldhalsband1.jpg'
      },
      description: 'Minimalistiskt halsband med mjukt fasetterad medaljong.',
      material: 'Återvunnet 925 sterlingsilver / 18K guldplätering (2 µm)',
      dimensions: 'Hänge 14 × 10 mm',
      chainLength: '45 cm (justerbar till 40 cm)',
      weight: '7 g',
      hallmark: '925 / 18K',
      warrantyMonths: 24,
      madeIn: 'Sverige',
      care: 'Undvik vatten och parfym.',
      sku: 'AA-N-AURA-001',
      stock: 18,
      createdAt: '2025-08-01'
    },
    {
      id: 'N-LUNA',
      name: 'Luna Necklace',
      category: 'Halsband',
      price: 1690,
      tones: ['silver'],
      images: {
        silver: 'https://lelika.se/wp-content/uploads/2024/08/6-8-scaled.webp',
        gold: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce346?q=80&w=1200&auto=format&fit=crop'
      },
      description: 'Klassiskt silverhalsband med berlock.',
      material: '925 sterlingsilver',
      dimensions: 'Bar 28 × 3 mm',
      chainLength: '42 cm',
      weight: '6 g',
      hallmark: '925',
      warrantyMonths: 24,
      madeIn: 'Sverige',
      care: 'Putsa med silverduk.',
      sku: 'AA-N-LUNA-003',
      stock: 12,
      createdAt: '2025-08-12'
    },

    // Armband
    {
      id: 'B-NORTH',
      name: 'North Cuff',
      category: 'Armband',
      price: 1790,
      tones: ['silver'],
      images: {
        silver: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
      },
      description: 'Styvt cuff-armband med mjukt rundade ändar.',
      material: '925 sterlingsilver',
      dimensions: 'Bredd 5 mm, omkrets 16–18 cm (justerbar)',
      weight: '18 g',
      hallmark: '925',
      warrantyMonths: 24,
      madeIn: 'Sverige',
      care: 'Böj varsamt.',
      sku: 'AA-B-NORTH-001',
      stock: 10,
      createdAt: '2025-07-30'
    },
    {
      id: 'B-SILH',
      name: 'Silhouette Chain',
      category: 'Armband',
      price: 1290,
      tones: ['silver', 'gold'],
      images: {
        silver: 'https://images.unsplash.com/photo-1677590740478-e286e07b97ab?q=80&w=1200&auto=format&fit=crop',
        gold: 'https://images.unsplash.com/photo-1591798454438-a3c3a5c89c3b?q=80&w=1200&auto=format&fit=crop'
      },
      description: 'Finstämd kedja med ovala länkar – vardagsfin eller lager på lager.',
      material: 'Mässing 18K guldplätering / 925 silver',
      dimensions: 'Längd 17 cm + 3 cm förlängning',
      weight: '8 g',
      hallmark: '18K / 925',
      warrantyMonths: 12,
      madeIn: 'Europa',
      care: 'Undvik kemikalier och bad.',
      sku: 'AA-B-SILH-002',
      stock: 24,
      createdAt: '2025-08-15'
    },

    // Ringar
    {
      id: 'R-LINEA',
      name: 'Linea Ring',
      category: 'Ringar',
      price: 1190,
      tones: ['silver', 'gold'],
      images: {
        silver: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop',
        gold: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce346?q=80&w=1200&auto=format&fit=crop'
      },
      description: 'Ren ring med subtil mittlinje – vacker solo eller staplad.',
      material: '925 sterlingsilver / 18K guldplätering',
      dimensions: 'Bredd 2.5 mm',
      weight: '4 g (stl 54)',
      ringSizes: ['50','52','54','56','58'],
      hallmark: '925 / 18K',
      warrantyMonths: 24,
      madeIn: 'Sverige',
      care: 'Ta av vid träning och dusch.',
      sku: 'AA-R-LINEA-001',
      stockBySize: { '50':5, '52':8, '54':12, '56':6, '58':4 },
      createdAt: '2025-08-10'
    },
    {
      id: 'R-SIGN',
      name: 'Bold Signet',
      category: 'Ringar',
      price: 1690,
      tones: ['silver'],
      images: {
        silver: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop'
      },
      description: 'Klassisk signetring – kan graveras.',
      material: '925 sterlingsilver',
      dimensions: 'Topp 12 × 10 mm',
      weight: '9 g (stl 56)',
      ringSizes: ['54','56','58','60'],
      hallmark: '925',
      warrantyMonths: 24,
      madeIn: 'Europa',
      care: 'Ta av vid handtvätt.',
      sku: 'AA-R-SIGN-003',
      stockBySize: { '54':3, '56':6, '58':5, '60':2 },
      createdAt: '2025-07-25'
    }
  ];

  // State
  const state = {
    filter: 'Alla',
    query: '',
    sort: 'featured',
    cart: load('aa_cart', []),           // [{key,id,name,tone,size,price,qty,image}]
    discount: load('aa_discount', null), // {code:'AURORA10'}
    shippingZone: load('aa_ship', 'SE')  // 'SE' | 'EU' | 'World'
  };

  // Helpers
  function save(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
  function load(k,fb){ try{ return JSON.parse(localStorage.getItem(k)) ?? fb }catch{ return fb } }
  const keyOf = (p,tone,size) => [p.id, tone||'', size||''].join('_');
  const defaultSize = p => Array.isArray(p.ringSizes) ? p.ringSizes[0] : null;

  // Render produkter
  function renderProducts(){
    const grid = $('#productGrid');
    grid.innerHTML = '';
    let list = products.filter(p => (state.filter==='Alla' || p.category===state.filter) && matchQuery(p));
    list = sortProducts(list, state.sort);
    list.forEach(p => grid.appendChild(productCard(p)));
    if(!list.length) grid.innerHTML = '<p>Inga produkter hittades.</p>';
  }
  function matchQuery(p){
    if(!state.query.trim()) return true;
    const q = state.query.toLowerCase();
    return [p.name, p.category, p.material, p.description, p.sku].some(v => (v||'').toLowerCase().includes(q));
  }
  function sortProducts(list, mode){
    const byDate = (a,b) => new Date(b.createdAt) - new Date(a.createdAt);
    if(mode==='priceAsc') return list.sort((a,b)=> a.price-b.price);
    if(mode==='priceDesc') return list.sort((a,b)=> b.price-a.price);
    if(mode==='newest') return list.sort(byDate);
    return list.sort(byDate);
  }
  function productCard(p){
    const el = document.createElement('article');
    el.className = 'card fade-in';
    const tone = p.tones[0];
    el.innerHTML = `
      <div class="card-media">
        <button class="icon-btn wish" aria-label="Önskelista">❤</button>
        <img src="${p.images[tone]}" alt="${p.name} i ${tone}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <div class="card-meta">${p.category} • <span>${money(p.price)}</span></div>
        <p class="card-desc">${p.description}</p>
        <div class="swatches" role="group" aria-label="Metall">
          ${p.tones.map((t,i)=>`<button class="swatch ${i===0?'is-active':''}" data-tone="${t}" aria-label="${t}"></button>`).join('')}
        </div>
        <div class="card-actions">
          <button class="btn" data-id="${p.id}" data-act="details">Detaljer</button>
          <button class="btn btn-primary add" data-id="${p.id}">Lägg i korg</button>
        </div>
      </div>`;
    const swatches = $$('.swatch', el);
    const img = $('img', el);
    swatches.forEach(s => s.addEventListener('click', () => {
      swatches.forEach(x => x.classList.remove('is-active'));
      s.classList.add('is-active');
      img.src = p.images[s.dataset.tone] || img.src;
      img.alt = `${p.name} i ${s.dataset.tone}`;
    }));
    $('[data-act="details"]', el).addEventListener('click', ()=> openDetails(p));
    $('.add', el).addEventListener('click', ()=> addToCart(p, 1, $('.swatch.is-active', el)?.dataset.tone || tone, defaultSize(p)));
    return el;
  }

  // Detaljmodal
  function openDetails(p){
    const tone = p.tones[0];
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-backdrop" data-close></div>
      <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="mTitle">
        <button class="icon-btn modal-close" data-close aria-label="Stäng">✖</button>
        <div class="modal-grid">
          <div class="modal-media">
            <img src="${p.images[tone]}" alt="${p.name} bild">
          </div>
          <div class="modal-body">
            <h2 id="mTitle">${p.name}</h2>
            <div class="m-price">${money(p.price)}</div>
            <p class="m-desc">${p.description}</p>
            <div class="select-row">
              <label for="toneSel">Metall</label>
              <select id="toneSel" class="tone-select">
                ${p.tones.map(t=>`<option value="${t}">${t}</option>`).join('')}
              </select>
            </div>
            ${p.ringSizes?`<div class="select-row"><label for="sizeSel">Storlek</label><select id="sizeSel" class="size-select">${p.ringSizes.map(s=>`<option value="${s}">${s}</option>`).join('')}</select></div>`:''}
            <dl class="specs">
              ${p.material?`<div><dt>Material</dt><dd>${p.material}</dd></div>`:''}
              ${p.dimensions?`<div><dt>Mått</dt><dd>${p.dimensions}</dd></div>`:''}
              ${p.chainLength?`<div><dt>Kedja</dt><dd>${p.chainLength}</dd></div>`:''}
              ${p.weight?`<div><dt>Vikt</dt><dd>${p.weight}</dd></div>`:''}
              ${p.hallmark?`<div><dt>Stämpel</dt><dd>${p.hallmark}</dd></div>`:''}
              ${p.warrantyMonths?`<div><dt>Garanti</dt><dd>${p.warrantyMonths} mån</dd></div>`:''}
              ${p.sku?`<div><dt>Artikelnummer</dt><dd>${p.sku}</dd></div>`:''}
              ${p.madeIn?`<div><dt>Ursprung</dt><dd>${p.madeIn}</dd></div>`:''}
            </dl>
            <div class="modal-actions">
              <button class="btn btn-primary" data-add>Lägg i korg</button>
            </div>
            <p class="f-muted f-small">${p.care || ''}</p>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const toneSel = $('#toneSel', modal);
    const sizeSel = $('#sizeSel', modal);
    modal.addEventListener('click', (e)=>{
      if(e.target.hasAttribute('data-close')) close();
      if(e.target.hasAttribute('data-add')){
        addToCart(p, 1, toneSel?.value || tone, sizeSel?.value || defaultSize(p));
        close();
      }
    });
    function onKey(e){ if(e.key==='Escape') close(); } document.addEventListener('keydown', onKey);
    function close(){ modal.remove(); document.removeEventListener('keydown', onKey); }
  }

  // Varukorg
  function addToCart(product, qty=1, tone='silver', size=null){
    const key = keyOf(product, tone, size);
    const f = state.cart.find(i=>i.key===key);
    if(f){ f.qty += qty; }
    else{
      state.cart.push({ key, id:product.id, name:product.name, tone, size, price:product.price, qty,
        image: product.images[tone] || Object.values(product.images)[0] });
    }
    persist(); announce(`${product.name} lades i varukorgen`); renderCart(); updateCartCount(); openCart();
  }
  function removeFromCart(key){ state.cart = state.cart.filter(i=>i.key!==key); persist(); renderCart(); updateCartCount(); }
  function changeQty(key, d){ const it = state.cart.find(i=>i.key===key); if(!it) return; it.qty = Math.max(1, it.qty + d); persist(); renderCart(); updateCartCount(); }
  const subtotal = () => state.cart.reduce((s,i)=> s + i.price*i.qty, 0);
  const discount = sub => state.discount?.code==='AURORA10' ? Math.round(sub*0.10) : 0;
  function shipping(sumAfterDiscount){ const z=state.shippingZone; if(z==='SE') return sumAfterDiscount>=600?0:49; if(z==='EU') return 99; return 149; }

  function renderCart(){
    const wrap = $('#cartItems'); wrap.innerHTML = '';
    if(!state.cart.length){ wrap.innerHTML = '<p>Din varukorg är tom.</p>'; }
    else{
      state.cart.forEach(i=>{
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <img src="${i.image}" alt="${i.name} ${i.tone}${i.size?` stl ${i.size}`:''}">
          <div>
            <h4>${i.name}</h4>
            <div class="meta">${i.tone}${i.size?` • stl ${i.size}`:''}</div>
            <div class="qty">
              <button data-act="down" aria-label="Minska">−</button>
              <span>${i.qty}</span>
              <button data-act="up" aria-label="Öka">＋</button>
            </div>
          </div>
          <div style="display:grid;gap:6px;justify-items:end">
            <div class="price">${money(i.qty*i.price)}</div>
            <button class="icon-btn" data-act="remove" aria-label="Ta bort">🗑️</button>
          </div>`;
        row.addEventListener('click', (e)=>{
          const act = e.target?.dataset?.act;
          if(act==='remove') removeFromCart(i.key);
          if(act==='down') changeQty(i.key,-1);
          if(act==='up') changeQty(i.key,+1);
        });
        wrap.appendChild(row);
      });
    }
    const sub = subtotal();
    const disc = discount(sub);
    const ship = shipping(sub - disc);
    $('#cartSubtotal').textContent = money(sub);
    $('#cartDiscount').textContent = disc ? `– ${money(disc)}` : '– 0 kr';
    $('#cartShipping').textContent = money(ship);
    $('#cartTotal').textContent = money(Math.max(0, sub - disc) + ship);
  }

  function persist(){ save('aa_cart', state.cart); save('aa_discount', state.discount); save('aa_ship', state.shippingZone); }
  const updateCartCount = () => $('#cartCount').textContent = state.cart.reduce((s,i)=> s+i.qty, 0);

  // UI
  function openCart(){ toggleCart(true); }
  function closeCart(){ toggleCart(false); }
  function toggleCart(open){ const d = $('#cartDrawer'); d.hidden = !open; if(open){ $('#closeCart').focus(); } }
  function announce(msg){ const sr = $('#srLive'); sr.textContent=''; setTimeout(()=> sr.textContent = msg, 10); }

  // Init
  window.addEventListener('DOMContentLoaded', () => {
    // årtal
    $('#year').textContent = new Date().getFullYear();

    // render
    renderProducts(); renderCart(); updateCartCount();

    // filterchips
    $$('.chip').forEach(ch => ch.addEventListener('click', () => {
      state.filter = ch.dataset.filter;
      $$('.chip').forEach(c => c.classList.toggle('is-active', c === ch));
      renderProducts();
    }));

    // kategorikort
    $$('.cat-card').forEach(cc => cc.addEventListener('click', (e) => {
      e.preventDefault();
      state.filter = cc.dataset.filter;
      $$('.chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === state.filter));
      renderProducts();
      document.getElementById('shop').scrollIntoView({behavior:'smooth'});
    }));

    // sök/sort
    const sb = $('#searchbar');
    $('#openSearch').addEventListener('click', ()=>{ sb.hidden=false; $('#searchInput').focus(); });
    $('#closeSearch').addEventListener('click', ()=>{ sb.hidden=true; state.query=''; $('#searchInput').value=''; renderProducts(); });
    $('#searchInput').addEventListener('input', e => { state.query = e.target.value; renderProducts(); });
    $('#sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });

    // varukorg
    $('#openCart').addEventListener('click', openCart);
    $('#closeCart').addEventListener('click', closeCart);
    $('#checkoutBtn').addEventListener('click', ()=> alert('Kassan är en demo.'));

    // rabatt
    $('#applyDiscount').addEventListener('click', ()=>{
      const v = $('#discountInput').value.trim().toUpperCase();
      if(!v) state.discount = null;
      else if(v === 'AURORA10') state.discount = { code: v };
      else { alert('Ogiltig kod'); state.discount = null; }
      persist(); renderCart();
    });

    // frakt
    $('#shippingSelect').addEventListener('change', e => { state.shippingZone = e.target.value; persist(); renderCart(); });

    // nyhetsbrev
    $('#newsletterForm').addEventListener('submit', e => { e.preventDefault(); alert('Tack! Du är nu med på listan.'); e.target.reset(); });
  });
})();
