/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var vm = this;
        vm.update = update;
        vm.user = UserService.getCurrentUser();
        console.log();
        function update(user) {
            UserService.setCurrentUser(user);
            //console.log(user);
            UserService.updateUser(user._id,user)
                .then(function(response){
                //console.log(response);
                vm.message = "Profile Updated.";
                }, function(error){
                    
                });
        }
    }
})();