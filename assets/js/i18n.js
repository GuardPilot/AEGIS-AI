
(function(){ 
  const STORAGE_KEY = "aegisai_lang";
  const translations = {
  "en": {
    "nav_home": "Home",
    "nav_tech": "Technology",
    "nav_kpi": "KPIs",
    "nav_industries": "Industries",
    "nav_market": "Market",
    "nav_roadmap": "Roadmap",
    "nav_contact": "Contact",
    "hero_h1": "AegisAI — autonomous perimeter patrol, 24/7",
    "hero_lead": "Dock-charged drones that detect, track and deter before a breach.",
    "cta_primary": "Request Deck & Pilot Call",
    "cta_secondary": "Explore Technology",
    "hero_note": "Built on DJI Matrice 30T. Integrates with VMS/alarms. Non-lethal deterrent (subject to local law).",
    "ps_h2": "Problem & Solution",
    "p_problem": "Guards are expensive and can’t be everywhere. Cameras record but don’t prevent. Night response is slow.",
    "p_solution": "Always-on docked drones with proactive defense: detect → track → voice/siren/pepper. Alert to VMS in ≤ N s.",
    "tech_h2": "Key Technologies",
    "tech_list_1": "Computer vision for person/vehicle detection and tracking",
    "tech_list_2": "Autonomous navigation with geofences and routes",
    "tech_list_3": "Wireless docking and smart charge scheduling",
    "tech_list_4": "Telemetry cloud, VMS/alarm integrations",
    "tech_list_5": "Non-lethal deterrent options",
    "kpi_h2": "Targets & current KPIs",
    "kpi_1": "Dock uptime",
    "kpi_2": "Detection latency",
    "kpi_3": "Autonomous missions",
    "kpi_4": "Cost per site",
    "status_h2": "Current Status",
    "status_list_1": "Stage: Pre-seed R&D",
    "status_list_2": "Hardware: prototype dock; Matrice 30T integration",
    "status_list_3": "Software: detection/tracking v0.x; route planner; telemetry alpha",
    "status_list_4": "Tests: N night tests; M dock hours; latency avg y s",
    "status_list_5": "Looking for 2–3 pilot sites",
    "why_h2": "Why Now?",
    "why_1": "Edge AI is cheap enough for reliable on-site inference",
    "why_2": "Commodity airframes cut hardware barriers",
    "why_3": "Visible active drones reduce attempts vs passive CCTV",
    "why_4": "Regulations are opening controlled private-site ops",
    "cto_h2": "We're hiring a CTO (Co‑founder)",
    "cto_p": "Computer vision (detection/tracking), RL, robotics & autonomy on edge. Hands‑on builder with product mindset.",
    "cto_apply": "Apply / Book a call",
    "industries_h2": "Industries",
    "industries_list": "Industrial areas • Warehouses • Logistics hubs • Business parks • Retail sites • Gated communities • Data centers",
    "market_h2": "Market & Metrics",
    "market_head": "TAM: perimeter security $73.6–81.4B (2024). DIAB adjacency used for SAM assumptions.",
    "market_expand": "Show methodology & sources",
    "bm_h2": "Business model",
    "bm_head": "HaaS subscription for perimeter patrol + setup fee/NRE + paid POCs (1–3 months). Below 24/7 guarding for equivalent coverage.",
    "metrics_h2": "Early-stage metrics",
    "metrics_head": "Commercial (pilots, LOIs, ACV), Product/quality (FAR, Precision/Recall, mission success, MTBF/MTTR, dock uptime), Ops/regulatory (BVLOS/night, integrations).",
    "safety_h2": "Safety & Compliance",
    "safety_1": "Operate on private sites with geofences and mission controls",
    "safety_2": "Remote ID / no-fly rules respected; non‑lethal deterrent only",
    "safety_3": "Insurance & SOPs prepared for pilots",
    "founder_h2": "Founder: Roman Chaikin",
    "founder_badge": "Founder",
    "founder_p1": "This is more than a startup. It’s a way to make proactive security affordable.",
    "founder_p2": "8+ years hands‑on: installs, controllers, UAV comms/navigation, robotics integration.",
    "founder_p3": "I soldered boards, wrote controller code and integrated VMS/CCTV/ACS.",
    "cta_band_h2": "Ready to secure your perimeter?",
    "cta_band_btn": "Request Deck & Pilot Call",
    "contact_h2": "Contact us",
    "contact_note": "We respond within 1 business day.",
    "form_email": "Email *",
    "form_name": "Name (optional)",
    "form_message": "Message *",
    "form_policy": "I agree with the privacy policy",
    "form_send": "Send",
    "footer_note": "AegisAI is not affiliated with DJI. Features subject to local regulations."
  },
  "ru": {
    "nav_home": "Главная",
    "nav_tech": "Технологии",
    "nav_kpi": "KPI",
    "nav_industries": "Отрасли",
    "nav_market": "Рынок",
    "nav_roadmap": "Дорожная карта",
    "nav_contact": "Контакты",
    "hero_h1": "AegisAI — автономный периметровый патруль 24/7",
    "hero_lead": "Дроны на док‑станциях: обнаруживают, преследуют и сдерживают до проникновения.",
    "cta_primary": "Запросить презентацию и пилот",
    "cta_secondary": "Изучить технологию",
    "hero_note": "Основано на DJI Matrice 30T. Интеграции с VMS/сигнализацией. Нелетальный модуль (по закону).",
    "ps_h2": "Проблема и решение",
    "p_problem": "Охрана дорогая и не везде доступна. Камеры фиксируют, но не предотвращают. Ночью реакция медленная.",
    "p_solution": "Всегда на посту: док‑дроны с проактивной защитой — обнаружение → трекинг → голос/сирена/перцовый. Тревога в VMS за ≤ N с.",
    "tech_h2": "Ключевые технологии",
    "tech_list_1": "Компьютерное зрение: обнаружение/треккинг людей и транспорта",
    "tech_list_2": "Автономная навигация: геозоны и маршруты",
    "tech_list_3": "Беспроводная док‑зарядка и планирование",
    "tech_list_4": "Облако телеметрии, интеграции с VMS/сигнализацией",
    "tech_list_5": "Нелетальные средства сдерживания",
    "kpi_h2": "Цели и текущие KPI",
    "kpi_1": "Аптайм док‑станции",
    "kpi_2": "Задержка тревоги",
    "kpi_3": "% автономных миссий",
    "kpi_4": "Стоимость площадки",
    "status_h2": "Текущий статус",
    "status_list_1": "Стадия: Pre‑seed R&D",
    "status_list_2": "Железо: прототип док‑станции; интеграция Matrice 30T",
    "status_list_3": "ПО: детекция/треккинг v0.x; маршрутизация; телеметрия alpha",
    "status_list_4": "Тесты: N ночных; M часов на доке; средняя задержка y с",
    "status_list_5": "Ищем 2–3 пилотные площадки",
    "why_h2": "Почему сейчас?",
    "why_1": "Edge‑ИИ подешевел — надёжный inference на площадке",
    "why_2": "Коммерческие платформы снижают порог железа",
    "why_3": "Видимый активный дрон снижает попытки vs пассивное CCTV",
    "why_4": "Регуляторика точечно допускает частные площадки",
    "cto_h2": "Ищем CTO (сооснователя)",
    "cto_p": "Computer Vision, RL, робототехника и автономность на edge. Инженер‑практик с продуктовым мышлением.",
    "cto_apply": "Откликнуться / Назначить звонок",
    "industries_h2": "Отрасли",
    "industries_list": "Промзоны • Склады • Логистические хабы • Бизнес‑парки • Ритейл‑площадки • Посёлки с КПП • Дата‑центры",
    "market_h2": "Рынок и метрики",
    "market_head": "TAM: периметровая безопасность $73.6–81.4 млрд (2024). Для SAM использована смежная ниша DIAB.",
    "market_expand": "Показать методологию и источники",
    "bm_h2": "Бизнес‑модель",
    "bm_head": "Подписка HaaS + setup‑fee/NRE + платные пилоты (1–3 мес). Ниже стоимости 24/7 охраны при одинаковом покрытии.",
    "metrics_h2": "Ранние метрики",
    "metrics_head": "Коммерция (пилоты, LOI, ACV), Продукт/качество (FAR, Precision/Recall, успешность миссий, MTBF/MTTR, аптайм дока), Операции/регуляторика (BVLOS/ночь, интеграции).",
    "safety_h2": "Безопасность и соответствие",
    "safety_1": "Работа на частных площадках с геозонами и контролем миссий",
    "safety_2": "Remote ID / запретные зоны соблюдаем; только нелетальные средства",
    "safety_3": "Страхование и SOP подготовлены для пилотов",
    "founder_h2": "Основатель: Роман Чайкин",
    "founder_badge": "Основатель",
    "founder_p1": "Для меня это больше, чем стартап: проактивная безопасность должна быть доступной.",
    "founder_p2": "8+ лет руками: монтажи, контроллеры, связь/навигация БПЛА, интеграция робототехники.",
    "founder_p3": "Паял платы, писал код контроллеров, интегрировал VMS/CCTV/СКУД.",
    "cta_band_h2": "Готовы защитить ваш периметр?",
    "cta_band_btn": "Запросить презентацию и пилот",
    "contact_h2": "Свяжитесь с нами",
    "contact_note": "Отвечаем в течение 1 рабочего дня.",
    "form_email": "Email *",
    "form_name": "Имя (необязательно)",
    "form_message": "Сообщение *",
    "form_policy": "Согласен с политикой конфиденциальности",
    "form_send": "Отправить",
    "footer_note": "AegisAI не связан с DJI. Возможности зависят от местного законодательства."
  }
};
  function applyLang(lang){
    document.documentElement.setAttribute("lang", lang === "ru" ? "ru" : "en");
    const btn = document.getElementById("lang-switch");
    if(btn) btn.textContent = lang === "ru" ? "EN" : "RU";
    const dict = translations[lang] || {}
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      if(dict[key]) el.textContent = dict[key];
    });
    try{ localStorage.setItem(STORAGE_KEY, lang); }catch(e){}
  }
  function init(){
    let lang = "en";
    try{
      lang = localStorage.getItem(STORAGE_KEY) || (navigator.language && navigator.language.startsWith("ru") ? "ru" : "en");
    }catch(e){}
    applyLang(lang);
    const btn = document.getElementById("lang-switch");
    if(btn) btn.addEventListener("click", ()=>{
      lang = lang === "ru" ? "en" : "ru";
      applyLang(lang);
    });
    window.AEGISAI_I18N = {applyLang, translations};
  }
  document.addEventListener("DOMContentLoaded", init);
})();
