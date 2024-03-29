const ErrorHandler = require("../../interfaces/errors");
const ResponseManager = require("../../interfaces/response")
const { getOne, update_level, create, update_trials } = require("./UserServices")
const ChatGPT = require("../../helpers/chatgpt")
const WhatsApp = require("../../helpers/whatsapp")
const Fast = require("../../helpers/fast")
const StabilityAI = require("../../helpers/stability")
const Cloudinary = require("../../helpers/cloudinary")
const {
    welcome_text,
    chat_with_ai,
    generate_image,
    invalid,
    exhausted,
    ai_reply,
    image_caption,
    speed_reply,
    error_reply
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
    if (!body.entry || body?.entry[0]?.changes[0]?.field !== 'messages'
        || body?.entry[0]?.changes[0]?.value?.messages?.length === 0)
        return ErrorHandler.invalidPayload(req, res, "Not a message")

    // GET MESSAGE, NAME AND PHONE NUMBER
    const messages = body?.entry[0]?.changes[0]?.value?.messages
    // const name = body?.entry[0]?.changes[0]?.value?.contacts[0]?.profile?.name;
    if (!messages) return ErrorHandler.invalidPayload(req, res, "Empty message")
    const message = messages[messages?.length - 1]
    const phone = message?.from

    // GET TEXT AND USER AND THEIR LEVE L
    const text = message?.text?.body
    let user = await getOne({ phone })
    if (!user || user.length === 0) {
        user = await create({ phone })
        await WhatsApp.send_text(phone, welcome_text(user))
        return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
    }
    // else if (!user?.name || user?.name !== name) {
    //     let user_name = name ? name : phone
    //     await update_name(phone, user_name)
    // }


    // Go back if text is 0
    if (text === "0") {
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
                let response = await ChatGPT.generate_response(text);
                if (await response?.failed) {
                    await WhatsApp.send_text(phone, error_reply(response?.message, user))
                } else {
                    let trials = {
                        ...user.trials,
                        chat_gpt: user.trials.chat_gpt - 1,
                    }
                    let newuser = await update_trials(phone, trials)
                    await WhatsApp.send_text(phone, ai_reply(response, newuser))
                }
            }
            else {
                await WhatsApp.send_text(phone, exhausted("chat with AI"))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
        case "2":
            // Generate Image
            if (user.trials.image_gen > 0) {

                // GENERATING WITH STABILITY AI
                // let base64 = await StabilityAI.generate_image(text)
                // let url = (await Cloudinary.upload_with_base64(base64))

                // GENERATING WITH DALL E
                let url = await ChatGPT.generate_image(text);
                if (await url?.failed) {
                    await WhatsApp.send_text(phone, error_reply(url?.message))
                } else {
                    let trials = {
                        ...user.trials,
                        image_gen: user.trials.image_gen - 1,
                    }
                    let newuser = await update_trials(phone, trials)
                    await WhatsApp.send_image(phone, url, String(image_caption(text, newuser)))
                }
            }
            else {
                await WhatsApp.send_text(phone, exhausted("image generation"))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent Image")

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
            let speed = await Fast.check_speed()
            if (await speed?.failed) {
                await WhatsApp.send_text(phone, error_reply(speed?.message, user))
            } else {
                await WhatsApp.send_text(phone, speed_reply(speed))
            }
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")

        default:
            await WhatsApp.send_text(phone, invalid)
            return ResponseManager.getResponseHandler(res).onSuccess("", "Successfully sent message")
    }



}

module.exports = { verify_webhook, sort_webhook }