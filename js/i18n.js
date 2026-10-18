/* ==========================================================================
   Textos da interface e utilitários compartilhados
   ---------------------------------------------------------------------------
   - O conteúdo já chega pronto no HTML, gerado pelo Jekyll em cada idioma
     (/ em português, /en/ em inglês). Aqui ficam só os textos usados pelo
     JavaScript, lidos do bloco <script id="textos-interface"> que o Jekyll
     gera a partir de _data/textos.yml.
   - Também ficam aqui o armazenamento tolerante a falhas e os anúncios para
     leitores de tela, usados por theme.js, preferences.js e navigation.js.
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});

  var STRINGS = {};
  try {
    STRINGS = JSON.parse(document.getElementById("textos-interface").textContent);
  } catch (error) {
    if (window.console) console.warn("[i18n] textos da interface indisponíveis");
  }

  Portfolio.lang = document.documentElement.getAttribute("data-lang") || "pt";

  /* Armazenamento tolerante a falhas: em modo privado ou com bloqueio,
     o site continua funcionando, apenas sem lembrar as escolhas. */
  Portfolio.storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    /* Retorna false quando não foi possível gravar (bloqueio ou limite) */
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (error) {
        return false;
      }
    },
    remove: function (key) {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        /* sem persistência */
      }
    }
  };

  /* Mensagem de estado para leitores de tela (região role="status") */
  Portfolio.announce = function (message) {
    var region = document.querySelector("[data-status]");
    if (!region) return;
    region.textContent = "";
    /* Pequeno atraso para leitores de tela perceberem a mudança */
    window.setTimeout(function () {
      region.textContent = message;
    }, 50);
  };

  function lookup(key) {
    return key.split(".").reduce(function (node, part) {
      return node != null ? node[part] : undefined;
    }, STRINGS);
  }

  /* Seletor de idioma: guarda a escolha para as próximas visitas (o script
     do <head> leva o visitante à versão nesse idioma, quando existir) */
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("[data-lang-link]");
    if (link) Portfolio.storage.set("portfolio.lang", link.getAttribute("data-lang-link"));
  });

  Portfolio.i18n = {
    /* t("prefs.swatch", { h: 30, name: "laranja" }) substitui {h} e {name} */
    t: function (key, params) {
      var value = lookup(key);
      if (value == null) {
        if (window.console) console.warn("[i18n] chave ausente: " + key);
        return "";
      }
      if (params && typeof value === "string") {
        value = value.replace(/\{(\w+)\}/g, function (match, name) {
          return name in params ? String(params[name]) : match;
        });
      }
      return value;
    }
  };
})();
