/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function (app, portfolioModel) {
    app.get("/api/project/:id/investment", findAllInvestmentByUserId);
    app.post("/api/project/:id/investment", addInvestment);
    app.delete("/api/project/:id/investment/:stockId", deleteInvestment);
    app.put("/api/project/:id/investment", updateInvestment);
    
    function findAllInvestmentByUserId(req, res) {
        var userId = req.params.id;
        portfolioModel.findAllInvestmentByUser(userId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function addInvestment(req, res) {
        var userId = req.params.id;
        var investment = req.body;
        portfolioModel.addInvestment(userId, investment)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function deleteInvestment(req, res) {
        var userId = req.params.id;
        var stockId = req.params.stockId;
        portfolioModel.deleteInvestment(userId, stockId)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function updateInvestment(req, res) {
        var userId = req.params.id;
        var investment = req.body;
        portfolioModel.updateInvestment(userId, investment)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
};