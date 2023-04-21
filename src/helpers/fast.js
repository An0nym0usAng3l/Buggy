const FastSpeedtest = require("fast-speedtest-api");
require("dotenv").config()

class Fast {
    static async check_speed() {
        try {
            let speedtest = new FastSpeedtest({
                token: process.env.FAST_TOKEN, // required
                verbose: false, // default: false
                timeout: 10000, // default: 5000
                https: true, // default: true
                urlCount: 5, // default: 5
                bufferSize: 8, // default: 8
                unit: FastSpeedtest.UNITS.Mbps // default: Bps
            });
            let speed = await speedtest.getSpeed()
            return (speed);
        } catch (err) {
            console.log(err?.message)
            return {
                failed: true,
                message: err?.message
            }
        }
    }
}

module.exports = Fast