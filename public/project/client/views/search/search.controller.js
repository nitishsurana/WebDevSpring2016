/**
 * Created by Nitish on 3/10/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, SearchService){

        var vm = this;
        vm.search = search;

        function init(){
            search($rootScope.queryAtHome);
            vm.query = $rootScope.queryAtHome;
        }

        init();

        function search(query){
            SearchService.search(query.queryType, query.queryText)
                .success(function(response){
                    vm.returnData = {};
                    vm.returnData.options = [];
                    vm.returnData.investors = [];
                    $rootScope.queryType = query.queryType;
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
                })
                .error(function(response){

                });
        }
    }
})();