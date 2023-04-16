const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class ChatGPT {
    static async generate_response(question) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            temperature: 0.7,
            max_tokens: 100,
        });
        return (response.data.choices[0].text);
    }
}

module.exports = ChatGPT