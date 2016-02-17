/**
 * Created by Nitish on 2/16/2016.
 */

var app = angular.module("FormBuilderApp", []);
app.controller("RegisterController", RegisterController);

function RegisterController($scope, UserService) {
    $scope.register = function ($scope) {
        var usr = {
            "username": $scope.usrname,
            "password": $scope.pwd
        };
        $scope.$location = "#/profile";
    }
}