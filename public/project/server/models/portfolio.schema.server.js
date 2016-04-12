/**
 * Created by Nitish on 4/11/2016.
 */
module.exports = function(mongoose){

    var InvestmentSchema = require('./investmentOption.schema.server.js')(mongoose);

    var PortfolioSchema = mongoose.Schema({
        userId: String,
        investment: [InvestmentSchema]
    }, {collection : 'portfolio'});
    return PortfolioSchema;
};