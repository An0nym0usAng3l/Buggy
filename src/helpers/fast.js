const FastSpeedtest = require("fast-speedtest-api");

class Fast {
    static async check_speed() {
        let speedtest = new FastSpeedtest({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
            verbose: false, // default: false
            timeout: 10000, // default: 5000
            https: true, // default: true
            urlCount: 5, // default: 5
            bufferSize: 8, // default: 8
            unit: FastSpeedtest.UNITS.Mbps // default: Bps
        });
        let speed = await speedtest.getSpeed()
        return (speed);
    }
}

module.exports = Fast