<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  // নরম ফেড-ইন
  document.body.style.opacity = 0;
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 800ms ease';
    document.body.style.opacity = 1;
  });
  function createSorry() {
  const s = document.createElement("div");
  s.className = "sorry";
  s.innerText = "Sorry 💖";
  s.style.left = Math.random() * window.innerWidth + "px";
  s.style.animationDuration = (3 + Math.random() * 4) + "s";
  const parent = document.getElementById("container") || document.body;
  parent.appendChild(s);

  // অ্যানিমেশন শেষ হলে remove করবে
  setTimeout(() => s.remove(), 7000);
}

// প্রতি ১ সেকেন্ডে নতুন "Sorry" ঝরবে
setInterval(createSorry, 1000);

  // ফ্লোটিং হার্ট/মুন/লাভ শেপ ব্যাকগ্রাউন্ডে জেনারেট
  const container = document.getElementById('floating-shapes');
  if (container) {
    const shapes = ['heart','moon','love'];
    const count = 18; // কতগুলো শেপ

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'f-shape';
      const type = shapes[i % shapes.length];

      // র‍্যান্ডম পজিশন, সাইজ, ডিউরেশন
      const size = Math.floor(20 + Math.random()*50);
      el.style.left = Math.floor(Math.random()*100) + 'vw';
      el.style.top = Math.floor(60 + Math.random()*60) + 'vh';
      el.style.setProperty('--dur', Math.floor(6000 + Math.random()*8000) + 'ms');

      // টাইপভেদে ড্র
      if (type === 'heart') {
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.background = 'linear-gradient(135deg,#ff7eb3,#ff1b6b)';
        el.style.transform = 'rotate(45deg)';
        el.style.borderRadius = '8px';
        // দুটি গোলাকার লব
        const b1 = document.createElement('div');
        const b2 = document.createElement('div');
        [b1,b2].forEach(b=>{
          b.style.position='absolute';
          b.style.width=size+'px'; b.style.height=size+'px';
          b.style.borderRadius='50%'; b.style.background='inherit';
          el.appendChild(b);
        });
        b1.style.top = (-size/2)+'px'; b1.style.left = '0px';
        b2.style.left = (-size/2)+'px'; b2.style.top = '0px';
      }
      else if (type === 'moon') {
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.borderRadius = '50%';
        el.style.background = '#c0c0ff';
        el.style.boxShadow = 'inset -8px -4px 20px #99aaff, 0 6px 20px rgba(0,0,0,.2)';
        // ক্রিসেন্ট ইফেক্ট
        const dark = document.createElement('div');
        dark.style.position='absolute';
        dark.style.width=size+'px'; dark.style.height=size+'px';
        dark.style.borderRadius='50%';
        dark.style.left = (-size*0.22)+'px';
        dark.style.top = (-size*0.04)+'px';
        dark.style.background = 'radial-gradient('+Math.floor(size*0.4)+'px '+Math.floor(size*0.4)+'px at 70% 60%, rgba(0,0,0,.25), transparent 60%)';
        el.appendChild(dark);
      }
      else { // love crystal-like
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.background = 'conic-gradient(from 30deg, #ff2e63, #ff7eb3, #ffc3a0, #ff2e63)';
        el.style.clipPath = 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)';
        el.style.filter = 'drop-shadow(0 6px 14px rgba(0,0,0,.25))';
      }

      container.appendChild(el);
    }
  }

  // কন্টাক্ট ফর্ম ডেমো
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      alert('ধন্যবাদ! এই ফর্মটি ডেমো—বার্তা পাঠাতে ব্যাকএন্ড লাগবে।');
    });
  }

  // --- Add non-intrusive overlay animation for "sorry piu" ---
  const showPiuOverlay = (() => {
    let shown = false;
    return (options = {}) => {
      if (shown) return;
      // Only show once per session
      if (sessionStorage.getItem('piu-overlay-shown')) return;
      shown = true;
      const text = options.text || 'sorry piu';
      const duration = options.duration || 3200; // overlay will remove after this

      const overlay = document.createElement('div');
      overlay.id = 'piu-overlay';
      overlay.className = 'piu-overlay';

      const msg = document.createElement('div');
      msg.className = 'piu-message';

      // build per-letter spans (preserve space as small gap)
      Array.from(text).forEach(ch => {
        const span = document.createElement('span');
        span.textContent = ch;
        if (ch === ' ') span.style.marginLeft = '8px';
        msg.appendChild(span);
      });

      overlay.appendChild(msg);
      overlay.setAttribute('aria-hidden','true');
      msg.setAttribute('role','status');
      msg.setAttribute('aria-live','polite');
      document.body.appendChild(overlay);
      // Block page scroll while overlay is visible
      document.documentElement.style.overflow = 'hidden';

      // click on text dismisses quickly (only the message is clickable)
      msg.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.classList.add('fade-out');
        setTimeout(() => { overlay.remove(); }, 320);
      }, {passive: true});

      // auto-dismiss after duration
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 380);
      }, duration);

      sessionStorage.setItem('piu-overlay-shown', '1');
    };
  })();

  // show once on page load; you can also call showPiuOverlay elsewhere
  showPiuOverlay({ text: 'sorry piu', duration: 3200 });

  // --- Sorry rain effect (JS helper) ---
  const sorryRain = (() => {
    let active = false;
    const overlayId = 'sorry-rain-overlay';
    const variants = [ 'variant-1','variant-2','variant-3','variant-4' ];

    function start({ density = 16, speed = 2000, word = 'sorry' } = {}){
      if (active) return; active = true;
      const overlay = document.createElement('div');
      overlay.className = 'sorry-rain'; overlay.id = overlayId;
      // split screen into columns
      const width = window.innerWidth;
      const columns = Math.max(6, Math.round(density));
      for (let i = 0; i < columns; i++){
        const col = document.createElement('div');
        col.className = 'column';
        col.style.left = (i * (100 / columns)) + '%';
        // create several drops per column
        const dropsPerCol = Math.round((density / columns) * 2) + 1;
        for (let j = 0; j < dropsPerCol; j++){
          const drop = document.createElement('div');
          drop.className = 'drop ' + variants[Math.floor(Math.random()*variants.length)];
          const spacing = 1 + Math.floor(Math.random() * 2);
          // small letter-case variant: sometimes uppercase
          const txt = (Math.random()>.6 ? word.toUpperCase() : word);
          drop.textContent = txt;
          // randomize duration and delay
          drop.style.setProperty('--duration', (speed + Math.floor(Math.random()*600)) + 'ms');
          drop.style.left = (Math.random()*8 - 4) + 'vw';
          drop.style.top = '-' + Math.floor(Math.random()*80) + 'vh';
          drop.style.fontSize = (14 + Math.floor(Math.random()*34)) + 'px';
          drop.style.opacity = (0.7 + Math.random()*0.3);
          col.appendChild(drop);
        }
        overlay.appendChild(col);
      }
      document.body.appendChild(overlay);
      // Clean up: remove overlay after animation length approx speed+2000
      const removeDelay = Math.max(1000, speed * 2 + 1200);
      setTimeout(()=>{ overlay.classList.add('fade-out'); setTimeout(()=> overlay.remove(), 500); active=false; }, removeDelay);
    }
    function stop(){
      const overlay = document.getElementById(overlayId);
      if (overlay){ overlay.classList.add('fade-out'); setTimeout(()=>overlay.remove(), 420); active=false }
    }
    return { start, stop };
  })();

  // expose to window for console testing
  window.sorryRain = sorryRain;

  // --- Add SORRY flowers/leave fall animation ---
  const showSorryFlowers = (() => {
    let shown = false; // block concurrent runs
    const overlayId = 'sf-overlay';
    const variants = ['variant-1','variant-2','variant-3','variant-4'];
    return (opts = {}) => {
      if (shown) return; // single run at a time
      const count = opts.count || 18;
      const word = (opts.word || 'SORRY').toUpperCase();
      const duration = opts.duration || 5600;
      shown = true;
      // create overlay
      const overlay = document.createElement('div'); overlay.className = 'sf-overlay'; overlay.id = overlayId;
      const inner = document.createElement('div'); inner.className = 'sf-inner'; overlay.appendChild(inner);
      // build word with per-letter spans
      const wordEl = document.createElement('div'); wordEl.className = 'sf-word';
      Array.from(word).forEach(ch => {
        const s = document.createElement('span'); s.className = 'sf-letter';
        s.textContent = ch; wordEl.appendChild(s);
      });
      inner.appendChild(wordEl);
      document.body.appendChild(overlay);

      // Generate falling flowers/leaves
      const spawn = () => {
        for (let i=0;i<count;i++){
          const el = document.createElement('div');
          el.className = 'sf-flower ' + variants[Math.floor(Math.random()*variants.length)];
          el.textContent = Math.random()>.6 ? '❀' : '🍃';
          // random left position in viewport
          el.style.left = Math.floor(Math.random()*100) + 'vw';
          // random size
          el.style.fontSize = (12 + Math.floor(Math.random()*38)) + 'px';
          // random duration
          const ranDur = Math.floor(duration + Math.random()*2000);
          el.style.setProperty('--sf-duration', ranDur + 'ms');
          // stagger start
          el.style.animationDelay = Math.floor(Math.random()*700) + 'ms';
          document.body.appendChild(el);
        }
      };
      spawn();

      // Fade out overlay and clean elements after some time
      setTimeout(()=>{
        overlay.classList.add('fade-out');
        // remove flower elements
        document.querySelectorAll('.sf-flower').forEach(f=> f.remove());
        setTimeout(()=>{ overlay.remove(); shown=false; }, 520);
      }, duration + 800);
      
      // clicking the inner overlay removes it faster (overlay itself has pointer-events:none)
      inner.addEventListener('click', ()=>{
        overlay.classList.add('fade-out'); document.querySelectorAll('.sf-flower').forEach(f=> f.remove()); setTimeout(()=>{ overlay.remove(); shown=false; }, 420);
      }, {passive:true});
    };
  })();

  // Expose for console
  window.showSorryFlowers = showSorryFlowers;

  // --- Floating SORRY words like floating shapes (f-shape) ---
  const spawnFloatingSorry = (( ) => {
    const container = document.getElementById('floating-shapes');
    return (count = 6, opts = {}) => {
      if (!container) return;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'f-sorry';
        // small/medium/large class
        const sizeClass = ['small','medium','large'][Math.floor(Math.random()*3)];
        el.classList.add(sizeClass);
        // set occasional gradient
        if (Math.random() > 0.6) el.classList.add('gradient'); else el.classList.add('subtle');
        el.textContent = opts.word || 'SORRY';
        // random position and duration
        el.style.left = Math.floor(Math.random()*100) + 'vw';
        el.style.top = Math.floor(60 + Math.random()*60) + 'vh'; // start near bottom like other shapes
        el.style.setProperty('--dur', (8000 + Math.floor(Math.random()*9000)) + 'ms');
        container.appendChild(el);
        // cleanup after animation finishes
        const dur = parseInt(el.style.getPropertyValue('--dur')) || 9000;
        setTimeout(()=>{ el.remove(); }, dur+400);
      }
    };
  })();

  // expose on window
  window.spawnFloatingSorry = spawnFloatingSorry;

  // --- Continuous Sorry rain control ---
  const continuous = (()=>{
    let intervalId = null;
    let overlay = null;
    function createOverlay(){
      overlay = document.getElementById('continuous-sorry-overlay');
      if (!overlay){
        overlay = document.createElement('div'); overlay.id = 'continuous-sorry-overlay'; overlay.className='sorry-rain';
        document.body.appendChild(overlay);
      }
      return overlay;
    }
    function start({ rate = 600, density = 1, word = 'sorry', speed = 2200 } = {}){
      if (intervalId) return; // already running
      const ol = createOverlay();
      intervalId = setInterval(()=>{
        // spawn N drops based on density
        for (let i=0;i<density;i++){
          const drop = document.createElement('div');
          drop.className = 'drop variant-' + (1 + Math.floor(Math.random()*4));
          // set the content as the word (some uppercase/lowercase mixing)
          drop.textContent = Math.random() > .6 ? word.toUpperCase() : word;
          const left = Math.floor(Math.random()*100) + 'vw';
          drop.style.left = left; // random position
          drop.style.fontSize = (12 + Math.floor(Math.random()*28)) + 'px';
          drop.style.opacity = (0.7 + Math.random()*0.3);
          const dur = Math.max(600, speed + Math.floor(Math.random()*1200));
          drop.style.setProperty('--duration', dur+'ms');
          drop.style.animationDuration = dur + 'ms';
          // Optional tilt
          drop.style.transform = 'rotate(' + (Math.floor(Math.random()*40)-20) + 'deg)';
          ol.appendChild(drop);
          // remove when animation ends
          drop.addEventListener('animationend', ()=> drop.remove(), { once: true });
        }
      }, rate);
    }
    function stop(){
      if (!intervalId) return;
      clearInterval(intervalId); intervalId=null;
      const ol = document.getElementById('continuous-sorry-overlay');
      if (ol){ ol.classList.add('fade-out'); setTimeout(()=> ol.remove(), 420); }
    }
    function running(){ return !!intervalId }
    return { start, stop, running };
  })();

  // Create a small toggle button in the UI to start/stop the continuous rain
  const toggleEl = document.createElement('button');
  toggleEl.className = 'sorry-toggle';
  toggleEl.innerText = 'Sorry Rain';
  toggleEl.title = 'Toggle continuous Sorry rain';
  toggleEl.setAttribute('aria-pressed','false');
  document.body.appendChild(toggleEl);
  toggleEl.addEventListener('click', ()=>{
    if (continuous.running()){
      continuous.stop(); toggleEl.classList.remove('active'); toggleEl.setAttribute('aria-pressed','false');
    } else {
      continuous.start({ rate: 480, density: 1, word: 'sorry', speed: 3200 }); toggleEl.classList.add('active'); toggleEl.setAttribute('aria-pressed','true');
    }
  }, { passive: true });

  // expose control for console
  window.startSorryRain = (...args) => continuous.start(...args);
  window.stopSorryRain = () => continuous.stop();

  // Add a binding to the heart CTA in the index if present: click heart to trigger the animation
  const heartCTAs = document.querySelectorAll('.cta-group .btn.heart');
  heartCTAs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Trigger animation immediately, do not prevent navigation — remove delay.
        // Avoid preventDefault so the browser navigates immediately; animation will run briefly before unload.
        showSorryFlowers({ count: 24, duration: 5200, word: 'SORRY' });
        // also spawn floating SORRY elements
        spawnFloatingSorry(6, { word: 'SORRY' });
        // don't block navigation: let the link act normally
      }, {passive:true});
  });

  // Mobile nav toggle behavior
  try{
    const navToggle = document.querySelector('.nav-toggle');
    const navEl = document.querySelector('.nav');
      if (navToggle && navEl){
      navToggle.addEventListener('click', ()=>{
        const isOpen = navEl.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        // also update nav list aria-hidden
        const navList = document.getElementById(navToggle.getAttribute('aria-controls'));
        if (navList) navList.setAttribute('aria-hidden', (!isOpen).toString());
      }, {passive:true});
      // close nav on link click
      navEl.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> { navEl.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); const navList = document.getElementById(navToggle.getAttribute('aria-controls')); if (navList) navList.setAttribute('aria-hidden', 'true'); }));
      // close on escape
      document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && navEl.classList.contains('open')){ navEl.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } });
      // close nav on resize to desktop layout
      window.addEventListener('resize', ()=>{ if (window.innerWidth > 900 && navEl.classList.contains('open')){ navEl.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } });
      // initialize aria-hidden based on current viewport width
      const navListInit = document.getElementById(navToggle.getAttribute('aria-controls'));
      if (navListInit){ navListInit.setAttribute('aria-hidden', (window.innerWidth <= 900).toString()); }
      // update aria-hidden on resize
      window.addEventListener('resize', ()=>{ if (navListInit){ navListInit.setAttribute('aria-hidden',(window.innerWidth <= 900).toString()); } });
    }
  }catch(e){}

  // Convert `.sorry-inline` into per-letter spans and animate on hover or on load
  const initInlineSorry = () => {
    const sin = document.querySelector('.sorry-inline');
    if (!sin) return;
    const txt = sin.textContent.trim();
    sin.innerHTML = '';
    Array.from(txt).forEach(ch => {
      const sp = document.createElement('span');
      sp.className = 'sf-letter';
      sp.textContent = ch;
      sin.appendChild(sp);
    });
    // run initial pop animation once on load
    setTimeout(()=>{
      sin.querySelectorAll('.sf-letter').forEach((s, i)=>{
        setTimeout(()=> s.classList.add('pop'), i*80);
      });
    }, 420);
    // add hover to replay the effect
    sin.addEventListener('mouseenter', () => {
      sin.querySelectorAll('.sf-letter').forEach((s, i)=>{
        s.classList.remove('pop');
        setTimeout(()=> s.classList.add('pop'), 40 + i * 60);
      });
    }, {passive:true});
  };
  initInlineSorry();

  // --- Show apology overlay on open (or when arriving from an external referrer) ---
  // How it works:
  //  - Checks document.referrer and compares origin to current origin.
  //  - If it is from another origin and overlay hasn't been shown this session, it displays an overlay
  //    and attempts to autoplay a BGM located at `p/sorry-bgm.mp3`.
  //  - Autoplay may be blocked by the browser; a "Play audio" button appears in that case to let
  //    the visitor start the sound manually.
  //  - To disable temporarily for testing add `?no-overlay=1` to the query string.
  (function() {
    try {
      // ---------- Internationalization (I18n) for overlay text ----------
      // You can edit the strings below for your language.
      // The overlay will attempt to auto-detect the current language using:
      //  1) document.documentElement.lang (recommended for pages set with <html lang="bn">),
      //  2) navigator.language (browser preference). If not found, default to English.
      const i18n = {
        en: {
          title: 'Sorry — please forgive me this time',
          message: 'Please accept this message and a small background track while you enter the site.',
          ok: 'OK',
          aria: 'Apology message'
        },
        bn: {
          title: 'SORRYY....FORGIVE ME THIS TIME',
          message: 'যদি রাগ না করে থাক তাহলে ok চাপ দাও ।',
          ok: 'OK',
          aria: 'ক্ষমা-বার্তা'
        }
        // Add more language keys as needed, e.g., 'fr', 'es', 'hi'
      };

      // prefer <html lang="xx"> if available, otherwise fall back to browser locale
      const detectLocale = () => {
        const langAttr = (document.documentElement && document.documentElement.lang) || '';
        if (langAttr) return langAttr.split('-')[0];
        const nav = (navigator.language || navigator.userLanguage || 'en');
        return nav.split('-')[0];
      };
      const lang = (new URLSearchParams(location.search).get('lang') || detectLocale() || 'en').toLowerCase();
      const strings = i18n[lang] || i18n[lang.split('-')[0]] || i18n['en'];
      // Provide a simple HTML override via data attributes on body if needed.
      // Example: <body data-apology-title="..." data-apology-message="..." data-apology-ok="..."> 
      const body = document.body || {};
      const overrideTitle = body.getAttribute && body.getAttribute('data-apology-title');
      const overrideMsg = body.getAttribute && body.getAttribute('data-apology-message');
      const overrideOk = body.getAttribute && body.getAttribute('data-apology-ok');
      if (overrideTitle) strings.title = overrideTitle;
      if (overrideMsg) strings.message = overrideMsg;
      if (overrideOk) strings.ok = overrideOk;
      // Set to true to make the apology popup appear on every page open
      const ALWAYS_SHOW_ON_OPEN = false; // default: do not show on every page open
      // Show only on index/home page (recommended by user)
      const SHOW_ONLY_ON_INDEX = true;
      // Show only once ever for a user (persist across sessions) using localStorage
      const SHOW_ONLY_FIRST_TIME_EVER = true;
      const ref = document.referrer || '';
      if (!ALWAYS_SHOW_ON_OPEN && !ref && !SHOW_ONLY_ON_INDEX) return; // when not forcing and no referrer and not index-only
      // allow developers to disable for testing using ?no-overlay=1
      if (location.search.indexOf('no-overlay=1') !== -1) return;
      if (!ALWAYS_SHOW_ON_OPEN && !SHOW_ONLY_ON_INDEX) {
        const refOrigin = new URL(ref).origin;
        if (refOrigin === location.origin) return; // internal navigation — ignore
      }
      // if only index page requested, ensure we are on index
      const isIndexPage = (() => {
        try {
          // Prefer a body class check (index typically has page-home), fallback to path checks
          if (document.body && document.body.classList && document.body.classList.contains('page-home')) return true;
          const p = (location.pathname || '').toLowerCase();
          if (p === '/' || p === '') return true;
          if (p.endsWith('/index.html') || p.endsWith('/index.htm')) return true;
          return false;
        } catch (e) { return false }
      })();
      if (SHOW_ONLY_ON_INDEX && !isIndexPage) return;
      // show only once per session or once ever, depending on flags
      const SHOW_ONLY_ONCE_PER_SESSION = false; // set to true to keep it to once per session
      if (SHOW_ONLY_ONCE_PER_SESSION && sessionStorage.getItem('apology-shown')) return;
      if (SHOW_ONLY_FIRST_TIME_EVER && localStorage.getItem('apology-first-shown')) return;

      // show the overlay (developer: place a file at `p/sorry-bgm.mp3` or change audio.src)
      const overlay = document.createElement('div');
      overlay.className = 'external-ref-overlay';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');
      overlay.setAttribute('aria-label', strings.aria || 'Apology message');
      overlay.innerHTML = `
        <div class="extern-inner glass">
          <div class="extern-content">
            <h2>${strings.title}</h2>
            <p>${strings.message}</p>
            <div class="extern-controls">
              <button class="btn ok-extern">${strings.ok}</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // create audio element (developer should place p/sorry-bgm.mp3 or change URL)
      const audio = document.createElement('audio');
      audio.id = 'sorry-bgm';
      audio.src = 'p/sorry-bgm.mp3';
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.6;
      overlay.appendChild(audio);

      const okBtn = overlay.querySelector('.ok-extern');

      const tryPlay = () => {
        const promise = audio.play();
        if (promise !== undefined) {
          promise.then(()=>{
            // playing
            // playing - UI does not include play control
          }).catch(()=>{
            // autoplay blocked — show play button
            // autoplay blocked - we don't show a separate play button
          });
        }
      };

      // attempt to play immediately; for a navigation-initiated click this may succeed
      tryPlay();

      // no audio button: audio can be started by OK button or tryPlay on load

      // OK button: user gesture — start audio if not started and close overlay
      okBtn.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        // attempt to play audio (user gesture prevents autoplay block)
        try {
          const p = audio.play();
          if (p !== undefined) {
            p.then(()=> { /* ok played */ }).catch(()=> { /* may fail */ });
          }
        } catch(err) { /* ignore */ }
        if (SHOW_ONLY_ONCE_PER_SESSION) sessionStorage.setItem('apology-shown','1');
        if (SHOW_ONLY_FIRST_TIME_EVER) localStorage.setItem('apology-first-shown','1');
        // remove overlay
        overlay.classList.add('fade-out'); setTimeout(()=> { overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
      }, {passive:true});

      function closeOverlay(){
        try{ audio.pause(); }catch(e){}
        overlay.classList.add('fade-out');
        setTimeout(()=> { overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
        if (SHOW_ONLY_ONCE_PER_SESSION) sessionStorage.setItem('apology-shown','1');
        if (SHOW_ONLY_FIRST_TIME_EVER) localStorage.setItem('apology-first-shown','1');
      }
      // Legacy close (if some code leaves a close button); keep behavior but prefer OK
      const closeBtn = overlay.querySelector('.close-extern');
      if (closeBtn) closeBtn.addEventListener('click', closeOverlay, {passive:true});
      // Focus OK for accessibility
      if (okBtn) okBtn.focus();
      overlay.addEventListener('click', (e)=>{ if (e.target === overlay) closeOverlay(); });
      // dismiss on Esc
      document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && document.body.contains(overlay)) closeOverlay(); });
    } catch (e) { /* ignore */ }
  })();
});

/* ------------------------------------------------------------------
   Video gallery initializer
   Usage: window.initVideoGallery([ 'p/v1.mp4', 'p/v2.mp4' ])
   This builds a lightweight responsive gallery and an accessible modal.
-------------------------------------------------------------------*/
window.initVideoGallery = function(videoFiles){
  const galleryEl = document.getElementById('video-gallery');
  if (!galleryEl) return;

  // helper to make a friendly title from filename
  const toTitle = (fn) => {
    const base = fn.split('/').pop();
    return base.replace(/\.[^.]+$/, '').replace(/[_\-]/g, ' ').trim();
  };

  // helper to read video item (string or object)
  const readItem = (item) => {
    if (typeof item === 'string') return { path: item, title: toTitle(item), desc: toTitle(item) };
    if (typeof item === 'object' && item !== null) return { path: item.path, title: item.title || toTitle(item.path), desc: item.desc || (item.title || toTitle(item.path)) };
    return null;
  };

  // build modal
  const modal = document.createElement('div'); modal.className = 'video-modal'; modal.id = 'video-modal';
  modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-hidden','true');
  modal.innerHTML = `<div class="inner">
      <video controls playsinline id="modal-video"></video>
      <div class="controls">
        <button class="btn close" aria-label="Close video">Close</button>
        <a class="btn" id="open-new" target="_blank" rel="noopener noreferrer">Open in new tab</a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const modalVideo = modal.querySelector('#modal-video');
  const openNewLink = modal.querySelector('#open-new');
  const closeBtn = modal.querySelector('.close');

  function openModal(src){
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    modalVideo.src = src; modalVideo.currentTime = 0; modalVideo.muted = false; modalVideo.play().catch(()=>{});
    openNewLink.href = src; // update link
    // lock scroll lightly
    document.documentElement.style.overflow = 'hidden';
    // move focus to modal
    closeBtn.focus();
  }
  function closeModal(){
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    try{ modalVideo.pause(); }catch(e){}
    modalVideo.removeAttribute('src'); modalVideo.load();
    document.documentElement.style.overflow = '';
  }

  // Close on overlay click and close btn
  modal.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // Build gallery items
  videoFiles.forEach((it, idx)=>{
    const d = readItem(it);
    if (!d) return;
    const path = d.path;
    const title = d.title;
    const desc = d.desc;
    const card = document.createElement('article'); card.className = 'video-card glass';
    // Mark first item as featured
    const featured = (idx === 0);
    if (featured) card.classList.add('featured');
    card.innerHTML = `<video preload="metadata" ${featured ? 'autoplay muted loop playsinline' : 'muted playsinline'}><source src="${path}" type="video/mp4">Your browser does not support the video tag.</video>
      <div class="meta"><h3>${title}</h3><p>${desc}</p></div>
      <div class="actions"><button class="btn play">Play</button><a class="btn" download href="${path}">Download</a></div>
      ${featured ? '<button class="big-play" aria-label="Play featured video">▶</button><div class="romantic-accents"><div class="heart"></div></div>' : ''}`;
    galleryEl.appendChild(card);

    const playBtn = card.querySelector('.play');
    const preview = card.querySelector('video');
    const bigPlay = card.querySelector('.big-play');
    // Adjust styling based on intrinsic video orientation/resolution after metadata loads
    preview.addEventListener('loadedmetadata', () => {
      try {
        const w = preview.videoWidth || 16;
        const h = preview.videoHeight || 9;
        const ratio = w / h;
        if (ratio < 1) { // portrait video
          preview.classList.add('portrait');
        } else {
          preview.classList.remove('portrait');
        }
      } catch(e) { /* ignore failures */ }
    });
    // clicking the small video opens in modal
    preview.addEventListener('click', ()=> openModal(path));
    playBtn.addEventListener('click', ()=> openModal(path));
    if (bigPlay) bigPlay.addEventListener('click', ()=> openModal(path));
    // pause preview on mouse leave
    preview.addEventListener('mouseenter', ()=> preview.play());
    preview.addEventListener('mouseleave', ()=> { try{ preview.pause(); }catch(e){} });
  });

  // if screen reader or no videos exists show a message
  if (videoFiles.length === 0){ galleryEl.innerHTML = '<p>No videos found. Place MP4 files into the `p/` folder.</p>'; }
};

// --- Gallery page: autoplay/loop the hero video and try to start with sound ---
(() => {
  try {
    const isGallery = document.body && document.body.classList && document.body.classList.contains('page-gallery');
    if (!isGallery) return;
    const vid = document.getElementById('gallery-hero-video');
    if (!vid) return;
    vid.loop = true;

    // If the user previously allowed sound, unmute and play
    const allowed = localStorage.getItem('gallery-sound-enabled');
    if (allowed === '1') {
      vid.muted = false;
      vid.play().catch(()=>{});
      return;
    }

    // Try to play with sound first
    vid.muted = false;
    const promise = vid.play();
    if (promise !== undefined) {
      promise.then(() => {
        // success
      }).catch(() => {
        // autoplay with sound blocked — fallback to muted autoplay
        vid.muted = true;
        vid.play().catch(()=>{});

        // Show a small overlay to ask the user to enable sound (one time)
        if (!localStorage.getItem('gallery-sound-overlay-shown')) {
          const overlay = document.createElement('div');
          overlay.className = 'sound-enable-overlay';
          overlay.setAttribute('role', 'dialog');
          overlay.innerHTML = `<div class="sound-inner glass"><p>সাউন্ড চালু করতে "সাউন্ড চালু" চাপুন</p><div class="sound-controls"><button class="btn sound-enable">সাউন্ড চালু</button><button class="btn sound-close">বাতিল</button></div></div>`;
          document.body.appendChild(overlay);
          // block scroll lightly
          document.documentElement.style.overflow = 'hidden';

          const enableBtn = overlay.querySelector('.sound-enable');
          const closeBtn = overlay.querySelector('.sound-close');
          enableBtn && enableBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            vid.muted = false;
            vid.play().catch(()=>{});
            localStorage.setItem('gallery-sound-enabled','1');
            overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
          }, {passive:true});
          closeBtn && closeBtn.addEventListener('click', (e) => { overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360); }, {passive:true});
          overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360); } });
          localStorage.setItem('gallery-sound-overlay-shown','1');
        }
      });
    }
  } catch (e) { /* ignore */ }
=======
document.addEventListener('DOMContentLoaded', () => {
  // নরম ফেড-ইন
  document.body.style.opacity = 0;
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 800ms ease';
    document.body.style.opacity = 1;
  });
  function createSorry() {
  const s = document.createElement("div");
  s.className = "sorry";
  s.innerText = "Sorry 💖";
  s.style.left = Math.random() * window.innerWidth + "px";
  s.style.animationDuration = (3 + Math.random() * 4) + "s";
  const parent = document.getElementById("container") || document.body;
  parent.appendChild(s);

  // অ্যানিমেশন শেষ হলে remove করবে
  setTimeout(() => s.remove(), 7000);
}

// প্রতি ১ সেকেন্ডে নতুন "Sorry" ঝরবে
setInterval(createSorry, 1000);

  // ফ্লোটিং হার্ট/মুন/লাভ শেপ ব্যাকগ্রাউন্ডে জেনারেট
  const container = document.getElementById('floating-shapes');
  if (container) {
    const shapes = ['heart','moon','love'];
    const count = 18; // কতগুলো শেপ

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'f-shape';
      const type = shapes[i % shapes.length];

      // র‍্যান্ডম পজিশন, সাইজ, ডিউরেশন
      const size = Math.floor(20 + Math.random()*50);
      el.style.left = Math.floor(Math.random()*100) + 'vw';
      el.style.top = Math.floor(60 + Math.random()*60) + 'vh';
      el.style.setProperty('--dur', Math.floor(6000 + Math.random()*8000) + 'ms');

      // টাইপভেদে ড্র
      if (type === 'heart') {
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.background = 'linear-gradient(135deg,#ff7eb3,#ff1b6b)';
        el.style.transform = 'rotate(45deg)';
        el.style.borderRadius = '8px';
        // দুটি গোলাকার লব
        const b1 = document.createElement('div');
        const b2 = document.createElement('div');
        [b1,b2].forEach(b=>{
          b.style.position='absolute';
          b.style.width=size+'px'; b.style.height=size+'px';
          b.style.borderRadius='50%'; b.style.background='inherit';
          el.appendChild(b);
        });
        b1.style.top = (-size/2)+'px'; b1.style.left = '0px';
        b2.style.left = (-size/2)+'px'; b2.style.top = '0px';
      }
      else if (type === 'moon') {
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.borderRadius = '50%';
        el.style.background = '#c0c0ff';
        el.style.boxShadow = 'inset -8px -4px 20px #99aaff, 0 6px 20px rgba(0,0,0,.2)';
        // ক্রিসেন্ট ইফেক্ট
        const dark = document.createElement('div');
        dark.style.position='absolute';
        dark.style.width=size+'px'; dark.style.height=size+'px';
        dark.style.borderRadius='50%';
        dark.style.left = (-size*0.22)+'px';
        dark.style.top = (-size*0.04)+'px';
        dark.style.background = 'radial-gradient('+Math.floor(size*0.4)+'px '+Math.floor(size*0.4)+'px at 70% 60%, rgba(0,0,0,.25), transparent 60%)';
        el.appendChild(dark);
      }
      else { // love crystal-like
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.background = 'conic-gradient(from 30deg, #ff2e63, #ff7eb3, #ffc3a0, #ff2e63)';
        el.style.clipPath = 'polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)';
        el.style.filter = 'drop-shadow(0 6px 14px rgba(0,0,0,.25))';
      }

      container.appendChild(el);
    }
  }

  // কন্টাক্ট ফর্ম ডেমো
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      alert('ধন্যবাদ! এই ফর্মটি ডেমো—বার্তা পাঠাতে ব্যাকএন্ড লাগবে।');
    });
  }

  // --- Add non-intrusive overlay animation for "sorry piu" ---
  const showPiuOverlay = (() => {
    let shown = false;
    return (options = {}) => {
      if (shown) return;
      // Only show once per session
      if (sessionStorage.getItem('piu-overlay-shown')) return;
      shown = true;
      const text = options.text || 'sorry piu';
      const duration = options.duration || 3200; // overlay will remove after this

      const overlay = document.createElement('div');
      overlay.id = 'piu-overlay';
      overlay.className = 'piu-overlay';

      const msg = document.createElement('div');
      msg.className = 'piu-message';

      // build per-letter spans (preserve space as small gap)
      Array.from(text).forEach(ch => {
        const span = document.createElement('span');
        span.textContent = ch;
        if (ch === ' ') span.style.marginLeft = '8px';
        msg.appendChild(span);
      });

      overlay.appendChild(msg);
      overlay.setAttribute('aria-hidden','true');
      msg.setAttribute('role','status');
      msg.setAttribute('aria-live','polite');
      document.body.appendChild(overlay);
      // Block page scroll while overlay is visible
      document.documentElement.style.overflow = 'hidden';

      // click on text dismisses quickly (only the message is clickable)
      msg.addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.classList.add('fade-out');
        setTimeout(() => { overlay.remove(); }, 320);
      }, {passive: true});

      // auto-dismiss after duration
      setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 380);
      }, duration);

      sessionStorage.setItem('piu-overlay-shown', '1');
    };
  })();

  // show once on page load; you can also call showPiuOverlay elsewhere
  showPiuOverlay({ text: 'sorry piu', duration: 3200 });

  // --- Sorry rain effect (JS helper) ---
  const sorryRain = (() => {
    let active = false;
    const overlayId = 'sorry-rain-overlay';
    const variants = [ 'variant-1','variant-2','variant-3','variant-4' ];

    function start({ density = 16, speed = 2000, word = 'sorry' } = {}){
      if (active) return; active = true;
      const overlay = document.createElement('div');
      overlay.className = 'sorry-rain'; overlay.id = overlayId;
      // split screen into columns
      const width = window.innerWidth;
      const columns = Math.max(6, Math.round(density));
      for (let i = 0; i < columns; i++){
        const col = document.createElement('div');
        col.className = 'column';
        col.style.left = (i * (100 / columns)) + '%';
        // create several drops per column
        const dropsPerCol = Math.round((density / columns) * 2) + 1;
        for (let j = 0; j < dropsPerCol; j++){
          const drop = document.createElement('div');
          drop.className = 'drop ' + variants[Math.floor(Math.random()*variants.length)];
          const spacing = 1 + Math.floor(Math.random() * 2);
          // small letter-case variant: sometimes uppercase
          const txt = (Math.random()>.6 ? word.toUpperCase() : word);
          drop.textContent = txt;
          // randomize duration and delay
          drop.style.setProperty('--duration', (speed + Math.floor(Math.random()*600)) + 'ms');
          drop.style.left = (Math.random()*8 - 4) + 'vw';
          drop.style.top = '-' + Math.floor(Math.random()*80) + 'vh';
          drop.style.fontSize = (14 + Math.floor(Math.random()*34)) + 'px';
          drop.style.opacity = (0.7 + Math.random()*0.3);
          col.appendChild(drop);
        }
        overlay.appendChild(col);
      }
      document.body.appendChild(overlay);
      // Clean up: remove overlay after animation length approx speed+2000
      const removeDelay = Math.max(1000, speed * 2 + 1200);
      setTimeout(()=>{ overlay.classList.add('fade-out'); setTimeout(()=> overlay.remove(), 500); active=false; }, removeDelay);
    }
    function stop(){
      const overlay = document.getElementById(overlayId);
      if (overlay){ overlay.classList.add('fade-out'); setTimeout(()=>overlay.remove(), 420); active=false }
    }
    return { start, stop };
  })();

  // expose to window for console testing
  window.sorryRain = sorryRain;

  // --- Add SORRY flowers/leave fall animation ---
  const showSorryFlowers = (() => {
    let shown = false; // block concurrent runs
    const overlayId = 'sf-overlay';
    const variants = ['variant-1','variant-2','variant-3','variant-4'];
    return (opts = {}) => {
      if (shown) return; // single run at a time
      const count = opts.count || 18;
      const word = (opts.word || 'SORRY').toUpperCase();
      const duration = opts.duration || 5600;
      shown = true;
      // create overlay
      const overlay = document.createElement('div'); overlay.className = 'sf-overlay'; overlay.id = overlayId;
      const inner = document.createElement('div'); inner.className = 'sf-inner'; overlay.appendChild(inner);
      // build word with per-letter spans
      const wordEl = document.createElement('div'); wordEl.className = 'sf-word';
      Array.from(word).forEach(ch => {
        const s = document.createElement('span'); s.className = 'sf-letter';
        s.textContent = ch; wordEl.appendChild(s);
      });
      inner.appendChild(wordEl);
      document.body.appendChild(overlay);

      // Generate falling flowers/leaves
      const spawn = () => {
        for (let i=0;i<count;i++){
          const el = document.createElement('div');
          el.className = 'sf-flower ' + variants[Math.floor(Math.random()*variants.length)];
          el.textContent = Math.random()>.6 ? '❀' : '🍃';
          // random left position in viewport
          el.style.left = Math.floor(Math.random()*100) + 'vw';
          // random size
          el.style.fontSize = (12 + Math.floor(Math.random()*38)) + 'px';
          // random duration
          const ranDur = Math.floor(duration + Math.random()*2000);
          el.style.setProperty('--sf-duration', ranDur + 'ms');
          // stagger start
          el.style.animationDelay = Math.floor(Math.random()*700) + 'ms';
          document.body.appendChild(el);
        }
      };
      spawn();

      // Fade out overlay and clean elements after some time
      setTimeout(()=>{
        overlay.classList.add('fade-out');
        // remove flower elements
        document.querySelectorAll('.sf-flower').forEach(f=> f.remove());
        setTimeout(()=>{ overlay.remove(); shown=false; }, 520);
      }, duration + 800);
      
      // clicking the inner overlay removes it faster (overlay itself has pointer-events:none)
      inner.addEventListener('click', ()=>{
        overlay.classList.add('fade-out'); document.querySelectorAll('.sf-flower').forEach(f=> f.remove()); setTimeout(()=>{ overlay.remove(); shown=false; }, 420);
      }, {passive:true});
    };
  })();

  // Expose for console
  window.showSorryFlowers = showSorryFlowers;

  // --- Floating SORRY words like floating shapes (f-shape) ---
  const spawnFloatingSorry = (( ) => {
    const container = document.getElementById('floating-shapes');
    return (count = 6, opts = {}) => {
      if (!container) return;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'f-sorry';
        // small/medium/large class
        const sizeClass = ['small','medium','large'][Math.floor(Math.random()*3)];
        el.classList.add(sizeClass);
        // set occasional gradient
        if (Math.random() > 0.6) el.classList.add('gradient'); else el.classList.add('subtle');
        el.textContent = opts.word || 'SORRY';
        // random position and duration
        el.style.left = Math.floor(Math.random()*100) + 'vw';
        el.style.top = Math.floor(60 + Math.random()*60) + 'vh'; // start near bottom like other shapes
        el.style.setProperty('--dur', (8000 + Math.floor(Math.random()*9000)) + 'ms');
        container.appendChild(el);
        // cleanup after animation finishes
        const dur = parseInt(el.style.getPropertyValue('--dur')) || 9000;
        setTimeout(()=>{ el.remove(); }, dur+400);
      }
    };
  })();

  // expose on window
  window.spawnFloatingSorry = spawnFloatingSorry;

  // --- Continuous Sorry rain control ---
  const continuous = (()=>{
    let intervalId = null;
    let overlay = null;
    function createOverlay(){
      overlay = document.getElementById('continuous-sorry-overlay');
      if (!overlay){
        overlay = document.createElement('div'); overlay.id = 'continuous-sorry-overlay'; overlay.className='sorry-rain';
        document.body.appendChild(overlay);
      }
      return overlay;
    }
    function start({ rate = 600, density = 1, word = 'sorry', speed = 2200 } = {}){
      if (intervalId) return; // already running
      const ol = createOverlay();
      intervalId = setInterval(()=>{
        // spawn N drops based on density
        for (let i=0;i<density;i++){
          const drop = document.createElement('div');
          drop.className = 'drop variant-' + (1 + Math.floor(Math.random()*4));
          // set the content as the word (some uppercase/lowercase mixing)
          drop.textContent = Math.random() > .6 ? word.toUpperCase() : word;
          const left = Math.floor(Math.random()*100) + 'vw';
          drop.style.left = left; // random position
          drop.style.fontSize = (12 + Math.floor(Math.random()*28)) + 'px';
          drop.style.opacity = (0.7 + Math.random()*0.3);
          const dur = Math.max(600, speed + Math.floor(Math.random()*1200));
          drop.style.setProperty('--duration', dur+'ms');
          drop.style.animationDuration = dur + 'ms';
          // Optional tilt
          drop.style.transform = 'rotate(' + (Math.floor(Math.random()*40)-20) + 'deg)';
          ol.appendChild(drop);
          // remove when animation ends
          drop.addEventListener('animationend', ()=> drop.remove(), { once: true });
        }
      }, rate);
    }
    function stop(){
      if (!intervalId) return;
      clearInterval(intervalId); intervalId=null;
      const ol = document.getElementById('continuous-sorry-overlay');
      if (ol){ ol.classList.add('fade-out'); setTimeout(()=> ol.remove(), 420); }
    }
    function running(){ return !!intervalId }
    return { start, stop, running };
  })();

  // Create a small toggle button in the UI to start/stop the continuous rain
  const toggleEl = document.createElement('button');
  toggleEl.className = 'sorry-toggle';
  toggleEl.innerText = 'Sorry Rain';
  toggleEl.title = 'Toggle continuous Sorry rain';
  toggleEl.setAttribute('aria-pressed','false');
  document.body.appendChild(toggleEl);
  toggleEl.addEventListener('click', ()=>{
    if (continuous.running()){
      continuous.stop(); toggleEl.classList.remove('active'); toggleEl.setAttribute('aria-pressed','false');
    } else {
      continuous.start({ rate: 480, density: 1, word: 'sorry', speed: 3200 }); toggleEl.classList.add('active'); toggleEl.setAttribute('aria-pressed','true');
    }
  }, { passive: true });

  // expose control for console
  window.startSorryRain = (...args) => continuous.start(...args);
  window.stopSorryRain = () => continuous.stop();

  // Add a binding to the heart CTA in the index if present: click heart to trigger the animation
  const heartCTAs = document.querySelectorAll('.cta-group .btn.heart');
  heartCTAs.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Trigger animation immediately, do not prevent navigation — remove delay.
        // Avoid preventDefault so the browser navigates immediately; animation will run briefly before unload.
        showSorryFlowers({ count: 24, duration: 5200, word: 'SORRY' });
        // also spawn floating SORRY elements
        spawnFloatingSorry(6, { word: 'SORRY' });
        // don't block navigation: let the link act normally
      }, {passive:true});
  });

  // Convert `.sorry-inline` into per-letter spans and animate on hover or on load
  const initInlineSorry = () => {
    const sin = document.querySelector('.sorry-inline');
    if (!sin) return;
    const txt = sin.textContent.trim();
    sin.innerHTML = '';
    Array.from(txt).forEach(ch => {
      const sp = document.createElement('span');
      sp.className = 'sf-letter';
      sp.textContent = ch;
      sin.appendChild(sp);
    });
    // run initial pop animation once on load
    setTimeout(()=>{
      sin.querySelectorAll('.sf-letter').forEach((s, i)=>{
        setTimeout(()=> s.classList.add('pop'), i*80);
      });
    }, 420);
    // add hover to replay the effect
    sin.addEventListener('mouseenter', () => {
      sin.querySelectorAll('.sf-letter').forEach((s, i)=>{
        s.classList.remove('pop');
        setTimeout(()=> s.classList.add('pop'), 40 + i * 60);
      });
    }, {passive:true});
  };
  initInlineSorry();

  // --- Show apology overlay on open (or when arriving from an external referrer) ---
  // How it works:
  //  - Checks document.referrer and compares origin to current origin.
  //  - If it is from another origin and overlay hasn't been shown this session, it displays an overlay
  //    and attempts to autoplay a BGM located at `p/sorry-bgm.mp3`.
  //  - Autoplay may be blocked by the browser; a "Play audio" button appears in that case to let
  //    the visitor start the sound manually.
  //  - To disable temporarily for testing add `?no-overlay=1` to the query string.
  (function() {
    try {
      // ---------- Internationalization (I18n) for overlay text ----------
      // You can edit the strings below for your language.
      // The overlay will attempt to auto-detect the current language using:
      //  1) document.documentElement.lang (recommended for pages set with <html lang="bn">),
      //  2) navigator.language (browser preference). If not found, default to English.
      const i18n = {
        en: {
          title: 'Sorry — please forgive me this time',
          message: 'Please accept this message and a small background track while you enter the site.',
          ok: 'OK',
          aria: 'Apology message'
        },
        bn: {
          title: 'SORRYY....FORGIVE ME THIS TIME',
          message: 'যদি রাগ না করে থাক তাহলে ok চাপ দাও ।',
          ok: 'OK',
          aria: 'ক্ষমা-বার্তা'
        }
        // Add more language keys as needed, e.g., 'fr', 'es', 'hi'
      };

      // prefer <html lang="xx"> if available, otherwise fall back to browser locale
      const detectLocale = () => {
        const langAttr = (document.documentElement && document.documentElement.lang) || '';
        if (langAttr) return langAttr.split('-')[0];
        const nav = (navigator.language || navigator.userLanguage || 'en');
        return nav.split('-')[0];
      };
      const lang = (new URLSearchParams(location.search).get('lang') || detectLocale() || 'en').toLowerCase();
      const strings = i18n[lang] || i18n[lang.split('-')[0]] || i18n['en'];
      // Provide a simple HTML override via data attributes on body if needed.
      // Example: <body data-apology-title="..." data-apology-message="..." data-apology-ok="..."> 
      const body = document.body || {};
      const overrideTitle = body.getAttribute && body.getAttribute('data-apology-title');
      const overrideMsg = body.getAttribute && body.getAttribute('data-apology-message');
      const overrideOk = body.getAttribute && body.getAttribute('data-apology-ok');
      if (overrideTitle) strings.title = overrideTitle;
      if (overrideMsg) strings.message = overrideMsg;
      if (overrideOk) strings.ok = overrideOk;
      // Set to true to make the apology popup appear on every page open
      const ALWAYS_SHOW_ON_OPEN = false; // default: do not show on every page open
      // Show only on index/home page (recommended by user)
      const SHOW_ONLY_ON_INDEX = true;
      // Show only once ever for a user (persist across sessions) using localStorage
      const SHOW_ONLY_FIRST_TIME_EVER = true;
      const ref = document.referrer || '';
      if (!ALWAYS_SHOW_ON_OPEN && !ref && !SHOW_ONLY_ON_INDEX) return; // when not forcing and no referrer and not index-only
      // allow developers to disable for testing using ?no-overlay=1
      if (location.search.indexOf('no-overlay=1') !== -1) return;
      if (!ALWAYS_SHOW_ON_OPEN && !SHOW_ONLY_ON_INDEX) {
        const refOrigin = new URL(ref).origin;
        if (refOrigin === location.origin) return; // internal navigation — ignore
      }
      // if only index page requested, ensure we are on index
      const isIndexPage = (() => {
        try {
          // Prefer a body class check (index typically has page-home), fallback to path checks
          if (document.body && document.body.classList && document.body.classList.contains('page-home')) return true;
          const p = (location.pathname || '').toLowerCase();
          if (p === '/' || p === '') return true;
          if (p.endsWith('/index.html') || p.endsWith('/index.htm')) return true;
          return false;
        } catch (e) { return false }
      })();
      if (SHOW_ONLY_ON_INDEX && !isIndexPage) return;
      // show only once per session or once ever, depending on flags
      const SHOW_ONLY_ONCE_PER_SESSION = false; // set to true to keep it to once per session
      if (SHOW_ONLY_ONCE_PER_SESSION && sessionStorage.getItem('apology-shown')) return;
      if (SHOW_ONLY_FIRST_TIME_EVER && localStorage.getItem('apology-first-shown')) return;

      // show the overlay (developer: place a file at `p/sorry-bgm.mp3` or change audio.src)
      const overlay = document.createElement('div');
      overlay.className = 'external-ref-overlay';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');
      overlay.setAttribute('aria-label', strings.aria || 'Apology message');
      overlay.innerHTML = `
        <div class="extern-inner glass">
          <div class="extern-content">
            <h2>${strings.title}</h2>
            <p>${strings.message}</p>
            <div class="extern-controls">
              <button class="btn ok-extern">${strings.ok}</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // create audio element (developer should place p/sorry-bgm.mp3 or change URL)
      const audio = document.createElement('audio');
      audio.id = 'sorry-bgm';
      audio.src = 'p/sorry-bgm.mp3';
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.6;
      overlay.appendChild(audio);

      const okBtn = overlay.querySelector('.ok-extern');

      const tryPlay = () => {
        const promise = audio.play();
        if (promise !== undefined) {
          promise.then(()=>{
            // playing
            // playing - UI does not include play control
          }).catch(()=>{
            // autoplay blocked — show play button
            // autoplay blocked - we don't show a separate play button
          });
        }
      };

      // attempt to play immediately; for a navigation-initiated click this may succeed
      tryPlay();

      // no audio button: audio can be started by OK button or tryPlay on load

      // OK button: user gesture — start audio if not started and close overlay
      okBtn.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        // attempt to play audio (user gesture prevents autoplay block)
        try {
          const p = audio.play();
          if (p !== undefined) {
            p.then(()=> { /* ok played */ }).catch(()=> { /* may fail */ });
          }
        } catch(err) { /* ignore */ }
        if (SHOW_ONLY_ONCE_PER_SESSION) sessionStorage.setItem('apology-shown','1');
        if (SHOW_ONLY_FIRST_TIME_EVER) localStorage.setItem('apology-first-shown','1');
        // remove overlay
        overlay.classList.add('fade-out'); setTimeout(()=> { overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
      }, {passive:true});

      function closeOverlay(){
        try{ audio.pause(); }catch(e){}
        overlay.classList.add('fade-out');
        setTimeout(()=> { overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
        if (SHOW_ONLY_ONCE_PER_SESSION) sessionStorage.setItem('apology-shown','1');
        if (SHOW_ONLY_FIRST_TIME_EVER) localStorage.setItem('apology-first-shown','1');
      }
      // Legacy close (if some code leaves a close button); keep behavior but prefer OK
      const closeBtn = overlay.querySelector('.close-extern');
      if (closeBtn) closeBtn.addEventListener('click', closeOverlay, {passive:true});
      // Focus OK for accessibility
      if (okBtn) okBtn.focus();
      overlay.addEventListener('click', (e)=>{ if (e.target === overlay) closeOverlay(); });
      // dismiss on Esc
      document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && document.body.contains(overlay)) closeOverlay(); });
    } catch (e) { /* ignore */ }
  })();
});

/* ------------------------------------------------------------------
   Video gallery initializer
   Usage: window.initVideoGallery([ 'p/v1.mp4', 'p/v2.mp4' ])
   This builds a lightweight responsive gallery and an accessible modal.
-------------------------------------------------------------------*/
window.initVideoGallery = function(videoFiles){
  const galleryEl = document.getElementById('video-gallery');
  if (!galleryEl) return;

  // helper to make a friendly title from filename
  const toTitle = (fn) => {
    const base = fn.split('/').pop();
    return base.replace(/\.[^.]+$/, '').replace(/[_\-]/g, ' ').trim();
  };

  // helper to read video item (string or object)
  const readItem = (item) => {
    if (typeof item === 'string') return { path: item, title: toTitle(item), desc: toTitle(item) };
    if (typeof item === 'object' && item !== null) return { path: item.path, title: item.title || toTitle(item.path), desc: item.desc || (item.title || toTitle(item.path)) };
    return null;
  };

  // build modal
  const modal = document.createElement('div'); modal.className = 'video-modal'; modal.id = 'video-modal';
  modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); modal.setAttribute('aria-hidden','true');
  modal.innerHTML = `<div class="inner">
      <video controls playsinline id="modal-video"></video>
      <div class="controls">
        <button class="btn close" aria-label="Close video">Close</button>
        <a class="btn" id="open-new" target="_blank" rel="noopener noreferrer">Open in new tab</a>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const modalVideo = modal.querySelector('#modal-video');
  const openNewLink = modal.querySelector('#open-new');
  const closeBtn = modal.querySelector('.close');

  function openModal(src){
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    modalVideo.src = src; modalVideo.currentTime = 0; modalVideo.muted = false; modalVideo.play().catch(()=>{});
    openNewLink.href = src; // update link
    // lock scroll lightly
    document.documentElement.style.overflow = 'hidden';
    // move focus to modal
    closeBtn.focus();
  }
  function closeModal(){
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    try{ modalVideo.pause(); }catch(e){}
    modalVideo.removeAttribute('src'); modalVideo.load();
    document.documentElement.style.overflow = '';
  }

  // Close on overlay click and close btn
  modal.addEventListener('click', (e)=>{ if (e.target === modal) closeModal(); });
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  // Build gallery items
  videoFiles.forEach((it, idx)=>{
    const d = readItem(it);
    if (!d) return;
    const path = d.path;
    const title = d.title;
    const desc = d.desc;
    const card = document.createElement('article'); card.className = 'video-card glass';
    // Mark first item as featured
    const featured = (idx === 0);
    if (featured) card.classList.add('featured');
    card.innerHTML = `<video preload="metadata" ${featured ? 'autoplay muted loop playsinline' : 'muted playsinline'}><source src="${path}" type="video/mp4">Your browser does not support the video tag.</video>
      <div class="meta"><h3>${title}</h3><p>${desc}</p></div>
      <div class="actions"><button class="btn play">Play</button><a class="btn" download href="${path}">Download</a></div>
      ${featured ? '<button class="big-play" aria-label="Play featured video">▶</button><div class="romantic-accents"><div class="heart"></div></div>' : ''}`;
    galleryEl.appendChild(card);

    const playBtn = card.querySelector('.play');
    const preview = card.querySelector('video');
    const bigPlay = card.querySelector('.big-play');
    // Adjust styling based on intrinsic video orientation/resolution after metadata loads
    preview.addEventListener('loadedmetadata', () => {
      try {
        const w = preview.videoWidth || 16;
        const h = preview.videoHeight || 9;
        const ratio = w / h;
        if (ratio < 1) { // portrait video
          preview.classList.add('portrait');
        } else {
          preview.classList.remove('portrait');
        }
      } catch(e) { /* ignore failures */ }
    });
    // clicking the small video opens in modal
    preview.addEventListener('click', ()=> openModal(path));
    playBtn.addEventListener('click', ()=> openModal(path));
    if (bigPlay) bigPlay.addEventListener('click', ()=> openModal(path));
    // pause preview on mouse leave
    preview.addEventListener('mouseenter', ()=> preview.play());
    preview.addEventListener('mouseleave', ()=> { try{ preview.pause(); }catch(e){} });
  });

  // if screen reader or no videos exists show a message
  if (videoFiles.length === 0){ galleryEl.innerHTML = '<p>No videos found. Place MP4 files into the `p/` folder.</p>'; }
};

// --- Gallery page: autoplay/loop the hero video and try to start with sound ---
(() => {
  try {
    const isGallery = document.body && document.body.classList && document.body.classList.contains('page-gallery');
    if (!isGallery) return;
    const vid = document.getElementById('gallery-hero-video');
    if (!vid) return;
    vid.loop = true;

    // If the user previously allowed sound, unmute and play
    const allowed = localStorage.getItem('gallery-sound-enabled');
    if (allowed === '1') {
      vid.muted = false;
      vid.play().catch(()=>{});
      return;
    }

    // Try to play with sound first
    vid.muted = false;
    const promise = vid.play();
    if (promise !== undefined) {
      promise.then(() => {
        // success
      }).catch(() => {
        // autoplay with sound blocked — fallback to muted autoplay
        vid.muted = true;
        vid.play().catch(()=>{});

        // Show a small overlay to ask the user to enable sound (one time)
        if (!localStorage.getItem('gallery-sound-overlay-shown')) {
          const overlay = document.createElement('div');
          overlay.className = 'sound-enable-overlay';
          overlay.setAttribute('role', 'dialog');
          overlay.innerHTML = `<div class="sound-inner glass"><p>সাউন্ড চালু করতে "সাউন্ড চালু" চাপুন</p><div class="sound-controls"><button class="btn sound-enable">সাউন্ড চালু</button><button class="btn sound-close">বাতিল</button></div></div>`;
          document.body.appendChild(overlay);
          // block scroll lightly
          document.documentElement.style.overflow = 'hidden';

          const enableBtn = overlay.querySelector('.sound-enable');
          const closeBtn = overlay.querySelector('.sound-close');
          enableBtn && enableBtn.addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation();
            vid.muted = false;
            vid.play().catch(()=>{});
            localStorage.setItem('gallery-sound-enabled','1');
            overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360);
          }, {passive:true});
          closeBtn && closeBtn.addEventListener('click', (e) => { overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360); }, {passive:true});
          overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.classList.add('fade-out'); setTimeout(()=>{ overlay.remove(); document.documentElement.style.overflow = ''; }, 360); } });
          localStorage.setItem('gallery-sound-overlay-shown','1');
        }
      });
    }
  } catch (e) { /* ignore */ }
>>>>>>> 84b0020578e868ef4c6009ef4621b8072c807f97
})();