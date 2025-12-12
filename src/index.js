import wpp from "whatsapp-web.js"
import qrcode from "qrcode-terminal"
import { getPuppeteerConfig } from "./get-pupeteer-config.js"


const localAuthConfiguration = {
    dataPath: '../wpp'
}

const puppeteerConfig = getPuppeteerConfig

const wppClientConfiguration = {
    authStrategy: new wpp.LocalAuth(localAuthConfiguration),
    puppeteer: puppeteerConfig,
}

const client = new wpp.Client(wppClientConfiguration)

client.on("qr", function(qr){
    qrcode.generate(qr, { small: true })
})

//callback que valida a conexão qr-code > aparelho
client.on("ready", function () {
    console.log("Conexão bem sucedida!")
})


//callback para fazer a interpretação da mensagem
client.on("message", async function(message){
    const chat = await message.getChat()

    const messages = await chat.fetchMessages({ limit: 10 })

    console.log(messages)
})

client.initialize()
