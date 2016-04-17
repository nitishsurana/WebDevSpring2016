/**
 * Created by Nitish on 4/14/2016.
 */
module.exports = function (db, mongoose) {

    var stockSchema = require("./stock.schema.server.js")(mongoose);
    var stockModel = mongoose.model('stock', stockSchema);
    var q = require('q');

    var api = {
        addStock: addStock,
        deleteStock: deleteStock,
        updateStock: updateStock
    };

    return api;

    function addStock(stock) {
        var deferred = q.defer();
        stockModel.create(stock, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            if (doc) {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteStock(stockId) {
        var deferred = q.defer();
        stockModel.remove({_id: stockId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            if (doc) {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateStock(stockId, stock) {
        var deferred = q.defer();
        stockModel.findOneAndUpdate({_id: stockId}, stock, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            if (doc) {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};