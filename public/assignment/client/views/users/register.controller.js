/**
 * Created by Nitish on 2/16/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.register = register;
        function register() {
            $rootScope.newRegistration = {
                "username": $scope.usernm,
                "password": $scope.pwd,
                "firstName": "",
                "lastName": "",
                "email": $scope.email1
            };
            console.log($rootScope.newRegistration);
            UserService.createUser($rootScope.newRegistration)
                .then(function (response) {
                UserService.setCurrentUser(response.data);
                console.log(response.data);
            });
            $location.url('/profile');
        }
    }
})();