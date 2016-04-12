/**
 * Created by Nitish on 4/11/2016.
 */
module.exports = function(mongoose){

    var InvestmentSchema = mongoose.Schema({
        investmentName: String,
        investmentSymbol: String,
        pricePerQty: Number,
        qty: Number
    },{collection : 'investment'});

    return InvestmentSchema;
};