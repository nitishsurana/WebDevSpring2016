/**
 * Created by Nitish on 3/4/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("AdminController", AdminController);

    function AdminController($scope){
        $scope.admin = "ADMIN";
        console.log("admin");
    }
}) ();