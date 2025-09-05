
document.addEventListener("DOMContentLoaded", () => {
  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth", block:"start"}); }
    });
  });
  // Lazy images
  document.querySelectorAll("img:not([loading])").forEach(img=>img.setAttribute("loading","lazy"));

  // Simple form handler (replace with EmailJS/backend)
  document.querySelectorAll("form").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const msg = document.createElement("p");
      msg.textContent = "Thanks! We’ll send you the deck soon.";
      if(document.documentElement.getAttribute("lang")==="ru"){
        msg.textContent = "Спасибо! Мы отправим вам презентацию в ближайшее время.";
      }
      form.replaceWith(msg);
    });
  });
});
