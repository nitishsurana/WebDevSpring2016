/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("HomeController", HomeController);

    function HomeController($scope){
        $scope.search= search;

        function search(){
            $location.url('/search');
        }
    }
})();