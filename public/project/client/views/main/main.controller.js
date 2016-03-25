/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("MainController", MainController);

    function MainController($scope,$location){
        $scope.$location = $location;
    }
})();