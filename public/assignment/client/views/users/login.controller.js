/**
 * Created by Nitish on 2/29/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;
        function login() {
            console.log("login controller");
            UserService.findUserByCredentials($scope.username, $scope.password)
                .success( function (response) {
                    if (response) {
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }
                })
                .error(function () {
                    console.log("Error!");
                });
        }

    }
})();