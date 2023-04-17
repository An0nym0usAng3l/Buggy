require("dotenv").config()
const axios = require("axios")

class Whatsapp {
    static async send_text(phone, text) {
        try {
            await axios({
                method: "POST",
                url: "https://graph.facebook.com/v15.0/101516122859859/messages",
                data:
                {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": phone,
                    "type": "text",
                    "text": {
                        "preview_url": false,
                        "body": text
                    }
                }
                ,
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                },
            })
            console.log("sent reply")
            return true
        } catch (e) {
            return false
        }
    }

    static async send_image(phone, url, caption) {
        try {
            await axios({
                method: "POST",
                url: "https://graph.facebook.com/v15.0/101516122859859/messages",
                data:
                {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": phone,
                    "type": "image",
                    "image": {
                        "link": url,
                        "caption": caption
                    }
                }
                ,
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                },
            })
            return true
        } catch (e) {
            return false
        }
    }
}

module.exports = Whatsapp