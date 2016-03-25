/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope,UserService) {

        var vm = this;

        $scope.update = update;
        vm.user = UserService.getCurrentUser();
        console.log();
        function update(user) {
            UserService.setCurrentUser(user);
            //console.log(user);
            UserService.updateUser(user._id,user)
                .success(function(response){
                //console.log(response);
                alert("Profile Updated.");
            });
        }
    }
})();