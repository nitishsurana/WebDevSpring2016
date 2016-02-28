/**
 * Created by Nitish on 2/16/2016.
 */

var app = angular.module("FormBuilderApp");
app.controller("RegisterController", RegisterController);

function RegisterController($scope,$rootScope) {
    $scope.register = register;
    function register ($location) {
        $rootScope.user = {
            "username": $scope.usernm,
            "password": $scope.pwd,
            "email": $scope.email1
        };
        $scope.$location = $location;
        //console.log("ROOTSCOPE_USER: " + $rootScope.user["username"] + " " + $rootScope.user["password"] + " " + $rootScope.user["email"]);
        //console.log(uses,pwd,email1);
        console.log($rootScope.user);
    }
}