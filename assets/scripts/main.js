console.log('SkillMatch Web inicializado');
// Importa as funções de dados, motor e interface
import {
  carregarVagas,
  salvarPerfil,
  buscarPerfilSalvo,
} from "./dados.js";

import {
  criarCandidato,
  criarInstanciasDeVagas,
  processarAnalise,
  criarContadorDeAnalises,
} from "./motor.js";

import {
  selecionarElementos,
  preencherFormularioComPerfil,
  capturarDadosFormulario,
  validarFormulario,
  exibirStatus,
  renderizarPerfil,
  renderizarResultados,
  renderizarMelhorVaga,
  renderizarRecomendacao,
  limparResultados,
} from "./ui.js";

// Seleciona os elementos da página
const elementos = selecionarElementos();

// Cria uma closure para contar quantas análises foram feitas na sessão
const contarAnalise = criarContadorDeAnalises();

// Guarda as vagas carregadas do JSON
let vagas = [];

// Inicia a aplicação
inicializarAplicacao();

// Configura o carregamento inicial da página
async function inicializarAplicacao() {
  elementos.formulario.addEventListener("submit", lidarComEnvioFormulario);

  const perfilSalvo = buscarPerfilSalvo();

  if (perfilSalvo) {
    preencherFormularioComPerfil(elementos, perfilSalvo);
  }

  await carregarCatalogoDeVagas();

  if (perfilSalvo && vagas.length > 0) {
    executarAnalise(perfilSalvo);
  }
}

// Carrega as vagas com fetch e trata os estados da requisição
async function carregarCatalogoDeVagas() {
  limparResultados(elementos);
  exibirStatus(elementos, "Carregando vagas...");

  const resultado = await carregarVagas();

  if (resultado.status === "erro") {
    exibirStatus(elementos, resultado.mensagem);
    return;
  }

  if (resultado.status === "vazio") {
    exibirStatus(elementos, resultado.mensagem);
    return;
  }

  vagas = criarInstanciasDeVagas(resultado.dados);

  exibirStatus(
    elementos,
    "Vagas carregadas. Preencha o formulário para iniciar a análise."
  );
}

// Controla o envio do formulário
function lidarComEnvioFormulario(evento) {
  evento.preventDefault();

  const dadosFormulario = capturarDadosFormulario(elementos);
  const formularioValido = validarFormulario(elementos, dadosFormulario);

  if (!formularioValido) {
    limparResultados(elementos);
    exibirStatus(elementos, "Revise os campos destacados antes de continuar.");
    return;
  }

  if (vagas.length === 0) {
    limparResultados(elementos);
    exibirStatus(elementos, "Não há vagas disponíveis para análise.");
    return;
  }

  const candidato = criarCandidato(
    dadosFormulario.nome,
    dadosFormulario.area,
    dadosFormulario.habilidades,
    dadosFormulario.experienciaMeses
  );

  salvarPerfil(candidato);
  executarAnalise(candidato);
}

// Executa o motor de compatibilidade e atualiza a tela
function executarAnalise(candidato) {
  const totalAnalises = contarAnalise();

  processarAnalise(candidato, vagas, (analise) => {
    renderizarPerfil(elementos, analise.candidato, totalAnalises);
    renderizarResultados(elementos, analise.resultados);
    renderizarMelhorVaga(elementos, analise.melhorVaga);
    renderizarRecomendacao(elementos, analise.recomendacao);
  });

  exibirStatus(
    elementos,
    `Análise concluída para ${candidato.nome}. Confira os resultados abaixo.`
  );
}