
(() => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  const header = $('#site-header');
  const toast = $('#toast');

  // Sticky header shading
  const onScroll = () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  // Smooth anchors with header offset
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const headerRect = header.getBoundingClientRect();
      const headerH = headerRect.height;
      const y = target.getBoundingClientRect().top + window.scrollY - (headerH + 10);
      window.scrollTo({top: y, behavior: 'smooth'});
      target.setAttribute('tabindex', '-1');
      target.focus({preventScroll:true});
      setTimeout(() => target.removeAttribute('tabindex'), 1000);
    });
  });

  // Utility: toast
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // Pitch Deck availability check (try root and assets/ path)
  async function checkFirstAvailable(urls) {
    for (const u of urls) {
      try {
        const r = await fetch(u, { method: 'HEAD' });
        if (r.ok) return u;
      } catch {}
    }
    return null;
  }

  $$('.js-deck').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const candidates = [
        btn.dataset.deck || 'GuardPilot_PitchDeck.pdf',
        'assets/GuardPilot_PitchDeck.pdf'
      ];
      const found = await checkFirstAvailable(candidates);
      if (found) {
        window.open(found, '_blank', 'noopener');
      } else {
        showToast('File temporarily unavailable. Please contact us via Telegram or Email.');
      }
    });
  });

  // Hero video: load only if available and user doesn't prefer reduced motion
  (async function setupHeroVideo(){
    const video = $('#hero-video');
    if (!video) return;

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const videoPath = 'assets/video/hero.mp4';

    if (prefersReduce) {
      // Do not attach source; poster remains visible
      return;
    }
    try {
      const r = await fetch(videoPath, { method: 'HEAD' });
      if (r.ok) {
        const source = document.createElement('source');
        source.src = videoPath;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.play().catch(()=>{});
      }
    } catch {}
  })();

  // Contact form
  const form = $('#contact-form');
  const status = $('#form-status');
  const consent = $('#consent');
  const submitBtn = $('#submitBtn');

  const setStatus = (msg, type='info') => {
    status.textContent = msg;
    status.dataset.type = type;
  };

  function validate() {
    let valid = true;
    const email = $('#email');
    const message = $('#message');
    const emailValid = !!email.value && email.checkValidity();
    const messageValid = !!message.value && message.value.trim().length > 3;
    const consentValid = consent.checked;

    email.setAttribute('aria-invalid', String(!emailValid));
    message.setAttribute('aria-invalid', String(!messageValid));

    valid = emailValid && messageValid && consentValid;
    submitBtn.disabled = !valid;
    return valid;
  }

  ['input','change','blur','keyup'].forEach(ev => form.addEventListener(ev, validate));
  validate();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) { setStatus('Проверьте поля формы', 'error'); return; }

    const formData = new FormData(form);
    const payload = {
      email: formData.get('email'),
      name: formData.get('name'),
      message: formData.get('message')
    };

    if (window.emailjs && typeof window.emailjs.send === 'function') {
      setStatus('Отправляем...', 'info');
      try {
        await window.emailjs.send('service_id', 'template_id', payload, 'public_key');
        setStatus('Спасибо! Сообщение отправлено.', 'success');
        form.reset(); validate();
      } catch (err) {
        setStatus('Не удалось отправить через EmailJS. Откройте почтовый клиент...', 'error');
        const mailto = `mailto:2025pilot.guard@gmail.com?subject=${encodeURIComponent('AegisAI Inquiry')}&body=${encodeURIComponent(`Email: ${payload.email}\nName: ${payload.name || ''}\n\n${payload.message}`)}`;
        window.location.href = mailto;
      }
      return;
    }

    // Fallback: mailto
    const mailto = `mailto:2025pilot.guard@gmail.com?subject=${encodeURIComponent('AegisAI Inquiry')}&body=${encodeURIComponent(`Email: ${payload.email}\nName: ${payload.name || ''}\n\n${payload.message}`)}`;
    window.location.href = mailto;
    setStatus('Открываем ваш почтовый клиент...', 'info');
  });

  // Privacy dialog
  const dialog = $('#privacyDialog');
  $$('[data-open-privacy]').forEach(btn => btn.addEventListener('click', () => dialog.showModal()));
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      dialog.close('dismiss');
    }
  });

  // Current year
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
