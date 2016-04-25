/**
 * Created by Nitish on 3/2/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var vm = this;
        vm.update = update;
        UserService.getCurrentUser()
            .then(function(response){
                vm.user = response.data;
            });
        function update(user) {
            UserService.setCurrentUser(user);
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    vm.message = "Profile Updated.";
                }, function (error) {

                });
        }
    }
})();