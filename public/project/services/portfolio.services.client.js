/**
 * Created by Nitish on 3/3/2016.
 */

angular
    .module("PortfolioManager")
    .factory("PortfolioService", PortfolioService);

function PortfolioService(){
    var portfolio = [];
    portfolio = [
        {"investmentOption":"Option 1", "pricePerQty":30, "qty":200, "totalInvestment": 6000, "currentValue":8000, "profit": 2000},
        {"investmentOption":"Option 2", "pricePerQty":100, "qty":10, "totalInvestment": 1000, "currentValue":900, "profit": -100},
        {"investmentOption":"Option 3", "pricePerQty":50, "qty":1000, "totalInvestment":50000, "currentValue":50000, "profit":0}
    ];

    var api = {
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        totalInvestmentValue: totalInvestmentValue,
        currentValue: currentValue,
        calculateProfit: calculateProfit,
        portfolio: portfolio
    };

    return api;

    function totalInvestmentValue(){
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].totalInvestment;
        }
        return sum;
    }

    function currentValue(){
        var sum = 0;
        for(var i=0; i<portfolio.length; i++){
            sum += portfolio[i].currentValue;
        }
        return sum;
    }

    function calculateProfit(){
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

    function addInvestment(investment, callback){
        portfolio.push(investment);
        callback(investment);
    }


    function deleteInvestment(investmentOption, callback){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].investmentOption == investmentOption){
                break;
            }
        }
        portfolio.splice(i,1);
        callback(portfolio);
    }

    function updateInvestment(investment, callback){
        for(var i = 0; i<portfolio.length; i++){
            if (portfolio[i].investmentOption == investment.investmentOption){
                portfolio[i].pricePerQty = investment.pricePerQty;
                portfolio[i].qty = investment.qty;
                portfolio[i].totalInvestment = investment.totalInvestment;
                portfolio[i].currentValue = investment.currentValue;
                portfolio[i].profit = investment.profit;
                break;
            }
        }
        callback(portfolio[i]);
    }
}