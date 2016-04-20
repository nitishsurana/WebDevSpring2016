/**
 * Created by Nitish on 3/21/2016.
 */

var http = require('http');

module.exports = function (app, userModel) {
    app.get("/api/project/search-option/:query", searchOption);
    app.get("/api/project/search-yahoo/:symbol", searchYahoo);
    app.get("/api/project/search-investor/:query", searchInvestor);
    app.get("/api/project/search-yahoo/index/:symbol", searchYahooIndex);
    app.get("/api/project/search-yahoo/symbol/:symbol", searchYahooSymbol);

    var api ={
        portfolioRequest: portfolioRequest
    };
    return api;
    
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
        var result = [];
        http.get(request, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                result.push(JSON.parse(body));
                //console.log(parsed);
                //res.send(parsed);
            });

        });
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month>9? "" : "0") + month;
        var day = date.getDate();
        day = (day > 9? "" : "0") + day;
        //console.log(year,typeof(month),typeof(day));
        var endDate = year + '-' + month + '-' + day;
        var startDate = (year - 1) + '-' + month + '-' + (parseInt(day) + 1);
        //console.log(startDate, typeof(endDate));
        var request_historic_data = {
            host: 'query.yahooapis.com',
            path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + symbol + '%22%20and%20startDate%20%3D%20%22' + startDate + '%22%20and%20endDate%20%3D%20%22' + endDate + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        };
        http.get(request_historic_data, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                result.push(JSON.parse(body));
                //console.log(parsed);
                res.send(result);
            });

        });
    }

    function searchInvestor(req, res) {
        var query = req.params.query;
        var result = userModel.findUserByUsername(query);
        res.send(result);
    }
    
    function searchYahooIndex(req, res){
        var symbol = "^" + req.params.symbol;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month>9? "" : "0") + month;
        var day = date.getDate();
        day = (day > 9? "" : "0") + day;
        //console.log(year,typeof(month),typeof(day));
        var endDate = year + '-' + month + '-' + day;
        var startDate = year + '-' + month + '-' + (parseInt(day) - 7);
        //console.log(startDate, typeof(endDate));
        var request_historic_data = {
            host: 'query.yahooapis.com',
            path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + symbol + '%22%20and%20startDate%20%3D%20%22' + startDate + '%22%20and%20endDate%20%3D%20%22' + endDate + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        };
        http.get(request_historic_data, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                var weekData = JSON.parse(body);
                //console.log(parsed);
                res.send(weekData);
            });

        });
    }

    function searchYahooSymbol(req, res){
        var symbol = req.params.symbol;
        var request = {
            host: 'query.yahooapis.com',
            path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22' + symbol + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        };
        var result = [];
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
    function portfolioRequest(symbol) {
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
                return parsed       ;
            });

        });
    }
};