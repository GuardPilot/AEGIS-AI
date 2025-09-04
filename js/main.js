
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

  // Toast
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }

  // Pitch Deck availability check
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
      const candidates = [btn.dataset.deck || 'GuardPilot_PitchDeck.pdf', 'assets/GuardPilot_PitchDeck.pdf'];
      const found = await checkFirstAvailable(candidates);
      if (found) window.open(found, '_blank', 'noopener');
      else showToast(t('deck.unavailable'));
    });
  });

  // Hero video, respects prefers-reduced-motion
  (async function setupHeroVideo(){
    const video = $('#hero-video');
    if (!video) return;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const videoPath = 'assets/video/hero.mp4';
    if (prefersReduce) return;
    try {
      const r = await fetch(videoPath, { method: 'HEAD' });
      if (r.ok) {
        const source = document.createElement('source');
        source.src = videoPath; source.type = 'video/mp4';
        video.appendChild(source); video.play().catch(()=>{});
      }
    } catch {}
  })();

  // Contact form
  const form = $('#contact-form');
  const status = $('#form-status');
  const consent = $('#consent');
  const submitBtn = $('#submitBtn');

  const setStatus = (msg, type='info') => { status.textContent = msg; status.dataset.type = type; };

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
    if (!validate()) { setStatus(t('form.check'), 'error'); return; }

    const formData = new FormData(form);
    const payload = { email: formData.get('email'), name: formData.get('name'), message: formData.get('message') };

    if (window.emailjs && typeof window.emailjs.send === 'function') {
      setStatus(t('form.sending'), 'info');
      try {
        await window.emailjs.send('service_id', 'template_id', payload, 'public_key');
        setStatus(t('form.success'), 'success');
        form.reset(); validate();
      } catch (err) {
        setStatus(t('form.error'), 'error');
        const mailto = `mailto:2025pilot.guard@gmail.com?subject=${encodeURIComponent('AegisAI Inquiry')}&body=${encodeURIComponent(`Email: ${payload.email}\nName: ${payload.name || ''}\n\n${payload.message}`)}`;
        window.location.href = mailto;
      }
      return;
    }

    const mailto = `mailto:2025pilot.guard@gmail.com?subject=${encodeURIComponent('AegisAI Inquiry')}&body=${encodeURIComponent(`Email: ${payload.email}\nName: ${payload.name || ''}\n\n${payload.message}`)}`;
    window.location.href = mailto;
    setStatus(t('form.mailto'), 'info');
  });

  // Privacy dialog
  const dialog = $('#privacyDialog');
  $$('.link-like[data-open-privacy], [data-open-privacy].link-like').forEach(btn => btn.addEventListener('click', () => dialog.showModal()));
  dialog.addEventListener('click', (e) => {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close('dismiss');
  });

  // --- i18n ---
  const translations = {
    ru: {
      'meta.title': 'AegisAI — Autonomous Security Drones',
      'meta.description': 'Autonomous drones with AI patrol, wireless charging, and a non-lethal pepper payload. 24/7 perimeter security built on DJI Matrice 30T.',
      'nav.home':'Home','nav.tech':'Technology','nav.benefits':'Benefits','nav.industries':'Industries','nav.contact':'Contact',
      'hero.title':'AegisAI — охранные дроны будущего',
      'hero.subtitle':'Автономный 24/7 патруль, беспроводная док-станция, интеграция с VMS/сигнализацией и нелетальный перцовый модуль на базе DJI Matrice 30T.',
      'hero.deck':'Download Pitch Deck (PDF)','hero.explore':'Explore Technology',
      'deck.unavailable':'File temporarily unavailable. Please contact us via Telegram or Email.',
      'about.p1':'<strong>AegisAI</strong> — это автономные охранные дроны для круглосуточной охраны периметра: 24/7 патруль по заданным маршрутам и интеллектуальное обнаружение нарушителей.',
      'about.p2':'Система док-станций обеспечивает <strong>беспроводную зарядку</strong> и быстрый перезапуск миссий, уменьшая человеческий фактор и операционные издержки.',
      'about.p3':'Нелетальный модуль с <strong>перцовыми снарядами</strong> обеспечивает сдерживание до прибытия охраны, при строгом соблюдении локальных регуляций.',
      'about.p4':'Основано на платформе <strong>DJI Matrice 30T</strong> с интеграцией в существующие <strong>VMS/сигнализации</strong> и корпоративные рабочие процессы.',
      'tech.title':'Ключевые технологии',
      'benefits.title':'Почему AegisAI',
      'benefits.b1.title':'24/7 защита','benefits.b1.desc':'Круглосуточное покрытие периметра без усталости и человеческих ошибок.',
      'benefits.b2.title':'Быстрое реагирование','benefits.b2.desc':'Мгновенная реакция на инцидент и передача данных в центр мониторинга.',
      'benefits.b3.title':'Ниже TCO','benefits.b3.desc':'Снижение совокупной стоимости владения за счёт автоматизации и док-станций.',
      'benefits.b4.title':'Безопасность','benefits.b4.desc':'Нелетальные средства сдерживания и строгие протоколы доступа.',
      'benefits.b5.title':'Погода не помеха','benefits.b5.desc':'Надёжная работа в сложных погодных условиях, дожде и тумане.',
      'industries.title':'Где применяется',
      'industries.b1':'Промзоны','industries.b2':'Склады','industries.b3':'Логистические хабы','industries.b4':'Бизнес-центры','industries.b5':'Торговые площади','industries.b6':'Коттеджные посёлки','industries.b7':'Дата-центры',
      'cta.title':'Готовы повысить безопасность вашего периметра?',
      'contact.title':'Свяжитесь с нами','contact.note':'Отвечаем в течение 1 рабочего дня',
      'form.emailLabel':'Email *','form.nameLabel':'Имя (optional)','form.messageLabel':'Сообщение *',
      'form.emailPh':'you@example.com','form.namePh':'Как к вам обращаться?','form.messagePh':'Пару строк о вашей задаче...',
      'form.consentPrefix':'Согласен с ','form.privacyLink':'политикой конфиденциальности','form.submit':'Отправить',
      'form.check':'Проверьте поля формы','form.sending':'Отправляем...','form.success':'Спасибо! Сообщение отправлено.','form.error':'Не удалось отправить через EmailJS. Откройте почтовый клиент...','form.mailto':'Открываем ваш почтовый клиент...',
      'footer.disclaimer':'AegisAI is not affiliated with DJI. Features subject to local regulations.','footer.privacy':'Privacy Policy',
      'privacy.title':'Privacy Policy','privacy.text':'We collect contact details (email) and message content strictly to process your inquiry. Data is stored securely and only for the time necessary to provide support. You can request deletion at any time via email.','privacy.close':'Close'
    },
    en: {
      'meta.title':'AegisAI — Autonomous Security Drones',
      'meta.description':'Autonomous drones with AI patrol, wireless charging, and a non-lethal pepper payload. 24/7 perimeter security built on DJI Matrice 30T.',
      'nav.home':'Home','nav.tech':'Technology','nav.benefits':'Benefits','nav.industries':'Industries','nav.contact':'Contact',
      'hero.title':'AegisAI — security drones of the future',
      'hero.subtitle':'Autonomous 24/7 patrol, wireless dock, VMS/alarm integration, and a non-lethal pepper module based on DJI Matrice 30T.',
      'hero.deck':'Download Pitch Deck (PDF)','hero.explore':'Explore Technology',
      'deck.unavailable':'File temporarily unavailable. Please contact us via Telegram or Email.',
      'about.p1':'<strong>AegisAI</strong> delivers autonomous perimeter security: 24/7 patrol along predefined routes with intelligent intruder detection.',
      'about.p2':'Docking stations enable <strong>wireless charging</strong> and quick mission turnaround, reducing human factor and OPEX.',
      'about.p3':'A non-lethal <strong>pepper payload</strong> provides deterrence until on-site security arrives, subject to local regulations.',
      'about.p4':'Built on <strong>DJI Matrice 30T</strong> with integrations to existing <strong>VMS/alarms</strong> and enterprise workflows.',
      'tech.title':'Key Technologies',
      'benefits.title':'Why AegisAI',
      'benefits.b1.title':'24/7 protection','benefits.b1.desc':'Round-the-clock coverage with no fatigue or human error.',
      'benefits.b2.title':'Rapid response','benefits.b2.desc':'Immediate incident reaction with data relayed to the monitoring center.',
      'benefits.b3.title':'Lower TCO','benefits.b3.desc':'Reduced total cost of ownership thanks to automation and docks.',
      'benefits.b4.title':'Safety','benefits.b4.desc':'Non-lethal deterrents and strict access protocols.',
      'benefits.b5.title':'All-weather','benefits.b5.desc':'Reliable operation in rain, fog and harsh conditions.',
      'industries.title':'Industries','industries.b1':'Industrial areas','industries.b2':'Warehouses','industries.b3':'Logistics hubs','industries.b4':'Business parks','industries.b5':'Retail sites','industries.b6':'Gated communities','industries.b7':'Data centers',
      'cta.title':'Ready to secure your perimeter?',
      'contact.title':'Contact us','contact.note':'We respond within 1 business day',
      'form.emailLabel':'Email *','form.nameLabel':'Name (optional)','form.messageLabel':'Message *',
      'form.emailPh':'you@example.com','form.namePh':'How should we address you?','form.messagePh':'Tell us briefly about your case...',
      'form.consentPrefix':'I agree with the ','form.privacyLink':'privacy policy','form.submit':'Send',
      'form.check':'Please check the form fields','form.sending':'Sending...','form.success':'Thanks! Your message has been sent.','form.error':'Could not send via EmailJS. Opening your mail client...','form.mailto':'Opening your mail client...',
      'footer.disclaimer':'AegisAI is not affiliated with DJI. Features subject to local regulations.','footer.privacy':'Privacy Policy',
      'privacy.title':'Privacy Policy','privacy.text':'We collect contact details (email) and message content strictly to process your inquiry. Data is stored securely and only for the time necessary to provide support. You can request deletion at any time via email.','privacy.close':'Close'
    }
  };

  function t(key, locale){ return (translations[locale||currentLang]||{})[key] || key; }

  const metaDescEl = document.querySelector('meta[name="description"]');
  let currentLang = (localStorage.getItem('aegis-lang') || '').toLowerCase();
  if (!currentLang) currentLang = ((navigator.language || 'ru').toLowerCase().startsWith('en')) ? 'en' : 'ru';

  function applyLang(lang){
    currentLang = lang;
    localStorage.setItem('aegis-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.title = t('meta.title', lang);
    if (metaDescEl) metaDescEl.setAttribute('content', t('meta.description', lang));
    document.querySelectorAll('[data-i18n]').forEach(el => { const html = t(el.getAttribute('data-i18n'), lang); if (html) el.innerHTML = html; });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'), lang)); });
    document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  applyLang(currentLang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));

  // Current year
  const yearEl = document.querySelector('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Founder photo: switch initials -> photo when available
document.addEventListener('DOMContentLoaded', ()=>{
  const img = document.getElementById('founderPhoto');
  if (!img) return;
  const wrap = img.closest('.founder__photo');
  const showImg = ()=> wrap && wrap.classList.add('has-img');
  const hideImg = ()=> wrap && wrap.classList.remove('has-img');
  if (img.complete) {
    (img.naturalWidth > 0 ? showImg : hideImg)();
  } else {
    img.addEventListener('load', showImg, { once:true });
    img.addEventListener('error', hideImg, { once:true });
  }
});
