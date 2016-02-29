/**
 * Created by Nitish on 2/29/2016.
 */
angular
    .module("FormBuilderApp")
    .controller("LoginController", LoginController);

function LoginController($scope,$location,UserService){
    $scope.login = login;
    function login(){
        UserService.findUserByCredentials($scope.username,$scope.password,function(response){
            if (response){
                $rootScope.user = response;
                $location.url("/profile");
            }
        });
    }

}