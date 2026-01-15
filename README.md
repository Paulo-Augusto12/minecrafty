# 🎮 Minecrafty

> Bot do Discord para gerenciar servidores Minecraft através do Crafty Controller

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.25-blue.svg)](https://discord.js.org/)
[![License](https://img.shields.io/badge/license-ISC-orange.svg)](LICENSE)

Um bot poderoso para Discord que permite gerenciar seus servidores Minecraft hospedados no Crafty Controller diretamente através de comandos slash.

---

## ✨ Funcionalidades

### 🖥️ Gerenciamento de Servidores
- **`/servers`** - Lista todos os servidores disponíveis e visualize estatísticas detalhadas
- **`/start`** - Inicia servidores que estão parados
- **`/stop`** - Para servidores que estão rodando
- **`/console`** - Envia comandos customizados para o console do servidor

### 📊 Informações Exibidas
Ao selecionar um servidor, você pode visualizar:
- 🟢/🔴 Status (Online/Offline)
- 📈 Uso de CPU e Memória
- 👥 Jogadores online/máximo
- ⚙️ Versão do servidor
- 🕐 Tempo de atividade
- ⚠️ Alertas (crashed, updating, waiting start)

### 🛠️ Utilitários
- **`/ping`** - Verifica a latência do bot
- **`/user`** - Exibe informações sobre um usuário

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- Uma conta no [Discord Developer Portal](https://discord.com/developers/applications)
- [Crafty Controller](https://craftycontrol.com/) instalado e rodando

---

## 🚀 Instalação

### 1️⃣ Clone o Repositório

\`\`\`bash
git clone <url-do-repositorio>
cd minecrafty
\`\`\`

### 2️⃣ Instale as Dependências

\`\`\`bash
npm install
\`\`\`

### 3️⃣ Configure as Variáveis de Ambiente

Crie um arquivo \`.env\` na raiz do projeto:

\`\`\`bash
touch .env
\`\`\`

Adicione as seguintes variáveis:

\`\`\`env
# Discord Bot Token
DISCORD_TOKEN=seu_token_do_discord_aqui
DISCORD_CLIENT_ID=seu_client_id_aqui

# Crafty Controller
CRAFTY_BASE_URL=https://seu-servidor-crafty:8443
CRAFTY_LOGIN=seu_usuario_crafty
CRAFTY_PASSWORD=sua_senha_crafty
\`\`\`

#### 📝 Como obter as credenciais:

**Discord:**
1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie uma nova aplicação ou selecione uma existente
3. Vá em "Bot" e copie o **Token** → \`DISCORD_TOKEN\`
4. Em "General Information", copie o **Application ID** → \`DISCORD_CLIENT_ID\`
5. Em "Bot", ative as seguintes **Privileged Gateway Intents**:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
6. Em "OAuth2" → "URL Generator":
   - Selecione scope: \`bot\`, \`applications.commands\`
   - Selecione permissões: \`Send Messages\`, \`Use Slash Commands\`
   - Copie a URL gerada e use para adicionar o bot ao seu servidor

**Crafty Controller:**
- \`CRAFTY_BASE_URL\`: URL do seu Crafty (ex: \`https://192.168.1.100:8443\`)
- \`CRAFTY_LOGIN\`: Seu nome de usuário do Crafty
- \`CRAFTY_PASSWORD\`: Sua senha do Crafty

### 4️⃣ Registre os Comandos Slash

Execute o comando para registrar os comandos no Discord:

\`\`\`bash
npm run deploy-commands
\`\`\`

Você deve ver uma mensagem de sucesso confirmando o registro dos comandos.

### 5️⃣ Inicie o Bot

#### Modo Desenvolvimento (com auto-reload):
\`\`\`bash
npm run dev
\`\`\`

#### Modo Produção:
\`\`\`bash
node src/index.js
\`\`\`

---

## 📁 Estrutura do Projeto

\`\`\`
minecrafty/
├── src/
│   ├── api/
│   │   ├── apiService.js      # Cliente HTTP configurado
│   │   └── auth.js             # Gerenciamento de autenticação
│   ├── commands/
│   │   ├── crafty/
│   │   │   ├── console.js      # Comando /console
│   │   │   ├── servers.js      # Comando /servers
│   │   │   ├── start.js        # Comando /start
│   │   │   └── stop.js         # Comando /stop
│   │   └── utility/
│   │       ├── ping.js         # Comando /ping
│   │       └── user.js         # Comando /user
│   ├── events/
│   │   ├── interactionHandler.js  # Gerencia interações
│   │   └── ready.js                # Evento de bot pronto
│   ├── handlers/
│   │   └── serverSelectionHandler.js  # Lógica de seleção de servidores
│   ├── utils/
│   │   └── crafty.js           # Funções utilitárias do Crafty
│   ├── deploy-commands.js      # Script de deploy de comandos
│   ├── index.js                # Ponto de entrada
│   └── load-commands.js        # Carregador de comandos
├── .env                        # Variáveis de ambiente (não commitado)
├── .gitignore
├── package.json
└── README.md
\`\`\`

---

## 🎯 Uso

### Comandos Disponíveis

#### Gerenciamento de Servidores

\`\`\`
/servers
\`\`\`
Lista todos os servidores Minecraft. Selecione um para ver estatísticas detalhadas incluindo CPU, memória, jogadores online e mais.

\`\`\`
/start
\`\`\`
Mostra apenas servidores **parados**. Selecione um para iniciá-lo.

\`\`\`
/stop
\`\`\`
Mostra apenas servidores **rodando**. Selecione um para pará-lo.

\`\`\`
/console
\`\`\`
Selecione um servidor e envie comandos customizados diretamente para o console (ex: \`say Hello\`, \`whitelist add player\`).

#### Utilitários

\`\`\`
/ping
\`\`\`
Verifica a latência do bot.

\`\`\`
/user [usuário]
\`\`\`
Exibe informações sobre um usuário do Discord.

---

## 🔧 Desenvolvimento

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| \`npm run dev\` | Inicia o bot em modo desenvolvimento com auto-reload |
| \`npm run deploy-commands\` | Registra/atualiza os comandos slash no Discord |

### Adicionar Novos Comandos

1. Crie um arquivo em \`src/commands/crafty/\` ou \`src/commands/utility/\`
2. Exporte um objeto com \`data\` (SlashCommandBuilder) e \`execute\` (função)
3. Execute \`npm run deploy-commands\` para registrar

Exemplo:

\`\`\`javascript
import { SlashCommandBuilder } from "discord.js"

async function execute(interaction) {
    await interaction.reply('Olá!')
}

const command = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Diz olá")

export default {
    data: command,
    execute
}
\`\`\`

---

## 🔐 Segurança

- ⚠️ **Nunca commite o arquivo \`.env\`** - ele contém credenciais sensíveis
- 🔒 O bot usa HTTPS para comunicação com o Crafty Controller
- 🔑 Tokens são gerenciados automaticamente e mantidos em memória
- ✅ Certificados auto-assinados são aceitos (configurável em \`apiService.js\`)

---

## 🐛 Troubleshooting

### Erro 403 (Forbidden)
- Verifique se \`CRAFTY_LOGIN\` e \`CRAFTY_PASSWORD\` estão corretos
- Certifique-se de que o usuário tem permissões no Crafty

### Comandos não aparecem no Discord
- Execute \`npm run deploy-commands\` novamente
- Aguarde alguns minutos (pode levar até 1 hora para atualizar globalmente)
- Tente remover e adicionar o bot novamente ao servidor

### Bot não conecta ao Crafty
- Verifique se \`CRAFTY_BASE_URL\` está correto
- Confirme que o Crafty está rodando e acessível
- Verifique se a porta está correta (padrão: 8443)

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (\`git checkout -b feature/MinhaFeature\`)
3. Commit suas mudanças (\`git commit -m 'Adiciona MinhaFeature'\`)
4. Push para a branch (\`git push origin feature/MinhaFeature\`)
5. Abrir um Pull Request

---

## 📧 Suporte

Se encontrar problemas ou tiver dúvidas, abra uma [issue](../../issues) no repositório.

---

<div align="center">

**Feito com ❤️ para a comunidade Minecraft**

[⬆ Voltar ao topo](#-minecrafty)

</div>
