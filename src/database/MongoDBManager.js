const mongoose = require("mongoose");
require("dotenv").config()

class MongoManager {
    constructor() {
        mongoose.set("strictQuery", false);
        this.url = process.env.ATLAS_URI;
    }

    async connect() {
        try {
            console.log("Connecting to MongoDB");
            await mongoose.connect(this.url);
            console.log("Successfully connected to MongoDB.");
        } catch (err) {
            console.log(err);
        } finally {
            // await client.close();
        }
    }
}
module.exports = MongoManager;
