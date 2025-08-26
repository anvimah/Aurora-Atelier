/* Aurora Atelier – butiklogik (produktkatalog + varukorg + detaljer) */
(function() {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' });

  const state = {
    products: [
      // --- HALSBAND ---
      {
        id: 'n1',
        name: 'Aura Pendant',
        category: 'Halsband',
        price: 1290,
        tones: ['silver','gold'],
        images: {
          silver: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
          gold: 'https://images.unsplash.com/photo-1596944924616-7b38e5ebae86?q=80&w=1200&auto=format&fit=crop'
        },
        description: 'Minimalistiskt halssmycke med medaljong som fångar ljuset.',
        material: '925 sterlingsilver / 18K guldplätering',
        chainLength: '45 cm (justerbar till 40 cm)',
        sku: 'AA-N-AURA-001',
        stock: 32
      },
      {
        id: 'b1',
        name: 'North Cuff',
        category: 'Armband',
        price: 1490,
        tones: ['silver'],
        images: {
          silver: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
        },
        description: 'Styvt cuff-armband med mjukt rundade ändar.',
        material: '925 sterlingsilver',
        sku: 'AA-B-NORTH-001',
        stock: 14
      },
      {
        id: 'r1',
        name: 'Linea Ring',
        category: 'Ringar',
        price: 990,
        tones: ['silver','gold'],
        images: {
          silver: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop',
          gold: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce346?q=80&w=1200&auto=format&fit=crop'
        },
        description: 'Ren ring med subtil mittlinje – stapla flera för effekt.',
        material: '925 sterlingsilver / 18K guldplätering',
        ringSizes: ['50','52','54','56','58'],
        sku: 'AA-R-LINEA-001',
        stock: 12
      }
    ],
    cart: []
  };

  // --- Render products
  function renderProducts()
