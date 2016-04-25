/**
 * Created by Nitish on 3/3/2016.
 */

angular
    .module("PortfolioManager")
    .factory("PortfolioService", PortfolioService);

function PortfolioService($q, $http, SearchService) {

    var values = [];
    var count = 0;

    var portfolioServiceApi = {
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        totalInvestmentValue: totalInvestmentValue,
        currentValue: currentValue,
        calculateProfit: calculateProfit,
        findAllInvestmentByUserId: findAllInvestmentByUserId,
        currentValueOfStocks: currentValueOfStocks,
        currentValueOfStock: currentValueOfStock
    };

    return portfolioServiceApi;

    function addInvestment(userId, investment) {
        return $http.post("/api/project/" + userId + "/investment", investment);
    }

    function deleteInvestment(userId, stockId) {
        return $http.delete("/api/project/" + userId + "/investment/" + stockId);
    }

    function updateInvestment(userId, investment) {
        return $http.put("/api/project/" + userId + "/investment", investment);
    }

    function findAllInvestmentByUserId(userId) {
        return $http.get("/api/project/" + userId + "/investment");
    }

    function totalInvestmentValue(portfolio) {
        var sum = 0;
        for (var i = 0; i < portfolio.length; i++) {
            sum += portfolio[i].totalAmtInvested;
        }
        return sum;
    }

    function currentValue(portfolio) {
        var sum = 0;
        for (var i = 0; i < portfolio.length; i++) {
            sum += portfolio[i].currentValueOfInvestment;
        }
        return sum;
    }

    function calculateProfit(portfolio) {
        var sum = 0;
        for (var i = 0; i < portfolio.length; i++) {
            sum += portfolio[i].profit;
        }
        return sum;
    }

    function currentValueOfStocks(stocks){
        count = 0;
        var deferred = $q.defer();
        for(var i=0; i<stocks.length; i++){
            currentValueOfStock(stocks[i].stockName, stocks[i].qty, i)
                .then(function(response){
                    count++;
                    if(count>= stocks.length){
                        deferred.resolve(values);
                    }
                }, function(error){
                    deferred.reject(error);
                });
        }
        return deferred.promise;
    }

    function currentValueOfStock(symbol, qty, pos){
        values = [];
        var deferred = $q.defer();
        SearchService.searchYahooSymbol(symbol)
            .then(function(response){
                var a = response.data.query.results.quote.LastTradePriceOnly * qty;
                values.push({
                    "position": pos,
                    "value": a
                });
                deferred.resolve();
            }, function(error){
                deferred.reject(error);
            });
        return deferred.promise;
    }
}