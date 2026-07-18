// Classe base para representar uma vaga
export class Vaga {
  constructor({ id, empresa, cargo, requisitos, salario, modalidade }) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Retorna o nome da vaga para exibição na tela
  getRotuloExibicao() {
    return this.cargo;
  }

  // Calcula a compatibilidade entre o candidato e a vaga
  calcularCompatibilidade(candidato) {
    const habilidadesCandidato = normalizarLista(candidato.habilidades);

    const habilidadesEncontradas = this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(normalizarTexto(requisito))
    );

    const habilidadesFaltantes = this.requisitos.filter(
      (requisito) => !habilidadesCandidato.includes(normalizarTexto(requisito))
    );

    const atendeTodosRequisitos = this.requisitos.every((requisito) =>
      habilidadesCandidato.includes(normalizarTexto(requisito))
    );

    const percentual = Math.round(
      (habilidadesEncontradas.length / this.requisitos.length) * 100
    );

    return {
      vaga: this,
      percentual,
      classificacao: classificarCompatibilidade(percentual),
      habilidadesEncontradas,
      habilidadesFaltantes,
      atendeTodosRequisitos,
    };
  }
}

// Classe específica para vagas front-end, herdando de Vaga
export class VagaFrontEnd extends Vaga {
  constructor({ id, empresa, cargo, requisitos, salario, modalidade, senioridade, stack }) {
    super({ id, empresa, cargo, requisitos, salario, modalidade });

    this.senioridade = senioridade;
    this.stack = stack;
  }

  // Sobrescreve o rótulo para incluir senioridade e stack
  getRotuloExibicao() {
    return `${this.cargo} | ${this.senioridade} | ${this.stack}`;
  }
}

// Cria o objeto do candidato a partir dos dados do formulário
export function criarCandidato(nome, area, habilidades, experienciaMeses) {
  return {
    nome,
    area,
    habilidades,
    experienciaMeses: Number(experienciaMeses),
  };
}

// Transforma os dados do JSON em instâncias da classe VagaFrontEnd
export function criarInstanciasDeVagas(vagas) {
  return vagas.map((vaga) => new VagaFrontEnd(vaga));
}

// Analisa todas as vagas usando o método da classe
export function analisarVagas(candidato, vagas) {
  return vagas.map((vaga) => vaga.calcularCompatibilidade(candidato));
}

// Classifica o percentual em Alta, Média ou Baixa
export function classificarCompatibilidade(percentual) {
  if (percentual >= 80) {
    return "Alta";
  }

  if (percentual >= 50) {
    return "Média";
  }

  return "Baixa";
}

// Encontra a vaga com maior compatibilidade
export function encontrarMelhorVaga(resultados, candidato) {
  return resultados.reduce((melhorResultado, resultadoAtual) => {
    if (resultadoAtual.percentual > melhorResultado.percentual) {
      return resultadoAtual;
    }

    if (resultadoAtual.percentual === melhorResultado.percentual) {
      return desempatarPorExperiencia(melhorResultado, resultadoAtual, candidato);
    }

    return melhorResultado;
  }, resultados[0]);
}

// Gera recomendação com base nas habilidades que mais aparecem como faltantes
export function gerarRecomendacaoDeEstudo(resultados) {
  const habilidadesFaltantes = resultados.reduce((lista, resultado) => {
    return lista.concat(resultado.habilidadesFaltantes);
  }, []);

  if (habilidadesFaltantes.length === 0) {
    return {
      texto: "Você atende todos os requisitos das vagas analisadas. Continue praticando e monte projetos para fortalecer seu portfólio.",
      habilidadesPrioritarias: [],
    };
  }

  const contador = habilidadesFaltantes.reduce((acumulador, habilidade) => {
    const chave = normalizarTexto(habilidade);

    if (!acumulador[chave]) {
      acumulador[chave] = {
        nome: habilidade,
        total: 0,
      };
    }

    acumulador[chave].total += 1;

    return acumulador;
  }, {});

  const habilidadesOrdenadas = Object.values(contador).sort(
    (habilidadeA, habilidadeB) => habilidadeB.total - habilidadeA.total
  );

  const habilidadesPrioritarias = habilidadesOrdenadas
    .slice(0, 3)
    .map((habilidade) => habilidade.nome);

  return {
    texto: `Priorize seus estudos em: ${habilidadesPrioritarias.join(", ")}.`,
    habilidadesPrioritarias,
  };
}

// Processa a análise completa e executa um callback ao finalizar
export function processarAnalise(candidato, vagas, aoFinalizar) {
  const resultados = analisarVagas(candidato, vagas);
  const melhorVaga = encontrarMelhorVaga(resultados, candidato);
  const recomendacao = gerarRecomendacaoDeEstudo(resultados);

  const analise = {
    candidato,
    resultados,
    melhorVaga,
    recomendacao,
  };

  if (typeof aoFinalizar === "function") {
    aoFinalizar(analise);
  }

  return analise;
}

// Closure usada para contar análises feitas na sessão
export function criarContadorDeAnalises() {
  let total = 0;

  return function incrementarContador() {
    total += 1;
    return total;
  };
}

// Critério de desempate entre vagas com o mesmo percentual
function desempatarPorExperiencia(melhorResultado, resultadoAtual, candidato) {
  const experiencia = Number(candidato.experienciaMeses);

  if (experiencia < 6) {
    const pesoMelhor = obterPesoSenioridade(melhorResultado.vaga.senioridade);
    const pesoAtual = obterPesoSenioridade(resultadoAtual.vaga.senioridade);

    if (pesoAtual < pesoMelhor) {
      return resultadoAtual;
    }
  }

  if (experiencia >= 6 && resultadoAtual.vaga.salario > melhorResultado.vaga.salario) {
    return resultadoAtual;
  }

  return melhorResultado;
}

// Define peso para cada nível de senioridade
function obterPesoSenioridade(senioridade) {
  const senioridadeNormalizada = normalizarTexto(senioridade);

  switch (senioridadeNormalizada) {
    case "estagio":
      return 1;
    case "trainee":
      return 2;
    case "entrada":
      return 3;
    case "junior":
      return 4;
    default:
      return 5;
  }
}

// Normaliza uma lista de textos para facilitar a comparação
function normalizarLista(lista) {
  return lista.map((item) => normalizarTexto(item));
}

// Remove espaços, acentos e diferença entre maiúsculas/minúsculas
function normalizarTexto(texto) {
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}