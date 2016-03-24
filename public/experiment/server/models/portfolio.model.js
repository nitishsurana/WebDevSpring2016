/**
 * Created by Nitish on 3/24/2016.
 */
var portfolio = require("./portfolio.mock.json");

module.exports = function() {
    var api = {
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        totalInvestmentValue: totalInvestmentValue,
        currentValue: currentValue,
        calculateProfit: calculateProfit
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

    function addInvestment(investment){
        portfolio.push(investment);
        return investment;
    }


    function deleteInvestment(investmentOption){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].investmentOption == investmentOption){
                break;
            }
        }
        portfolio.splice(i,1);
        return portfolio;
    }

    function updateInvestment(investment){
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
        return portfolio[i];
    }
};