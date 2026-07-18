// Funções para interação com a interface
// Seleciona os elementos principais da tela
export function selecionarElementos() {
  return {
    formulario: document.querySelector("#form-perfil"),
    nome: document.querySelector("#nome"),
    area: document.querySelector("#area"),
    habilidades: document.querySelector("#habilidades"),
    experiencia: document.querySelector("#experiencia"),
    erroNome: document.querySelector("#erro-nome"),
    erroArea: document.querySelector("#erro-area"),
    erroHabilidades: document.querySelector("#erro-habilidades"),
    erroExperiencia: document.querySelector("#erro-experiencia"),
    mensagemStatus: document.querySelector("#mensagem-status"),
    perfilSalvo: document.querySelector("#perfil-salvo"),
    cardsVagas: document.querySelector("#cards-vagas"),
    melhorVaga: document.querySelector("#melhor-vaga"),
    recomendacaoEstudo: document.querySelector("#recomendacao-estudo"),
  };
}

// Preenche o formulário com dados salvos no localStorage
export function preencherFormularioComPerfil(elementos, perfil) {
  if (!perfil) {
    return;
  }

  elementos.nome.value = perfil.nome;
  elementos.area.value = perfil.area;
  elementos.habilidades.value = perfil.habilidades.join(", ");
  elementos.experiencia.value = perfil.experienciaMeses;
}

// Captura os dados digitados no formulário
export function capturarDadosFormulario(elementos) {
  const habilidades = elementos.habilidades.value
    .split(",")
    .map((habilidade) => habilidade.trim())
    .filter((habilidade) => habilidade !== "");

  return {
    nome: elementos.nome.value.trim(),
    area: elementos.area.value.trim(),
    habilidades,
    experienciaMeses: Number(elementos.experiencia.value),
  };
}

// Valida os campos obrigatórios do formulário
export function validarFormulario(elementos, perfil) {
  limparErros(elementos);

  let formularioValido = true;

  if (perfil.nome === "") {
    elementos.erroNome.textContent = "Informe seu nome.";
    elementos.nome.setAttribute("aria-invalid", "true");
    formularioValido = false;
  }

  if (perfil.area === "") {
    elementos.erroArea.textContent = "Informe a área de interesse.";
    elementos.area.setAttribute("aria-invalid", "true");
    formularioValido = false;
  }

  if (perfil.habilidades.length === 0) {
    elementos.erroHabilidades.textContent = "Informe pelo menos uma habilidade.";
    elementos.habilidades.setAttribute("aria-invalid", "true");
    formularioValido = false;
  }

  if (Number.isNaN(perfil.experienciaMeses) || perfil.experienciaMeses < 0) {
    elementos.erroExperiencia.textContent = "Informe um número válido de meses.";
    elementos.experiencia.setAttribute("aria-invalid", "true");
    formularioValido = false;
  }

  return formularioValido;
}

// Limpa as mensagens de erro do formulário
function limparErros(elementos) {
  elementos.erroNome.textContent = "";
  elementos.erroArea.textContent = "";
  elementos.erroHabilidades.textContent = "";
  elementos.erroExperiencia.textContent = "";

  elementos.nome.removeAttribute("aria-invalid");
  elementos.area.removeAttribute("aria-invalid");
  elementos.habilidades.removeAttribute("aria-invalid");
  elementos.experiencia.removeAttribute("aria-invalid");
}

// Exibe mensagens de status para o usuário
export function exibirStatus(elementos, mensagem) {
  elementos.mensagemStatus.textContent = mensagem;
}

// Exibe um resumo do perfil analisado
export function renderizarPerfil(elementos, candidato, totalAnalises) {
  elementos.perfilSalvo.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = `Perfil analisado: ${candidato.nome}`;

  const area = document.createElement("p");
  area.textContent = `Área de interesse: ${candidato.area}`;

  const experiencia = document.createElement("p");
  experiencia.textContent = `Experiência: ${candidato.experienciaMeses} meses`;

  const habilidades = document.createElement("p");
  habilidades.textContent = `Habilidades: ${candidato.habilidades.join(", ")}`;

  const analises = document.createElement("p");
  analises.textContent = `Análises feitas nesta sessão: ${totalAnalises}`;

  elementos.perfilSalvo.append(titulo, area, experiencia, habilidades, analises);
}

// Renderiza todos os cards de vagas
export function renderizarResultados(elementos, resultados) {
  elementos.cardsVagas.innerHTML = "";

  if (resultados.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Nada encontrado.";
    elementos.cardsVagas.append(mensagem);
    return;
  }

  resultados.forEach((resultado) => {
    const card = criarCardVaga(resultado);
    elementos.cardsVagas.append(card);
  });
}

// Cria um card individual de vaga
function criarCardVaga(resultado) {
  const card = document.createElement("article");
  card.classList.add("card-vaga");

  const titulo = document.createElement("h3");
  titulo.textContent = resultado.vaga.getRotuloExibicao();

  const empresa = document.createElement("p");
  empresa.textContent = `Empresa: ${resultado.vaga.empresa}`;

  const modalidade = document.createElement("p");
  modalidade.textContent = `Modalidade: ${resultado.vaga.modalidade}`;

  const salario = document.createElement("p");
  salario.textContent = `Salário: ${formatarMoeda(resultado.vaga.salario)}`;

  const compatibilidade = document.createElement("p");
  compatibilidade.classList.add("compatibilidade");
  compatibilidade.textContent = `${resultado.percentual}% de compatibilidade`;

  const classificacao = document.createElement("span");
  classificacao.classList.add(
    "classificacao",
    obterClasseClassificacao(resultado.classificacao)
  );
  classificacao.textContent = `Compatibilidade ${resultado.classificacao}`;

  const todosRequisitos = document.createElement("p");
  todosRequisitos.textContent = resultado.atendeTodosRequisitos
    ? "Atende todos os requisitos da vaga."
    : "Ainda não atende todos os requisitos da vaga.";

  const tituloEncontradas = document.createElement("p");
  tituloEncontradas.textContent = "Habilidades encontradas:";

  const listaEncontradas = criarListaDeHabilidades(
    resultado.habilidadesEncontradas,
    "tag"
  );

  const tituloFaltantes = document.createElement("p");
  tituloFaltantes.textContent = "Habilidades faltantes:";

  const listaFaltantes = criarListaDeHabilidades(
    resultado.habilidadesFaltantes,
    "tag-faltante"
  );

  card.append(
    titulo,
    empresa,
    modalidade,
    salario,
    compatibilidade,
    classificacao,
    todosRequisitos,
    tituloEncontradas,
    listaEncontradas,
    tituloFaltantes,
    listaFaltantes
  );

  return card;
}

// Cria listas de habilidades em formato de tags
function criarListaDeHabilidades(habilidades, classeExtra) {
  const lista = document.createElement("ul");
  lista.classList.add("lista-habilidades");

  if (habilidades.length === 0) {
    const item = document.createElement("li");
    item.classList.add("tag");
    item.textContent = "Nenhuma";
    lista.append(item);
    return lista;
  }

  habilidades.forEach((habilidade) => {
    const item = document.createElement("li");
    item.classList.add("tag");

    if (classeExtra === "tag-faltante") {
      item.classList.add("tag-faltante");
    }

    item.textContent = habilidade;
    lista.append(item);
  });

  return lista;
}

// Renderiza a melhor vaga encontrada
export function renderizarMelhorVaga(elementos, melhorResultado) {
  elementos.melhorVaga.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Vaga mais compatível";

  const descricao = document.createElement("p");
  descricao.textContent = `${melhorResultado.vaga.cargo} na empresa ${melhorResultado.vaga.empresa}, com ${melhorResultado.percentual}% de compatibilidade.`;

  elementos.melhorVaga.append(titulo, descricao);
}

// Renderiza a recomendação de estudo
export function renderizarRecomendacao(elementos, recomendacao) {
  elementos.recomendacaoEstudo.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Recomendação de estudo";

  const texto = document.createElement("p");
  texto.textContent = recomendacao.texto;

  elementos.recomendacaoEstudo.append(titulo, texto);
}

// Limpa os resultados antes de uma nova análise
export function limparResultados(elementos) {
  elementos.perfilSalvo.innerHTML = "";
  elementos.cardsVagas.innerHTML = "";
  elementos.melhorVaga.innerHTML = "";
  elementos.recomendacaoEstudo.innerHTML = "";
}

// Define a classe visual da classificação
function obterClasseClassificacao(classificacao) {
  const classificacaoNormalizada = classificacao.toLowerCase();

  if (classificacaoNormalizada === "alta") {
    return "classificacao-alta";
  }

  if (classificacaoNormalizada === "média") {
    return "classificacao-media";
  }

  return "classificacao-baixa";
}

// Formata o salário para moeda brasileira
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}