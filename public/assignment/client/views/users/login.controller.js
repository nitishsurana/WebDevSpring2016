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
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    if (response) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                }, function (err) {
                    a.alert("Error in Logging In. Please try again.");
                });
        }
    }
})();