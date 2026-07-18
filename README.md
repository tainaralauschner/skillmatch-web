# SkillMatch Web

O **SkillMatch Web** é uma aplicação web desenvolvida em **HTML, CSS e JavaScript puro** para analisar a compatibilidade entre o perfil de uma pessoa candidata e vagas fictícias da área de front-end.

O projeto é uma evolução do mini-projeto **SkillMatch JS**, que antes funcionava apenas no console. Nesta versão, o sistema possui interface visual, formulário, cards de resultado, persistência com `localStorage`, carregamento de vagas com `fetch` e organização em módulos ES.

## Objetivo do projeto

O objetivo da aplicação é permitir que o usuário preencha seu perfil com nome, área de interesse, habilidades e tempo de experiência. A partir desses dados, o sistema compara o perfil com um catálogo de vagas e exibe:

- percentual de compatibilidade com cada vaga;
- classificação da compatibilidade em Alta, Média ou Baixa;
- habilidades encontradas;
- habilidades faltantes;
- melhor vaga encontrada;
- recomendação de estudo com base nas habilidades que mais faltam.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- DOM
- Fetch API
- LocalStorage
- Módulos ES com `import` e `export`
- Git e GitHub
- Trello/Kanban
- Live Server

## Funcionalidades

- Formulário para preenchimento do perfil do candidato.
- Validação dos campos obrigatórios.
- Mensagens de erro acessíveis com `aria-live`.
- Carregamento das vagas a partir de um arquivo JSON.
- Tratamento dos estados de carregamento, vazio e erro.
- Cálculo automático de compatibilidade.
- Renderização dinâmica dos cards com JavaScript.
- Exibição da melhor vaga.
- Geração de recomendação de estudo.
- Persistência do perfil no `localStorage`.
- Layout responsivo com Flexbox.
- HTML semântico e estrutura pensada para acessibilidade e SEO.

## Como executar o projeto

Como o projeto utiliza **módulos ES** e `fetch`, ele deve ser executado por um servidor local. Abrir o arquivo diretamente pelo navegador com `file://` pode impedir o funcionamento correto.

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/tainaralauschner/skillmatch-web.git
```