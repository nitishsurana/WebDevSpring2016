/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function (db, mongoose) {

    var PortfolioSchema = require('./portfolio.schema.server.js')(mongoose);
    var q = require("q");
    var portfolioModel = mongoose.model('portfolio', PortfolioSchema);

    var api = {
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        findAllInvestmentByUser: findAllInvestmentByUser
    };

    return api;

    function addInvestment(userId, investment) {
        var deferred = q.defer();
        portfolioModel.findOne({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                if (doc) {
                    doc.investment.push(investment);
                    portfolioModel.update({userId: doc.userId}, doc, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        if (doc) {
                            return deferred.resolve(doc);
                        }
                    });
                }
                else {
                    var portfolio = {
                        userId: userId,
                        investment: [investment]
                    };
                    portfolioModel.create(portfolio, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        if (doc) {
                            deferred.resolve(userId);
                        }
                    });
                }
            }
        });
        return deferred.promise;
    }

    function deleteInvestment(userId, investmentId) {
        var deferred = q.defer();
        portfolioModel.find({userId: userId}, function (err, portfolio) {
            if (err) {
                deferred.reject(err);
            }
            if (portfolio) {
                for (var i = 0; i < portfolio[0].investment.length; i++) {
                    if (portfolio[0].investment[i]._id == investmentId) {
                        break;
                    }
                }
                portfolio[0].investment.splice(i, 1);
                portfolioModel.findOneAndUpdate({userId: userId}, portfolio[0], function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    if (doc) {
                        return deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateInvestment(userId, investment) {
        var deferred = q.defer();
        portfolioModel.find({userId: userId}, function (err, portfolio) {
            if (err) {
                deferred.reject(err);
            }
            if (portfolio) {
                for (var i = 0; i < portfolio[0].investment.length; i++) {
                    if (portfolio[0].investment[i]._id == investment._id) {
                        portfolio[0].investment[i] = investment;
                        break;
                    }
                }
                portfolioModel.findOneAndUpdate({userId: userId}, portfolio[0], function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    if (doc) {
                        return deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllInvestmentByUser(userId) {
        var deferred = q.defer();
        portfolioModel.find({userId: userId}, function (err, doc) {
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