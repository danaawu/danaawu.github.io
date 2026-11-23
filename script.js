/* Dana Wu portfolio — accessible navigation, carousel, editable copy. */
(() => {
  'use strict';
  const page = document.body.dataset.page;
  const config = window.DANA_SITE_CONFIG || {};
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => { el.classList.add('is-current'); el.setAttribute('aria-current', 'page'); });

  const menu = document.getElementById('site-nav');
  const menuButton = document.querySelector('.mobile-menu-toggle');
  menuButton?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  const workWrap = document.querySelector('.nav-work');
  const workButton = document.querySelector('.work-dropdown-toggle');
  workButton?.addEventListener('click', () => {
    const isOpen = workWrap.classList.toggle('is-open');
    workButton.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', ev => {
    if (workWrap && !workWrap.contains(ev.target)) {workWrap.classList.remove('is-open');workButton?.setAttribute('aria-expanded','false');}
    if (menu && menuButton && !menu.contains(ev.target) && !menuButton.contains(ev.target)) { menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false'); }
  });
  document.addEventListener('keydown', ev => {
    if(ev.key === 'Escape') {
      workWrap?.classList.remove('is-open'); workButton?.setAttribute('aria-expanded','false');
      menu?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded','false');
    }
  });

  // Editing: edits autosave in this browser; "SAVE PAGE FILE" exports a publishable HTML page.
  const editables = [...document.querySelectorAll('[data-edit-id]')];
  const editPrefix='dana-wu-draft-v2:';
  editables.forEach(el => {
    const key = editPrefix + el.dataset.editId;
    try { const text = window.localStorage.getItem(key); if (text !== null) el.textContent = text; } catch (_) {}
    el.addEventListener('input', () => { try { localStorage.setItem(key, el.textContent); } catch (_){} });
  });
  let editMode = false;
  const editButton = document.getElementById('edit-text-toggle');
  const notice = document.getElementById('editor-notice');
  let noticeTimeout;
  function flashNotice(text) {
    if(!notice) return;
    notice.textContent=text;notice.hidden=false;
    clearTimeout(noticeTimeout);
    noticeTimeout=setTimeout(() => {notice.hidden=true;}, 6500);
  }
  editButton?.addEventListener('click', () => {
    editMode = !editMode; document.body.classList.toggle('editing-mode',editMode);
    editables.forEach(el => { el.contentEditable = String(editMode); el.spellcheck = editMode; });
    editButton.setAttribute('aria-pressed',String(editMode));
    editButton.textContent = editMode ? '✓ FINISH EDITING' : '✎ EDIT TEXT';
    flashNotice(editMode ? 'Click any outlined text to edit it. Your changes save in this browser; choose SAVE PAGE FILE to download a publishable HTML copy.' : 'Text editing is off. Your changes are still saved in this browser.');
  });
  document.getElementById('export-page-button')?.addEventListener('click', () => {
    const clone = document.documentElement.cloneNode(true);
    clone.querySelector('body')?.classList.remove('editing-mode');
    clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
    // Persist user-visible edited text rather than only its localStorage value.
    clone.querySelectorAll('[data-edit-id]').forEach(el => {
      const live = document.querySelector(`[data-edit-id="${el.dataset.editId}"]`);
      if(live) el.textContent=live.textContent;
    });
    // Export About Me photo if one was uploaded as a browser preview.
    const photo = document.getElementById('about-photo');
    if(photo && photo.getAttribute('src')?.startsWith('data:')) {
      const inClone=clone.querySelector('#about-photo');
      if (inClone) {inClone.setAttribute('src',photo.getAttribute('src'));inClone.removeAttribute('onerror');inClone.removeAttribute('style');}
    }
    let markup = '<!doctype html>\n' + clone.outerHTML;
    const blob = new Blob([markup], {type:'text/html;charset=utf-8'});
    const url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url; a.download=(location.pathname.split('/').pop()||'index.html');document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    flashNotice('Saved this page as HTML. Replace the corresponding HTML file in your website folder before publishing. Keep the assets, styles.css, script.js and site-config.js files together.');
  });

  // Homepage orbit: one front card, two behind it on the same rotating ring.
  if(page === 'home') {
    const cards=[...document.querySelectorAll('.orbit-card')];
    const dots=[...document.querySelectorAll('.orbit-dot')];
    const orbit=document.querySelector('.orbit-wrap');
    let front=0, timer;
    function drawCarousel() {
      cards.forEach((card,i) => {
        card.classList.remove('is-front','is-right','is-left');
        const slot=(i-front+3)%3;
        card.classList.add(slot===0?'is-front':slot===1?'is-right':'is-left');
        card.tabIndex=slot===0?0:-1;
        card.setAttribute('aria-hidden',slot===0?'false':'true');
      });
      dots.forEach((dot,i) => {dot.classList.toggle('is-active',i===front);dot.setAttribute('aria-current',String(i===front));});
    }
    function changeCarousel(next){front=(next+cards.length)%cards.length;drawCarousel();}
    function stopAuto(){clearInterval(timer);}
    function startAuto(){stopAuto();if(!prefersLessMotion) timer=setInterval(()=>changeCarousel(front+1),5000);}
    drawCarousel();startAuto();
    orbit?.addEventListener('mouseenter',stopAuto);
    orbit?.addEventListener('mouseleave',startAuto);
    orbit?.addEventListener('focusin',stopAuto);
    orbit?.addEventListener('focusout',e=>{if(!orbit.contains(e.relatedTarget))startAuto();});
    document.querySelectorAll('[data-orbit-direction]').forEach(btn => btn.addEventListener('click',()=>{changeCarousel(front+(btn.dataset.orbitDirection==='next'?1:-1));startAuto();}));
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>{changeCarousel(i);startAuto();}));
    let startX=null;
    orbit?.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;stopAuto();},{passive:true});
    orbit?.addEventListener('touchend',e=>{if(startX!==null){const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>45)changeCarousel(front+(delta<0?1:-1));startX=null;}startAuto();},{passive:true});
    orbit?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){changeCarousel(front+1);e.preventDefault();}if(e.key==='ArrowLeft'){changeCarousel(front-1);e.preventDefault();}});


  }

  // The Work tabs use normal links and URLs, so they can be shared and reloaded.
  if(page === 'work') {
    const overview=document.getElementById('work-overview');
    const detailViews=[...document.querySelectorAll('[data-detail-view]')];
    function changeWorkRoute(){
      const slug=location.hash.slice(1).toLowerCase();
      const match=detailViews.find(s=>s.dataset.detailView===slug);
      overview.hidden=!!match;
      detailViews.forEach(s=>{s.hidden=s!==match;});
      if(match)document.title=`${match.querySelector('h2')?.textContent||'Work'} · Dana Wu`;
      else document.title='My Work · Dana Wu';
      window.scrollTo({top:0,behavior:'instant'});
    }
    window.addEventListener('hashchange',changeWorkRoute);changeWorkRoute();
  }
  if(page === 'about') {
    const photoUpload=document.getElementById('about-photo-input');
    const photo=document.getElementById('about-photo');
    photoUpload?.addEventListener('change',event=>{
      const file=event.target.files?.[0];if(!file)return;
      if(!file.type.startsWith('image/')){flashNotice('Please select an image file.');return;}
      const img=new Image();const url=URL.createObjectURL(file);
      img.onload=()=>{
        const scale=Math.min(1,960/img.width,960/img.height);
        const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        const data=canvas.toDataURL('image/jpeg',.82);
        photo.setAttribute('src',data);photo.style.display='block';
        try{localStorage.setItem('dana-about-photo-v1',data);}catch(_){}
        URL.revokeObjectURL(url);
        flashNotice('Photo preview added. Choose SAVE PAGE FILE to export this page with the photo embedded in the HTML.');
      };
      img.onerror=()=>URL.revokeObjectURL(url);img.src=url;
    });
    try{const saved=localStorage.getItem('dana-about-photo-v1');if(saved){photo.setAttribute('src',saved);photo.style.display='block';}}catch(_){}
  }
  if(page === 'contact') {
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    const linkedIn=document.getElementById('linkedin-link');
    if(config.linkedInUrl && /^https:\/\//.test(config.linkedInUrl)) {
      linkedIn.href=config.linkedInUrl;linkedIn.target='_blank';linkedIn.rel='noopener noreferrer';
    }else{
      linkedIn?.addEventListener('click',ev=>{ev.preventDefault();message.textContent='LinkedIn profile link is not set yet. Add your URL to site-config.js.';});
    }
    form?.addEventListener('submit',ev=>{
      ev.preventDefault();
      if(!config.contactEmail||!/^\S+@\S+\.\S+$/.test(config.contactEmail)) {
        message.textContent='Contact email is not configured yet. Add your email address to site-config.js before publishing.';
        return;
      }
      const data=new FormData(form);
      const name=String(data.get('name')||'').trim();
      const email=String(data.get('email')||'').trim();
      const body=String(data.get('message')||'').trim();
      const subject=encodeURIComponent(`Portfolio inquiry from ${name}`);
      const mailBody=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${body}`);
      message.textContent='Your email app should open with a draft. Please press Send there to actually send the message.';
      window.location.href=`mailto:${config.contactEmail}?subject=${subject}&body=${mailBody}`;
    });
  }
})();
