/**
 * Created by Nitish on 3/2/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, SearchService) {

        var vm = this;
        vm.stock = null;
        vm.error = null;
        vm.search = search;
        init();

        function init(){
            SearchService.searchYahooIndex("ixic")
                .then(function(response){
                    //console.log(response.data);
                    var dates =[];
                    var prices = [];
                    for(var i=0 ; i<response.data.query.results.quote.length; i++){
                        dates.push(response.data.query.results.quote[i].Date);
                        prices.push(parseInt(response.data.query.results.quote[i].Close));
                    }
                    //console.log(dates);
                    //console.log(prices);
                    Highcharts.chart('chartSpace', {

                        title: {
                            text: "NASDAQ Composite"
                        },
                        legend: {
                            enabled: false
                        },
                        xAxis: {
                            title:{
                                text: 'Dates'
                            },
                            type: 'datetime',
                            categories: dates.reverse()
                        },
                        yAxis: {
                            range: 500,
                            title: {
                                text: 'Value'
                            }
                        },
                        series: [{
                            type: 'area',
                            name: 'Close Price ',
                            data: prices.reverse(),
                            tooltip: {
                                valueDecimals: 2
                            }
                        }]
                    });
                });
        }

        function search(query){
            SearchService.search(query.queryType, query.queryText)
                .then(function(response){
                    $rootScope.queryType = query.queryType;
                    if (response.data.length<1){
                        vm.error = "Could not find '" + query.queryText + "'.";
                    }
                    if (query.queryType == 'Investment Option')
                    {
                        vm.stock = true;
                        vm.stocks = response.data;
                    }
                    else{
                        vm.investor = false;
                        vm.investors = response.data;
                    }
                }, function(error){
                    vm.error = "Could not find " + query.queryText + ".";
                });
        }
    }
})();