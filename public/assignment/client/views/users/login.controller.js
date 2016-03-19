/**
 * Created by Nitish on 2/29/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var a = this;
        a.login = login;
        function login(user) {
            //console.log("login controller");
            UserService.findUserByCredentials(user.username, user.password)
                .success( function (response) {
                    if (response) {
                        UserService.setCurrentUser(response);
                        $location.url("/profile");
                    }
                })
                .error(function () {
                    //console.log("Error!");
                });
        }

    }
})();