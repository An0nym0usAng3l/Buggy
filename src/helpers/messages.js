const welcome_text = (user) => `Hello there! Welcome to Buggy, your personal WhatsApp bot. Here are the available commands you can use:

1. Chat with AI (you have ${user.trials.chat_gpt} tries left)
2. Generate Image (you have ${user.trials.image_gen} tries left)
3. Check Network Speed
Please type the number corresponding to the command you want to use, or type '00' to see this list again.
`

const chat_with_ai = (user) => `
You have ${user.trials.chat_gpt} attempts left to chat with AI. Please type in your message to start the conversation. You can type '00' at any time to cancel the conversation and return to the main menu.
`

const exhausted = (option) => `
Sorry, you have no more attempts left to ${option}. Please enter '00' to go back to the main menu.
`

const generate_image = (user) => `
You have ${user.trials.chat_gpt} attempts left to generate an image. Please enter a brief description of the image you want to generate. You can type '00' at any time to cancel the conversation and return to the main menu.
`

const invalid = `
Sorry, I didn't understand your response. Please enter a valid option or command from the list provided.
`

const ai_reply = (response, user) => `
*${response}*

_You have ${user.trials.chat_gpt} attempts left to chat with AI._
`

module.exports = {
    welcome_text,
    chat_with_ai,
    exhausted,
    generate_image,
    invalid,
    ai_reply
}