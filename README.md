# FitPlanner

**Planejamento e Acompanhamento de Treinos de Academia**

---

## Sobre o Projeto
O **FitPlanner** é um aplicativo web desenvolvido com **HTML, CSS e JavaScript**, com foco em **organizar treinos de academia** de forma simples e prática.

A aplicação permite **cadastrar treinos**, **listar/editar/remover**, e visualizar o **progresso** por meio de **métricas automáticas** (ex.: volume total). Os dados ficam salvos no navegador usando **localStorage**.

O projeto possui caráter **educativo**, voltado à prática dos **fundamentos de JavaScript** conforme proposto na disciplina.

---

## Objetivos
- Aplicar conceitos fundamentais de **JavaScript**
- Trabalhar com **arrays, objetos e funções**
- Implementar **validação de dados** em formulários
- Utilizar **manipulação do DOM** e **eventos**
- Aplicar **persistência de dados** com **localStorage**
- Simular um app real de **planejamento e acompanhamento de treinos**

---

## Público-alvo
- Estudantes iniciantes em programação  
- Pessoas que desejam organizar seus treinos de forma simples e prática  

---

## Funcionalidades
- **Landing page** com apresentação do projeto
- **Cadastro e Login (simulação)** com dados salvos no navegador
- **Bloqueio de páginas do app** para usuários não logados
- **Cadastro de treino** com:
  - Nome do treino
  - Exercício
  - Séries, repetições e carga (kg)
- **Lista de treinos**:
  - Listagem dinâmica
  - **Edição** e **remoção** de treinos
  - Resumo com **quantidade de treinos** e **volume total**
- **Progresso**:
  - Quantidade de treinos
  - **Volume total**
  - **Maior volume** (um treino)
  - **Média de volume por treino**
  - Totais de **séries** e **repetições**
  - **Top 3 exercícios mais cadastrados**
- **Dados separados por usuário** (cada conta tem seus próprios treinos)

---

## Tecnologias Utilizadas
- **HTML5** — Estrutura da aplicação  
- **CSS3** — Estilização e layout  
- **JavaScript (ES6)** — Lógica, validações, cálculos e manipulação do DOM  
- **localStorage + JSON** — Persistência de dados no navegador  

---

## Estrutura de Arquivos
```bash
fit_planner/
│
├── index.html
├── styles.css
├── script.js
├── README.md
│
├── assets/
│   └── (imagens e recursos)
│
├── html/
│   ├── login.html
│   ├── cadastro.html
│   ├── cadastro_treino.html
│   ├── lista_treinos.html
│   ├── progresso.html
│   └── contato.html
│
├── css/
│   ├── login.css
│   ├── cadastro.css
│   ├── cadastro_treino.css
│   ├── lista_treinos.css
│   ├── progresso.css
│   └── contato.css
│
└── js/
    ├── login.js
    ├── cadastro.js
    ├── cadastro_treino.js
    ├── lista_treinos.js
    ├── progresso.js
    └── contato.js
```

## Conceitos de JavaScript Aplicados

- Declaração de variáveis (**let**, **const**)
- Funções
- Arrays e objetos
- Estruturas condicionais (**if / else**)
- Laços de repetição
- Manipulação do DOM
- Eventos
- Conversão e validação de dados
- Armazenamento local (**localStorage**)
- Uso de **JSON.stringify()** e **JSON.parse()**

---

## Como Executar o Projeto

1. Faça o download ou clone o repositório
2. Abra o arquivo **index.html** em um navegador moderno
3. Acesse o app pelo botão **App/Login** e utilize:
   - **Cadastro** para criar uma conta (simulação)
   - **Login** para entrar
4. Cadastre treinos e acompanhe os cálculos e métricas no **Progresso**

---

## Contexto Acadêmico

Este projeto foi desenvolvido como **atividade prática avaliativa**, com o objetivo de consolidar os conhecimentos iniciais de **JavaScript**, simulando uma aplicação real voltada ao planejamento e organização de treinos de academia.

---

## Integrantes do Projeto

- Marcos Gustavo
- Heloísa Pereira
- Maria Luiza
- Kamilly Barone
- Pedro Swamarn

---

## Considerações Finais

O **FitPlanner** demonstra como conceitos básicos de programação podem ser aplicados na construção de uma aplicação funcional, organizada e próxima da realidade do usuário, servindo como base para projetos futuros e evoluções mais complexas.
