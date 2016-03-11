/**
 * Created by Nitish on 3/10/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("SearchController", SearchController);

    function SearchController($rootScope,$routeParams){
        var sym = $routeParams.symbol;
        console.log($rootScope.returnData);
        if (sym){
            search(sym);
        }

        function search(s){
            console.log(s);
            $location.url("/search/" + s);

        }
    }
})();