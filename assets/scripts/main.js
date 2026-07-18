// Importa as funções responsáveis por dados e localStorage
import {
  carregarVagas,
  salvarPerfil,
  buscarPerfilSalvo,
} from "./dados.js";

// Importa as funções do motor de compatibilidade
import {
  criarCandidato,
  criarInstanciasDeVagas,
  processarAnalise,
  criarContadorDeAnalises,
} from "./motor.js";

// Importa as funções responsáveis pela interface
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

// Closure para contar quantas análises foram feitas na sessão
const contarAnalise = criarContadorDeAnalises();

// Armazena as vagas carregadas do JSON
let vagas = [];

// Inicia a aplicação
inicializarAplicacao();

// Configura o formulário, busca perfil salvo e carrega as vagas
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

// Carrega as vagas com fetch e trata sucesso, vazio e erro
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

// Executa o motor de compatibilidade e renderiza os resultados
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