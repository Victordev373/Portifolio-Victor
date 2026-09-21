# Victor | Criador de Sites — Portfólio

Site-portfólio para venda de landing pages, sites institucionais e sites
corporativos, com foco máximo em performance e fluidez. Todo CTA leva o
visitante para o WhatsApp.

Feito em HTML, CSS e JavaScript puro — sem build, sem npm, sem
framework de animação. Só **Lenis** (scroll suave) via CDN +
`IntersectionObserver` nativo para revelar conteúdo. Todas as animações
usam `transform`/`opacity` (baratas para o navegador), nada de canvas,
`filter: blur()` em elementos animados ou scroll-jacking pesado.

## 🔗 Ver online

[URL DO SITE, ex: https://victordev373.github.io/portfolio/]

## 🚀 Rodando localmente

Basta abrir o `index.html` no navegador, ou servir a pasta com qualquer
servidor estático:

```bash
npx serve .
```

## 📂 Estrutura

```
index.html
css/style.css
js/main.js        -> Lenis + IntersectionObserver, todas as interações
js/projetos.js     -> lista de projetos do portfólio
assets/img/        -> foto de perfil, og-image
assets/projetos/<pasta-do-projeto>/capa.webp, completo.webp, mobile.webp, preview.mp4
```

## ➕ Como adicionar um projeto novo

Abra `js/projetos.js` e copie um objeto do array `projetos`:

```js
{
  nome: "Nome do Projeto",
  tipo: "Tipo de site + para quem foi feito",
  descricao: "O que foi feito no projeto",
  resultado: "Resultado alcançado (ou '[RESULTADO]' se ainda não tiver)",
  cor: "#FF4D1A",             // cor de destaque da aba
  link: "https://site.com",   // ou "[LINK]" se ainda não estiver no ar
  video: "assets/projetos/nome-do-projeto/preview.mp4", // opcional
  imagens: {
    capa: "assets/projetos/nome-do-projeto/capa.webp",
    completo: "assets/projetos/nome-do-projeto/completo.webp",
    mobile: "assets/projetos/nome-do-projeto/mobile.webp",
  },
},
```

Depois, crie a pasta `assets/projetos/nome-do-projeto/` e coloque os 3
arquivos `.webp` (capa, completo e mobile). O campo `video` é opcional:
se tiver um vídeo curto (.mp4, sem áudio, poucos segundos), ele toca em
loop no mockup só quando está visível na tela; sem vídeo, o site mostra
só a imagem `capa`. Nenhum dos dois quebra o site se faltar.

## 💬 Como trocar o número de WhatsApp

Abra `js/main.js` e edite o topo do arquivo:

```js
const CONFIG = {
  whatsapp: "55SEUNUMEROAQUI", // DDI + DDD + número, só dígitos
  mensagemPadrao: "Olá Victor, vim pelo seu portfólio e quero um orçamento de site",
};
```

Todos os botões "Pedir orçamento" e o botão flutuante do celular usam
esse número automaticamente. Os cards da seção "Qual site o seu negócio
precisa?" enviam uma mensagem específica para cada tipo de site.

## ⭐ Como adicionar depoimentos reais

A seção de depoimentos fica **escondida** até você ter pelo menos um
depoimento real. Para adicionar, edite o array `depoimentos` em
`js/main.js` (procure por "10. DEPOIMENTOS"):

```js
const depoimentos = [
  {
    texto: "Depoimento real do cliente aqui.",
    nome: "Nome do cliente",
    empresa: "Empresa do cliente",
    foto: "assets/img/cliente-foto.jpg", // opcional
  },
];
```

## ♿ Acessibilidade e desempenho

- Respeita `prefers-reduced-motion`: sem animações, conteúdo todo
  visível e estático de cara.
- Todas as animações usam só `transform`/`opacity` — nada de `filter:
  blur()` animado, sem canvas, sem scroll-jacking pesado.
- Vídeos dos projetos: `preload="none"`, só carregam e tocam quando o
  mockup está visível na tela, pausam ao sair da tela, nunca mais de um
  tocando ao mesmo tempo, sempre mudos.
- Imagens com `loading="lazy"` (menos a do hero, que é a primeira coisa
  que a pessoa vê).
- Scripts carregam com `defer` (não bloqueiam a renderização da página).
- SEO: title, meta description, Open Graph e JSON-LD (`ProfessionalService`).

## 📝 Lista de tudo que falta preencher (placeholders)

Procure por `[PLACEHOLDER]` no código ou use esta lista:

### Dados de contato
- [x] **Número de WhatsApp** — já preenchido em `js/main.js` (`CONFIG.whatsapp`)
- [x] **Cidade/região atendida** — já preenchida (Santarém - PA)
- [x] **Telefone no JSON-LD** — já preenchido
- [ ] **URL final do site** — `index.html`, meta `og:url` e este README

### Imagens
- [ ] `assets/img/og-image.jpg` — imagem de compartilhamento (Open Graph),
  1200×630px
- [x] Prints dos projetos em `assets/projetos/<projeto>/` — já preenchidos com
  frames reais tirados dos seus vídeos de divulgação (Quero+ Viagens e Serve
  Saúde). Se quiser, troque por prints de tela cheia com resolução melhor
  (veja o `LEIA-ME.md` de cada pasta)
- [ ] Fotos usadas na seção "Qual site o seu negócio precisa?" — hoje usam
  fotos temporárias, troque por exemplos reais de landing page, site
  institucional e site corporativo

### Projetos (`js/projetos.js`)
- [x] `descricao` e `link` de cada projeto — já preenchidos com dados reais
- [ ] `resultado` de cada projeto (número de vendas, contatos etc. — deixei
  como `[RESULTADO]` porque não recebi nenhum número ainda)

### Processo (`index.html`, seção "Do briefing ao site no ar")
- [ ] Prazo de cada uma das 6 etapas (`Prazo: [PRAZO]`)

### FAQ (`index.html`, seção FAQ)
- [ ] Prazo médio de entrega
- [ ] O que o cliente precisa enviar (textos, logo, fotos etc.)
- [ ] Política de domínio e hospedagem
- [ ] Política de manutenção pós-entrega
- [ ] Formas de pagamento aceitas

### Depoimentos
- [ ] Depoimentos reais em `js/main.js` (array `depoimentos`) — a seção
  fica escondida até você adicionar pelo menos um

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, grid, clamp, `prefers-reduced-motion`)
- JavaScript puro (sem framework)
- [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — animações guiadas por scroll
- [Lenis](https://lenis.darkroom.engineering/) — scroll suave

## 👤 Autor

Victor — [Instagram](https://instagram.com/victor.prgm) · victordev373@gmail.com
