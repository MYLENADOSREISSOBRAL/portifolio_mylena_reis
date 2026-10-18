/* ==========================================================================
   Preferências de exibição: tamanho do texto, fonte e cor de destaque
   - Tamanho e fonte são aplicados imediatamente.
   - A cor de destaque é escolhida por matiz (0–359°) e só muda ao clicar
     em "Aplicar". Para cada matiz, a claridade é calculada para manter o
     contraste mínimo (WCAG) nos dois temas.
   - Tudo é salvo em localStorage; o script inline do <head> reaplica os
     valores antes da primeira pintura.
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});
  var root = document.documentElement;

  var KEYS = {
    size: "portfolio.textSize",
    font: "portfolio.font",
    accent: "portfolio.accent",
    background: "portfolio.background",
    backgroundImage: "portfolio.backgroundImage"
  };

  /* Planos de fundo (css/backgrounds.css). O padrão da autora fica em
     <html data-background-default="…"> e, para imagem própria dela,
     <html data-background-image="assets/backgrounds/…">. */
  var BG_OPTIONS = ["liso", "grade", "papel", "gradiente", "riscas", "imagem"];
  var BG_MAX_SIDE = 2560; /* imagens maiores são reduzidas */
  var BG_QUALITY = 0.8;
  var BG_MIN = { w: 1920, h: 1080 }; /* abaixo disso, aviso de resolução */
  var BG_DATA_PATTERN = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;

  var SIZES = ["sm", "md", "lg", "xl"];
  var FONTS = ["sans", "serif", "legible"];
  var DEFAULT_SIZE = "md";
  var DEFAULT_FONT = "sans";

  /* Matiz de #2B8E9E, a cor de identidade padrão */
  var DEFAULT_HUE = 188;
  /* Grade de referência: o círculo de matizes RGB a cada 30° */
  var HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  /* Devem acompanhar --color-bg em css/variables.css */
  var BACKGROUNDS = { light: "#fafaf7", dark: "#16191c" };

  /* Contraste mínimo de cada papel sobre --color-bg: texto ≥ 4,5:1;
     elementos gráficos ≥ 3:1. As margens garantem os mínimos também sobre
     --color-surface (um pouco mais escura no claro e mais clara no escuro).
     Os links ficam próximos dos tons padrão do site. */
  var TARGETS = {
    light: { accent: 3.5, link: 5.5, hover: 7.5 },
    dark: { accent: 3.5, link: 7, hover: 9.5 }
  };
  var SATURATION = 0.62;

  /* Nome do campo salvo → variável CSS (mesma tabela no script do <head>) */
  var ACCENT_VARS = {
    accentLight: "--accent-light",
    linkLight: "--link-light",
    hoverLight: "--link-hover-light",
    accentDark: "--accent-dark",
    linkDark: "--link-dark",
    hoverDark: "--link-hover-dark"
  };

  /* ---------- Cores ---------- */

  function hslToRgb(h, s, l) {
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    var m = l - c / 2;
    var rgb;
    if (h < 60) rgb = [c, x, 0];
    else if (h < 120) rgb = [x, c, 0];
    else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c];
    else if (h < 300) rgb = [x, 0, c];
    else rgb = [c, 0, x];
    return rgb.map(function (v) {
      return Math.round((v + m) * 255);
    });
  }

  function toHex(rgb) {
    return "#" + rgb.map(function (v) {
      return ("0" + v.toString(16)).slice(-2);
    }).join("");
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function luminance(rgb) {
    var c = rgb.map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function contrast(a, b) {
    var l1 = luminance(a);
    var l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  /* Claridade mais próxima de 50% que ainda atinge o contraste-alvo:
     no tema claro a cor escurece; no escuro, clareia. */
  function solve(hue, theme, target) {
    var bg = hexToRgb(BACKGROUNDS[theme]);
    var light = theme === "light";
    var lo = light ? 0 : 0.5;
    var hi = light ? 0.5 : 1;
    for (var i = 0; i < 20; i++) {
      var mid = (lo + hi) / 2;
      var ok = contrast(hslToRgb(hue, SATURATION, mid), bg) >= target;
      if (light === ok) lo = mid;
      else hi = mid;
    }
    return toHex(hslToRgb(hue, SATURATION, light ? lo : hi));
  }

  function palette(hue) {
    return {
      h: hue,
      accentLight: solve(hue, "light", TARGETS.light.accent),
      linkLight: solve(hue, "light", TARGETS.light.link),
      hoverLight: solve(hue, "light", TARGETS.light.hover),
      accentDark: solve(hue, "dark", TARGETS.dark.accent),
      linkDark: solve(hue, "dark", TARGETS.dark.link),
      hoverDark: solve(hue, "dark", TARGETS.dark.hover)
    };
  }

  function readAccent() {
    try {
      var value = JSON.parse(Portfolio.storage.get(KEYS.accent));
      if (!value || typeof value.h !== "number") return null;
      for (var field in ACCENT_VARS) {
        if (!/^#[0-9a-f]{6}$/i.test(value[field])) return null;
      }
      return value;
    } catch (error) {
      return null;
    }
  }

  function applyAccent(colors) {
    for (var field in ACCENT_VARS) root.style.setProperty(ACCENT_VARS[field], colors[field]);
    root.setAttribute("data-accent", "custom");
  }

  function clearAccent() {
    for (var field in ACCENT_VARS) root.style.removeProperty(ACCENT_VARS[field]);
    root.removeAttribute("data-accent");
  }

  /* ---------- Estado ---------- */

  var els = {};
  var appliedHue = DEFAULT_HUE;
  var pendingHue = DEFAULT_HUE;

  function currentSize() {
    var value = root.getAttribute("data-text-size");
    return SIZES.indexOf(value) > -1 ? value : DEFAULT_SIZE;
  }

  function currentFont() {
    var value = root.getAttribute("data-font");
    return FONTS.indexOf(value) > -1 ? value : DEFAULT_FONT;
  }

  function setChoice(attr, key, value, fallback) {
    if (value === fallback) {
      root.removeAttribute(attr);
      Portfolio.storage.remove(key);
    } else {
      root.setAttribute(attr, value);
      Portfolio.storage.set(key, value);
    }
    refreshPressed();
  }

  function refreshPressed() {
    var size = currentSize();
    var font = currentFont();
    els.panel.querySelectorAll("[data-size-option]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-size-option") === size ? "true" : "false");
    });
    els.panel.querySelectorAll("[data-font-option]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-font-option") === font ? "true" : "false");
    });
  }

  function hueName(hue) {
    var t = Portfolio.i18n.t;
    if (hue === DEFAULT_HUE) return t("prefs.hues.default");
    var nearest = HUES.reduce(function (best, h) {
      var d = Math.min(Math.abs(h - hue), 360 - Math.abs(h - hue));
      return d < best.d ? { h: h, d: d } : best;
    }, { h: 0, d: 999 });
    return t("prefs.hues.h" + nearest.h);
  }

  /* Atualiza grade, controle deslizante e prévia para o tema atual */
  function refreshHue() {
    var t = Portfolio.i18n.t;
    var theme = Portfolio.theme ? Portfolio.theme.current() : "light";
    var target = TARGETS[theme];

    els.grid.querySelectorAll("[data-hue]").forEach(function (swatch) {
      var h = Number(swatch.getAttribute("data-hue"));
      swatch.style.setProperty("--swatch", solve(h, theme, target.accent));
      swatch.setAttribute("aria-pressed", h === pendingHue ? "true" : "false");
      swatch.setAttribute("aria-label", t("prefs.swatch", { h: h, name: hueName(h) }));
    });

    var accent = solve(pendingHue, theme, target.accent);
    var rgb = hexToRgb(accent);
    els.range.value = String(pendingHue);
    els.range.setAttribute("aria-valuetext", t("prefs.hueValue", { h: pendingHue, name: hueName(pendingHue) }));
    els.chip.style.setProperty("--preview-accent", accent);
    els.sample.style.setProperty("--preview-link", solve(pendingHue, theme, target.link));
    els.readout.textContent = t("prefs.hueReadout", {
      h: pendingHue,
      rgb: "rgb(" + rgb.join(", ") + ")"
    });
  }

  function buildSwatches() {
    HUES.forEach(function (h) {
      var swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "hue-swatch";
      swatch.setAttribute("data-hue", String(h));
      swatch.addEventListener("click", function () {
        pendingHue = h;
        refreshHue();
      });
      els.grid.appendChild(swatch);
    });
  }

  /* ---------- Plano de fundo ---------- */

  var sessionImage = null; /* imagem que não coube no armazenamento */

  function defaultBackground() {
    var value = root.getAttribute("data-background-default");
    return BG_OPTIONS.indexOf(value) > -1 ? value : "liso";
  }

  function visitorImage() {
    var value = sessionImage || Portfolio.storage.get(KEYS.backgroundImage);
    return value && BG_DATA_PATTERN.test(value) ? value : null;
  }

  /* Imagem do visitante ou, na falta dela, a imagem padrão da autora */
  function imageSource() {
    var own = visitorImage();
    if (own) return own;
    var path = root.getAttribute("data-background-image");
    return path ? new URL(path, document.baseURI).href : null;
  }

  function currentBackground() {
    var value = root.getAttribute("data-background");
    return BG_OPTIONS.indexOf(value) > -1 ? value : defaultBackground();
  }

  function applyBackground(value) {
    var src = imageSource();
    if (src) root.style.setProperty("--bg-image", 'url("' + src + '")');
    else root.style.removeProperty("--bg-image");
    if (BG_OPTIONS.indexOf(value) < 0) value = defaultBackground();
    if (value === "imagem" && !src) {
      value = defaultBackground() === "imagem" ? "liso" : defaultBackground();
    }
    root.setAttribute("data-background", value);
  }

  function setBackground(value) {
    if (value === defaultBackground()) Portfolio.storage.remove(KEYS.background);
    else Portfolio.storage.set(KEYS.background, value);
    applyBackground(value);
    refreshBackground();
  }

  function refreshBackground() {
    var current = currentBackground();
    var hasImage = !!imageSource();
    els.panel.querySelectorAll("[data-bg-option]").forEach(function (button) {
      var value = button.getAttribute("data-bg-option");
      button.setAttribute("aria-pressed", value === current ? "true" : "false");
      if (value === "imagem") button.disabled = !hasImage;
    });
    els.bgRemove.hidden = !visitorImage();
  }

  function bgMessage(text) {
    els.bgMessage.textContent = text || "";
    els.bgMessage.hidden = !text;
  }

  function loadBackgroundImage(file) {
    var t = Portfolio.i18n.t;
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      bgMessage(t("prefs.bgInvalid"));
      return;
    }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      var scale = Math.min(1, BG_MAX_SIDE / Math.max(w, h));
      var canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      /* Exportar pelo canvas gera JPEG novo, sem EXIF */
      var data = canvas.toDataURL("image/jpeg", BG_QUALITY);

      var notes = [];
      if (w < BG_MIN.w || h < BG_MIN.h) notes.push(t("prefs.bgLowRes", { w: w, h: h }));
      if (Portfolio.storage.set(KEYS.backgroundImage, data)) {
        sessionImage = null;
      } else {
        sessionImage = data;
        notes.push(t("prefs.bgSessionOnly"));
      }
      setBackground("imagem");
      bgMessage(notes.join(" ") || t("prefs.bgApplied"));
      Portfolio.announce(t("prefs.bgApplied"));
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      bgMessage(t("prefs.bgInvalid"));
    };
    img.src = url;
  }

  function removeBackgroundImage() {
    sessionImage = null;
    Portfolio.storage.remove(KEYS.backgroundImage);
    if (currentBackground() === "imagem") setBackground(defaultBackground());
    else applyBackground(currentBackground());
    refreshBackground();
    bgMessage(Portfolio.i18n.t("prefs.bgRemoved"));
    Portfolio.announce(Portfolio.i18n.t("prefs.bgRemoved"));
  }

  /* ---------- Painel ---------- */

  function isOpen() {
    return els.toggle.getAttribute("aria-expanded") === "true";
  }

  function setOpen(open) {
    els.toggle.setAttribute("aria-expanded", open ? "true" : "false");
    els.panel.hidden = !open;
    if (open) {
      pendingHue = appliedHue;
      refreshPressed();
      refreshHue();
    }
  }

  function applyPending() {
    if (pendingHue === DEFAULT_HUE) {
      clearAccent();
      Portfolio.storage.remove(KEYS.accent);
    } else {
      var colors = palette(pendingHue);
      applyAccent(colors);
      Portfolio.storage.set(KEYS.accent, JSON.stringify(colors));
    }
    appliedHue = pendingHue;
    refreshHue();
    Portfolio.announce(Portfolio.i18n.t("prefs.applied"));
  }

  function resetAll() {
    setChoice("data-text-size", KEYS.size, DEFAULT_SIZE, DEFAULT_SIZE);
    setChoice("data-font", KEYS.font, DEFAULT_FONT, DEFAULT_FONT);
    clearAccent();
    Portfolio.storage.remove(KEYS.accent);
    appliedHue = pendingHue = DEFAULT_HUE;
    sessionImage = null;
    Portfolio.storage.remove(KEYS.background);
    Portfolio.storage.remove(KEYS.backgroundImage);
    applyBackground(defaultBackground());
    refreshBackground();
    bgMessage("");
    refreshHue();
    Portfolio.announce(Portfolio.i18n.t("prefs.restored"));
  }

  Portfolio.preferences = {
    /* Exposto para testes e documentação */
    palette: palette,
    contrast: function (a, b) {
      return contrast(hexToRgb(a), hexToRgb(b));
    },

    init: function () {
      els.wrapper = document.querySelector("[data-prefs]");
      if (!els.wrapper) return;
      els.toggle = els.wrapper.querySelector("[data-prefs-toggle]");
      els.panel = document.getElementById(els.toggle.getAttribute("aria-controls"));
      els.grid = els.panel.querySelector("[data-hue-grid]");
      els.range = els.panel.querySelector("[data-hue-range]");
      els.chip = els.panel.querySelector("[data-hue-chip]");
      els.sample = els.panel.querySelector("[data-hue-sample]");
      els.readout = els.panel.querySelector("[data-hue-readout]");

      /* Revalida valores salvos (caso o script do <head> não tenha rodado) */
      var size = Portfolio.storage.get(KEYS.size);
      if (SIZES.indexOf(size) > -1 && size !== DEFAULT_SIZE) root.setAttribute("data-text-size", size);
      var font = Portfolio.storage.get(KEYS.font);
      if (FONTS.indexOf(font) > -1 && font !== DEFAULT_FONT) root.setAttribute("data-font", font);
      var accent = readAccent();
      if (accent) {
        applyAccent(accent);
        appliedHue = pendingHue = accent.h;
      }
      applyBackground(Portfolio.storage.get(KEYS.background) || defaultBackground());

      els.bgRemove = els.panel.querySelector("[data-bg-remove]");
      els.bgMessage = els.panel.querySelector("[data-bg-message]");
      els.panel.querySelectorAll("[data-bg-option]").forEach(function (button) {
        button.addEventListener("click", function () {
          setBackground(button.getAttribute("data-bg-option"));
          bgMessage("");
          Portfolio.announce(Portfolio.i18n.t("prefs.bgApplied"));
        });
      });
      var bgFile = els.panel.querySelector("[data-bg-file]");
      bgFile.addEventListener("change", function () {
        loadBackgroundImage(bgFile.files && bgFile.files[0]);
        bgFile.value = "";
      });
      els.bgRemove.addEventListener("click", removeBackgroundImage);

      buildSwatches();

      els.toggle.addEventListener("click", function () {
        setOpen(!isOpen());
      });

      els.panel.querySelectorAll("[data-size-option]").forEach(function (button) {
        button.addEventListener("click", function () {
          setChoice("data-text-size", KEYS.size, button.getAttribute("data-size-option"), DEFAULT_SIZE);
        });
      });

      els.panel.querySelectorAll("[data-font-option]").forEach(function (button) {
        button.addEventListener("click", function () {
          setChoice("data-font", KEYS.font, button.getAttribute("data-font-option"), DEFAULT_FONT);
        });
      });

      els.range.addEventListener("input", function () {
        pendingHue = Number(els.range.value);
        refreshHue();
      });

      els.panel.querySelector("[data-accent-apply]").addEventListener("click", applyPending);
      els.panel.querySelector("[data-prefs-reset]").addEventListener("click", resetAll);

      /* Esc fecha e devolve o foco; clique fora fecha sem mover o foco */
      els.wrapper.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isOpen()) {
          setOpen(false);
          els.toggle.focus();
        }
      });
      document.addEventListener("click", function (event) {
        if (isOpen() && !els.wrapper.contains(event.target)) setOpen(false);
      });
      /* Se o foco sair do painel (Tab), ele fecha: o painel não pode
         esconder o elemento focado (WCAG 2.4.11) */
      els.wrapper.addEventListener("focusout", function (event) {
        if (isOpen() && event.relatedTarget && !els.wrapper.contains(event.relatedTarget)) setOpen(false);
      });

      document.addEventListener("portfolio:themechange", refreshHue);
      document.addEventListener("portfolio:languagechange", refreshHue);

      els.wrapper.hidden = false;
      refreshPressed();
      refreshBackground();
      refreshHue();
    }
  };
})();
