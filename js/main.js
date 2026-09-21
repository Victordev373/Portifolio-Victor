/*
 * main.js
 * -----------------------------------------------------------------------
 * JavaScript puro, sem framework de animação. Só Lenis (scroll suave) +
 * IntersectionObserver para revelar conteúdo. Nada de canvas, nada de
 * pin de scroll, nada de filtros pesados (blur/glow) em elementos
 * animados — só opacity/transform, que o navegador anima na GPU.
 *
 * Os projetos vêm de window.projetos (definido em js/projetos.js).
 * -----------------------------------------------------------------------
 */

(function () {
  "use strict";

  /* =====================================================================
     CONFIGURAÇÃO — edite aqui o número de WhatsApp
     ===================================================================== */
  const CONFIG = {
    whatsapp: "5593991706598",
    mensagemPadrao: "Olá Victor, vim pelo seu portfólio e quero um orçamento de site",
  };

  function linkWhatsApp(mensagem) {
    const texto = encodeURIComponent(mensagem || CONFIG.mensagemPadrao);
    return `https://wa.me/${CONFIG.whatsapp}?text=${texto}`;
  }

  const prefereReduzirMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================================
     CTAs de WhatsApp
     ===================================================================== */
  function iniciarCtasWhatsApp() {
    document.querySelectorAll("[data-cta-whatsapp]").forEach((el) => {
      el.setAttribute("href", linkWhatsApp(CONFIG.mensagemPadrao));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll("[data-whatsapp-msg]").forEach((el) => {
      el.addEventListener("click", () => {
        const tipo = el.getAttribute("data-whatsapp-msg");
        const mensagem = `Olá Victor, vim pelo seu portfólio e quero um orçamento de um(a) ${tipo}`;
        window.open(linkWhatsApp(mensagem), "_blank", "noopener,noreferrer");
      });
    });
  }

  /* =====================================================================
     Ano no rodapé
     ===================================================================== */
  function iniciarAno() {
    const anoEl = document.getElementById("anoAtual");
    if (anoEl) anoEl.textContent = new Date().getFullYear();
  }

  /* =====================================================================
     Menu mobile
     ===================================================================== */
  function iniciarMenuMobile() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const aberto = nav.classList.toggle("header__nav--aberto");
      toggle.classList.toggle("header__toggle--ativo", aberto);
      toggle.setAttribute("aria-expanded", String(aberto));
    });
  }

  /* =====================================================================
     Lenis — scroll suave (único "framework" de animação do site)
     ===================================================================== */
  let lenis = null;

  function iniciarLenis() {
    if (prefereReduzirMovimento || typeof Lenis === "undefined") return;

    lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.1 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* =====================================================================
     Header — troca de cor ao passar por seções escuras (IntersectionObserver)
     ===================================================================== */
  function iniciarHeaderDinamico() {
    const header = document.getElementById("header");
    const escuras = [
      document.getElementById("hero"),
      document.getElementById("processo"),
      document.querySelector(".rodape"),
    ].filter(Boolean);
    if (!header || !escuras.length) return;

    const alturaHeader = header.offsetHeight || 70;

    const atualizar = () => {
      const emSecaoEscura = escuras.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= alturaHeader && r.bottom >= alturaHeader;
      });
      header.dataset.theme = emSecaoEscura ? "escuro" : "claro";
    };

    const observer = new IntersectionObserver(atualizar, {
      rootMargin: `-${alturaHeader}px 0px -${alturaHeader}px 0px`,
      threshold: 0,
    });
    escuras.forEach((el) => observer.observe(el));
    atualizar();
  }

  /* =====================================================================
     2. PORTFÓLIO NO DISPOSITIVO — vídeo com lazy load + play/pause
     ===================================================================== */
  function iniciarPortfolio() {
    const projetos = window.projetos || [];
    const abasWrap = document.getElementById("portfolioAbas");
    const legendaWrap = document.getElementById("portfolioLegenda");
    const videoEl = document.getElementById("dispositivoVideo");
    const dispositivo = document.getElementById("dispositivo");

    if (!projetos.length || !abasWrap || !videoEl) return;

    let indiceAtivo = 0;
    let noViewport = false;

    function renderizarAbas() {
      abasWrap.innerHTML = "";
      projetos.forEach((projeto, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "aba" + (i === indiceAtivo ? " aba--ativa" : "");
        btn.style.setProperty("--cor", projeto.cor);
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", String(i === indiceAtivo));
        btn.innerHTML = `<span class="aba__ponto"></span>${projeto.nome}`;
        btn.addEventListener("click", () => trocarProjeto(i));
        abasWrap.appendChild(btn);
      });
    }

    function renderizarLegenda(projeto) {
      const temLink = projeto.link && projeto.link !== "[LINK]";
      legendaWrap.innerHTML = `
        <span class="rotulo legenda__tipo">${projeto.tipo}</span>
        <p class="legenda__descricao">${projeto.descricao}</p>
        <p class="legenda__resultado">${projeto.resultado}</p>
        ${
          temLink
            ? `<a class="legenda__link rotulo" href="${projeto.link}" target="_blank" rel="noopener noreferrer">Ver site ao vivo →</a>`
            : `<span class="legenda__link rotulo" style="opacity:.4">Site em breve</span>`
        }
      `;
    }

    // Carrega o vídeo só quando faz sentido: aba ativa + seção visível.
    // Nunca toca 2 vídeos ao mesmo tempo (é sempre o mesmo <video>, só
    // troca o src). Sem prefers-reduced-motion, só mostra o poster.
    function aplicarProjeto(projeto, comAutoplay) {
      videoEl.pause();
      videoEl.poster = projeto.imagens.capa;

      if (!projeto.video || prefereReduzirMovimento) {
        videoEl.removeAttribute("src");
        videoEl.load();
        return;
      }

      if (comAutoplay && noViewport) {
        videoEl.src = projeto.video;
        videoEl.play().catch(() => {});
      } else {
        videoEl.removeAttribute("src");
        videoEl.load();
      }
    }

    function trocarProjeto(i) {
      if (i === indiceAtivo) return;
      indiceAtivo = i;
      renderizarAbas();
      renderizarLegenda(projetos[i]);
      aplicarProjeto(projetos[i], true);
    }

    // Play/pause conforme o mockup entra e sai da tela
    if (dispositivo) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            noViewport = entry.isIntersecting;
            const projeto = projetos[indiceAtivo];
            if (!projeto.video || prefereReduzirMovimento) return;

            if (noViewport) {
              if (!videoEl.getAttribute("src")) videoEl.src = projeto.video;
              videoEl.play().catch(() => {});
            } else {
              videoEl.pause();
            }
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(dispositivo);
    }

    renderizarAbas();
    renderizarLegenda(projetos[0]);
    aplicarProjeto(projetos[0], false);
  }

  /* =====================================================================
     6. PROCESSO — barra de progresso vertical (só transform, sem SVG)
     ===================================================================== */
  function iniciarProcesso() {
    const secao = document.querySelector(".processo");
    const linha = document.getElementById("processoLinha");
    const etapas = Array.from(document.querySelectorAll(".etapa"));

    if (!secao || !linha || !etapas.length) return;

    if (prefereReduzirMovimento) {
      etapas.forEach((el) => el.classList.add("etapa--ativa"));
      linha.style.transform = "scaleY(1)";
      return;
    }

    // Cada etapa acende quando entra na tela (1 observer, leve)
    const observerEtapas = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("etapa--ativa");
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    etapas.forEach((el) => observerEtapas.observe(el));

    // Preenchimento da barra: um único transform, atualizado só quando
    // a seção está na tela (rAF-throttled, nunca mais de 1x por frame)
    let dentroDaTela = false;
    let pendente = false;

    function atualizarLinha() {
      pendente = false;
      const rect = secao.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const percorrido = -rect.top;
      const progresso = total > 0 ? Math.max(0, Math.min(1, percorrido / total)) : 0;
      linha.style.transform = `scaleY(${progresso})`;
    }

    function pedirAtualizacao() {
      if (!dentroDaTela || pendente) return;
      pendente = true;
      requestAnimationFrame(atualizarLinha);
    }

    const observerSecao = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          dentroDaTela = entry.isIntersecting;
          if (dentroDaTela) pedirAtualizacao();
        });
      },
      { threshold: 0 }
    );
    observerSecao.observe(secao);

    if (lenis) lenis.on("scroll", pedirAtualizacao);
    else window.addEventListener("scroll", pedirAtualizacao, { passive: true });

    atualizarLinha();
  }

  /* =====================================================================
     8. MANIFESTO — palavras revelando em opacity + translateY (sem blur)
     ===================================================================== */
  function iniciarManifesto() {
    const texto = document.getElementById("manifestoTexto");
    if (!texto) return;

    let indice = 0;
    texto.querySelectorAll("p").forEach((p) => {
      const palavras = p.textContent.trim().split(/\s+/);
      p.innerHTML = palavras
        .map((palavra) => {
          const atraso = Math.min(indice * 15, 700);
          indice++;
          return `<span class="palavra" style="transition-delay:${atraso}ms">${palavra}</span>`;
        })
        .join(" ");
    });

    if (prefereReduzirMovimento) {
      texto.classList.add("manifesto__texto--visivel");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            texto.classList.add("manifesto__texto--visivel");
            observer.unobserve(texto);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(texto);
  }

  /* =====================================================================
     10. DEPOIMENTOS — só aparece com depoimentos reais
     ===================================================================== */
  // Adicione depoimentos reais aqui. Enquanto o array estiver vazio,
  // a seção inteira fica escondida (conforme pedido no briefing).
  const depoimentos = [
    // { texto: "...", nome: "...", empresa: "...", foto: "assets/img/....jpg" },
  ];

  function iniciarDepoimentos() {
    const secao = document.getElementById("depoimentos");
    if (!secao) return;

    if (!depoimentos.length) {
      secao.classList.add("is-hidden");
      return;
    }

    const citacaoEl = document.getElementById("depoimentosCitacao");
    const autorEl = document.getElementById("depoimentosAutor");
    const pontosEl = document.getElementById("depoimentosPontos");

    let indice = 0;

    function renderizar() {
      const d = depoimentos[indice];
      citacaoEl.textContent = `“${d.texto}”`;
      autorEl.innerHTML = `
        <img class="depoimentos__autor-foto" src="${d.foto || ""}" alt="${d.nome}" loading="lazy" />
        <span class="rotulo">${d.nome} — ${d.empresa}</span>
      `;
      pontosEl.innerHTML = depoimentos
        .map(
          (_, i) =>
            `<span class="ponto-slide${i === indice ? " ponto-slide--ativo" : ""}" data-i="${i}"></span>`
        )
        .join("");
      pontosEl.querySelectorAll(".ponto-slide").forEach((ponto) => {
        ponto.addEventListener("click", () => {
          indice = Number(ponto.dataset.i);
          renderizar();
        });
      });
    }

    renderizar();

    if (!prefereReduzirMovimento) {
      setInterval(() => {
        indice = (indice + 1) % depoimentos.length;
        renderizar();
      }, 6000);
    }
  }

  /* =====================================================================
     11. FAQ — acordeão
     ===================================================================== */
  function iniciarFaq() {
    const itens = document.querySelectorAll(".faq__item");
    itens.forEach((item) => {
      const pergunta = item.querySelector(".faq__pergunta");
      const resposta = item.querySelector(".faq__resposta");

      pergunta.addEventListener("click", () => {
        const estaAberto = item.classList.contains("faq__item--aberto");

        itens.forEach((outro) => {
          outro.classList.remove("faq__item--aberto");
          outro.querySelector(".faq__pergunta").setAttribute("aria-expanded", "false");
          outro.querySelector(".faq__resposta").style.maxHeight = null;
        });

        if (!estaAberto) {
          item.classList.add("faq__item--aberto");
          pergunta.setAttribute("aria-expanded", "true");
          resposta.style.maxHeight = resposta.scrollHeight + "px";
        }
      });
    });
  }

  /* =====================================================================
     Inicialização
     ===================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    iniciarLenis();
    iniciarCtasWhatsApp();
    iniciarAno();
    iniciarMenuMobile();
    iniciarHeaderDinamico();
    iniciarPortfolio();
    iniciarProcesso();
    iniciarManifesto();
    iniciarFaq();
    iniciarDepoimentos();
  });
})();
