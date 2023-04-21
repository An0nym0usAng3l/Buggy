const welcome_text = (user) => `Hello there! Welcome to Buggy, your personal WhatsApp bot. Here are the available commands you can use:

1. Chat with AI (you have ${user.trials.chat_gpt} attempt(s) left)
2. Generate Image (you have ${user.trials.image_gen} attempt(s) left)
3. Check Network Speed (free)

Please type the number corresponding to the command you want to use, or type '0' to see this list again.
`

const chat_with_ai = (user) => `
You have ${user.trials.chat_gpt} attempt(s) left to chat with AI. Please type in your message to start the conversation. You can type '0' at any time to cancel the conversation and return to the main menu.
`

const exhausted = (option) => `
Sorry, you have no more attempts left to ${option}. Please enter '0' to go back to the main menu.
`

const generate_image = (user) => `
You have ${user.trials.image_gen} attempt(s) left to generate an image. Please enter a brief description of the image you want to generate. You can type '0' at any time to cancel the conversation and return to the main menu.
`

const invalid = `
Sorry, I didn't understand your response. Please enter a valid option or command from the list provided, or type '0' to see the list again.
`

const ai_reply = (response, user) => `${response}

_You have ${user.trials.chat_gpt} attempt(s) left to chat with AI._
`

const image_caption = (text, user) => `Here is
*${text}*

_You have ${user.trials.image_gen} attempt(s) left to generate image._
`

const speed_reply = (speed) => `
Your network speed is *${speed.toFixed(2)}* megabits per second.
`

const error_reply = (message) => `
${"```Error, error, error! Looks like the jokes on us this time```"}

*Details:*
${"```"}${message}${"```"}

Enter '0' to go back to the main menu.
`

module.exports = {
    welcome_text,
    chat_with_ai,
    exhausted,
    generate_image,
    invalid,
    ai_reply,
    image_caption,
    speed_reply,
    error_reply
}