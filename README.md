# Codeforces Daily Challenge

Automação que integra a API do Codeforces com um servidor do Discord, enviando diariamente uma seleção de problemas e contests para incentivar a prática de programação competitiva.

O projeto busca automaticamente problemas do Codeforces, seleciona desafios de diferentes níveis de dificuldade e recomenda contests (Div. 2, Div. 3 e Gym), enviando tudo por meio de um Webhook do Discord em uma mensagem organizada.

## Funcionalidades

* Seleção automática de problemas em diferentes faixas de rating.
* Recomendação diária de contests Div. 2 e Div. 3.
* Recomendação de um contest Gym para treinos em equipe e preparação para competições como a ICPC.
* Mensagens enviadas em formato de Embed no Discord.
* Menção opcional a um cargo do servidor.
* Execução totalmente automatizada através do GitHub Actions.
* Script de preview para visualizar a mensagem antes do envio.

## Tecnologias

* TypeScript
* Node.js
* Axios
* Discord Webhooks
* GitHub Actions
* Codeforces API

## Estrutura do Projeto

```
src/
├── codeforces.ts     # Comunicação com a API do Codeforces
├── selection.ts      # Seleção dos problemas e contests
├── formatter.ts      # Formatação da mensagem e do Embed
├── webhook.ts        # Envio da mensagem ao Discord
├── utils.ts          # Funções utilitárias
├── config.ts         # Configuração das variáveis de ambiente
└── index.ts          # Ponto de entrada da aplicação
```

## Configuração

Crie um arquivo `.env` na raiz do projeto contendo:

```env
DISCORD_WEBHOOK_URL=seu_webhook
ROLE_ID=id_do_cargo_opcional
```

* `DISCORD_WEBHOOK_URL`: URL do Webhook do Discord.
* `ROLE_ID`: ID do cargo que será mencionado nas mensagens (opcional).

## Instalação

```bash
npm install
```

## Executando localmente

Para enviar a mensagem ao Discord:

```bash
npm start
```

Para apenas visualizar a mensagem gerada:

```bash
npm run preview
```

## Automação

O projeto foi desenvolvido para ser executado automaticamente através do GitHub Actions.

Em cada execução, a aplicação:

1. Consulta a API do Codeforces.
2. Obtém a lista de problemas e contests disponíveis.
3. Seleciona os desafios do dia.
4. Formata a mensagem em um Embed do Discord.
5. Publica automaticamente no servidor utilizando um Webhook.

## Exemplo da mensagem enviada

A mensagem diária contém:

* Problemas organizados por faixa de rating;
* Links diretos para cada problema;
* Sugestões de contests Div. 2 e Div. 3;
* Um contest Gym recomendado;
* Menção opcional ao cargo configurado no servidor.
