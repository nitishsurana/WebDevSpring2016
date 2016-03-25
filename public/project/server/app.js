/**
 * Created by Nitish on 3/21/2016.
 */
module.exports = function(app) {

    var userModel    = require("./models/user.model.js")();
    var portfolioModel   = require("./models/portfolio.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var searchService = require("./services/search.service.server.js")(app, userModel);
    var portfolioSevice = require("./services/portfolio.service.server")(app,portfolioModel);

};