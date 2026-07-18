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

2. Acesse a pasta do projeto:

```bash
cd skillmatch-web
```

3. Abra a pasta no VS Code.

4. Clique com o botão direito no arquivo `index.html`.

5. Selecione **Open with Live Server**.

6. Acesse a aplicação no navegador pelo endereço gerado, como:

```txt
http://127.0.0.1:5500/index.html
```

## Estrutura de pastas

```txt
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── dados/
    │   └── vagas.json
    ├── img/
    │   └── logo_skillmatch.png
    ├── scripts/
    │   ├── dados.js
    │   ├── main.js
    │   ├── motor.js
    │   └── ui.js
    └── styles/
        └── index.style.css
```

## Organização dos arquivos JavaScript

O JavaScript foi separado em módulos para manter o código organizado:

- `main.js`: controla o fluxo principal da aplicação.
- `motor.js`: contém as regras de compatibilidade, classes, herança, cálculo, melhor vaga e recomendação.
- `ui.js`: manipula o DOM, formulário, validações, mensagens e renderização dos cards.
- `dados.js`: carrega as vagas com `fetch` e gerencia o `localStorage`.

## Conceitos aplicados

### JavaScript

O projeto utiliza conceitos trabalhados ao longo do módulo:

- variáveis com `const` e `let`;
- objetos;
- arrays;
- funções;
- arrow functions;
- condicionais;
- `switch`;
- métodos de array como `map`, `filter`, `every` e `reduce`;
- classes;
- herança;
- uso de `this`;
- callback;
- closure;
- `async/await`;
- tratamento de erros com `try/catch`.

### HTML

A estrutura da página foi construída com HTML semântico, utilizando:

- `header`;
- `nav`;
- `main`;
- `section`;
- `footer`;
- um único `h1`;
- hierarquia de títulos;
- `label` associado aos campos;
- `alt` na imagem;
- `aria-live` nas mensagens;
- `lang="pt-BR"`;
- `meta description`;
- `title` descritivo.

### CSS

A estilização foi feita com CSS externo e foco em responsividade:

- variáveis CSS;
- box model;
- Flexbox;
- `flex-wrap`;
- `gap`;
- unidades relativas;
- `clamp`;
- `media queries`;
- foco visível;
- layout mobile-first.

## Regras de compatibilidade

Cada vaga possui uma lista de requisitos. O sistema compara as habilidades informadas pelo usuário com os requisitos de cada vaga.

A compatibilidade é calculada da seguinte forma:

```txt
habilidades encontradas / total de requisitos * 100
```

A classificação é feita assim:

- **Alta**: 80% a 100%;
- **Média**: 50% a 79%;
- **Baixa**: 0% a 49%.

## Persistência de dados

O perfil do candidato é salvo no `localStorage`, usando:

- `JSON.stringify()` para salvar o objeto como texto;
- `JSON.parse()` para recuperar o texto como objeto;
- tratamento de `null` na primeira visita.

Assim, ao recarregar ou fechar e abrir novamente a página, o perfil preenchido continua disponível.

## Debug e correções realizadas

Durante os testes, foi identificado um problema na validação do campo **experiência em meses**.

Quando o campo ficava vazio, o JavaScript convertia o valor com:

```js
Number("")
```

O resultado era `0`, fazendo com que o formulário não exibisse a mensagem de erro para esse campo.

A correção foi feita tratando o campo vazio como `NaN`, permitindo que a validação exibisse corretamente a mensagem:

```txt
Informe um número válido de meses.
```

Esse ajuste foi testado no navegador e acompanhado pelo console das DevTools, sem erros registrados.

## Git e branches

O desenvolvimento foi organizado com Git e GitHub, usando uma branch principal de desenvolvimento e branches específicas para funcionalidades.

Branches utilizadas:

- `develop`: branch principal de desenvolvimento;
- `feat/estrutura-html`: estrutura inicial do HTML;
- `feat/estilos-iniciais`: estilos iniciais e responsividade;
- `feat/catalogo-vagas`: catálogo de vagas em JSON;
- `feat/motor-skillmatch`: motor de compatibilidade;
- `feat/dados-persistencia`: carregamento de dados e localStorage;
- `feat/interface-dom`: formulário, validação e renderização dinâmica;
- `feat/main-fluxo-aplicacao`: integração do fluxo principal;
- `feat/logo`: imagem e ajuste do logo;
- `fix/validacao-experiencia`: correção da validação do campo experiência;
- `docs/comentarios-codigo`: comentários explicativos no código;
- `docs/readme`: documentação do projeto.

## Kanban

As tarefas do projeto foram organizadas em um quadro Kanban no Trello, com etapas como:

- Backlog;
- A fazer;
- Em andamento;
- Em revisão;
- Concluído.

Link do quadro Kanban:

[SkillMatch Web - Projeto Final Módulo 1](https://trello.com/b/7bRgpAx3/skillmatch-web-projeto-final-módulo-1)

## Vídeo de apresentação

O vídeo de apresentação demonstra:

- objetivo do sistema;
- funcionamento da aplicação;
- como executar o projeto;
- organização das tarefas;
- branches utilizadas;
- pontos que poderiam ser melhorados.

Link do vídeo:

COLE_AQUI_O_LINK_DO_VIDEO

## Melhorias futuras

Algumas melhorias que podem ser implementadas futuramente:

- botão para limpar o perfil salvo;
- filtro de vagas por modalidade;
- ordenação por compatibilidade;
- tema claro/escuro persistido no `localStorage`;
- deploy no GitHub Pages;
- melhorias visuais nos cards;
- expansão do catálogo de vagas.

## Autora

Desenvolvido por **Tainara Lauschner** como Projeto Avaliativo Final do Módulo 1 — Front-End React T2.
