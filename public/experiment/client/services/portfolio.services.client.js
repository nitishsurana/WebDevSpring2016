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

    function deleteInvestment(userId, investmentOption){
        return $http.delete("/api/project/" + userId + "/investment/" + investmentOption);
    }

    function updateInvestment(userId, investment){
        return $http.put("/api/project/" + userId + "/investment", investment);
    }

    function findAllInvestmentByUserId(userId){
        $http.get("/api/project/" + userId + "/investment")
            .success(function(response){
                return response.data;
            });
    }

    function totalInvestmentValue(userId){
        var portfolio = findAllInvestmentByUserId(userId);
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].totalInvestment;
        }
        return sum;
    }

    function currentValue(userId){
        var portfolio = findAllInvestmentByUserId(userId);
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].currentValue;
        }
        return sum;
    }

    function calculateProfit(userId){
        var portfolio = findAllInvestmentByUserId(userId);
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].profit;
        }
        if (sum<0){
            return "-".concat(Math.abs(sum).toString());
        }
        else {
            return "$".concat(sum.toString());
        }
    }
    
}