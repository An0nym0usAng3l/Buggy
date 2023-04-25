require("dotenv").config()
const axios = require("axios")

class Whatsapp {
    static async send_text(phone, text) {
        try {
            await axios({
                method: "POST",
                url: "https://graph.facebook.com/v15.0/114500484951780/messages",
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
            return true
        } catch (e) {
            console.log(e)
        }
    }

    static async send_image(phone, url, caption) {
        try {
            await axios({
                method: "POST",
                url: "https://graph.facebook.com/v16.0/114500484951780/messages",
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
            console.log(e?.response?.data?.error?.message)
        }
    }

    // DIDN'T WORK
    // static async send_image_base64(phone, base64, caption) {
    //     try {
    //         await axios({
    //             method: 'POST',
    //             url: `https://graph.facebook.com/v16.0/114500484951780/messages`,
    //             data: {
    //                 "messaging_product": "whatsapp",
    //                 "recipient_type": "individual",
    //                 "to": phone,
    //                 "type": "image",
    //                 "image": {
    //                     "image": base64,
    //                     "caption": caption
    //                 }
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         return true
    //     } catch (e) {
    //         console.log(e?.response?.data?.error?.message)
    //     }
    // }
}

module.exports = Whatsapp