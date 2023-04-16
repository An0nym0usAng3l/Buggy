const App = require("./App");
const MongoManager = require("./database/MongoDBManager");
const v1 = require('./app/routes')

let restServer = new App();
let mongo = new MongoManager()
mongo.connect()
restServer.add_route("/v1", v1);
restServer.start()
