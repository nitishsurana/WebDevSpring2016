/**
 * Created by Nitish on 2/29/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;
        function login() {
            UserService.findUserByCredentials($scope.username, $scope.password, function (response) {
                if (response) {
                    UserService.setCurrentUser(response);
                    $location.url("/profile");
                }
            });
        }

    }
})();