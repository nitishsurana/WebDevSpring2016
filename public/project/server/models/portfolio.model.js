/**
 * Created by Nitish on 3/24/2016.
 */

var portfolio = require("./portfolio.mock.json");

module.exports = function() {

    var api = {
        addInvestment: addInvestment,
        deleteInvestment: deleteInvestment,
        updateInvestment: updateInvestment,
        findAllInvestmentByUser: findAllInvestmentByUser
    };

    return api;

    function addInvestment(userId, investment){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].id == userId){
                portfolio[i].investment.push(investment);
                return portfolio[i].investment;
            }
        }
    }

    function deleteInvestment(userId, investmentOption){
        for (var i = 0; i<portfolio.length; i++){
            if (portfolio[i].id == userId){
                for (var j = 0; j<portfolio[i].investment.length; j++){
                    if (portfolio[i].investment[j].investmentOption == investmentOption){
                        portfolio[i].investment.splice(j,1);
                        return portfolio[i].investment;
                    }
                }
            }
        }
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
                        return portfolio[i].investment;
                    }
                }
            }
        }
    }

    function findAllInvestmentByUser(userId) {
        //console.log("Portfolio Model");
        for(var i = 0; i<portfolio.length; i++) {
            if (portfolio[i].id == userId) {
                //console.log(portfolio[i]);
                return portfolio[i].investment;
            }
        }
    }
};