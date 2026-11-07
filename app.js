/* Try the Look — a self-contained, framework-free runway section. */
'use strict';
const RW_ASSETS = 'assets/';
const RW_SHOP = '#';
const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
const mod = (x,n) => (x%n+n)%n;
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const pad = n => String(n).padStart(2,'0');
const escapeHTML = str => String(str).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const icon = {
  prev:'<svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M25 7H1M7 1L1 7l6 6"/></svg>',
  next:'<svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 7h24M19 1l6 6-6 6"/></svg>',
  play:'<svg class="rw__play" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>',
  pause:'<svg class="rw__pause" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 4.5h3.5v15H6.5zM14 4.5h3.5v15H14z"/></svg>',
  plus:'<svg class="rw__plus" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>',
  check:'<svg class="rw__check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4.5 12.5l5 5L19.5 7"/></svg>',
  spin:'<svg class="rw__spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3a9 9 0 1 1-9 9"/></svg>',
  close:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'
};

// Inline catalog with head-to-toe styling (1: Shirt/Top, 2: Pant/Bottom, 3: Shoes)
const RW_PRODUCTS = [
  ['sweatshirt','Sweatshirt','Nike',199,'source-sweatshirt.webp',581,['S','M','L','XL'],[56835806396721,56835806429489,56835806462257,56835806495025]],
  ['white-tee','White Crew Tee','Nike',95,'source-white-tee.webp',520,['S','M','L','XL'],[56835900000001,56835900000002,56835900000003,56835900000004]],
  ['tshirt','Graphic T-Shirt','Nike',199,'source-tshirt.webp',563,['S','M','L','XL'],[56835911582001,56835911614769,56835911647537,56835911680305]],
  ['hoodie-black','Hoodie Black','Nike',199,'source-hoodie-black.webp',536,['S','M','L','XL'],[56836251681073,56836251713841,56836251746609,56836251779377]],
  ['sweatshirt-plus','Olive Knitwear','Nike',199,'source-sweatshirt-plus.webp',610,['S','M','L','XL'],[56836143743281,56836143776049,56836143808817,56836143841585]],
  ['hoodie','Grey Crew Hoodie','Nike',199,'source-hoodie.webp',555,['S','M','L','XL'],[56836002185521,56836002218289,56836002251057,56836002283825]],
  ['relaxed-denim','Relaxed Baggy Denim','Nike',179,'source-relaxed-denim.webp',560,['30','32','34','36'],[56837000000001,56837000000002,56837000000003,56837000000004]],
  ['easy-denim','Easy Denim Jeans','Nike',169,'source-easy-denim.webp',560,['30','32','34','36'],[56837100000001,56837100000002,56837100000003,56837100000004]],
  ['tailored-trouser','Tailored Chino Trousers','Nike',159,'source-tailored-trouser.webp',560,['30','32','34','36'],[56837200000001,56837200000002,56837200000003,56837200000004]],
  ['tatum-5-orbit','Tatum 5 Orbit','Nike',149,'source-tatum-5-orbit.webp',400,['40','41','42','43','44','45','46'],[57015166730545,57015166763313,57015166796081,57015166828849,57015166861617,57015166894385,57015166927153]],
  ['tatum-5-orbit-copy','Air Jordan 12 Retro','Jordan',149,'source-tatum-5-orbit-copy.webp',400,['40','41','42','43','44','45','46'],[57015167025457,57015167058225,57015167090993,57015167123761,57015167156529,57015167189297,57015167222065]],
  ['air-jordan-12-retro-copy','Luka 5','Jordan',149,'source-air-jordan-12-retro-copy.webp',400,['40','41','42','43','44','45','46'],[57015176364337,57015176397105,57015176429873,57015176462641,57015176495409,57015176528177,57015176560945]]
].map(([id,name,vendor,price,file,height,sizes,ids]) => ({
  id,name,vendor,type:'Runway Collection',price,image:RW_ASSETS+file,imageHeight:height,
  sizes,variants:ids.map((variantId,i)=>({id:variantId,a:true,o:[sizes[i]]})),url:RW_SHOP
}));
const PRODUCT_BY_ID = new Map(RW_PRODUCTS.map(item=>[item.id,item]));
const RW_LOOKS = [
  {key:'bndthK',name:'The City Edit',description:'A charcoal knit and easy denim.',model:1,products:['sweatshirt','easy-denim','tatum-5-orbit-copy'],pins:[[49,29],[51,62],[56,93]]},
  {key:'XckgG6',name:'Gallery Opening',description:'A clean white tee and relaxed denim.',model:5,products:['white-tee','relaxed-denim','tatum-5-orbit'],pins:[[50,29],[43,62],[38,93]],tags:[2]},
  {key:'rLfAhC',name:'Gallery Opening',description:'Olive knitwear. A grounded palette.',model:4,products:['sweatshirt-plus','tailored-trouser','tatum-5-orbit'],pins:[[51,29],[51,62],[53,93]],tags:[2]},
  {key:'FKg67q',name:'Studio Day',description:'Black, white and laid-back denim.',model:6,products:['hoodie-black','easy-denim','tatum-5-orbit-copy'],pins:[[49,29],[47,62],[40,93]]},
  {key:'8KREEE',name:'Studio Day',description:'Burgundy layers. A tailored perspective.',model:3,products:['sweatshirt','tailored-trouser','tatum-5-orbit'],pins:[[50,29],[51,63],[54,93]]},
  {key:'N3bfm9',name:'Studio Day',description:'A grey crew and your favourite denim.',model:2,products:['hoodie','easy-denim','air-jordan-12-retro-copy'],pins:[[51,29],[52,62],[54,93]]}
];
const RW_CATALOG = {
  source:'./',
  looks:RW_LOOKS.map(look=>({name:look.name,description:look.description,image:RW_ASSETS+`original-look-${look.model}.webp`,products:look.products.slice()})),
  items:RW_PRODUCTS
};

function checkCatalog(catalog){
  if (!catalog || !Array.isArray(catalog.items) || !Array.isArray(catalog.looks)) throw Error('The product list could not load.');
  for (const item of catalog.items) {
    if (typeof item.id!=='string'||typeof item.name!=='string'||!Number.isFinite(item.price)||item.price<0||!Array.isArray(item.variants)||
      !item.variants.every(v=>Number.isSafeInteger(v.id)&&typeof v.a==='boolean'&&Array.isArray(v.o)&&v.o.every(o=>typeof o==='string'))) {
      throw Error('The product list is unavailable.');
    }
  }
}

class StylingBag {
  constructor(catalog){
    checkCatalog(catalog);
    this.catalog=catalog;
    this.dialog=document.querySelector('#bag-dialog');this.itemsEl=document.querySelector('#bag-items');
    this.totalEl=document.querySelector('#bag-total');this.exportButton=document.querySelector('#export-bag');
    this.toastEl=document.querySelector('#bag-status');this.toastTimer=0;
    this.variantMap=new Map();
    for (const item of catalog.items) for (const variant of item.variants) this.variantMap.set(variant.id,{item,variant});
    this.items=this.load();this.render();
    document.querySelector('#open-bag').addEventListener('click',()=>this.open());
    document.querySelector('#close-bag').addEventListener('click',()=>this.dialog.close());
    this.dialog.addEventListener('click',event=>{
      if(event.target===this.dialog){const r=this.dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)this.dialog.close();}
      const remove=event.target.closest('[data-bag-remove]');if(remove)this.remove(Number(remove.dataset.bagRemove));
    });
    this.exportButton.addEventListener('click',()=>this.export());
  }
  load(){
    try{
      const raw=JSON.parse(localStorage.getItem('runway-styling-bag-v3')||'[]');
      if(!Array.isArray(raw))return [];
      return raw.filter(v=>v&&Number.isSafeInteger(v.id)&&Number.isSafeInteger(v.quantity)&&v.quantity>=1&&v.quantity<=20&&this.variantMap.has(v.id)).slice(0,50);
    }catch{return []}
  }
  save(){try{localStorage.setItem('runway-styling-bag-v3',JSON.stringify(this.items));}catch{ /* private browsing */ }}
  add(entries){
    const result=this.items.map(entry=>({...entry}));
    for(const entry of entries){
      if(!entry||!Number.isSafeInteger(entry.id)||!this.variantMap.get(entry.id)?.variant.a)throw Error('Please choose an available size.');
      if(!Number.isSafeInteger(entry.quantity)||entry.quantity<1)throw Error('Invalid quantity.');
      const same=result.find(other=>other.id===entry.id);
      if(same)same.quantity=Math.min(20,same.quantity+entry.quantity);
      else if(result.length<50)result.push({id:entry.id,quantity:Math.min(20,entry.quantity)});
      else throw Error('Your styling bag is full.');
    }
    this.items=result;this.save();this.render();this.toast(entries.length===1?'Piece saved to your styling bag':'Look saved to your styling bag');
  }
  remove(id){this.items=this.items.filter(entry=>entry.id!==id);this.save();this.render()}
  toast(message){clearTimeout(this.toastTimer);this.toastEl.textContent=message;this.toastEl.classList.remove('is-on');void this.toastEl.offsetWidth;this.toastEl.classList.add('is-on');this.toastTimer=setTimeout(()=>this.toastEl.classList.remove('is-on'),2500)}
  open(){this.render();if(!this.dialog.open)this.dialog.showModal()}
  render(){
    const count=this.items.reduce((sum,item)=>sum+item.quantity,0);
    for(const el of document.querySelectorAll('[data-cart-count]'))el.textContent=count;
    this.itemsEl.replaceChildren();let subtotal=0;
    if(!this.items.length){const p=document.createElement('p');p.className='bag-note';p.textContent='Your styling bag is empty. Choose a size beside a piece to save it.';this.itemsEl.append(p);}
    for(const entry of this.items){
      const detail=this.variantMap.get(entry.id);if(!detail)continue;
      const {item,variant}=detail;subtotal+=item.price*entry.quantity;
      const row=document.createElement('div');row.className='bag-row';
      const img=document.createElement('img');img.src=item.image;img.alt=item.name;img.loading='lazy';
      const details=document.createElement('div');
      const h3=document.createElement('h3');h3.textContent=item.name;
      const p=document.createElement('p');p.textContent=`Size ${variant.o.join(' / ')} · Quantity ${entry.quantity} · ${money(item.price)}`;
      details.append(h3,p);
      const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label',`Remove ${item.name}`);remove.dataset.bagRemove=String(entry.id);
      row.append(img,details,remove);this.itemsEl.append(row);
    }
    this.totalEl.textContent=count?`Reference subtotal ${money(subtotal)}`:'';
    this.exportButton.disabled=!count;
  }
  export(){
    if(!this.items.length)return;
    const lines=['RUNWAY — STYLING SHORTLIST','Reference prices; saved from interactive runway.',''];
    for(const entry of this.items){const {item,variant}=this.variantMap.get(entry.id);lines.push(`${item.name} (${item.vendor}) · Size ${variant.o.join(' / ')} · Quantity ${entry.quantity} · ${money(item.price)}`);}
    const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='runway-outfit-shortlist.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
}
let bag;

function modelImage(look,index){
  const src=RW_ASSETS+`model-${look.model}-640.webp`;
  const hi=RW_ASSETS+`original-look-${look.model}.webp`;
  return `<img data-model-image src="${src}" srcset="${src} 640w, ${hi} 1080w" sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px" width="1100" height="1956" loading="eager" decoding="async" draggable="false" alt="${escapeHTML(look.name)}">`;
}
function pinMarkup(look){return look.products.map((id,n)=>{
  const item=PRODUCT_BY_ID.get(id),[x,y]=look.pins[n];
  return `<button class="rw__pin" type="button" data-rw-pin="${n+1}" data-tip="${escapeHTML(item.name)}" style="left:${x}%;top:${y}%;--pi:${n+1}" aria-label="${n+1}: ${escapeHTML(item.name)}" tabindex="-1"><span class="rw__pin-dot">${n+1}</span></button>`;
}).join('')}
function modelMarkup(look,i){
  return `<div class="rw__model" data-rw-model data-index="${i}" aria-hidden="true"><span class="rw__shadow"></span><div class="rw__figure" style="--rw-ar:.5625"><div class="rw__art">${modelImage(look,i)}<button class="rw__hit" type="button" data-rw-go="${i}" aria-label="Look ${i+1}: ${escapeHTML(look.name)}" tabindex="-1"></button></div></div></div>`;
}
function heroMarkup(look,i){
  return `<div class="rw__hero ${i===0?'is-on':''}" data-rw-hero data-index="${i}" data-name="${escapeHTML(look.name)}" data-label="Look ${i+1}: ${escapeHTML(look.name)}" data-probe="${RW_ASSETS}model-${look.model}-640.webp" aria-hidden="${i!==0}"><div class="rw__morph"><span class="rw__shadow"></span><div class="rw__figure" style="--rw-ar:.5625"><div class="rw__art">${modelImage(look,i)}<button class="rw__zoom" type="button" data-rw-zoom aria-label="View look: ${escapeHTML(look.name)}" tabindex="${i===0?'0':'-1'}"></button><div class="rw__pins">${pinMarkup(look)}</div></div></div></div></div>`;
}
function pickerMarkup(look,lookIndex,n,item){
  const suffix=`template--28035983671601__the_runway_wdM8BG-look_${look.key}-${n}`;
  const pickerId=`Picker-${suffix}`,radioName=`Opt-${suffix}-1`;
  const smallHeight=Math.round(item.imageHeight*.4);
  const sizeType = item.id.includes('denim') || item.id.includes('trouser') ? 'Waist size' : (item.price === 149 ? 'Shoe size' : 'Size');
  return `<div class="rw__picker" data-rw-picker id="${pickerId}" hidden>
    <div class="rw__picker-head"><img src="${item.image}" width="160" height="${smallHeight}" loading="lazy" decoding="async" alt=""><span class="rw__picker-head-info"><span class="rw__picker-head-name">${escapeHTML(item.name)}</span><span class="rw__picker-head-price">${money(item.price)}</span></span><button class="rw__picker-close" data-rw-pick-close type="button" aria-label="Close size picker">×</button></div>
    <fieldset class="rw__opt"><legend class="rw__opt-name">${sizeType}</legend><div class="rw__values">${item.sizes.map((size,j)=>`<label class="rw__pill"><input type="radio" name="${radioName}" value="${escapeHTML(size)}" data-rw-option="0" ${j===0?'checked':''}><span class="rw__pill-label">${escapeHTML(size)}</span></label>`).join('')}</div></fieldset>
    <button class="rw__confirm" data-rw-confirm type="button"><span data-rw-confirm-label data-add="Add to bag">Add to bag</span><span class="rw__sr"> — ${escapeHTML(item.name)}</span></button>
    <script type="application/json" data-rw-variants>${JSON.stringify(item.variants)}</script>
  </div>`;
}
function cardMarkup(look,lookIndex,n,id){
  const item=PRODUCT_BY_ID.get(id);
  const pickerId=`Picker-template--28035983671601__the_runway_wdM8BG-look_${look.key}-${n}`;
  return `<li class="rw__item" data-rw-card="${n}" data-title="${escapeHTML(item.name)}" data-product="${item.id}" style="--i:${n}">
    ${look.tags?.includes(n)?'<span class="rw__tag"><span class="rw__tag-text">New</span></span>':''}
    <button class="rw__media" type="button" data-rw-open-card="${n}" aria-label="Select size for ${escapeHTML(item.name)}"><img src="${item.image}" width="400" height="${item.imageHeight}" loading="lazy" decoding="async" alt="${escapeHTML(item.name)}"><span class="rw__num">${n}</span></button>
    <span class="rw__info"><span class="rw__type">${escapeHTML(item.vendor)}</span><button class="rw__name" type="button" data-rw-open-card="${n}">${escapeHTML(item.name)}</button><span class="rw__price"><span>${money(item.price)}</span></span></span>
    <button class="rw__add" data-rw-add type="button" aria-expanded="false" aria-controls="${pickerId}" aria-label="Add to bag: ${escapeHTML(item.name)}" data-added-label="Added to bag: ${escapeHTML(item.name)}">${icon.plus}${icon.check}${icon.spin}</button>
    ${pickerMarkup(look,lookIndex,n,item)}
  </li>`;
}
function panelMarkup(look,i){
  const rawTotal = look.products.reduce((acc, id) => acc + (PRODUCT_BY_ID.get(id)?.price || 0), 0);
  const bundleDiscounted = rawTotal * 0.9;
  return `<div class="rw__look-panel ${i===0?'is-in':''}" data-rw-panel="${i}" ${i===0?'':'hidden'}>
    <div class="rw__mhead"><span class="rw__mhead-title">${escapeHTML(look.name)}</span><span class="rw__label">3 pieces</span></div>
    <ul class="rw__items" role="list">${look.products.map((id,n)=>cardMarkup(look,i,n+1,id)).join('')}</ul>
    <div class="rw__bundle has-rule"><p class="rw__msg" data-rw-msg role="status" aria-live="polite"></p>
      <div class="rw__bundle-row"><span class="rw__bundle-copy"><span class="rw__bundle-title">Complete the look</span><span class="rw__bundle-note">Bundle all 3 and save 10%</span></span><span class="rw__bundle-price"><s>${money(rawTotal)}</s><strong>${money(bundleDiscounted)}</strong></span></div>
      <button class="rw__cta" data-rw-all type="button"><span class="rw__cta-add">Add full look to bag</span><span class="rw__cta-m">Add full look — ${money(bundleDiscounted)}</span><span class="rw__cta-done">Full look in your bag</span><span class="rw__cta-arrow">${icon.next}</span><svg class="rw__cta-spin" width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="1.8" aria-hidden="true"><path d="M12 3a9 9 0 1 1-9 9"/></svg></button>
    </div><template data-rw-pieces-text>3 pieces</template>
  </div>`;
}
function sectionMarkup(){
  return `<div class="rw__sticky"><div class="rw__grid"><div class="rw__left">
    <div class="rw__head"><div class="rw__intro"><h2 class="rw__title">Try the Look.</h2><p class="rw__sub">Six looks, styled head to toe. Tap a pin to see the piece.</p></div><span class="rw__sr" aria-live="polite" aria-atomic="true" data-rw-live></span></div>
    <div class="rw__stage" data-rw-stage tabindex="0" role="region" aria-roledescription="carousel" aria-label="Try the Look. — use arrow keys or swipe to change look">
      <div class="rw__actors" data-rw-actors>${RW_LOOKS.map(modelMarkup).join('')}</div>
      <div class="rw__heroes" data-rw-heroes>${RW_LOOKS.map(heroMarkup).join('')}</div>
      <span class="rw__sweep"></span>
      <span class="rw__cursor" data-rw-cursor><span class="rw__cursor-in"><span class="rw__cursor-label rw__cursor-drag">Drag</span><span class="rw__cursor-label rw__cursor-view">View</span></span></span>
      <span class="rw__walk"><span class="rw__walk-line"></span></span>
    </div>
    <div class="rw__controls">
      <button type="button" class="rw__icon" data-rw-prev aria-label="Previous look">${icon.prev}</button>
      <div class="rw__ticks">${RW_LOOKS.map((look,i)=>`<button type="button" class="rw__tick ${i===0?'is-run':''}" data-rw-tick="${i}" aria-current="${i===0}" aria-label="Look ${i+1}: ${escapeHTML(look.name)}"><span class="rw__tick-bar"></span><span class="rw__tick-label">${pad(i+1)}<span class="rw__tick-name">&nbsp;&nbsp;${escapeHTML(look.name)}</span></span></button>`).join('')}</div>
      <button type="button" class="rw__icon rw__auto" data-rw-auto aria-pressed="false" aria-label="Autoplay">${icon.play}${icon.pause}</button>
      <button type="button" class="rw__icon" data-rw-next aria-label="Next look">${icon.next}</button>
    </div>
    <div class="rw__lb" data-rw-lb data-word="Look" role="region" aria-label="View look" aria-hidden="true">
      <div class="rw__lb-stage" data-rw-lb-stage></div>
      <div class="rw__lb-top"><p class="rw__lb-cap"><span class="rw__lb-kicker" data-rw-lb-kicker></span><span class="rw__lb-name" data-rw-lb-name></span></p><button class="rw__lb-close" type="button" data-rw-zoom-close aria-label="Close">${icon.close}</button></div>
      <p class="rw__lb-hint">Tap a dot to shop the piece</p>
    </div>
  </div><aside class="rw__panel has-rule"><div class="rw__panel-inner"><div class="rw__panel-head"><h3 class="rw__panel-title">In this look</h3><span class="rw__label" data-rw-pieces>3 pieces</span></div>${RW_LOOKS.map(panelMarkup).join('')}</div></aside></div></div>`;
}

class RunwaySection extends HTMLElement {
  connectedCallback(){
    if(this.initialized)return;this.initialized=true;
    this.innerHTML=sectionMarkup();
    this.stage=this.querySelector('[data-rw-stage]');this.actors=this.querySelector('[data-rw-actors]');
    this.heroes=[...this.querySelectorAll('[data-rw-hero]')];
    this.originals=[...this.querySelectorAll('[data-rw-model]')];
    for(const original of this.originals){const copy=original.cloneNode(true);copy.dataset.rwClone='';copy.querySelector('img').loading='lazy';this.actors.append(copy);}
    this.bodies=[...this.querySelectorAll('[data-rw-model]')].map((el,a)=>({el,a,w:0,x:0,g:0,from:0,vel:0,trip:0}));
    this.panels=[...this.querySelectorAll('[data-rw-panel]')];
    this.ticks=[...this.querySelectorAll('[data-rw-tick]')];
    this.lb=this.querySelector('[data-rw-lb]');this.lbStage=this.querySelector('[data-rw-lb-stage]');
    this.autoButton=this.querySelector('[data-rw-auto]');this.cursor=this.querySelector('[data-rw-cursor]');
    this.reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.index=0;this.target=0;this.cur=this.reduced?0:-1.15;this.vel=0;
    this.mobile=window.innerWidth<750;this.mode=this.mobile?'classic':'ring';
    this.lastWidth=window.innerWidth;this.latchedVh=window.innerHeight;
    this.visible=true;this.playing=false;this.engaged=false;this.zoomed=false;this.panelHover=false;this.dragging=false;
    this.animFrame=0;this.cursorFrame=0;this.lastFrame=0;this.autoplayTimer=0;this.resizeTimer=0;
    this.pointer=null;this.lastDragClick=0;this.wheelAcc=0;this.wheelLock=0;this.sheetHost=null;this.sheetCard=null;
    this.cleanups=[];
    this.classList.add('rw--js');
    this.style.setProperty('--rw-progress',(1/6).toFixed(3));
    this.setupImages();this.setupEvents();this.measure();this.setIndex(0,true);
    this.setStill(this.reduced);this.kick();
    if(this.reduced){this.classList.add('is-revealed');}
    else this.setupObservers();
    if(this.dataset.autoplay==='true'&&!this.reduced&&!window.Shopify?.designMode)this.play(true);
    if(window.matchMedia('(hover: hover) and (pointer: fine)').matches)this.setupCursor();
  }
  disconnectedCallback(){
    cancelAnimationFrame(this.animFrame);cancelAnimationFrame(this.cursorFrame);
    clearTimeout(this.autoplayTimer);clearTimeout(this.resizeTimer);clearTimeout(this.sweepTimer);
    clearTimeout(this.popupTimer);this.observer?.disconnect();this.revealObserver?.disconnect();this.resizeObserver?.disconnect();
    for(const off of this.cleanups)off();
    if(this.sheetHost){this.closeSheet(false);this.sheetHost.remove();this.sheetHost=null;}
  }
  listen(node,type,fn,opts){node.addEventListener(type,fn,opts);this.cleanups.push(()=>node.removeEventListener(type,fn,opts));}
  setupImages(){
    for(const img of this.querySelectorAll('[data-model-image]')){
      const reveal=()=>{if(img.naturalWidth>0)img.classList.add('is-decoded')};
      if(img.decode)img.decode().then(reveal).catch(reveal);else if(img.complete)reveal();
      img.addEventListener('load',reveal,{once:true});
    }
    for(const hero of this.heroes)this.findFeet(hero);
  }
  async findFeet(hero){
    try{
      const src=hero.dataset.probe,img=new Image();img.src=src;
      if(img.decode)await img.decode();else await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject});
      const w=48,h=Math.max(1,Math.round(w*img.naturalHeight/img.naturalWidth));
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);
      const pixels=ctx.getImageData(0,0,w,h).data;
      let last=-1;for(let row=h-1;row>=0&&last===-1;row--)for(let x=0;x<w;x++)if(pixels[(row*w+x)*4+3]>40){last=row;break;}
      if(last<0)return;
      const foot=clamp((h-1-last)/h,0,.4);
      const i=Number(hero.dataset.index);hero.style.setProperty('--rw-foot',foot);
      for(const state of this.bodies)if(state.a%6===i)state.el.style.setProperty('--rw-foot',foot);
    }catch{ /* CORS, decoding or a tainted canvas: retain the safe zero offset */ }
  }
  setupObservers(){
    if('IntersectionObserver' in window){
      this.observer=new IntersectionObserver(entries=>{
        this.visible=!!entries[0]?.isIntersecting;
        if(this.visible){this.kick();this.restartTimer()}else{clearTimeout(this.autoplayTimer);cancelAnimationFrame(this.animFrame);this.animFrame=0;}
      },{threshold:0});this.observer.observe(this);
      this.revealObserver=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){requestAnimationFrame(()=>requestAnimationFrame(()=>this.classList.add('is-revealed')));this.revealObserver.disconnect();}},{threshold:0,rootMargin:'0px 0px -22% 0px'});this.revealObserver.observe(this);
    }else{requestAnimationFrame(()=>this.classList.add('is-revealed'))}
    if('ResizeObserver' in window){this.resizeObserver=new ResizeObserver(()=>{
      if(!this.initialized)return;
      clearTimeout(this.resizeTimer);this.resizeTimer=setTimeout(()=>this.measure(),50);
    });this.resizeObserver.observe(this.stage);}
  }
  measure(){
    const width=window.innerWidth,height=window.innerHeight;
    if(width!==this.lastWidth||Math.abs(height-this.latchedVh)>=160)this.latchedVh=height;
    this.lastWidth=width;
    const oldMobile=this.mobile;this.mobile=width<750;this.mode=this.mobile?'classic':'ring';
    const header=[...document.querySelectorAll('.shopify-section-group-header-group,#shopify-section-header,#shopify-section-announcement-bar')]
      .filter(el=>!el.contains(this)&&getComputedStyle(el).display!=='none');
    const headerH=header.reduce((s,el)=>s+el.getBoundingClientRect().height,0);
    const frameH=this.mobile?this.latchedVh*clamp(Number(this.dataset.mheightVh)||109,50,120)/100:Math.max(380,height-headerH);
    const prevFrame=this.style.getPropertyValue('--rw-frame-h');
    if(prevFrame!==`${frameH}px`)this.style.setProperty('--rw-frame-h',`${frameH}px`);
    const rect=this.stage.getBoundingClientRect();this.W=Math.max(1,rect.width);this.H=Math.max(1,rect.height);
    this.fs=this.mode==='ring'?1.08:1;
    this.modelH=this.mode==='ring'?Math.max(200,Math.round((this.H-34-18)/this.fs)):
      Math.max(200,Math.round(this.H-(this.mobile?24:36)-18));
    this.hx=this.mode==='ring'?this.W*.5:this.W*(this.mobile?.3:.4);
    this.hy=this.mode==='ring'?34:(this.mobile?22:36);
    this.unit=this.mode==='ring'?Math.max(this.mobile?90:120,.3*this.W):Math.max(90,this.W*.32*1.6);
    this.stage.style.setProperty('--rw-model-h',`${this.modelH}px`);
    this.stage.style.setProperty('--rw-fs',this.fs);
    this.stage.style.setProperty('--rw-hx',`${this.hx}px`);
    this.stage.style.setProperty('--rw-hy',`${this.hy}px`);
    this.style.setProperty('--rw-ax',`${100*this.hx/this.W}%`);
    for(const state of this.bodies){state.w=state.el.offsetWidth||this.modelH*.5625;
      if(oldMobile!==this.mobile||state.first===undefined){state.x=mod(state.a-this.target,12)+(this.reduced?0:1.15);state.g=mod(state.a-this.target,12);state.vel=0;state.trip=0;state.first=true;}
    }
    if(oldMobile!==this.mobile&& !this.mobile)this.closeSheet(false);
    this.renderAll();this.kick();
  }
  setupEvents(){
    this.listen(window,'resize',()=>{clearTimeout(this.resizeTimer);this.resizeTimer=setTimeout(()=>this.measure(),120)});
    this.listen(document,'visibilitychange',()=>{if(document.hidden){clearTimeout(this.autoplayTimer);cancelAnimationFrame(this.animFrame);this.animFrame=0}else{this.kick();this.restartTimer()}});
    this.listen(this,'click',event=>this.onClick(event));
    this.listen(this,'change',event=>{
      const radio=event.target.closest('[data-rw-option]');if(radio){this.engage();this.refreshVariant(radio.closest('.rw__item'),true);}
    });
    this.listen(this.querySelector('.rw__panel'),'click',event=>{
      if(event.target.closest('button,a,input,select,label'))this.engage();
    });
    this.listen(this.querySelector('.rw__panel'),'pointerenter',event=>{if(event.pointerType==='mouse')this.panelHover=true;});
    this.listen(this.querySelector('.rw__panel'),'pointerleave',()=>{this.panelHover=false;this.restartTimer()});
    this.listen(this.querySelector('.rw__panel'),'pointerover',event=>{
      if(event.pointerType==='mouse'){const card=event.target.closest('[data-rw-card]');if(card&&card.closest('[data-rw-panel]')===this.panels[this.index])this.hot(Number(card.dataset.rwCard));}
    });
    this.listen(this.querySelector('.rw__panel'),'pointerout',event=>{
      const card=event.target.closest('[data-rw-card]');if(card&&!card.contains(event.relatedTarget))this.clearHot();
    });
    this.listen(this.stage,'pointerdown',event=>this.onPointerDown(event));
    this.listen(this.stage,'pointermove',event=>this.onPointerMove(event));
    this.listen(this.stage,'pointerup',event=>this.onPointerEnd(event));
    this.listen(this.stage,'pointercancel',event=>this.onPointerEnd(event,true));
    this.listen(this.stage,'click',event=>{if(performance.now()-this.lastDragClick<90){event.preventDefault();event.stopPropagation();}},{capture:true});
    this.listen(this.stage,'wheel',event=>this.onWheel(event),{passive:false});
    this.listen(this.stage,'keydown',event=>{
      if(event.key==='ArrowRight'){event.preventDefault();this.next()}
      else if(event.key==='ArrowLeft'){event.preventDefault();this.prev()}
    });
    this.listen(this,'keydown',event=>{
      if(event.key==='Escape'){
        if(this.sheetCard){event.preventDefault();const button=this.sheetCard.querySelector('[data-rw-add]');this.closeSheet();button?.focus();}
        else if(this.zoomed){event.preventDefault();this.closeZoom();}
      }
    });
  }
  onClick(event){
    const match=selector=>event.target.closest(selector);
    if(match('[data-rw-pick-close]')){const card=this.sheetCard||match('[data-rw-pick-close]').closest('.rw__item');if(card)this.closePicker(card);return;}
    if(match('[data-rw-zoom-close]')){this.closeZoom();return;}
    if((event.target===this.lb||event.target===this.lbStage)&&this.zoomed){this.closeZoom();return;}
    if(match('[data-rw-zoom]')){this.openZoom();return;}
    if(match('[data-rw-next]')){this.next();return;}
    if(match('[data-rw-prev]')){this.prev();return;}
    if(match('[data-rw-tick]')){this.go(Number(match('[data-rw-tick]').dataset.rwTick));return;}
    if(match('[data-rw-auto]')){if(!this.playing)this.engaged=false;this.play(!this.playing);return;}
    if(match('[data-rw-pin]')){
      this.engage();
      const n=Number(match('[data-rw-pin]').dataset.rwPin);
      this.hot(n,true);
      const card=this.panels[this.index]?.querySelector(`[data-rw-card="${n}"]`);
      if(card&&!card.classList.contains('is-picking'))this.openPicker(card);
      return;
    }
    if(match('[data-rw-go]')){
      const a=Number(match('[data-rw-go]').dataset.rwGo),rank=this.signedRank(a,Math.round(this.target));
      if(rank!==0&&Math.abs(rank)<6)this.moveTo(Math.round(this.target)+rank);else if(rank===0)this.openZoom();return;
    }
    if(match('[data-rw-confirm]')){this.confirm(match('[data-rw-confirm]').closest('.rw__picker'));return;}
    if(match('[data-rw-add]')){const card=match('[data-rw-add]').closest('.rw__item');if(card)this.togglePicker(card);return;}
    if(match('[data-rw-open-card]')){
      const card=match('[data-rw-open-card]').closest('.rw__item');
      if(card){
        const n=Number(card.dataset.rwCard);
        this.hot(n,true);
        this.togglePicker(card);
      }
      return;
    }
    if(match('[data-rw-all]')){const panel=match('[data-rw-all]').closest('[data-rw-panel]');if(panel)this.addFullLook(panel);}
  }
  onPointerDown(event){
    if(event.pointerType==='mouse'&&event.button!==0)return;
    if(this.zoomed)return;
    this.pointer={id:event.pointerId,x:event.clientX,y:event.clientY,t:this.target,samples:[{x:event.clientX,time:performance.now()}],active:false,abandoned:false};
  }
  onPointerMove(event){
    if(this.pointer&&event.pointerId===this.pointer.id&&!this.pointer.abandoned){
      const pointer=this.pointer,dx=event.clientX-pointer.x,dy=event.clientY-pointer.y;
      if(!pointer.active){
        if(Math.abs(dy)>10&&Math.abs(dx)<=1.2*Math.abs(dy)){pointer.abandoned=true;return;}
        if(Math.abs(dx)>8&&Math.abs(dx)>1.2*Math.abs(dy)){
          pointer.active=true;this.dragging=true;this.classList.add('is-dragging');this.setStill(false);
          try{this.stage.setPointerCapture(event.pointerId)}catch{}
        }
      }
      if(pointer.active){
        if(event.pointerType==='mouse'&&event.buttons===0){this.onPointerEnd(event);return;}
        this.target=pointer.t-dx/this.unit;this.kick();
        pointer.samples.push({x:event.clientX,time:performance.now()});if(pointer.samples.length>6)pointer.samples.shift();
      }
    }
    if(event.pointerType==='mouse')this.updateCursor(event);
  }
  onPointerEnd(event,cancelled=false){
    const p=this.pointer;if(!p||p.id!==event.pointerId)return;
    if(p.active){
      this.lastDragClick=performance.now();
      this.dragging=false;this.classList.remove('is-dragging');
      try{this.stage.releasePointerCapture(event.pointerId)}catch{}
      const dx=event.clientX-p.x,s=p.samples;
      const first=s[0],last=s[s.length-1];const vx=(last.x-first.x)/Math.max(1,last.time-first.time);
      const from=Math.round(p.t);let i=from;
      if(!cancelled&&this.mobile){
        if(Math.abs(dx)>30||Math.abs(vx)>.3)i=from+(dx>0?-1:1);
      }else if(!cancelled){
        i=Math.round(this.target-vx*160/this.unit);
        if(i===from&&Math.abs(vx)>.3)i=from+(vx>0?-1:1);
        i=clamp(i,from-2,from+2);
      }
      this.moveTo(i);
    }
    this.pointer=null;
  }
  onWheel(event){
    if(Math.abs(event.deltaX)<=Math.abs(event.deltaY)||this.zoomed)return;
    event.preventDefault();const now=performance.now();if(now<this.wheelLock)return;
    this.wheelAcc+=event.deltaX;
    if(Math.abs(this.wheelAcc)>45){if(this.wheelAcc>0)this.next();else this.prev();this.wheelAcc=0;this.wheelLock=now+520;}
  }
  setupCursor(){
    this.classList.add('rw--cursor');this.cx=0;this.cy=0;this.ctx=0;this.cty=0;this.cursorReady=false;
    this.listen(this.stage,'pointermove',event=>{if(event.pointerType==='mouse')this.updateCursor(event)});
    this.listen(this.stage,'pointerleave',()=>{this.cursor.classList.remove('is-on','is-link','is-view');this.cursorReady=false;});
  }
  updateCursor(event){
    if(!this.classList.contains('rw--cursor'))return;
    const r=this.stage.getBoundingClientRect();this.ctx=event.clientX-r.left;this.cty=event.clientY-r.top;
    if(!this.cursorReady){this.cx=this.ctx;this.cy=this.cty;this.cursorReady=true;this.cursor.classList.add('is-on');}
    const link=event.target.closest('[data-rw-pin],[data-rw-go]');
    const view=event.target.closest('[data-rw-zoom]');
    this.cursor.classList.toggle('is-link',!!link&&!this.dragging);
    this.cursor.classList.toggle('is-view',!!view&&!this.dragging);
    this.cursorFollow();
  }
  cursorFollow(){
    if(this.cursorFrame)return;
    const tick=()=>{
      const alpha=this.reduced?1:.18;this.cx+=(this.ctx-this.cx)*alpha;this.cy+=(this.cty-this.cy)*alpha;
      this.cursor.style.transform=`translate3d(${this.cx}px,${this.cy}px,0)`;
      if(Math.abs(this.ctx-this.cx)+Math.abs(this.cty-this.cy)>.2)this.cursorFrame=requestAnimationFrame(tick);else this.cursorFrame=0;
    };
    this.cursorFrame=requestAnimationFrame(tick);
  }
  engage(){this.engaged=true;this.play(false)}
  play(state){
    this.playing=!!state;this.autoButton.classList.toggle('is-playing',this.playing);
    this.autoButton.setAttribute('aria-pressed',String(this.playing));
    this.restartTimer();
  }
  restartTimer(){
    clearTimeout(this.autoplayTimer);
    for(const t of this.ticks)t.classList.remove('is-run');
    if(!this.playing)return;
    void this.ticks[this.index].offsetWidth;
    this.ticks[this.index].classList.add('is-run');
    this.autoplayTimer=setTimeout(()=>{
      if(this.playing&&this.visible&&!this.dragging&&!document.hidden&&!this.panelHover&&!this.zoomed&&!this.engaged)this.next();
      else this.restartTimer();
    },Number(this.dataset.speed)||5000);
  }
  next(){this.moveTo(Math.round(this.target)+1)}
  prev(){this.moveTo(Math.round(this.target)-1)}
  go(i){let d=mod(i-this.index,6);if(d>3)d-=6;this.moveTo(Math.round(this.target)+d)}
  moveTo(target){
    this.target=target;this.setStill(false);this.setIndex(mod(Math.round(target),6));this.kick();
  }
  setIndex(i,silent=false){
    const old=this.index,changed=old!==i;this.index=i;
    if(!silent){this.closeZoom(true);this.closeSheet(true);}
    this.style.setProperty('--rw-progress',((i+1)/6).toFixed(3));
    for(let j=0;j<6;j++){
      const hero=this.heroes[j];hero.classList.toggle('is-on',j===i);
      hero.classList.toggle('was',!silent&&j===old&&changed);
      hero.setAttribute('aria-hidden',j===i?'false':'true');hero.querySelector('[data-rw-zoom]').tabIndex=j===i?0:-1;
      this.ticks[j].setAttribute('aria-current',j===i?'true':'false');
      this.ticks[j].classList.toggle('is-past',j<i);
      this.panels[j].hidden=j!==i;
    }
    if(changed&&!silent){
      const panel=this.panels[i];for(const p of this.panels)p.classList.remove('is-in');
      void panel.offsetWidth;panel.classList.add('is-in');
      const count=this.querySelector('[data-rw-pieces]');count.textContent=panel.querySelector('[data-rw-pieces-text]').textContent.trim();
      count.classList.remove('is-swap');void count.offsetWidth;count.classList.add('is-swap');
      this.querySelector('[data-rw-live]').textContent=`Look ${i+1}: ${RW_LOOKS[i].name}`;
      this.clearHot();
      if(!this.reduced){this.stage.classList.remove('is-sweep');void this.stage.offsetWidth;this.stage.classList.add('is-sweep');clearTimeout(this.sweepTimer);this.sweepTimer=setTimeout(()=>this.stage.classList.remove('is-sweep'),1500);}
    }
    this.updateA11y();this.restartTimer();
  }
  signedRank(a,position){let rank=mod(a-position,12);if(rank>6)rank-=12;return rank;}
  updateA11y(){
    for(const state of this.bodies){const rank=this.signedRank(state.a,Math.round(this.target));
      const enabled=rank!==0&&Math.abs(rank)<=(this.mode==='ring'?2:3);
      state.el.setAttribute('aria-hidden',String(!enabled));
      state.el.querySelector('[data-rw-go]').tabIndex=enabled?0:-1;
    }
  }
  setStill(state){this.classList.toggle('rw--still',state)}
  kick(){if(this.animFrame||!this.visible||document.hidden)return;this.animFrame=requestAnimationFrame(t=>this.frame(t));}
  frame(time){
    this.animFrame=0;
    const dt=Math.min(.034,this.lastFrame?Math.max(0,(time-this.lastFrame)/1000):1/60);this.lastFrame=time;
    let moving=false;
    if(this.reduced){this.cur=this.target;this.vel=0;for(const s of this.bodies){s.x=mod(s.a-this.target,12);s.g=s.x;s.vel=0;s.trip=0;}}
    else if(this.mode==='ring'){
      const K=95,C=2*Math.sqrt(K),h=dt/3;
      for(let m=0;m<3;m++){const acc=-K*(this.cur-this.target)-C*this.vel;this.vel+=acc*h;this.cur+=this.vel*h;}
      if(Math.abs(this.cur-this.target)>.0005||Math.abs(this.vel)>.0005)moving=true;
      else{this.cur=this.target;this.vel=0;}
    }else{
      this.cur=this.target;const K=95,C=2*Math.sqrt(K),h=dt/3;
      for(const state of this.bodies){
        const goal=mod(state.a-this.target,12);
        if(Math.abs(goal-state.g)>6&&!state.trip){state.trip=goal>state.x?1:-1;state.from=state.x;}
        const tau=this.dragging?.016:(state.trip?.1:(.03+.04*Math.min(goal,4)));
        state.g+=(goal-state.g)*(1-Math.exp(-dt/tau));
        for(let m=0;m<3;m++){const acc=-K*(state.x-state.g)-C*state.vel;state.vel+=acc*h;state.x+=state.vel*h;}
        if(Math.abs(state.x-goal)>.0006||Math.abs(state.vel)>.0006)moving=true;
        else{state.x=goal;state.g=goal;state.vel=0;}
        if(state.trip&&Math.abs(state.x-goal)<.02)state.trip=0;
      }
    }
    if(this.dragging)moving=true;
    this.setStill(!moving);
    this.renderAll();
    if(moving)this.kick();
  }
  put(state,x,bottom,scale,opacity,blur,z){
    const w=state.w||this.modelH*.5625;
    if(x+w*scale/2< -4||x-w*scale/2>this.W+4)opacity=0;
    const el=state.el;el.style.transform=`translate3d(${x.toFixed(2)}px,${(-bottom).toFixed(2)}px,0) translateX(-50%) scale(${scale.toFixed(5)})`;
    el.style.opacity=clamp(opacity,0,1).toFixed(3);el.style.zIndex=z;
    el.style.visibility=opacity<.01?'hidden':'visible';el.style.pointerEvents=opacity<.5?'none':'auto';
    const b=Math.round(blur*10)/10;if(b>.05){if(el._blur!==b){el.style.filter=`blur(${b}px)`;el._blur=b}}else if(el._blur!==0){el.style.removeProperty('filter');el._blur=0;}
  }
  renderAll(){
    if(!this.W||!this.H)return;
    const still=this.classList.contains('rw--still');
    if(this.mode==='ring'){
      const cx=.5*this.W,R=.62*this.W,P=1.65*this.W,floor=this.H-34,horizon=.36*this.H,step=2*Math.PI/12;
      for(const s of this.bodies){
        let phi=mod((s.a-this.cur)*step+Math.PI,2*Math.PI)-Math.PI;
        const z=R*(1-Math.cos(phi)),persp=P/(P+z),sl=Math.abs(phi)/step;
        const scale=persp*(1+(this.fs-1)*clamp(1-sl,0,1));
        const x=cx+R*Math.sin(phi)*persp,feet=horizon+(floor-horizon)*persp;
        const blur=sl<=1?1.8*sl:Math.min(1.8+(sl-1)*2,6.5);
        let opacity=clamp((Math.cos(phi)+.55)/.3,0,1);
        if(still&&sl<.02)opacity=0;
        this.put(s,x,this.H-feet,scale,opacity,this.dataset.blur==='true'?blur:0,Math.round(scale*1000));
      }
    }else{
      const ax=.3,ay=22,sx=.32,sy=22,sr=.76,ex=.55,d=4;
      for(const s of this.bodies){
        let k=s.x,e=-1;
        if(s.trip){
          const goal=mod(s.a-this.target,12),u=clamp(Math.abs(s.x-s.from)/Math.max(.0001,Math.abs(goal-s.from)),0,1);
          if(s.trip>0){if(u<.5)e=2*u*1.4;else k=goal+2*(1-u)}
          else{if(u<.5)k=s.from+2*u;else e=2*(1-u)*1.4;}
        }else if(k<0)e=Math.min(-k,1.4);
        if(e>=0){this.put(s,this.W*(ax-ex*e),ay-22*e,1+.14*e,Math.max(0,1-1.05*e),4*Math.min(e,1),1100)}
        else{
          const x=this.W*(ax+sx*k),scale=Math.pow(sr,k);
          let opacity=k<=d-1?1-.13*k:Math.max(0,.61*(d-k));
          if(still&&Math.abs(k)<.02)opacity=0;
          this.put(s,x,ay+sy*k,scale,opacity,this.dataset.blur==='true'?Math.min(.9*k,3.2):0,1000-Math.round(10*k));
        }
      }
    }
  }
  clearHot(){for(const el of this.querySelectorAll('.is-hot'))el.classList.remove('is-hot');}
  hot(n,scroll=false){
    this.clearHot();const pins=this.zoomed?this.lb.querySelectorAll('[data-rw-pin]'):this.heroes[this.index].querySelectorAll('[data-rw-pin]');
    pins[n-1]?.classList.add('is-hot');
    const card=this.panels[this.index].querySelector(`[data-rw-card="${n}"]`);if(!card)return;
    card.classList.add('is-hot');
    if(scroll){
      const list=card.closest('.rw__items'),behavior=this.reduced?'auto':'smooth';
      if(list.scrollWidth>list.clientWidth+4){const c=card.getBoundingClientRect(),l=list.getBoundingClientRect();list.scrollTo({left:list.scrollLeft+c.left-l.left-20,behavior});}
      else if(list.scrollHeight>list.clientHeight+4)list.scrollTo({top:card.offsetTop-list.offsetTop-12,behavior});
      else{const r=card.getBoundingClientRect();if(r.top<0||r.bottom>window.innerHeight-140)window.scrollBy({top:r.top-.3*window.innerHeight,behavior});}
    }
  }
  openZoom(){
    if(this.zoomed)return;
    this.engage();this.clearHot();this.closeSheet(false);
    const figure=this.heroes[this.index].querySelector('.rw__figure'),rA=figure.getBoundingClientRect();
    const cloneFigure=figure.cloneNode(true);cloneFigure.querySelector('[data-rw-zoom]')?.remove();
    for(const pin of cloneFigure.querySelectorAll('[data-rw-pin]'))pin.tabIndex=0;
    for(const img of cloneFigure.querySelectorAll('img')){img.loading='eager';img.classList.add('is-decoded');}
    const wrapper=document.createElement('div');wrapper.className='rw__lb-model';wrapper.style.setProperty('--rw-foot',this.heroes[this.index].style.getPropertyValue('--rw-foot')||'0');
    wrapper.append(this.heroes[this.index].querySelector('.rw__shadow').cloneNode(true),cloneFigure);
    this.lbStage.replaceChildren(wrapper);
    this.querySelector('[data-rw-lb-kicker]').textContent=`Look ${pad(this.index+1)}`;
    this.querySelector('[data-rw-lb-name]').textContent=RW_LOOKS[this.index].name;
    const stageRect=this.lbStage.getBoundingClientRect();
    const h=Math.max(160,Math.min(stageRect.height,stageRect.width/.5625));wrapper.style.setProperty('--rw-model-h',`${h}px`);
    for(const img of wrapper.querySelectorAll('img'))img.sizes=`${Math.round(h*.5625)}px`;
    this.zoomed=true;this.classList.add('rw--zoom');this.lb.setAttribute('aria-hidden','false');
    if(!this.reduced){
      const rB=cloneFigure.getBoundingClientRect();wrapper.style.transition='none';
      wrapper.style.transform=`translate3d(${rA.left-rB.left}px,${rA.bottom-rB.bottom}px,0) scale(${rA.height/Math.max(1,rB.height)})`;
      void wrapper.offsetWidth;wrapper.style.transition='';requestAnimationFrame(()=>{if(this.zoomed)wrapper.style.transform='';});
    }
    this.lb.querySelector('[data-rw-zoom-close]').focus({preventScroll:true});
  }
  closeZoom(immediate=false){
    if(!this.zoomed)return;
    this.zoomed=false;clearTimeout(this.popupTimer);
    const wrapper=this.lbStage.querySelector('.rw__lb-model');
    if(!immediate&&!this.reduced&&wrapper){
      const source=this.heroes[this.index].querySelector('.rw__figure').getBoundingClientRect();
      const to=wrapper.querySelector('.rw__figure').getBoundingClientRect();
      wrapper.style.transform=`translate3d(${source.left-to.left}px,${source.bottom-to.bottom}px,0) scale(${source.height/Math.max(1,to.height)})`;
    }
    this.classList.remove('rw--zoom');this.lb.setAttribute('aria-hidden','true');
    const delay=immediate||this.reduced?0:950;
    this.popupTimer=setTimeout(()=>this.lbStage.replaceChildren(),delay);
    if(this.contains(document.activeElement))this.stage.focus({preventScroll:true});
  }
  refreshVariant(card,touched=false){
    if(!card)return;
    const picker=card.querySelector('[data-rw-picker]')||(this.sheetCard===card?this.sheetHost?.querySelector('[data-rw-picker]'):null);
    if(!picker)return;
    const variants=JSON.parse(picker.querySelector('[data-rw-variants]').textContent);
    const value=picker.querySelector('[data-rw-option]:checked')?.value;
    const selected=variants.find(v=>v.a&&v.o[0]===value);
    for(const input of picker.querySelectorAll('[data-rw-option]')){
      const available=variants.some(v=>v.a&&v.o[0]===input.value);
      input.closest('.rw__pill').classList.toggle('is-unavailable',!available);
    }
    const confirm=picker.querySelector('[data-rw-confirm]');confirm.disabled=!selected;
    confirm.querySelector('[data-rw-confirm-label]').textContent=selected?'Add to bag':this.dataset.msgSoldout||'Sold out';
    if(selected)card.dataset.selected=String(selected.id);else delete card.dataset.selected;
    if(touched)card.dataset.touched='1';
  }
  togglePicker(card){
    if(card.classList.contains('is-added')||card.classList.contains('is-loading'))return;
    const picker=card.querySelector('[data-rw-picker]');if(!picker.hidden)this.closePicker(card);else this.openPicker(card);
  }
  openPicker(card,focus=true){
    if(!card||card.classList.contains('is-added'))return;
    if(this.mobile&&this.sheetCard&&this.sheetCard!==card)this.closeSheet(true);
    this.engage();
    const picker=card.querySelector('[data-rw-picker]');picker.hidden=false;card.classList.add('is-picking');
    const add=card.querySelector('[data-rw-add]');add.setAttribute('aria-expanded','true');
    this.refreshVariant(card);
    if(this.mobile)this.openSheet(card,picker);
    else{
      const list=card.closest('.rw__items');
      if(list&&list.scrollHeight>list.clientHeight)list.scrollTo({top:card.offsetTop-list.offsetTop-12,behavior:this.reduced?'auto':'smooth'});
    }
    if(focus)requestAnimationFrame(()=>{if(!picker.hidden)picker.querySelector('input:checked')?.focus({preventScroll:true})});
  }
  closePicker(card){
    if(!card)return;
    if(this.sheetCard===card)this.closeSheet(false);
    const picker=card.querySelector('[data-rw-picker]');picker.hidden=true;card.classList.remove('is-picking');
    card.querySelector('[data-rw-add]').setAttribute('aria-expanded','false');
  }
  openSheet(card,picker){
    if(!this.sheetHost){
      this.sheetHost=document.createElement('div');this.sheetHost.className='rw-sheet-host';
      this.sheetHost.innerHTML='<button class="rw__pick-scrim" data-rw-pick-close tabindex="-1" aria-hidden="true" type="button"></button>';
      document.body.append(this.sheetHost);
      this.sheetHost.addEventListener('click',event=>{
        if(event.target.closest('[data-rw-pick-close]')){this.closeSheet();return;}
        if(event.target.closest('[data-rw-confirm]'))this.confirm(event.target.closest('[data-rw-picker]'));
      });
      this.sheetHost.addEventListener('change',event=>{
        if(event.target.matches('[data-rw-option]')){this.engage();this.refreshVariant(this.sheetCard,true);}
      });
      this.listen(document,'keydown',event=>{
        if(event.key==='Escape'&&this.sheetCard){event.preventDefault();const card=this.sheetCard;this.closeSheet();card.querySelector('[data-rw-add]').focus({preventScroll:true});}
      });
    }
    const computed=getComputedStyle(this);
    for(const token of ['--rw-panel','--rw-text','--rw-muted','--rw-line','--rw-accent','--rw-on-accent','--rw-btn-bg','--rw-btn-fg','--rw-btn-radius','--rw-pill-radius','--rw-bar-r','--rw-thumb-radius','--rw-pt-size','--rw-price','--rw-opt','--rw-ease','--rw-ease-sheet','--rw-ease-spring'])this.sheetHost.style.setProperty(token,computed.getPropertyValue(token));
    this.sheetHost.style.fontFamily=computed.fontFamily;this.sheetHost.style.color=computed.color;
    this.sheetCard=card;this.sheetHost.append(picker);this.classList.add('rw--picking');
    requestAnimationFrame(()=>this.sheetHost?.classList.add('is-open'));
  }
  closeSheet(hide=true){
    if(!this.sheetCard)return;
    const card=this.sheetCard,picker=this.sheetHost?.querySelector('[data-rw-picker]');
    if(picker){card.append(picker);if(hide)picker.hidden=true;}
    this.sheetHost?.classList.remove('is-open');this.sheetCard=null;
    this.classList.remove('rw--picking');
    if(hide){card.classList.remove('is-picking');card.querySelector('[data-rw-add]').setAttribute('aria-expanded','false');}
  }
  async confirm(picker){
    const card=this.sheetCard||picker?.closest('.rw__item');
    if(!card||card.classList.contains('is-loading')||card.classList.contains('is-added'))return;
    this.refreshVariant(card,true);
    const id=Number(card.dataset.selected);if(!Number.isSafeInteger(id)){this.message(card.closest('[data-rw-panel]'),'Please choose an available size.');return;}
    card.classList.add('is-loading');
    await new Promise(resolve=>setTimeout(resolve,this.reduced?0:420));
    try{bag.add([{id,quantity:1}]);this.markAdded(card);this.message(card.closest('[data-rw-panel]'),'');}
    catch(e){this.message(card.closest('[data-rw-panel]'),this.dataset.msgError||e.message);}
    finally{card.classList.remove('is-loading');}
  }
  markAdded(card){
    this.closePicker(card);card.classList.remove('is-loading');card.classList.add('is-added');
    const add=card.querySelector('[data-rw-add]');add.setAttribute('aria-label',add.dataset.addedLabel);add.removeAttribute('aria-expanded');
    if(this.mobile&&!this.reduced&&navigator.vibrate)navigator.vibrate(12);
    const panel=card.closest('[data-rw-panel]');const cards=[...panel.querySelectorAll('[data-rw-card]')];
    if(cards.length>=2&&cards.every(el=>el.classList.contains('is-added'))){panel.classList.add('is-complete');this.message(panel,'');}
  }
  message(panel,text){if(panel)panel.querySelector('[data-rw-msg]').textContent=text;}
  async addFullLook(panel){
    if(panel.classList.contains('is-complete'))return;
    const button=panel.querySelector('[data-rw-all]');if(button.classList.contains('is-loading'))return;
    this.engage();this.message(panel,'');
    const cards=[...panel.querySelectorAll('[data-rw-card]')].filter(card=>!card.classList.contains('is-added'));
    const ready=cards.filter(card=>(card.dataset.variantId||card.dataset.touched)&&Number.isSafeInteger(Number(card.dataset.selected)));
    const pending=cards.filter(card=>!ready.includes(card));
    if(ready.length){
      button.classList.add('is-loading');for(const card of ready)card.classList.add('is-loading');
      await new Promise(resolve=>setTimeout(resolve,this.reduced?0:400));
      try{bag.add(ready.map(card=>({id:Number(card.dataset.selected),quantity:1})));for(const card of ready)this.markAdded(card);}
      catch{this.message(panel,this.dataset.msgError);}
      finally{button.classList.remove('is-loading');for(const card of ready)card.classList.remove('is-loading');}
    }
    if(pending.length){
      for(const [i,card] of pending.entries())if(!this.mobile||i===0)this.openPicker(card,i===0);
      this.message(panel,(this.dataset.msgChoose||'Pick a size for: [items]').replace('[items]',pending.map(card=>card.dataset.title).join(', ')));
    }
  }
}
customElements.define('runway-section',RunwaySection);
window.addEventListener('DOMContentLoaded',()=>{try{bag=new StylingBag(RW_CATALOG);}catch(error){console.error(error);document.querySelector('#bag-status').textContent=error.message;}},{once:true});
