const axios = require("axios");
require("dotenv").config()

const host = "https://api.stability.ai"
const engineId = "stable-diffusion-v1-5"
const apiKey = process.env.STABILITY_AI_KEY
class StabilityAI {
    static async generate_image(prompt) {
        try {
            const response = await axios({
                method: "POST",
                url: `${host}/v1/generation/${engineId}/text-to-image`,
                data: JSON.stringify({
                    text_prompts: [
                        {
                            text: `${prompt}
                            
                            In English!!
                            `,
                        },
                    ],
                    cfg_scale: 7,
                    clip_guidance_preset: 'FAST_BLUE',
                    height: 1024,
                    width: 1024,
                    samples: 1,
                    steps: 30,
                })
                ,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            })
            return await response?.data?.artifacts[0]?.base64;
        } catch (error) {
            return {
                failed: true,
                message: error?.message
            }
        }
    }
}

module.exports = StabilityAI