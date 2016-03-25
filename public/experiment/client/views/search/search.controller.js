/**
 * Created by Nitish on 3/10/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($location,$routeParams, SearchService){

        var vm = this;
        vm.search = search;/*
        var sym = $routeParams.symbol;
        if (sym){
            searchResult(sym);
        }
*/      //search();
        function searchResult(s){
            $location.url("/search/" + s);
        }

        function search(query){
            //console.log(query.queryType);
           // console.log("search controller");
            SearchService.search(query.queryType, query.queryText)
                .success(function(response){
                    //return response;
                    //vm.query.queryType = query.queryType;
                    //vm.query.queryText = query.queryText;
                    vm.returnData = {};
                    //console.log(vm.returnData);
                    vm.returnData.options = [];
                    vm.returnData.investors = [];
                    if (query.queryType == "Investment Option")
                    {
                        vm.returnData.options = response;
                        //console.log(vm.returnData.options);
                    }
                    else{
                        vm.returnData.investors = response;
                        /*for(var i in vm.returnData.investors){
                            console.log(i);
                        }*/
                    }

                    //console.log(vm.returnData);
                });
            sym = $routeParams.symbol;

            if (sym){
                searchResult(sym);
            }

            function searchResult(s){
                $location.url("/search/" + s);
            }
        }
    }
})();