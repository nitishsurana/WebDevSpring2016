/**
 * Created by Nitish on 4/11/2016.
 */
module.exports = function(mongoose){

    var stockSchema = mongoose.Schema({
        stockName: String,
        stockSymbol: String,
        pricePerQty: Number,
        qty: Number,
        totalAmtInvested: Number
    },{collection : 'stock'});

    return stockSchema;
};