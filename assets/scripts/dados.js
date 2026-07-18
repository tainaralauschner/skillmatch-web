// Gerenciamento de dados e integração com o JSON
// Chave usada para salvar o perfil no localStorage
const CHAVE_PERFIL = "skillmatch-perfil";

// Carrega as vagas do arquivo JSON usando fetch
export async function carregarVagas() {
  try {
    const resposta = await fetch("./assets/dados/vagas.json");

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: não foi possível carregar as vagas.`);
    }

    const vagas = await resposta.json();

    if (!Array.isArray(vagas) || vagas.length === 0) {
      return {
        status: "vazio",
        dados: [],
        mensagem: "Nenhuma vaga foi encontrada no catálogo.",
      };
    }

    return {
      status: "sucesso",
      dados: vagas,
      mensagem: "Vagas carregadas com sucesso.",
    };
  } catch (erro) {
    return {
      status: "erro",
      dados: [],
      mensagem: "Não foi possível carregar as vagas. Tente novamente mais tarde.",
      erro,
    };
  }
}

// Salva o perfil do candidato no localStorage
export function salvarPerfil(perfil) {
  const perfilEmTexto = JSON.stringify(perfil);
  localStorage.setItem(CHAVE_PERFIL, perfilEmTexto);
}

// Busca o perfil salvo no localStorage
export function buscarPerfilSalvo() {
  const perfilSalvo = localStorage.getItem(CHAVE_PERFIL);

  if (perfilSalvo === null) {
    return null;
  }

  try {
    return JSON.parse(perfilSalvo);
  } catch (erro) {
    localStorage.removeItem(CHAVE_PERFIL);
    return null;
  }
}

// Remove o perfil salvo do localStorage
export function limparPerfilSalvo() {
  localStorage.removeItem(CHAVE_PERFIL);
}