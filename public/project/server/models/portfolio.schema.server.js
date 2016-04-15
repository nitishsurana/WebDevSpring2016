/**
 * Created by Nitish on 4/11/2016.
 */
module.exports = function(mongoose){

    var stockSchema = require('./stock.schema.server.js')(mongoose);

    var PortfolioSchema = mongoose.Schema({
        userId: String,
        investment: [stockSchema]
    }, {collection : 'portfolio'});
    return PortfolioSchema;
};