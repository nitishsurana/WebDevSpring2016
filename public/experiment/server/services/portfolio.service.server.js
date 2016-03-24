/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function(app, portfolioModel){
    app.post("/api/project/:id/investment", addInvestment);
    app.delete("/api/project/:id/investment/:investmentOption", deleteInvestment);
    app.put("/api/project/:id/investment", updateInvestment);
    
    function addInvestment(req, res) {
        var userId = req.params.id;
        var investment = req.body;
        var result = portfolioModel.addInvestment(userId, investment);
        res.json(result);
    }
    
    function deleteInvestment(req, res) {
        var userId = req.params.id;
        var investmentOption = req.params.investmentOption;
        var result = portfolioModel.deleteInvestment(userId, investmentOption);
        res.json(result);
    }

    function updateInvestment(req, res) {
        var userId = req.params.id;
        var investmentOption = req.body;
        var result = portfolioModel.updateInvestment(userId, investmentOption);
        res.json(result);
    }
};