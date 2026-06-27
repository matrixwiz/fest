/**
 * Festival Greetings — Main App
 * Pure vanilla JS, no dependencies, no backend.
 */
(function () {
  'use strict';

  const BASE_URL = window.location.origin + window.location.pathname;
  let currentFestival = 'diwali';

  // ─── DOM refs ───────────────────────────────────────────────────────────────
  const $  = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const senderView    = $('sender-view');
  const receiverView  = $('receiver-view');
  const senderInput   = $('sender-name');
  const generateBtn   = $('generate-btn');
  const linkBox       = $('link-box');
  const generatedLink = $('generated-link');
  const copyBtn       = $('copy-btn');
  const copyStatus    = $('copy-status');
  const nativeShare   = $('native-share');
  const darkToggle    = $('dark-toggle');
  const iconSun       = $('icon-sun');
  const iconMoon      = $('icon-moon');
  const createOwnBtn  = $('create-own-btn');

  // ─── Festival Picker ────────────────────────────────────────────────────────
  $$('.fpick').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.fpick').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentFestival = btn.dataset.festival;
      applyFestivalTheme(currentFestival);
    });
  });

  function applyFestivalTheme(key) {
    const f = FESTIVALS[key];
    if (!f) return;

    document.body.className = f.theme + (document.body.dataset.mode === 'dark' ? ' dark' : '');
    document.body.dataset.festival = key;

    setText('festival-icon', f.emoji);
    setText('festival-name', f.name + ' Greetings');
    setText('festival-tagline', f.tagline);

    // Update meta
    document.title = `${f.name} Greetings – Send ${f.name} Wishes`;
    setMeta('meta-desc', `Send beautiful ${f.name} wishes to your friends and family. Generate a personalized link instantly.`);
    setOG(f, null);
  }

  function setText(id, val) { const el = $(id); if (el) el.textContent = val; }
  function setMeta(id, val) { const el = $(id); if (el) el.setAttribute('content', val); }

  function setOG(f, senderName) {
    const title = senderName
      ? `${senderName} has sent you ${f.name} wishes! 🎉`
      : `Send ${f.name} Greetings to your loved ones`;
    const desc = senderName
      ? `Open this link to receive special ${f.name} blessings from ${senderName}. ${f.quote}`
      : `Generate a personalized ${f.name} greeting link and share it with family and friends.`;

    setMeta('og-title',  title);
    setMeta('og-desc',   desc);
    setMeta('tw-title',  title);
    setMeta('tw-desc',   desc);
    if ($('og-url'))  $('og-url').setAttribute('content', window.location.href);
  }

  // ─── URL Param Reader ───────────────────────────────────────────────────────
  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      name:     (p.get('name')     || '').trim().substring(0, 50),
      festival: (p.get('festival') || 'diwali').toLowerCase()
    };
  }

  // ─── Generate Link ──────────────────────────────────────────────────────────
  generateBtn.addEventListener('click', () => {
    const name = senderInput.value.trim();
    if (!name) {
      senderInput.focus();
      senderInput.classList.add('shake');
      setTimeout(() => senderInput.classList.remove('shake'), 500);
      return;
    }

    const url = `${BASE_URL}?name=${encodeURIComponent(name)}&festival=${currentFestival}`;
    generatedLink.value = url;
    linkBox.classList.remove('hidden');
    linkBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    populateShareLinks(name, url);
    updateShareButtons(name, url, 'share');

    // Update OG meta dynamically for the sender's preview
    const f = FESTIVALS[currentFestival];
    setOG(f, name);
  });

  senderInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') generateBtn.click();
  });

  // ─── Share Links ─────────────────────────────────────────────────────────────
  function updateShareButtons(name, url, prefix) {
    const f = FESTIVALS[currentFestival];
    const msg = `${name} has sent you special ${f.name} wishes! Open here: ${url}`;
    const enc = encodeURIComponent;

    setHref(prefix === 'share' ? 'wa-share' : 'recv-wa',
      `https://wa.me/?text=${enc(msg)}`);
    setHref(prefix === 'share' ? 'fb-share' : 'recv-fb',
      `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`);
    setHref(prefix === 'share' ? 'tg-share' : 'recv-tg',
      `https://t.me/share/url?url=${enc(url)}&text=${enc(msg)}`);
    if ($('tw-share'))
      setHref('tw-share', `https://twitter.com/intent/tweet?text=${enc(msg)}`);
  }

  function populateShareLinks(name, url) {
    const f = FESTIVALS[currentFestival];
    const msg = `${name} has sent you special ${f.name} wishes! Open here: ${url}`;
    const enc = encodeURIComponent;

    setHref('wa-share', `https://wa.me/?text=${enc(msg)}`);
    setHref('fb-share', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`);
    setHref('tg-share', `https://t.me/share/url?url=${enc(url)}&text=${enc(msg)}`);
    setHref('tw-share', `https://twitter.com/intent/tweet?text=${enc(msg)}`);
  }

  function setHref(id, href) { const el = $(id); if (el) el.href = href; }

  // ─── Copy Link ───────────────────────────────────────────────────────────────
  copyBtn.addEventListener('click', async () => {
    const text = generatedLink.value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showCopyStatus('✅ Link copied!');
    } catch {
      generatedLink.select();
      document.execCommand('copy');
      showCopyStatus('✅ Link copied!');
    }
  });

  function showCopyStatus(msg) {
    copyStatus.textContent = msg;
    setTimeout(() => { copyStatus.textContent = ''; }, 2500);
  }

  // ─── Native Share ─────────────────────────────────────────────────────────
  if (navigator.share) {
    nativeShare.classList.remove('hidden');
    nativeShare.addEventListener('click', async () => {
      const url = generatedLink.value;
      const name = senderInput.value.trim();
      const f = FESTIVALS[currentFestival];
      try {
        await navigator.share({
          title: `${f.name} Greetings from ${name}`,
          text: `${name} has sent you special ${f.name} wishes! 🎉`,
          url
        });
      } catch { /* cancelled */ }
    });
  }

  // ─── Receiver View ──────────────────────────────────────────────────────────
  function showReceiverView(name, festivalKey) {
    const f = FESTIVALS[festivalKey] || FESTIVALS.diwali;
    currentFestival = festivalKey;

    // Theme
    document.body.className = f.theme + (isDark() ? ' dark' : '');

    // Content
    setText('recv-icon', f.emoji);
    const headline = `${sanitize(name)} has sent you ${f.name} Wishes! ${f.emoji}`;
    setText('wish-headline', headline);
    setText('wish-sub', f.tagline);

    const quote = $('wish-quote');
    if (quote) {
      const wish = f.wishes[Math.floor(Math.random() * f.wishes.length)];
      quote.textContent = `"${wish}"`;
    }

    // Update page title and meta for SEO when shared
    document.title = `${sanitize(name)} has sent you ${f.name} Wishes! ${f.emoji}`;
    setOG(f, name);

    // Show receiver, hide sender
    senderView.classList.remove('active');
    senderView.classList.add('hidden');
    receiverView.classList.remove('hidden');
    receiverView.classList.add('active');

    // Share buttons on receiver side
    const shareUrl = window.location.href;
    const msg = `${sanitize(name)} has sent you special ${f.name} wishes! Open here: ${shareUrl}`;
    const enc = encodeURIComponent;
    setHref('recv-wa', `https://wa.me/?text=${enc(msg)}`);
    setHref('recv-fb', `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`);
    setHref('recv-tg', `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(msg)}`);

    // Particles
    setTimeout(() => {
      ConfettiEngine.init(f.confettiColors);
      buildParticleBg(f.particles);
    }, 300);
  }

  // Back to sender
  createOwnBtn.addEventListener('click', () => {
    receiverView.classList.add('hidden');
    receiverView.classList.remove('active');
    senderView.classList.remove('hidden');
    senderView.classList.add('active');
    history.pushState({}, '', window.location.pathname);
  });

  // ─── Floating Particles ──────────────────────────────────────────────────────
  function buildParticleBg(emoji) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bg = $('particle-bg');
    if (!bg) return;
    bg.innerHTML = '';
    const count = window.innerWidth < 480 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = emoji;
      s.className = 'particle';
      s.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        font-size:${1 + Math.random() * 1.5}rem;
        animation-delay:${Math.random() * 4}s;
        animation-duration:${4 + Math.random() * 4}s;
        opacity:${0.3 + Math.random() * 0.5};
      `;
      bg.appendChild(s);
    }
  }

  // ─── Dark Mode ──────────────────────────────────────────────────────────────
  function isDark() { return document.body.dataset.mode === 'dark'; }

  function setDark(on) {
    document.body.dataset.mode = on ? 'dark' : 'light';
    const f = FESTIVALS[currentFestival];
    document.body.className = f.theme + (on ? ' dark' : '');
    iconSun.style.display  = on ? 'none'  : '';
    iconMoon.style.display = on ? ''      : 'none';
    try { localStorage.setItem('fg_dark', on ? '1' : '0'); } catch {}
  }

  darkToggle.addEventListener('click', () => setDark(!isDark()));

  // Restore preference
  try {
    const pref = localStorage.getItem('fg_dark');
    if (pref === '1' || (pref === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
    }
  } catch {}

  // ─── Sanitize ───────────────────────────────────────────────────────────────
  function sanitize(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ─── Init ────────────────────────────────────────────────────────────────────
  function init() {
    const { name, festival } = getParams();

    if (name) {
      // Receiver mode
      const key = FESTIVALS[festival] ? festival : 'diwali';
      showReceiverView(name, key);
    } else {
      // Sender mode
      applyFestivalTheme(currentFestival);
    }
  }

  // Run after DOM ready (script is at bottom so already is)
  init();

})();
