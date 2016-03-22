/**
 * Created by Nitish on 3/21/2016.
 */
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    //var userModel    = require("./models/user.model.server.js")();
    //var movieModel   = require("./models/portfolio.model.server.js")();

    //var userService  = require("./services/user.service.server.js") (app, movieModel, userModel);
    var searchService = require("./services/search.service.server.js")(app);
}