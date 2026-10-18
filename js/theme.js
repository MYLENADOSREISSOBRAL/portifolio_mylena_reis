/* ==========================================================================
   Tema claro / escuro
   - Sem escolha manual, segue a preferência do sistema (inclusive se ela
     mudar com a página aberta).
   - A escolha manual é salva em localStorage ("portfolio.theme").
   - O script inline do <head> aplica o tema salvo antes da primeira
     pintura; aqui ficam o botão, o estado acessível e a persistência.
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});

  var STORAGE_KEY = "portfolio.theme";
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    var value = Portfolio.storage.get(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  }

  function current() {
    var explicit = root.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") return explicit;
    return media && media.matches ? "dark" : "light";
  }

  function refreshButtons() {
    var dark = current() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", dark ? "true" : "false");
      button.setAttribute("aria-label", Portfolio.i18n.t("theme.toggle"));
      button.title = Portfolio.i18n.t(dark ? "theme.toLight" : "theme.toDark");
    });
  }

  function notify() {
    document.dispatchEvent(new CustomEvent("portfolio:themechange", { detail: { theme: current() } }));
  }

  function set(theme, options) {
    root.setAttribute("data-theme", theme);
    if (options && options.persist) Portfolio.storage.set(STORAGE_KEY, theme);
    refreshButtons();
    notify();
    if (options && options.announce) {
      Portfolio.announce(Portfolio.i18n.t(theme === "dark" ? "theme.darkOn" : "theme.lightOn"));
    }
  }

  Portfolio.theme = {
    current: current,
    set: set,

    init: function () {
      var saved = stored();
      if (saved) root.setAttribute("data-theme", saved);

      document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
        button.hidden = false;
        button.addEventListener("click", function () {
          set(current() === "dark" ? "light" : "dark", { persist: true, announce: true });
        });
      });

      if (media) {
        var onSystemChange = function () {
          if (root.hasAttribute("data-theme")) return; /* escolha manual prevalece */
          refreshButtons();
          notify();
        };
        if (media.addEventListener) media.addEventListener("change", onSystemChange);
        else if (media.addListener) media.addListener(onSystemChange);
      }

      document.addEventListener("portfolio:languagechange", refreshButtons);
      refreshButtons();
    }
  };
})();
