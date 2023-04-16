const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            lowercase: true,
            unique: [true, "A user with this phone number already exists"],
        },
        level: {
            type: String,
            default: "0",
        },
        trials: {
            chat_gpt: {
                type: Number,
                default: 3
            },
            image_gen: {
                type: Number,
                default: 3
            }
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    },
);

module.exports = mongoose.model("User", userSchema);
