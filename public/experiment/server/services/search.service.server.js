/**
 * Created by Nitish on 3/21/2016.
 */

var http = require('http');

module.exports = function(app, userModel){
    app.get("/api/project/search-option/:query", searchOption);
    app.get("/api/project/search-yahoo/:symbol", searchYahoo);
    app.get("/api/project/search-investor", searchInvestor);


    function searchOption(req, res){
        //console.log(req);
        var searchQuery = req.params.query;
        var request = {
            host: 'chstocksearch.herokuapp.com',
            path: '/api/' + searchQuery
        };
        console.log(searchQuery);
        //console.log("HTTP");
        http.get(request, function(response) {
            // Continuously update stream with data
            //console.log(response);

            var body = '';
            response.on('data', function(d) {
                body += d;
                //console.log("data");
                //console.log(d);
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                //console.log("end");
                var parsed = JSON.parse(body);
                console.log(parsed);
                res.send(parsed);
            });
        });
    }

    function searchYahoo(req, res){
        var symbol = req.params.symbol;
        var request ={
            host: 'query.yahooapis.com',
            path: '/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20%3D%20%22' + symbol + '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
        };
        http.get(request, function(response){
            var body = '';
            response.on('data', function(d) {
                body += d;
                //console.log("data");
                //console.log(d);
            });
            response.on('end', function() {

                // Data reception is done, do whatever with it!
                //console.log("end");
                var parsed = JSON.parse(body);
                console.log(parsed);
                res.send(parsed);
            });
            
        });/*
        http.get(request).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.data.query.results.quote.Name == ""){
                $rootScope.returnData = {
                    "Result": "Oops, the symbol does not exist",
                    "symbol": symbol,
                    "resultType": "YQL"
                };

            }
            else {
                res.send(response);
            }
            $location.url('/search');

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $location.url('/');
            alert("Error in connection. Please try again.");
        });*/
    }
    function searchInvestor(){

    }
}