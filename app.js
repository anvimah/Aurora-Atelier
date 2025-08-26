/* Aurora Atelier — komplett butik: produkter, filter, sök, sortering, modaler, varukorg, rabatt & frakt */


const sub = calcSubtotal();
const disc = calcDiscount(sub);
const ship = calcShipping(sub - disc);


$('#cartSubtotal').textContent = money(sub);
$('#cartDiscount').textContent = disc ? `– ${money(disc)}` : '– 0 kr';
$('#cartShipping').textContent = money(ship);
$('#cartTotal').textContent = money(Math.max(0, sub - disc) + ship);



function persistCart(){ save('aa_cart', state.cart); save('aa_discount', state.discount); save('aa_ship', state.shippingZone); }
function updateCartCount(){ $('#cartCount').textContent = state.cart.reduce((s,i)=> s+i.qty, 0); }


// --- UI helpers ----------------------------------------------------------
function openCart(){ toggleCart(true); }
function closeCart(){ toggleCart(false); }
function toggleCart(open){ const drawer = $('#cartDrawer'); drawer.hidden = !open; if(open){ trapFocus(drawer); $('#closeCart').focus(); } }
function trapFocus(modal){
const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal).filter(el => !el.hasAttribute('disabled'));
const first = f[0]; const last = f[f.length-1];
function loop(e){ if(e.key!=='Tab') return; if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); } }
modal.addEventListener('keydown', loop);
$('#cartBackdrop').onclick = closeCart;
}
function announce(msg){ const sr = $('#srLive'); sr.textContent = ''; setTimeout(()=> sr.textContent = msg, 10); }


// --- Events --------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
// Year in footer
$('#year').textContent = new Date().getFullYear();


// Render
renderProducts();
renderCart();
updateCartCount();


// Filter chips
$$('.chip').forEach(ch => ch.addEventListener('click', () => { state.filter = ch.dataset.filter; $$('.chip').forEach(c=>c.classList.toggle('is-active', c===ch)); renderProducts(); }))


// Category cards
$$('.cat-card').forEach(cc => cc.addEventListener('click', (e) => { e.preventDefault(); state.filter = cc.dataset.filter; $$('.chip').forEach(c=>c.classList.toggle('is-active', c.dataset.filter===state.filter)); renderProducts(); document.getElementById('shop').scrollIntoView({behavior:'smooth'}); }));


// Searchbar
const sb = $('#searchbar');
$('#openSearch').addEventListener('click', ()=>{ sb.hidden = false; $('#searchInput').focus(); });
$('#closeSearch').addEventListener('click', ()=>{ sb.hidden = true; state.query=''; $('#searchInput').value=''; renderProducts(); });
$('#searchInput').addEventListener('input', (e)=> { state.query = e.target.value; renderProducts(); });
$('#sortSelect').addEventListener('change', (e)=> { state.sort = e.target.value; renderProducts(); });


// Cart controls
$('#openCart').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#checkoutBtn').addEventListener('click', ()=> alert('Kassan är en demo i denna mall.'));


// Discount
$('#applyDiscount').addEventListener('click', ()=>{
const v = $('#discountInput').value.trim().toUpperCase();
if(!v){ state.discount=null; } else if(v==='AURORA10'){ state.discount={code:v}; } else { alert('Ogiltig kod'); state.discount=null; }
persistCart(); renderCart();
});


// Shipping
$('#shippingSelect').addEventListener('change', (e)=>{ state.shippingZone = e.target.value; persistCart(); renderCart(); });


// Newsletter (demo)
$('#newsletterForm').addEventListener('submit', (e)=>{ e.preventDefault(); alert('Tack! Du är nu med på listan.'); e.target.reset(); });
});
