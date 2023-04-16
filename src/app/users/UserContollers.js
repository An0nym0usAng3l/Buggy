const ErrorHandler = require("../../interfaces/errors");
const ResponseManager = require("../../interfaces/response")
const { getOne, update_level } = require("./UserServices")
const ChatGPT = require("../../helpers/chatgpt")
const WhatsApp = require("../../helpers/whatsapp")
const {
    welcome_text,
    chat_with_ai,
    generate_image,
    invalid,
    exhausted,
    ai_reply
} = require("../../helpers/messages")

const verify_webhook = async (req, res) => {
    if (
        req.query['hub.mode'] == 'subscribe' &&
        req.query['hub.verify_token'] == token
    ) {
        return res.send(req.query['hub.challenge']);
    } else {
        return res.sendStatus(400);
    }
}

const sort_webhook = async (req, res) => {
    const body = req.body

    // VERIFY IF IT IS A MESSAGE
    // if (body?.field !== 'messages') return res.sendStatus(400)
    // if (body?.value?.messages?.length === 0 ) res.status(400)
    if (!body.entry || body?.entry[0]?.changes[0]?.field !== 'messages'
        || body?.entry[0]?.changes[0]?.value?.messages?.length === 0)
        return ErrorHandler.invalidPayload(req, res, "Not a message")

    // GET MESSAGE AND PHONE NUMBER
    // const messages = body?.value?.messages 
    const messages = body?.entry[0]?.changes[0]?.value?.messages
    if (!messages) return ErrorHandler.invalidPayload(req, res, "Empty message")
    const message = messages[messages?.length - 1]
    const phone = message?.from

    // GET TEXT AND USER AND THEIR LEVEL
    if (phone !== "2348039375341") return;
    const text = message?.text?.body
    let user = getOne({ phone })

    // Go back if text is 00
    if (text === "00") {
        await update_level(phone, "0")
        await WhatsApp.send_text(phone, welcome_text(user))
        return ResponseManager.getResponseHandler(res).onSuccess("", "Back to main menu")
    }
    let initial_level = user.level
    // Reply based on initital level
    switch (initial_level) {
        case "1":
            //ChatGPT
            if (user.trials.chat_gpt > 0) {
                let response = ChatGPT.generate_response(text);
                await WhatsApp.send_text(phone, ai_reply(response, user))
            }
            else {
                await WhatsApp.send_text(phone, exhausted("chat with AI"))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
        case "2":
            // Generate Image

            break;

        default:
            break;
    }

    let current_level = initial_level !== "0" ? `${initial_level}*${text}` : text

    // Reply based on current level
    switch (String(current_level)) {
        case "1":
            if (user.trials.chat_gpt > 0) {
                await WhatsApp.send_text(phone, chat_with_ai(user))
                await update_level(phone, "1")
            }
            else {
                await WhatsApp.send_text(phone, exhausted("chat with AI"))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
        case "2":
            if (user.trials.image_gen > 0) {
                await WhatsApp.send_text(phone, generate_image(user))
                await update_level(phone, "2")
            } else {
                await WhatsApp.send_text(phone, exhausted("generate an image"))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
        case "3":
            await WhatsApp.send_text(phone, "Speeeed")
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")

        default:
            await WhatsApp.send_text(phone, invalid)
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
    }



}

module.exports = { verify_webhook, sort_webhook }