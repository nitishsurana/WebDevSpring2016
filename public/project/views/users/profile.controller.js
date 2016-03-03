/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope,UserService) {
        $scope.update = update;
        if ($rootScope.currentUser !== null){
            $scope.username = $rootScope.currentUser.username;
            $scope.password = $rootScope.currentUser.password;
            $scope.fullName = $rootScope.currentUser.fullName;
            $scope.email = $rootScope.currentUser.email;
            $scope.verfiyPassword = $rootScope.currentUser.password;
            $scope.phoneNumber = $rootScope.currentUser.phoneNumber;
            $scope.aboutMe = $rootScope.currentUser.aboutMe;
            $scope.interestedInvestments = $rootScope.currentUser.interestedInvestments;
        }
        console.log($rootScope.currentUser);
        function update() {
            var user = {
                "fullName": $scope.fullName,
                "email": $scope.email,
                "username": $scope.username,
                "password": $scope.password,
                "phoneNumber": $scope.phoneNumber,
                "aboutMe": $scope.aboutMe,
                "interestedInvestments": $scope.interestedInvestments
            };
            UserService.setCurrentUser(user);
            UserService.updateUser(user['username'],$rootScope.currentUser,function(response){
                console.log(response);
            });
        };
    }
})();