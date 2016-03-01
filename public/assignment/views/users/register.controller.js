/**
 * Created by Nitish on 2/16/2016.
 */

angular
    .module("FormBuilderApp")
    .controller("RegisterController", RegisterController);

function RegisterController($scope,$rootScope,UserService) {
    $scope.register = register;
    function register ($location) {
        $rootScope.newRegistration = {
            "username": $scope.usernm,
            "password": $scope.pwd,
            "firstName": "",
            "lastName": "",
            "email": $scope.email1
        };
        UserService.createUser($rootScope.newRegistration,function(response){
            UserService.setCurrentUser(response);
        })
        $scope.$location = $location;
    }
}