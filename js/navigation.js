/* ==========================================================================
   Menu compacto em telas pequenas
   - Sem JavaScript, a navegação fica sempre visível.
   - Com JavaScript, abaixo de 64em o menu fica recolhido atrás de um botão
     com aria-expanded; Esc fecha e devolve o foco ao botão; escolher um
     link fecha o menu. Não é modal: não prende o foco nem cobre a página.
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});

  /* Mesmo ponto de quebra de css/responsive.css */
  var DESKTOP_QUERY = "(min-width: 64em)";

  Portfolio.navigation = {
    init: function () {
      var toggle = document.querySelector("[data-menu-toggle]");
      var menu = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
      if (!toggle || !menu || !window.matchMedia) return;

      var desktop = window.matchMedia(DESKTOP_QUERY);

      function isOpen() {
        return toggle.getAttribute("aria-expanded") === "true";
      }

      function setOpen(open) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        menu.hidden = !open && !desktop.matches;
      }

      function sync() {
        toggle.hidden = desktop.matches;
        setOpen(false);
      }

      toggle.addEventListener("click", function () {
        setOpen(!isOpen());
      });

      menu.addEventListener("click", function (event) {
        if (!desktop.matches && event.target.closest("a")) setOpen(false);
      });

      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape" || !isOpen()) return;
        var focusInside = menu.contains(document.activeElement) || document.activeElement === toggle;
        setOpen(false);
        if (focusInside) toggle.focus();
      });

      if (desktop.addEventListener) desktop.addEventListener("change", sync);
      else if (desktop.addListener) desktop.addListener(sync);

      sync();
      trackCurrentSection(menu);
    }
  };

  /* Marca no menu a seção visível (aria-current="location"):
     - a seção atual é a última cujo topo já passou da linha de referência
       (40% da altura da janela, no máximo 160 px);
     - no topo da página vale a primeira (mesmo em janelas altas);
       rolada até o fim, vale a última.
     Recalculado no máximo uma vez por quadro durante a rolagem. */
  function trackCurrentSection(menu) {
    var items = [];
    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) items.push({ link: link, section: section });
    });
    if (!items.length) return;

    var pending = false;

    function update() {
      pending = false;
      var doc = document.documentElement;
      var current = items[0];
      if (window.scrollY < 8) {
        /* no topo vale sempre a primeira seção, mesmo em janelas altas */
        current = items[0];
      } else if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        current = items[items.length - 1];
      } else {
        /* linha de referência perto do alto da tela: em janelas altas,
           seções curtas não "pulam" para a seguinte */
        var line = Math.min(window.innerHeight * 0.4, 160);
        items.forEach(function (item) {
          if (item.section.getBoundingClientRect().top <= line) current = item;
        });
      }
      items.forEach(function (item) {
        if (item === current) item.link.setAttribute("aria-current", "location");
        else item.link.removeAttribute("aria-current");
      });
    }

    function schedule() {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    /* As seções são montadas depois deste módulo (app.js) e as imagens
       podem mudar a altura da página: calcula no próximo quadro e no load */
    window.addEventListener("load", schedule);
    document.addEventListener("portfolio:languagechange", schedule);
    schedule();
  }
})();
