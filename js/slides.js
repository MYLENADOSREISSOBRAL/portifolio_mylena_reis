/* ==========================================================================
   Apresentação de slides (_layouts/slides.html)
   - Sem JavaScript, os slides aparecem um abaixo do outro (modo documento).
   - Com JavaScript: um slide por vez; ← → Espaço PageUp/PageDown Home End,
     F para tela cheia, botões, deslizar no celular; endereço por slide (#3);
     listas com a classe "passos" aparecem item a item.
   - Leitores de tela são avisados do slide atual (região role="status").
   ========================================================================== */
(function () {
  "use strict";

  var Portfolio = (window.Portfolio = window.Portfolio || {});
  var deck = document.querySelector("[data-deck]");
  if (!deck) return;

  var root = document.documentElement;
  var slides = Array.prototype.slice.call(deck.querySelectorAll(".deck-slide"));
  var counter = document.querySelector("[data-deck-counter]");
  var progress = document.querySelector("[data-deck-progress]");
  var prevButton = document.querySelector("[data-deck-prev]");
  var nextButton = document.querySelector("[data-deck-next]");
  var fullButton = document.querySelector("[data-deck-fullscreen]");
  var printButton = document.querySelector("[data-deck-print]");
  var current = 0;
  var step = 0;

  function t(key, params) {
    return Portfolio.i18n ? Portfolio.i18n.t(key, params) : "";
  }

  function stepsOf(slide) {
    return slide.querySelectorAll(".passos > li");
  }

  function headingOf(slide) {
    var heading = slide.querySelector("h1, h2, h3");
    return heading ? heading.textContent.trim() : "";
  }

  /* Enquadramento: se o conteúdo não cabe no slide, reduz o texto daquele
     slide só o necessário (busca binária na escala, até MIN_SCALE). Itens
     "passos" ainda ocultos já ocupam espaço, então a escala não muda no meio
     do slide. Abaixo de MIN_SCALE, o slide volta a rolar por dentro. */
  var MIN_SCALE = 0.6;

  function overflows(inner) {
    return inner.scrollHeight > inner.clientHeight + 1 || inner.scrollWidth > inner.clientWidth + 1;
  }

  function fitSlide(slide) {
    var inner = slide.querySelector(".deck-slide__inner");
    inner.style.fontSize = "";
    if (!overflows(inner)) return;
    var low = MIN_SCALE;
    var high = 1;
    for (var i = 0; i < 7; i++) {
      var mid = (low + high) / 2;
      inner.style.fontSize = mid + "em";
      if (overflows(inner)) high = mid;
      else low = mid;
    }
    inner.style.fontSize = low + "em";
  }

  /* Slide longo demais rola dentro dele: precisa receber foco (WCAG 2.1.1) */
  function updateScrollFocus(slide) {
    fitSlide(slide);
    var inner = slide.querySelector(".deck-slide__inner");
    if (overflows(inner)) inner.setAttribute("tabindex", "0");
    else inner.removeAttribute("tabindex");
  }

  /* Regulador de letras da linha do tempo: muda a escala dos rótulos
     (--ldt-escala, css/slides.css) e limita o máximo para que nenhum rótulo
     passe da largura da sua coluna (data-coluna, em unidades do viewBox) */
  var LDT_CHAVE = "ldt-escala";

  function regularLinhaDoTempo(figure, escala) {
    var regulador = figure.querySelector("[data-ldt-regulador]");
    var input = regulador.querySelector("input");
    var coluna = parseFloat(regulador.getAttribute("data-coluna"));
    var minimo = parseFloat(input.min);
    figure.style.setProperty("--ldt-escala", escala);

    /* getBBox só mede com o slide visível (oculto: 0 ou erro) */
    var maior = 0;
    try {
      figure.querySelectorAll(".ldt-acao").forEach(function (text) {
        maior = Math.max(maior, text.getBBox().width);
      });
    } catch (e) {
      maior = 0;
    }
    if (maior > 0) {
      var limite = Math.floor(escala * coluna / maior * 20) / 20;
      input.max = Math.max(minimo, Math.min(parseFloat(input.getAttribute("data-max")), limite));
      if (escala > parseFloat(input.max)) {
        escala = parseFloat(input.max);
        figure.style.setProperty("--ldt-escala", escala);
      }
    }
    input.value = escala;
    regulador.querySelector("output").textContent = Math.round(escala * 100) + "%";
  }

  function escalaGuardada() {
    try {
      return parseFloat(window.localStorage.getItem(LDT_CHAVE)) || 1;
    } catch (e) {
      return 1;
    }
  }

  var ldtEscala = escalaGuardada();
  var figurasRegulaveis = Array.prototype.slice.call(deck.querySelectorAll(".deck-figura"))
    .filter(function (figure) { return figure.querySelector("[data-ldt-regulador]"); });

  figurasRegulaveis.forEach(function (figure) {
    var regulador = figure.querySelector("[data-ldt-regulador]");
    var input = regulador.querySelector("input");
    input.setAttribute("data-max", input.max);
    regulador.hidden = false;
    input.addEventListener("input", function () {
      regularLinhaDoTempo(figure, parseFloat(input.value));
      ldtEscala = parseFloat(input.value);
      try {
        window.localStorage.setItem(LDT_CHAVE, input.value);
      } catch (e) { /* sem armazenamento: vale só nesta visita */ }
    });
  });

  function render(announce) {
    slides.forEach(function (slide, index) {
      slide.hidden = index !== current;
    });
    var slide = slides[current];
    var items = stepsOf(slide);
    Array.prototype.forEach.call(items, function (item, index) {
      item.classList.toggle("passo-oculto", index >= step);
    });

    counter.textContent = (current + 1) + " / " + slides.length;
    progress.style.width = ((current + 1) / slides.length * 100) + "%";
    prevButton.disabled = current === 0 && step === 0;
    nextButton.disabled = current === slides.length - 1 && step >= items.length;
    figurasRegulaveis.forEach(function (figure) {
      if (slide.contains(figure)) regularLinhaDoTempo(figure, ldtEscala);
    });
    updateScrollFocus(slide);

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + (current + 1));
    }
    if (announce) {
      Portfolio.announce(t("deck.status", { n: current + 1, t: slides.length, h: headingOf(slide) }));
    }
  }

  function goTo(index, revealAll) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    step = revealAll ? stepsOf(slides[current]).length : 0;
    render(true);
  }

  function next() {
    if (step < stepsOf(slides[current]).length) {
      step++;
      render(false);
    } else {
      goTo(current + 1, false);
    }
  }

  function previous() {
    if (step > 0) {
      step--;
      render(false);
    } else {
      goTo(current - 1, true);
    }
  }

  function fromHash() {
    var n = parseInt(window.location.hash.slice(1), 10);
    return n >= 1 && n <= slides.length ? n - 1 : 0;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement && root.requestFullscreen) root.requestFullscreen();
    else if (document.exitFullscreen && document.fullscreenElement) document.exitFullscreen();
  }

  /* Teclas que ativam botões/links focados não devem também avançar o slide */
  function isInteractive(target) {
    return target.closest && target.closest("a, button, input, textarea, select, [contenteditable]");
  }

  document.addEventListener("keydown", function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    var key = event.key;
    /* Setas num controle (regulador de letras) mexem nele, não no slide */
    if (event.target.closest && event.target.closest("input, select, textarea")) return;
    if ((key === " " || key === "Enter") && isInteractive(event.target)) return;
    if (key === "ArrowRight" || key === "PageDown" || key === " " || key === "Enter") {
      event.preventDefault();
      next();
    } else if (key === "ArrowLeft" || key === "PageUp") {
      event.preventDefault();
      previous();
    } else if (key === "Home") {
      event.preventDefault();
      goTo(0, false);
    } else if (key === "End") {
      event.preventDefault();
      goTo(slides.length - 1, true);
    } else if (key === "f" || key === "F") {
      toggleFullscreen();
    }
  });

  prevButton.addEventListener("click", previous);
  nextButton.addEventListener("click", next);
  if (fullButton && root.requestFullscreen) {
    fullButton.hidden = false;
    fullButton.addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", function () {
      fullButton.setAttribute("aria-pressed", document.fullscreenElement ? "true" : "false");
    });
  }
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener("click", function () { window.print(); });
  }

  /* Deslizar o dedo no celular */
  var touchX = null;
  deck.addEventListener("touchstart", function (event) {
    /* Figura que rola na horizontal (linha do tempo em tela em pé): o dedo
       rola a figura em vez de trocar de slide */
    var figure = event.target.closest && event.target.closest(".deck-figura");
    var rolavel = figure && figure.scrollWidth > figure.clientWidth + 1;
    touchX = rolavel || event.target.closest("input") ? null : event.touches[0].clientX;
  }, { passive: true });
  deck.addEventListener("touchend", function (event) {
    if (touchX === null) return;
    var dx = event.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else previous();
    }
    touchX = null;
  });

  window.addEventListener("hashchange", function () {
    var target = fromHash();
    if (target !== current) goTo(target, false);
  });
  window.addEventListener("resize", function () { updateScrollFocus(slides[current]); });

  /* Impressão / PDF: todos os slides, um por página (css/slides.css) */
  window.addEventListener("beforeprint", function () { root.classList.add("deck-imprimindo"); });
  window.addEventListener("afterprint", function () { root.classList.remove("deck-imprimindo"); });

  /* QR code da capa: endereço da apresentação (data-qr) */
  var qr = deck.querySelector("[data-qr]");
  if (qr && window.qrcode) {
    var codigo = window.qrcode(0, "M");
    codigo.addData(qr.getAttribute("data-qr"));
    codigo.make();
    var alvo = qr.querySelector("[data-qr-codigo]");
    alvo.innerHTML = codigo.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
    /* O endereço já está escrito na legenda */
    alvo.firstChild.setAttribute("aria-hidden", "true");
  }

  /* Termos com balão ao passar o mouse (data-termo-hover): o clique
     continua abrindo e fechando o balão (popover) */
  document.querySelectorAll("[data-termo-hover]").forEach(function (termo) {
    var balao = document.getElementById(termo.getAttribute("popovertarget"));
    if (!balao || !balao.showPopover) return;
    termo.addEventListener("mouseenter", function () {
      if (!balao.matches(":popover-open")) balao.showPopover();
    });
    termo.addEventListener("mouseleave", function () {
      if (balao.matches(":popover-open")) balao.hidePopover();
    });
  });

  root.classList.add("deck-ativo");
  document.querySelectorAll("[data-deck-controls], [data-deck-hint]").forEach(function (el) {
    el.hidden = false;
  });
  current = fromHash();
  render(false);
})();
