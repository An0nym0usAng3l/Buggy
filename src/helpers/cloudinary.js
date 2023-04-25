require("dotenv").config()
const cloudinary = require("cloudinary").v2

class Cloudinary {
    static async upload_with_base64(base64) {
        try {
            const req = await cloudinary.uploader.unsigned_upload(`data:image/png;base64,${base64}`, process.env.CLOUDINARY_UPLOAD_PRESET, {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                folder: "BuggyStabilityImages",
            })
            return (await req).url
        } catch (e) {
            return ({
                failed: true,
                message: e?.message
            })
        }
    }
}

module.exports = Cloudinary