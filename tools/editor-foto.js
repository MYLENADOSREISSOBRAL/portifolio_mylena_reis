/* ==========================================================================
   Editor de foto de perfil (ferramenta pessoal, sem link no menu público)
   ---------------------------------------------------------------------------
   - Recorte (zoom, posição, endireitar), filtros predefinidos e ajustes
     (brilho, contraste, saturação, vinheta).
   - Filtros e ajustes são calculados pixel a pixel aqui mesmo, para que o
     arquivo baixado seja idêntico à prévia em qualquer navegador.
   - Exporta JPEG 480×480; a exportação via canvas não carrega EXIF.
   - Nada é enviado a servidores.
   ========================================================================== */
(function () {
  "use strict";

  var SIZE = 480; /* lado do profile.jpg usado no site */
  var THUMB = 64;
  var MAX_SOURCE = 2000; /* fotos maiores são reduzidas ao carregar */
  var JPEG_QUALITY = 0.86;
  var DEFAULT_SRC = "../assets/images/profile.jpg";
  var STEP = 8; /* passo das setas, em pixels da foto final */

  /* Parâmetros somados aos ajustes manuais (mesma escala de −100 a 100) */
  var FILTERS = [
    { id: "original", name: "Original", params: {} },
    { id: "natural", name: "Natural", params: { contrast: 8, saturation: 6, warmth: 4 } },
    { id: "luminoso", name: "Luminoso", params: { brightness: 10, contrast: -4, saturation: 4 } },
    { id: "contraste", name: "Contraste", params: { contrast: 22, saturation: 10 } },
    { id: "classico", name: "Clássico P&B", params: { grayscale: 1, contrast: 10 } },
    { id: "quente", name: "Quente", params: { warmth: 18, saturation: 6 } },
    { id: "frio", name: "Frio", params: { warmth: -16, saturation: -4 } }
  ];

  var DEFAULTS = {
    zoom: 1, rotation: 0, x: 0, y: 0, filter: "original",
    brightness: 0, contrast: 0, saturation: 0, vignette: 0
  };

  var state = Object.assign({}, DEFAULTS);
  var source = null; /* canvas com a foto de origem */
  var tainted = false; /* foto bloqueada para leitura de pixels (file://) */
  var showOriginal = false;
  var pending = 0;
  var drag = null;
  var els = {};

  /* ---------- Utilitários ---------- */

  function announce(message) {
    els.status.textContent = "";
    window.setTimeout(function () {
      els.status.textContent = message;
    }, 50);
  }

  function notice(message, kind) {
    els.notice.textContent = message || "";
    els.notice.hidden = !message;
    els.notice.className = "editor-notice" + (kind ? " editor-notice--" + kind : "");
  }

  function decimal(value, digits) {
    return value.toFixed(digits).replace(".", ",");
  }

  function signed(value) {
    return value > 0 ? "+" + value : String(value);
  }

  function findFilter(id) {
    for (var i = 0; i < FILTERS.length; i++) if (FILTERS[i].id === id) return FILTERS[i];
    return FILTERS[0];
  }

  /* ---------- Recorte ---------- */

  function baseScale() {
    return Math.max(SIZE / source.width, SIZE / source.height);
  }

  /* Impede que a foto deixe áreas vazias dentro do quadro */
  function clampOffsets() {
    var s = baseScale() * state.zoom;
    var maxX = Math.max(0, (source.width * s - SIZE) / 2);
    var maxY = Math.max(0, (source.height * s - SIZE) / 2);
    state.x = Math.min(maxX, Math.max(-maxX, state.x));
    state.y = Math.min(maxY, Math.max(-maxY, state.y));
  }

  function drawCrop(ctx, size) {
    var k = size / SIZE;
    var angle = state.rotation * Math.PI / 180;
    /* Ao endireitar, amplia o suficiente para não mostrar cantos vazios */
    var cover = Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle));
    var s = baseScale() * state.zoom * cover * k;
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.translate(size / 2 + state.x * k, size / 2 + state.y * k);
    ctx.rotate(angle);
    ctx.scale(s, s);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, -source.width / 2, -source.height / 2);
    ctx.restore();
  }

  /* ---------- Filtros e ajustes (pixel a pixel) ---------- */

  function paramsFor(filterId) {
    var preset = findFilter(filterId).params;
    return {
      brightness: (preset.brightness || 0) + state.brightness,
      contrast: (preset.contrast || 0) + state.contrast,
      saturation: (preset.saturation || 0) + state.saturation,
      warmth: preset.warmth || 0,
      grayscale: preset.grayscale || 0,
      vignette: state.vignette
    };
  }

  function smoothstep(edge0, edge1, x) {
    var t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  function processPixels(ctx, size, p) {
    var image = ctx.getImageData(0, 0, size, size);
    var d = image.data;
    var brightness = p.brightness * 1.28;
    var c = Math.max(-254, Math.min(254, p.contrast * 1.28));
    var contrast = (259 * (c + 255)) / (255 * (259 - c));
    var saturation = Math.max(0, 1 + p.saturation / 100);
    var warmth = p.warmth * 0.6;
    var gray = p.grayscale;
    var vignette = p.vignette / 100;
    var half = size / 2;

    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var i = (y * size + x) * 4;
        var r = d[i] + brightness;
        var g = d[i + 1] + brightness;
        var b = d[i + 2] + brightness;

        r = contrast * (r - 128) + 128;
        g = contrast * (g - 128) + 128;
        b = contrast * (b - 128) + 128;

        var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        r = lum + (r - lum) * saturation;
        g = lum + (g - lum) * saturation;
        b = lum + (b - lum) * saturation;

        if (gray) {
          lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          r += (lum - r) * gray;
          g += (lum - g) * gray;
          b += (lum - b) * gray;
        }

        r += warmth;
        b -= warmth;

        if (vignette) {
          var dx = (x - half) / half;
          var dy = (y - half) / half;
          var t = smoothstep(0.35, 1.05, Math.sqrt(dx * dx + dy * dy)) * 0.55 * Math.abs(vignette);
          if (vignette > 0) {
            r *= 1 - t; g *= 1 - t; b *= 1 - t;
          } else {
            r += (255 - r) * t; g += (255 - g) * t; b += (255 - b) * t;
          }
        }

        d[i] = r; /* Uint8ClampedArray arredonda e limita a 0–255 */
        d[i + 1] = g;
        d[i + 2] = b;
      }
    }
    ctx.putImageData(image, 0, 0);
  }

  function context(canvas) {
    return canvas.getContext("2d", { willReadFrequently: true });
  }

  /* ---------- Renderização ---------- */

  function render() {
    pending = 0;
    if (!source) return;
    var ctx = context(els.canvas);
    drawCrop(ctx, SIZE);
    if (!tainted && !showOriginal) processPixels(ctx, SIZE, paramsFor(state.filter));
    if (!els.filtersPanel.hidden) renderThumbs();
    syncControls();
  }

  function schedule() {
    if (!pending) pending = window.requestAnimationFrame(render);
  }

  function renderThumbs() {
    FILTERS.forEach(function (filter) {
      var ctx = context(els.thumbs[filter.id]);
      drawCrop(ctx, THUMB);
      if (!tainted) processPixels(ctx, THUMB, paramsFor(filter.id));
    });
  }

  function syncControls() {
    els.controls.forEach(function (input) {
      var key = input.getAttribute("data-control");
      var value = state[key];
      var text;
      if (key === "zoom") {
        input.value = String(Math.round(value * 100));
        text = decimal(value, 2) + "×";
        input.setAttribute("aria-valuetext", decimal(value, 2) + " vezes");
      } else if (key === "rotation") {
        input.value = String(value);
        text = value + "°";
        input.setAttribute("aria-valuetext", value + " graus");
      } else {
        input.value = String(value);
        text = signed(value);
        input.setAttribute("aria-valuetext", text);
      }
      var output = document.querySelector('[data-output="' + key + '"]');
      if (output) output.textContent = text;
    });

    els.filterButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-filter") === state.filter ? "true" : "false");
    });
    els.compare.setAttribute("aria-pressed", showOriginal ? "true" : "false");
    els.stage.setAttribute("aria-label",
      "Prévia da foto de perfil: zoom " + decimal(state.zoom, 2) + "×, rotação " + state.rotation +
      "°, filtro " + findFilter(state.filter).name + (showOriginal ? " (exibindo sem filtros e ajustes)" : ""));
  }

  function setEnabled(enabled) {
    els.controls.forEach(function (input) { input.disabled = !enabled; });
    els.filterButtons.forEach(function (button) { button.disabled = !enabled; });
    els.compare.disabled = !enabled;
    els.reset.disabled = !enabled;
    els.download.disabled = !enabled;
    els.stage.tabIndex = enabled ? 0 : -1;
  }

  function reset(silent) {
    state = Object.assign({}, DEFAULTS);
    showOriginal = false;
    schedule();
    if (!silent) announce("Recorte, filtros e ajustes restaurados.");
  }

  /* ---------- Carregamento ---------- */

  function isTainted(canvas) {
    try {
      canvas.getContext("2d").getImageData(0, 0, 1, 1);
      return false;
    } catch (error) {
      return true;
    }
  }

  /* Um canvas "contaminado" (foto file://) nunca volta a permitir leitura de
     pixels; ao trocar de foto, a prévia e as miniaturas são recriadas. */
  function freshCanvas(old) {
    var canvas = old.cloneNode(false);
    old.parentNode.replaceChild(canvas, old);
    return canvas;
  }

  function useImage(img) {
    els.canvas = freshCanvas(els.canvas);
    FILTERS.forEach(function (filter) {
      els.thumbs[filter.id] = freshCanvas(els.thumbs[filter.id]);
    });

    var w = img.naturalWidth || img.width;
    var h = img.naturalHeight || img.height;
    var scale = Math.min(1, MAX_SOURCE / Math.max(w, h));
    var canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    source = canvas;
    tainted = isTainted(canvas);
    setEnabled(!tainted);
    reset(true);
    render();
  }

  function loadDefault() {
    var img = new Image();
    img.onload = function () {
      useImage(img);
      if (tainted) {
        notice("Aberto diretamente do computador (file://), o navegador bloqueia a edição da foto padrão por segurança. " +
          "Use “Carregar outra foto” ou abra o editor pelo servidor local (http://127.0.0.1:8000/tools/editor-foto.html).", "warning");
      }
    };
    img.onerror = function () {
      notice("Não foi possível abrir a foto atual do site. Use “Carregar outra foto”.", "warning");
    };
    img.src = DEFAULT_SRC;
  }

  function loadFile(file) {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      notice("Selecione uma imagem JPEG, PNG ou WebP.", "warning");
      return;
    }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      useImage(img);
      notice("Antes de publicar, confira se não há outras pessoas identificáveis na foto. " +
        "Se houver, prefira editar a foto atual do site, que já tem o fundo desfocado.", "info");
      announce("Foto carregada.");
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      notice("Não foi possível abrir esta imagem.", "warning");
    };
    img.src = url;
  }

  /* ---------- Exportação ---------- */

  function exportBlob() {
    return new Promise(function (resolve, reject) {
      if (!source || tainted) return reject(new Error("foto indisponível para exportação"));
      var canvas = document.createElement("canvas");
      canvas.width = canvas.height = SIZE;
      var ctx = context(canvas);
      drawCrop(ctx, SIZE);
      processPixels(ctx, SIZE, paramsFor(state.filter));
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error("falha ao gerar JPEG"));
      }, "image/jpeg", JPEG_QUALITY);
    });
  }

  function download() {
    exportBlob().then(function (blob) {
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "profile.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 4000);
      announce("Foto baixada: profile.jpg, 480 × 480 pixels.");
    }).catch(function () {
      notice("Não foi possível gerar o arquivo. Tente carregar a foto novamente.", "warning");
    });
  }

  /* ---------- Interação ---------- */

  function initTabs() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (item) {
        var active = item === tab;
        item.setAttribute("aria-selected", active ? "true" : "false");
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls")).hidden = !active;
      });
      if (focus) tab.focus();
      schedule();
    }
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (event) {
        var target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }[event.key];
        if (target === undefined) return;
        event.preventDefault();
        select(tabs[(target + tabs.length) % tabs.length], true);
      });
    });
  }

  function initFilters() {
    els.thumbs = {};
    FILTERS.forEach(function (filter) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "filter-option";
      button.setAttribute("data-filter", filter.id);
      button.setAttribute("aria-pressed", "false");
      var thumb = document.createElement("canvas");
      thumb.width = thumb.height = THUMB;
      thumb.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.textContent = filter.name;
      button.appendChild(thumb);
      button.appendChild(label);
      button.addEventListener("click", function () {
        state.filter = filter.id;
        schedule();
      });
      els.filterList.appendChild(button);
      els.thumbs[filter.id] = thumb;
    });
    els.filterButtons = Array.prototype.slice.call(els.filterList.querySelectorAll("[data-filter]"));
  }

  function initStage() {
    els.stage.addEventListener("pointerdown", function (event) {
      if (!source || tainted) return;
      drag = { x: event.clientX, y: event.clientY };
      els.stage.setPointerCapture(event.pointerId);
      els.stage.classList.add("is-dragging");
    });
    els.stage.addEventListener("pointermove", function (event) {
      if (!drag) return;
      var k = SIZE / els.stage.getBoundingClientRect().width;
      state.x += (event.clientX - drag.x) * k;
      state.y += (event.clientY - drag.y) * k;
      drag = { x: event.clientX, y: event.clientY };
      clampOffsets();
      schedule();
    });
    function endDrag() {
      drag = null;
      els.stage.classList.remove("is-dragging");
    }
    els.stage.addEventListener("pointerup", endDrag);
    els.stage.addEventListener("pointercancel", endDrag);

    els.stage.addEventListener("keydown", function (event) {
      if (!source || tainted) return;
      var step = event.shiftKey ? STEP * 4 : STEP;
      var moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
      if (moves[event.key]) {
        state.x += moves[event.key][0];
        state.y += moves[event.key][1];
        clampOffsets();
      } else if (event.key === "+" || event.key === "=") {
        state.zoom = Math.min(3, state.zoom + 0.05);
        clampOffsets();
      } else if (event.key === "-" || event.key === "_") {
        state.zoom = Math.max(1, state.zoom - 0.05);
        clampOffsets();
      } else {
        return;
      }
      event.preventDefault();
      schedule();
    });
  }

  function init() {
    els.status = document.querySelector("[data-status]");
    els.notice = document.querySelector("[data-notice]");
    els.stage = document.querySelector("[data-stage]");
    els.canvas = document.querySelector("[data-canvas]");
    els.filterList = document.querySelector("[data-filter-list]");
    els.filtersPanel = document.getElementById("painel-filtros");
    els.compare = document.querySelector("[data-compare]");
    els.reset = document.querySelector("[data-reset]");
    els.download = document.querySelector("[data-download]");
    els.file = document.querySelector("[data-file]");
    els.controls = Array.prototype.slice.call(document.querySelectorAll("[data-control]"));

    initFilters();
    initTabs();
    initStage();

    els.controls.forEach(function (input) {
      input.addEventListener("input", function () {
        var key = input.getAttribute("data-control");
        var value = Number(input.value);
        state[key] = key === "zoom" ? value / 100 : value;
        if (key === "zoom") clampOffsets();
        schedule();
      });
    });

    els.compare.addEventListener("click", function () {
      showOriginal = !showOriginal;
      schedule();
    });
    els.reset.addEventListener("click", function () { reset(false); });
    els.download.addEventListener("click", download);
    els.file.addEventListener("change", function () {
      loadFile(els.file.files && els.file.files[0]);
      els.file.value = "";
    });

    setEnabled(false);
    loadDefault();
  }

  /* Interface mínima para testes automatizados */
  window.PhotoEditor = {
    getState: function () { return Object.assign({}, state); },
    set: function (values) {
      Object.assign(state, values);
      if (source) clampOffsets();
      render();
    },
    exportBlob: exportBlob,
    isReady: function () { return !!source; },
    isTainted: function () { return tainted; }
  };

  init();
})();
