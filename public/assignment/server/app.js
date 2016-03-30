/**
 * Created by Nitish on 3/15/2016.
 */
module.exports = function(app, db, mongoose) {

    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);
    var fieldService = require("./services/field.service.server.js")(app, userModel, formModel);
    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);

}