const App = require("./App");
const MongoManager = require("./database/MongoDBManager");
const v1 = require('./app/routes')

const start = async () => {
    let restServer = new App();
    let mongo = new MongoManager()
    await mongo.connect()
    restServer.add_route("/v1", v1);
    restServer.start()
}

start()
