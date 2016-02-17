/**
 * Created by Nitish on 2/16/2016.
 */

var app = angular.module("FormBuilderApp");
app.controller("RegisterController", RegisterController);

function RegisterController($scope) {
    $scope.register = function ($scope,$location) {
        var $rootScope = {
            "username": $scope.usrname,
            "password": $scope.pwd,
            "email": $scope.email1
        };
        $scope.$location = $location;
    }
}