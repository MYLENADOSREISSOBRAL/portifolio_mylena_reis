/* ==========================================================================
   Inicialização
   O conteúdo é gerado pelo Jekyll; aqui só se ativam os comportamentos
   (tema, preferências, menu) e as contingências de imagem e ano.
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});

  /* Imagens com data-fallback: troca pelo placeholder se falharem */
  function guardImage(img) {
    var fallback = img.getAttribute("data-fallback");
    if (!fallback) return;
    function useFallback() {
      if (img.getAttribute("src") !== fallback) img.src = fallback;
    }
    if (img.complete && img.naturalWidth === 0) useFallback();
    else img.addEventListener("error", useFallback, { once: true });
  }

  /* Tabelas de textos do blog que rolam na horizontal precisam receber
     foco pelo teclado (WCAG 2.1.1) e ter um nome para leitores de tela */
  function focusableScrollRegions() {
    document.querySelectorAll(".prose table").forEach(function (table) {
      if (table.scrollWidth > table.clientWidth + 1) {
        table.setAttribute("tabindex", "0");
        table.setAttribute("aria-label", Portfolio.i18n.t("blog.scrollTable"));
      } else {
        table.removeAttribute("tabindex");
        table.removeAttribute("aria-label");
      }
    });
  }

  /* O ano vem da compilação; aqui ele é atualizado caso o site passe a
     virada do ano sem ser recompilado. */
  function updateCurrentYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = year;
    });
  }

  /* Cada módulo é isolado: uma falha não impede os demais */
  function safely(step) {
    try {
      step();
    } catch (error) {
      if (window.console) console.error("[portfolio]", error);
    }
  }

  Portfolio.init = function () {
    [
      updateCurrentYear,
      function () { Portfolio.theme.init(); },
      function () { Portfolio.preferences.init(); },
      function () { Portfolio.navigation.init(); },
      function () { document.querySelectorAll("img[data-fallback]").forEach(guardImage); },
      function () {
        focusableScrollRegions();
        window.addEventListener("resize", focusableScrollRegions);
      }
    ].forEach(safely);
  };

  Portfolio.init();
})();
