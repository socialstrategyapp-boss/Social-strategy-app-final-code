// THE HOUSE PLANT SHOP — BARCODE & STOCK SYSTEM

const Store = {
  _get: (key) => { try { return JSON.parse(localStorage.getItem(key)) } catch { return null } },
  _set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  getProducts:  ()  => Store._get('hps_products')  || [],
  setProducts:  (p) => Store._set('hps_products', p),
  getMovements: ()  => Store._get('hps_movements') || [],
  setMovements: (m) => Store._set('hps_movements', m),
  getNextId:    ()  => Store._get('hps_next_id')   || 1,
  setNextId:    (n) => Store._set('hps_next_id', n),
}

const CATEGORIES = [
  'Succulents & Cacti','Tropical Plants','Ferns & Palms','Herbs & Edibles',
  'Flowering Plants','Pots & Planters','Homewares & Decor','Soil & Fertiliser','Plant Care','Other',
]

const Products = {
  all: () => Store.getProducts(),
  get: (id) => Products.all().find(p => p.id === id),
  findByBarcode: (barcode) => Products.all().find(p => p.barcode.toLowerCase() === barcode.toLowerCase().trim()),
  create: (data) => {
    const id = Store.getNextId()
    Store.setNextId(id + 1)
    const product = {
      id, name: data.name.trim(), category: data.category || 'Other',
      price: parseFloat(data.price) || 0, cost: parseFloat(data.cost) || 0,
      stock: parseInt(data.stock) || 0, threshold: parseInt(data.threshold) || 5,
      barcode: `PLANT-${String(id).padStart(6, '0')}`,
      supplier: (data.supplier || '').trim(), notes: (data.notes || '').trim(),
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    }
    Store.setProducts([...Products.all(), product])
    if (product.stock > 0) Movements.add(id, 'in', product.stock, 'Initial stock')
    return product
  },
  update: (id, data) => {
    Store.setProducts(Products.all().map(p => p.id !== id ? p : { ...p, ...data, updatedAt: new Date().toISOString() }))
    return Products.get(id)
  },
  delete: (id) => {
    Store.setProducts(Products.all().filter(p => p.id !== id))
    Store.setMovements(Movements.all().filter(m => m.productId !== id))
  },
  adjustStock: (id, qty, type, notes) => {
    const p = Products.get(id)
    if (!p) return
    Products.update(id, { stock: Math.max(0, p.stock + qty) })
    Movements.add(id, type, qty, notes || '')
  },
  lowStock: () => Products.all().filter(p => p.stock <= p.threshold),
}

const Movements = {
  all: () => Store.getMovements(),
  forProduct: (id) => Movements.all().filter(m => m.productId === id).reverse().slice(0, 20),
  add: (productId, type, quantity, notes) => {
    Store.setMovements([...Movements.all(), { id: Date.now() + Math.random(), productId, type, quantity, notes: notes || '', at: new Date().toISOString() }])
  },
}

let _view = '', _params = {}, _camera = null

function navigate(view, params) {
  params = params || {}
  if (_view === 'scanner' && _camera) {
    try { _camera.stop().catch(() => {}) } catch (_) {}
    _camera = null
  }
  _view = view; _params = params
  document.querySelectorAll('[data-view]').forEach(el => el.classList.toggle('nav-active', el.dataset.view === view))
  const main = document.getElementById('main')
  switch (view) {
    case 'dashboard':   main.innerHTML = viewDashboard(); break
    case 'products':    main.innerHTML = viewProducts(params); break
    case 'add-product': main.innerHTML = viewAddProduct(params); break
    case 'product':     main.innerHTML = viewProduct(params.id); break
    case 'print':       main.innerHTML = viewPrint(); break
    case 'scanner':     main.innerHTML = viewScanner(); break
    default:            main.innerHTML = viewDashboard()
  }
  setTimeout(renderAllBarcodes, 60)
  const mc = document.querySelector('.main-content')
  if (mc) mc.scrollTop = 0
}

function renderAllBarcodes() {
  if (typeof JsBarcode === 'undefined') return
  document.querySelectorAll('[data-barcode]').forEach(el => {
    try {
      JsBarcode(el, el.dataset.barcode, { format: 'CODE128', lineColor: '#111827', width: 2, height: parseInt(el.dataset.height || '60'), displayValue: true, fontSize: 11, margin: 6, background: '#ffffff' })
    } catch (_) {}
  })
}

function viewDashboard() {
  const products = Products.all()
  const lowStock = Products.lowStock()
  const totalVal = products.reduce((s, p) => s + p.price * p.stock, 0)
  const totalItems = products.reduce((s, p) => s + p.stock, 0)
  return `
  <div class="page-header no-print" style="padding-top:24px">
    <div>
      <div style="font-size:22px;margin-bottom:2px">🌿</div>
      <h1 class="page-title">Dashboard</h1>
      <p class="page-sub">Stock overview · The House Plant Shop</p>
    </div>
    <button class="btn-primary" onclick="navigate('add-product')">+ Add Product</button>
  </div>
  <div class="stat-grid" style="padding-top:20px">
    <div class="stat-card"><div class="stat-icon">📦</div><div class="stat-value">${products.length}</div><div class="stat-label">Products</div></div>
    <div class="stat-card"><div class="stat-icon">🌱</div><div class="stat-value">${totalItems}</div><div class="stat-label">Items in Stock</div></div>
    <div class="stat-card"><div class="stat-icon">💰</div><div class="stat-value">$${totalVal.toFixed(0)}</div><div class="stat-label">Stock Value</div></div>
    <div class="stat-card ${lowStock.length > 0 ? 'stat-card-alert' : ''}"><div class="stat-icon">⚠️</div><div class="stat-value">${lowStock.length}</div><div class="stat-label">Low Stock Alerts</div></div>
  </div>
  ${lowStock.length > 0 ? `<div class="section"><h2 class="section-title">⚠️ Low Stock — Order Soon</h2><div class="alert-list">${lowStock.map(p => `<div class="alert-item" onclick="navigate('product',{id:${p.id}})"><div style="flex:1"><div class="alert-name">${esc(p.name)}</div><div class="alert-cat">${esc(p.category)}</div></div><div class="alert-stock ${p.stock === 0 ? 'out-of-stock' : 'low'}">${p.stock === 0 ? 'OUT OF STOCK' : `Only ${p.stock} left`}</div><span style="color:#9ca3af;font-size:18px">›</span></div>`).join('')}</div></div>` : products.length > 0 ? `<div class="section"><div class="empty-state green" style="padding:30px 20px"><div style="font-size:40px">✅</div><p style="font-weight:700">All stock levels are healthy!</p></div></div>` : ''}
  <div class="section"><h2 class="section-title">Quick Actions</h2><div class="quick-actions">
    <button class="quick-btn" onclick="navigate('add-product')"><span class="quick-icon">➕</span><span>Add Product</span></button>
    <button class="quick-btn" onclick="navigate('scanner')"><span class="quick-icon">📷</span><span>Scan Item</span></button>
    <button class="quick-btn" onclick="navigate('print')"><span class="quick-icon">🖨️</span><span>Print Labels</span></button>
    <button class="quick-btn" onclick="navigate('products')"><span class="quick-icon">📋</span><span>All Products</span></button>
  </div></div>
  ${products.length === 0 ? `<div class="section"><div style="background:#f0fdf4;border:1.5px dashed #4ade80;border-radius:16px;padding:30px;text-align:center;margin-top:8px"><div style="font-size:48px;margin-bottom:12px">🌱</div><p style="font-weight:800;font-size:16px;color:#1a3d1a;margin-bottom:6px">Welcome to your stock system!</p><p style="color:#6b7a6b;font-size:14px;margin-bottom:18px">Add your first product to get started — a barcode will be automatically generated.</p><button class="btn-primary" onclick="navigate('add-product')">+ Add Your First Product</button></div></div>` : ''}`
}

function viewProducts(params) {
  params = params || {}
  let products = Products.all()
  const search = params.search || ''
  const cat = params.category || 'all'
  if (search) { const q = search.toLowerCase(); products = products.filter(p => p.name.toLowerCase().includes(q) || p.barcode.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.supplier || '').toLowerCase().includes(q)) }
  if (cat !== 'all') products = products.filter(p => p.category === cat)
  return `
  <div class="page-header no-print">
    <div><h1 class="page-title">Products</h1><p class="page-sub">${products.length} ${products.length === 1 ? 'product' : 'products'}</p></div>
    <button class="btn-primary" onclick="navigate('add-product')">+ Add</button>
  </div>
  <div class="search-bar">
    <input type="text" class="search-input" placeholder="🔍 Search name, barcode, supplier..." value="${esc(search)}" oninput="navigate('products',{search:this.value,category:'${cat}'})" />
    <select class="cat-select" onchange="navigate('products',{search:'${esc(search)}',category:this.value})">
      <option value="all" ${cat === 'all' ? 'selected' : ''}>All Categories</option>
      ${CATEGORIES.map(c => `<option value="${esc(c)}" ${cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}
    </select>
  </div>
  <div class="section" style="padding-top:16px">
  ${products.length === 0 ? `<div class="empty-state"><div style="font-size:48px">🌿</div><p>${search || cat !== 'all' ? 'No products match your search.' : 'No products yet. Add your first one!'}</p>${!search && cat === 'all' ? `<button class="btn-primary" onclick="navigate('add-product')">+ Add First Product</button>` : ''}</div>` : `<div class="product-list">${products.map(p => `<div class="product-row" onclick="navigate('product',{id:${p.id}})"><div class="product-row-info"><div class="product-row-name">${esc(p.name)}</div><div class="product-row-meta">${esc(p.category)} · <span style="font-family:monospace">${esc(p.barcode)}</span></div></div><div class="product-row-right"><div class="product-row-price">$${p.price.toFixed(2)}</div><div class="stock-badge ${p.stock === 0 ? 'badge-out' : p.stock <= p.threshold ? 'badge-low' : 'badge-ok'}">${p.stock} in stock</div></div></div>`).join('')}</div>`}
  </div>`
}

function viewAddProduct(params) {
  params = params || {}
  const editId = params.editId
  const p = editId ? Products.get(editId) : null
  const isEdit = !!p
  return `
  <div class="page-header no-print">
    <div><h1 class="page-title">${isEdit ? 'Edit Product' : 'Add New Product'}</h1><p class="page-sub">${isEdit ? esc(p.name) : 'A barcode is auto-generated when you save'}</p></div>
    ${isEdit ? `<button class="btn-danger" onclick="confirmDelete(${p.id})">🗑 Delete</button>` : ''}
  </div>
  <form id="product-form" class="form" onsubmit="saveProduct(event,${editId || 'null'})">
    <div class="form-group"><label>Product Name *</label><input type="text" name="name" class="form-input" required placeholder="e.g. Peace Lily Large, Monstera Deliciosa" value="${isEdit ? esc(p.name) : ''}" /></div>
    <div class="form-row">
      <div class="form-group"><label>Category *</label><select name="category" class="form-input" required>${CATEGORIES.map(c => `<option value="${esc(c)}" ${isEdit && p.category === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
      <div class="form-group"><label>Selling Price (AUD) *</label><input type="number" name="price" class="form-input" required min="0" step="0.01" placeholder="0.00" value="${isEdit ? p.price : ''}" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>${isEdit ? 'Stock Adjustment (+ or −)' : 'Starting Stock Quantity'}</label><input type="number" name="stock" class="form-input" min="${isEdit ? -9999 : 0}" step="1" placeholder="${isEdit ? 'e.g. +5 or -2' : '0'}" /></div>
      <div class="form-group"><label>Low Stock Alert Threshold</label><input type="number" name="threshold" class="form-input" min="0" step="1" placeholder="5" value="${isEdit ? p.threshold : 5}" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Cost Price (optional)</label><input type="number" name="cost" class="form-input" min="0" step="0.01" placeholder="0.00" value="${isEdit ? p.cost || '' : ''}" /></div>
      <div class="form-group"><label>Supplier (optional)</label><input type="text" name="supplier" class="form-input" placeholder="Supplier name" value="${isEdit ? esc(p.supplier || '') : ''}" /></div>
    </div>
    <div class="form-group"><label>Notes (optional)</label><textarea name="notes" class="form-input" rows="2" placeholder="Watering notes, care info, pot size...">${isEdit ? esc(p.notes || '') : ''}</textarea></div>
    <div class="form-actions">
      <button type="button" class="btn-ghost" onclick="navigate(${isEdit ? `'product',{id:${editId}}` : `'products'`})">Cancel</button>
      <button type="submit" class="btn-primary">${isEdit ? '💾 Save Changes' : '🌿 Add Product & Generate Barcode'}</button>
    </div>
  </form>`
}

function viewProduct(id) {
  const p = Products.get(id)
  if (!p) return `<div class="empty-state"><p>Product not found.</p><button class="btn-primary" onclick="navigate('products')">← Back to Products</button></div>`
  const movements = Movements.forProduct(id)
  const stockClass = p.stock === 0 ? 'out' : p.stock <= p.threshold ? 'low' : 'ok'
  return `
  <div class="page-header no-print">
    <div>
      <button class="btn-ghost small" onclick="navigate('products')" style="margin-bottom:8px">← Back</button>
      <h1 class="page-title">${esc(p.name)}</h1>
      <p class="page-sub">${esc(p.category)} · <span style="font-family:monospace">${esc(p.barcode)}</span></p>
    </div>
    <div style="display:flex;gap:8px;flex-shrink:0">
      <button class="btn-ghost" onclick="navigate('add-product',{editId:${id}})">✏️ Edit</button>
      <button class="btn-primary" onclick="printSingle(${id})">🖨️ Print</button>
    </div>
  </div>
  <div class="product-detail-grid">
    <div class="detail-info">
      <div class="info-row"><span class="info-label">Selling Price</span><span class="info-val">$${p.price.toFixed(2)} AUD</span></div>
      ${p.cost ? `<div class="info-row"><span class="info-label">Cost Price</span><span class="info-val">$${p.cost.toFixed(2)} AUD</span></div>` : ''}
      <div class="info-row"><span class="info-label">Category</span><span class="info-val">${esc(p.category)}</span></div>
      ${p.supplier ? `<div class="info-row"><span class="info-label">Supplier</span><span class="info-val">${esc(p.supplier)}</span></div>` : ''}
      <div class="info-row"><span class="info-label">Stock</span><span class="info-val"><span class="stock-badge ${p.stock === 0 ? 'badge-out' : p.stock <= p.threshold ? 'badge-low' : 'badge-ok'} inline">${p.stock} in stock</span></span></div>
      <div class="info-row"><span class="info-label">Low Stock Alert</span><span class="info-val">≤ ${p.threshold} units</span></div>
      ${p.notes ? `<div class="info-row"><span class="info-label">Notes</span><span class="info-val" style="text-align:right;max-width:180px">${esc(p.notes)}</span></div>` : ''}
    </div>
    <div class="barcode-card">
      <div class="barcode-name">${esc(p.name)}</div>
      <svg data-barcode="${esc(p.barcode)}" data-height="70" style="width:100%;max-width:260px"></svg>
      <div class="barcode-code">${esc(p.barcode)}</div>
      <div class="barcode-code" style="font-family:sans-serif;font-weight:700;color:#16a34a">$${p.price.toFixed(2)} AUD</div>
    </div>
  </div>
  <div class="section"><h2 class="section-title">Adjust Stock</h2>
    <div class="stock-adj">
      <div class="current-stock ${stockClass}"><span class="stock-num">${p.stock}</span><span class="stock-unit">in stock</span></div>
      <div class="adj-buttons">
        <button class="adj-btn adj-minus" onclick="adjustStock(${id},-1,'out','Manual adjustment')">−1</button>
        <button class="adj-btn adj-plus" onclick="adjustStock(${id},+1,'in','Manual adjustment')">+1</button>
      </div>
      <div class="adj-custom">
        <input type="number" id="adj-qty" class="adj-input" placeholder="qty" step="1" />
        <select id="adj-type" class="adj-select"><option value="in">Stock In</option><option value="out">Stock Out</option><option value="sale">Sold</option><option value="damaged">Damaged</option><option value="adjustment">Correction</option></select>
        <button class="btn-primary" onclick="adjustStockCustom(${id})">Update</button>
      </div>
    </div>
  </div>
  ${movements.length > 0 ? `<div class="section" style="padding-bottom:20px"><h2 class="section-title">Stock History</h2><div class="movement-list">${movements.map(m => `<div class="movement-row"><span class="mov-icon ${m.quantity >= 0 ? 'mov-in' : 'mov-out'}">${m.quantity >= 0 ? '↑' : '↓'}</span><span class="mov-type">${esc(m.type)}</span><span class="mov-qty ${m.quantity >= 0 ? 'pos' : 'neg'}">${m.quantity >= 0 ? '+' : ''}${m.quantity}</span><span class="mov-note">${esc(m.notes)}</span><span class="mov-date">${fmtDate(m.at)}</span></div>`).join('')}</div></div>` : ''}`
}

function viewPrint() {
  const products = Products.all()
  return `
  <div class="page-header no-print">
    <div><h1 class="page-title">Print Barcode Labels</h1><p class="page-sub">Select products · prints on A4 (3 columns)</p></div>
    <div style="display:flex;gap:8px;flex-shrink:0">
      <button class="btn-ghost" onclick="selectAll()">Select All</button>
      <button class="btn-primary" onclick="doPrint()">🖨️ Print</button>
    </div>
  </div>
  ${products.length === 0 ? `<div class="empty-state no-print"><div style="font-size:48px">🌿</div><p>Add products first, then come back to print labels.</p><button class="btn-primary" onclick="navigate('add-product')">+ Add Product</button></div>` : `
  <div class="print-select no-print"><p style="font-size:13px;color:#6b7a6b;margin-bottom:12px">Tick the products you want to include:</p><div class="select-grid">${products.map(p => `<label class="select-item"><input type="checkbox" class="print-check" value="${p.id}" checked /><div class="select-card"><div class="select-name">${esc(p.name)}</div><div class="select-meta">${esc(p.barcode)} · $${p.price.toFixed(2)}</div><div class="select-stock ${p.stock <= p.threshold ? 'low' : ''}">${p.stock} in stock</div></div></label>`).join('')}</div></div>
  <div style="padding:16px 20px 0" class="no-print"><p style="font-size:13px;color:#6b7a6b">Preview:</p></div>
  <div id="label-sheet" class="label-sheet">${products.map(p => `<div class="label" data-product-id="${p.id}"><div class="label-name">${esc(p.name)}</div><div class="label-cat">${esc(p.category)}</div><svg data-barcode="${esc(p.barcode)}" data-height="50" style="width:100%"></svg><div class="label-price">$${p.price.toFixed(2)}</div></div>`).join('')}</div>`}`
}

function viewScanner() {
  return `
  <div class="page-header no-print"><div><h1 class="page-title">Scanner</h1><p class="page-sub">Look up stock by scanning a barcode</p></div></div>
  <div class="tab-bar no-print">
    <button class="tab active" id="tab-physical" onclick="showTab('physical')">📡 Physical Scanner</button>
    <button class="tab" id="tab-camera" onclick="showTab('camera')">📷 Camera</button>
  </div>
  <div id="pane-physical" class="scan-pane">
    <div class="scan-instruction"><p>🔫 Point your scanner at any product label.<br>It will automatically submit when it reads the code.<br><span style="color:#6b7a6b;font-size:13px">Works with USB and Bluetooth barcode scanners.</span></p></div>
    <div class="scan-input-wrap"><input type="text" id="scanner-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="scan-input" placeholder="Waiting for scan…" onkeydown="handleScannerKey(event)" /></div>
  </div>
  <div id="pane-camera" class="scan-pane" style="display:none">
    <div style="text-align:center">
      <div id="camera-reader" style="width:100%;max-width:440px;margin:0 auto;border-radius:14px;overflow:hidden"></div>
      <button id="cam-start-btn" class="btn-primary" style="margin-top:16px" onclick="startCamera()">📷 Start Camera</button>
      <p style="font-size:12px;color:#6b7a6b;margin-top:8px">Point at a PLANT-XXXXXX barcode label</p>
    </div>
  </div>
  <div id="scan-result" style="display:none;padding:0 20px 20px"></div>`
}

function initScannerInput() { setTimeout(() => { const inp = document.getElementById('scanner-input'); if (inp) inp.focus() }, 150) }

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
  document.getElementById(`tab-${tab}`).classList.add('active')
  document.getElementById('pane-physical').style.display = tab === 'physical' ? '' : 'none'
  document.getElementById('pane-camera').style.display = tab === 'camera' ? '' : 'none'
  if (tab === 'physical') setTimeout(() => document.getElementById('scanner-input')?.focus(), 100)
}

function handleScannerKey(e) {
  if (e.key === 'Enter') {
    const code = e.target.value.trim()
    if (code.length > 2) { lookupBarcode(code); e.target.value = '' }
  }
}

function startCamera() {
  const btn = document.getElementById('cam-start-btn')
  if (btn) btn.style.display = 'none'
  if (typeof Html5Qrcode === 'undefined') { showToast('Camera library not loaded. Please refresh.'); return }
  _camera = new Html5Qrcode('camera-reader')
  _camera.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 280, height: 140 } },
    (decoded) => lookupBarcode(decoded), () => {}
  ).catch(err => {
    showScanResult(null, '(camera error)')
    const b = document.getElementById('cam-start-btn')
    if (b) b.style.display = ''
    console.warn('Camera error:', err)
  })
}

function lookupBarcode(code) { showScanResult(Products.findByBarcode(code), code) }

function showScanResult(product, code) {
  const el = document.getElementById('scan-result')
  if (!el) return
  el.style.display = ''
  if (!product) {
    el.innerHTML = `<div class="result-card not-found"><span class="result-icon">❌</span><div><p class="result-title">Not Found</p><p class="result-sub">Barcode: <code>${esc(code)}</code></p></div></div>`
    return
  }
  el.innerHTML = `<div class="result-card found"><div style="flex:1;min-width:0"><p class="result-title">${esc(product.name)}</p><p class="result-sub">${esc(product.category)} · $${product.price.toFixed(2)}</p><div style="margin-top:6px"><span class="stock-badge ${product.stock === 0 ? 'badge-out' : product.stock <= product.threshold ? 'badge-low' : 'badge-ok'} inline">${product.stock} in stock</span></div></div><div class="result-actions"><button class="adj-btn adj-minus" style="min-width:52px" onclick="quickAdjust(${product.id},-1)">−1</button><button class="adj-btn adj-plus" style="min-width:52px" onclick="quickAdjust(${product.id},+1)">+1</button><button class="btn-ghost small" onclick="navigate('product',{id:${product.id}})">View →</button></div></div>`
}

function quickAdjust(id, delta) {
  const p = Products.get(id)
  if (!p) return
  Products.adjustStock(id, delta, delta > 0 ? 'in' : 'out', 'Scanner adjustment')
  lookupBarcode(p.barcode)
  showToast(delta > 0 ? `+1 added to ${p.name}` : `-1 removed from ${p.name}`)
  setTimeout(() => document.getElementById('scanner-input')?.focus(), 100)
}

function saveProduct(e, editId) {
  e.preventDefault()
  const form = document.getElementById('product-form')
  if (!form) return
  const data = Object.fromEntries(new FormData(form))
  if (!data.name || !data.name.trim()) { showToast('Please enter a product name.'); return }
  if (editId) {
    const delta = parseInt(data.stock) || 0
    Products.update(editId, { name: data.name.trim(), category: data.category, price: parseFloat(data.price) || 0, cost: parseFloat(data.cost) || 0, threshold: parseInt(data.threshold) || 5, supplier: data.supplier || '', notes: data.notes || '' })
    if (delta !== 0) Products.adjustStock(editId, delta, delta > 0 ? 'in' : 'adjustment', 'Edit update')
    showToast('Product saved ✅')
    navigate('product', { id: editId })
  } else {
    const product = Products.create(data)
    showToast('Product added! 🌿')
    navigate('product', { id: product.id })
  }
}

function confirmDelete(id) {
  const p = Products.get(id)
  if (!p) return
  if (confirm(`Delete "${p.name}"?\n\nThis cannot be undone.`)) { Products.delete(id); showToast('Product deleted'); navigate('products') }
}

function adjustStock(id, qty, type, notes) { Products.adjustStock(id, qty, type, notes); navigate('product', { id }) }

function adjustStockCustom(id) {
  const qtyEl = document.getElementById('adj-qty')
  const typeEl = document.getElementById('adj-type')
  if (!qtyEl || !typeEl) return
  const qty = parseInt(qtyEl.value) || 0
  const type = typeEl.value
  if (qty === 0) { showToast('Enter a quantity first.'); return }
  const isOut = ['out', 'sale', 'damaged'].includes(type)
  Products.adjustStock(id, isOut ? -Math.abs(qty) : Math.abs(qty), type, `Manual ${type}`)
  showToast('Stock updated ✅')
  navigate('product', { id })
}

function doPrint() {
  const selected = new Set([...document.querySelectorAll('.print-check:checked')].map(cb => parseInt(cb.value)))
  if (selected.size === 0) { showToast('Select at least one product.'); return }
  const sheet = document.getElementById('label-sheet')
  if (!sheet) return
  sheet.querySelectorAll('.label').forEach(label => { label.style.display = selected.has(parseInt(label.dataset.productId)) ? '' : 'none' })
  window.print()
  setTimeout(() => { sheet.querySelectorAll('.label').forEach(l => { l.style.display = '' }) }, 1500)
}

function selectAll() { document.querySelectorAll('.print-check').forEach(cb => { cb.checked = true }) }

function printSingle(id) {
  navigate('print')
  setTimeout(() => {
    document.querySelectorAll('.print-check').forEach(cb => { cb.checked = parseInt(cb.value) === id })
    doPrint()
  }, 300)
}

function esc(str) {
  if (str == null) return ''
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
}

let _toastTimer = null
function showToast(msg) {
  let t = document.querySelector('.toast')
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t) }
  t.textContent = msg; t.style.opacity = '1'
  clearTimeout(_toastTimer)
  _toastTimer = setTimeout(() => { t.style.opacity = '0' }, 2800)
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); navigate(el.dataset.view) })
  })
  window._postNavigate = (view) => { if (view === 'scanner') initScannerInput() }
  navigate('dashboard')
})

const _navOrig = navigate
navigate = function(view, params) {
  _navOrig(view, params)
  if (typeof window._postNavigate === 'function') window._postNavigate(view)
}
