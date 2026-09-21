/*
 * projetos.js
 * -----------------------------------------------------------------------
 * Lista de projetos exibidos na seção "Sites que eu já coloquei no ar".
 * Para adicionar um projeto novo, copie um objeto abaixo, edite os campos
 * e coloque as 3 imagens (capa, completo e mobile) dentro de
 * assets/projetos/<pasta-do-projeto>/ no formato .webp.
 *
 * Campos:
 *  nome       -> nome do projeto (aparece na aba e na legenda)
 *  tipo       -> tipo de site + para quem foi feito
 *  descricao  -> o que foi feito no projeto
 *  resultado  -> resultado alcançado (deixe "[RESULTADO]" se não tiver ainda)
 *  cor        -> cor de destaque da aba (hex)
 *  link       -> URL do site publicado (deixe "[LINK]" se ainda não tiver)
 *  imagens    -> caminhos das 3 imagens do projeto (capa/completo/mobile)
 *  video      -> opcional. Caminho de um .mp4 curto e leve (sem áudio) para
 *                tocar como preview no mockup. Se não tiver, o site mostra
 *                só a imagem "capa" (sem quebrar nada).
 */

const projetos = [
  {
    nome: "Quero+ Viagens",
    tipo: "Landing page para agência de viagens",
    descricao: "Landing page em React com carrossel de fotos dos destinos, botão de cotação rápida e exploração de pacotes, 100% responsiva.",
    resultado: "[RESULTADO]",
    cor: "#2BB5A5",
    link: "https://queromaisviagens.com.br",
    video: "assets/projetos/quero-mais-viagens/preview.mp4",
    imagens: {
      capa: "assets/projetos/quero-mais-viagens/capa.webp",
      completo: "assets/projetos/quero-mais-viagens/completo.webp",
      mobile: "assets/projetos/quero-mais-viagens/mobile.webp",
    },
  },
  {
    nome: "Serve Saúde",
    tipo: "Landing page para loja de produtos hospitalares e laboratoriais (Santarém-PA)",
    descricao: "Catálogo de produtos por categoria, carrossel de destaques e pedido direto pelo WhatsApp, com endereço da loja física em destaque.",
    resultado: "[RESULTADO]",
    cor: "#FF4D1A",
    link: "https://servesaude.com.br",
    video: "assets/projetos/serve-produtos-hospitalares/preview.mp4",
    imagens: {
      capa: "assets/projetos/serve-produtos-hospitalares/capa.webp",
      completo: "assets/projetos/serve-produtos-hospitalares/completo.webp",
      mobile: "assets/projetos/serve-produtos-hospitalares/mobile.webp",
    },
  },
];

// Exporta para o escopo global (usado em main.js sem bundler/módulos)
window.projetos = projetos;
