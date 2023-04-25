const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class ChatGPT {
    static async generate_response(question) {
        try {
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
        } catch (err) {
            if (error.response) {
                return {
                    failed: true,
                    message: error?.response?.data?.error?.message
                }
            } else {
                return {
                    failed: true,
                    message: error?.message
                }
            }
        }
    }

    static async generate_image(prompt) {
        try {
            const response = await openai.createImage({
                prompt: `${prompt}
                            
                In English!!
                `,
                n: 1,
                size: "1024x1024",
            });
            return response.data.data[0].url;
        } catch (error) {
            if (error.response) {
                return {
                    failed: true,
                    message: error?.response?.data?.error?.message
                }
            } else {
                return {
                    failed: true,
                    message: error?.message
                }
            }
        }
    }
}

module.exports = ChatGPT