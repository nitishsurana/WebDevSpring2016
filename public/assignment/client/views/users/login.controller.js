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
            console.log("login controller");
            UserService.findUserByCredentials(user.username, user.password)
                .then( function (response) {
                    if (response) {
                        console.log("success");
                        console.log(response);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                }, function (err) {
                    console.log("Error!");
                });
        }

    }
})();