/**
 * Created by Nitish on 2/17/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, UserService) {

        var a = this;
        a.update = update;

        if ($rootScope.currentUser) {
            a.user = $rootScope.currentUser;
        }
        else {
            a.user = $rootScope.newRegistration;
        }

        function update(user) {
            user.emails = stringToArray(user.emails);
            user.phones = stringToArray(user.phones);
            UserService
                .updateUser(user._id, $rootScope.currentUser)
                .then(function (response) {
                    var result = response.data;
                    for (var i = 0; i < result.length; i++) {
                        if (result[i]._id == user._id) {
                            UserService.setCurrentUser(result[i]);
                        }
                    }
                });
        }

        function stringToArray(text) {
            var array = [];
            if (text.indexOf(",") > 0) {
                array = text.split(",");
            }
            else {
                array = [text];
            }
            return array;
        }
    }
})();