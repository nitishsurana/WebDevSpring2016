/**
 * Created by Nitish on 2/17/2016.
 */
var app = angular.module('FormBuilderApp', []);
app.controller('ProfileController', ProfileController);

function ProfileController($scope) {
    $scope.update = function ($scope, $rootScope, UserService) {
        $scope.usrname = $rootScope.username;
        $scope.pwd = $rootScope.password;
        $scope.email1 = $rootScope.email;
        var user = {
            "firstName": $scope.firstName,
            "lastName": $scope.lastName,
            "username": $scope.usrname,
            "password": $scope.pwd
        };
        $scope.usname = user['username'];
        UserService.createUser(user);
    };
}