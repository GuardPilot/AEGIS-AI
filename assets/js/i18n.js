
(function(){ 
  const STORAGE_KEY = "aegisai_lang";
  const translations = {
  "en": {
    "founder_heading": "Founder: Roman Chaikin",
    "founder_badge": "Founder",
    "founder_p1": "This is more than a startup. It is a chance to make smart, accessible security a reality for everyone. I believe technology should work for people, not sit on the shelf.",
    "founder_p2": "I’m not a theorist. I have 8+ years of hands‑on engineering: from installing security systems and on‑site service to designing, assembling and programming drones and robotic systems for industry.",
    "founder_p3": "I’ve deployed solutions at real facilities — from apartment buildings to logistics hubs. I know the pain of the security industry from the inside because I installed panels, soldered boards, wrote controller code, and integrated systems (VMS, CCTV, ACS).",
    "founder_p4": "My goal isn’t just to profit but to build a product that changes the market. AegisAI is the embodiment of this experience and ambition to make the world safer with technology. I’m ready to prove it. Let’s build the future together.",
    "founder_facts_heading": "Key facts",
    "founder_fact_1": "8+ years in engineering and systems integration",
    "founder_fact_2": "Experience from technician to lead engineer: hardware, software, deployment, service",
    "founder_fact_3": "Real projects: communications & navigation for UAVs, robotics integration, automation upgrades",
    "founder_fact_4": "Skills: controller programming, circuit design, soldering, installation, commissioning, technical consulting"
  },
  "ru": {
    "founder_heading": "Основатель: Роман Чайкин",
    "founder_badge": "Основатель",
    "founder_p1": "Для меня это не просто стартап. Это шанс воплотить мечту о доступной и умной безопасности для всех. Я верю, что технологии должны работать на людей, а не стоять на полке.",
    "founder_p2": "Я не теоретик. За моими плечами 8 лет реального опыта в инженерии: от монтажа систем безопасности и сервисной работы на объектах до проектирования, сборки и программирования дронов и робототехнических комплексов для промышленности.",
    "founder_p3": "Я участвовал во внедрении решений на реальных объектах, от многоквартирных домов до логистических хабов. Я знаю боль индустрии безопасности изнутри, потому что сам устанавливал панели, паял платы, писал код для контроллеров и интегрировал системы (VMS, CCTV, СКУД).",
    "founder_p4": "Моя цель — не просто заработать, а создать продукт, который изменит рынок. AegisAI — это воплощение этого опыта, амбиций и желания сделать мир безопаснее с помощью технологий. Готов доказать это на деле. Давайте строить будущее вместе.",
    "founder_facts_heading": "Ключевые факты",
    "founder_fact_1": "8+ лет в инженерии и системной интеграции",
    "founder_fact_2": "Опыт от техника до ведущего инженера: железо, ПО, внедрение, сервис",
    "founder_fact_3": "Реальные проекты: связь и навигация для БПЛА, интеграция РТК, модернизация автоматизации",
    "founder_fact_4": "Навыки: программирование контроллеров, схемотехника, пайка, монтаж, пусконаладка, консалтинг"
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
