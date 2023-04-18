const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class ChatGPT {
    static async generate_response(question) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
            ${question}

            ${process.env.EXTRA_COMMAND}
            `,
            temperature: 0.7,
            max_tokens: 100,
        });
        return (response.data.choices[0].text);
    }

    static async generate_image(prompt) {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });
        return response.data.data[0].url;
    }
}

module.exports = ChatGPT