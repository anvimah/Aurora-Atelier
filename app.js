/* Aurora Atelier – butiklogik (demo) */
const drawer = $('#cartDrawer');
drawer.hidden = !open;
if(open){ trapFocus(drawer); $('#closeCart').focus(); }
}


function trapFocus(modal){
const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', modal).filter(el => !el.hasAttribute('disabled'));
const first = focusable[0];
const last = focusable[focusable.length - 1];
function loop(e){
if(e.key !== 'Tab') return;
if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
}
modal.addEventListener('keydown', loop);
$('#cartBackdrop').onclick = closeCart;
}


function announce(msg){ const sr = $('#srLive'); sr.textContent = ''; setTimeout(()=> sr.textContent = msg, 10); }


// Filters
function setFilter(val){ state.filter = val; $$('.chip').forEach(c=>c.classList.toggle('is-active', c.dataset.filter===val || (val==='Alla' && c.dataset.filter==='Alla'))); renderProducts(); }


// Search
function setQuery(val){ state.query = val; renderProducts(); }


// Events
window.addEventListener('DOMContentLoaded', () => {
// Year in footer
$('#year').textContent = new Date().getFullYear();


// Render
renderProducts();
renderCart();
updateCartCount();


// Filter chips
$$('.chip').forEach(ch => ch.addEventListener('click', () => setFilter(ch.dataset.filter)));


// Category cards -> filter
$$('.cat-card').forEach(cc => cc.addEventListener('click', (e) => {
e.preventDefault();
setFilter(cc.dataset.filter);
document.getElementById('shop').scrollIntoView({behavior:'smooth'});
}));


// Searchbar
const sb = $('#searchbar');
$('#openSearch').addEventListener('click', ()=>{ sb.hidden = false; $('#searchInput').focus(); });
$('#closeSearch').addEventListener('click', ()=>{ sb.hidden = true; setQuery(''); $('#searchInput').value=''; });
$('#searchInput').addEventListener('input', (e)=> setQuery(e.target.value));


// Cart
$('#openCart').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#checkoutBtn').addEventListener('click', ()=> alert('Kassan är en demo i denna mall.'));
});
})();