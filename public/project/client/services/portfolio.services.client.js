/**
 * Created by Nitish on 3/3/2016.
 */

angular
    .module("PortfolioManager")
    .factory("PortfolioService", PortfolioService);

function PortfolioService($http){

    var portfolioServiceApi ={
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        totalInvestmentValue: totalInvestmentValue,
        currentValue: currentValue,
        calculateProfit: calculateProfit,
        findAllInvestmentByUserId: findAllInvestmentByUserId
    };

    return portfolioServiceApi;

    function addInvestment(userId, investment){
        return $http.post("/api/project/" + userId + "/investment", investment);
    }

    function deleteInvestment(userId, stockId){
        return $http.delete("/api/project/" + userId + "/investment/" + stockId);
    }

    function updateInvestment(userId, investment){
        return $http.put("/api/project/" + userId + "/investment", investment);
    }

    function findAllInvestmentByUserId(userId){
        return $http.get("/api/project/" + userId + "/investment");
    }

    function totalInvestmentValue(portfolio){
        //console.log("Portfolio Service client");
        //console.log(portfolio);
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].totalAmtInvested;
        }
        return sum;
    }

    function currentValue(portfolio){
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].currentValue;
        }
        return sum;
    }

    function calculateProfit(portfolio){
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].profit;
        }
        if (sum<0){
            return "- $".concat(Math.abs(sum).toString());
        }
        else {
            return "$".concat(sum.toString());
        }
    }
    
}