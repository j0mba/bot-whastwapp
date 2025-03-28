const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Configuração do cliente com autenticação persistente
const client = new Client({
  authStrategy: new LocalAuth(), // Salva a sessão localmente
  puppeteer: { headless: true }, // Executa o navegador em modo invisível
});

// Exibe o QR code no terminal para autenticação
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Escaneie o QR code com o WhatsApp.");
});

// Quando o cliente estiver pronto
client.on("ready", () => {
  console.log("Bot está pronto!");

  // Número de destino no formato internacional
  const number = "558132176990";
  const chatId = `${number}@c.us`; // Formato exigido pelo whatsapp-web.js

  // Envia a mensagem "oi"
  client
    .sendMessage(chatId, "oi")
    .then(() => console.log('Mensagem "oi" enviada com sucesso!'))
    .catch((err) => console.error("Erro ao enviar mensagem:", err));
});

// Inicializa o cliente
client.initialize();

// Tratamento de erros
client.on("disconnected", (reason) => {
  console.log("Desconectado:", reason);
});
