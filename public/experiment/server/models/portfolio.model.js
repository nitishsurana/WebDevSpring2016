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

    function addInvestment(userId, investment){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].id == userId){
                portfolio[i].investment.push(investment);
                break;
            }
        }
        return portfolio;
    }


    function deleteInvestment(userId, investmentOption){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].id == userId){
                for (var j = 0; j<portfolio[i].investment.length; j++){
                    if (portfolio[i].investment[j].investmentOption == investmentOption){
                        portfolio[i].investment.splice(j,1);
                    }
                }
            }
            
        }
        
        return portfolio;
    }

    function updateInvestment(userId, investment){
        for(var i = 0; i<portfolio.length; i++){
            if (portfolio[i].id == userId){
                for (var j = 0; j<portfolio[i].investment.length; j++){
                    if (portfolio[i].investment[j].investmentOption == investment.investmentOption){
                        portfolio[i].investment[j].pricePerQty = investment.pricePerQty;
                        portfolio[i].investment[j].qty = investment.qty;
                        portfolio[i].investment[j].totalInvestment = investment.totalInvestment;
                        portfolio[i].investment[j].currentValue = investment.currentValue;
                        portfolio[i].investment[j].profit = investment.profit;
                        break;
                    }
                }
            }
        }
        return portfolio;
    }
};