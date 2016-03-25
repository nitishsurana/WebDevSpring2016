/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, SearchService){

        var vm = this;

        vm.search= search;
        function search(query){
            $rootScope.queryAtHome = query;
            $location.url("/search");/*
            SearchService.search(query.queryType, query.queryText)
                .success(function(response){
                    //console.log(response);
                    vm.returnData = {};
                    vm.returnData.options = [];
                    vm.returnData.investors = [];
                    if (response == []){
                        vm.returnData.err = false;
                    }
                    if (query.queryType == "Investment Option")
                    {
                        vm.returnData.options = response;
                    }
                    else{
                        vm.returnData.investors = response;
                    }

                });*/

        }
    }
})();