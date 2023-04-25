const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
            lowercase: true,
            unique: [true, "A user with this phone number already exists"],
        },
        name: {
            type: String,
            // required: true,
        },
        level: {
            type: String,
            required: true,
            default: "0",
        },
        trials: {
            chat_gpt: {
                required: true,
                type: Number,
                default: 5
            },
            image_gen: {
                required: true,
                type: Number,
                default: 3 // 1 if its stability
            }
        }
    },
    {
        collection: 'Users',
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
