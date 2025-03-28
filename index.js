const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR Code gerado. Escaneie-o nos logs do Render:");
    console.log(qr); // Exibe o QR como texto nos logs
});

client.on("ready", () => {
    console.log("Bot está pronto!");
    const number = "5581998950305";
    const chatId = `${number}@c.us`;
    client
        .sendMessage(chatId, "oi")
        .then(() => console.log('Mensagem "oi" enviada com sucesso!'))
        .catch((err) => console.error("Erro ao enviar mensagem:", err));
});

client.on("disconnected", (reason) => {
    console.log("Desconectado:", reason);
});

client.initialize();
