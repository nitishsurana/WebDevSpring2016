/**
 * Created by Nitish on 3/21/2016.
 */
module.exports = function(app, db, mongoose) {

    var userModel    = require("./models/user.model.js")(db, mongoose);
    var portfolioModel   = require("./models/portfolio.model.server.js")(db, mongoose);
    //var stockModel = require("./models/stock.model.server.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js") (app, userModel);
    var searchService = require("./services/search.service.server.js")(app, userModel);
    var portfolioSevice = require("./services/portfolio.service.server")(app,portfolioModel);

};