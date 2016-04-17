/**
 * Created by Nitish on 3/21/2016.
 */

var http = require('http');

module.exports = function (app, userModel) {
    app.get("/api/project/search-option/:query", searchOption);
    app.get("/api/project/search-yahoo/:symbol", searchYahoo);
    app.get("/api/project/search-investor/:query", searchInvestor);

    function searchOption(req, res) {
        var searchQuery = req.params.query;
        var request = {
            host: 'chstocksearch.herokuapp.com',
            path: '/api/' + searchQuery
        };

        http.get(request, function (response) {

            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                var parsed = JSON.parse(body);
                res.send(parsed);
            });
        });
    }

    function searchYahoo(req, res) {
        var symbol = req.params.symbol;
        var request = {
            host: 'query.yahooapis.com',
            path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22' + symbol + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        };
        http.get(request, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                var parsed = JSON.parse(body);
                //console.log(parsed);
                res.send(parsed);
            });

        });
    }

    function searchInvestor(req, res) {
        var query = req.params.query;
        var result = userModel.findUserByUsername(query);
        res.send(result);
    }
};