/**
 * Created by Nitish on 3/2/2016.
 */
(function (){
    angular
        .module("PortfolioManager")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location,UserService) {
        $scope.register = register;
        function register() {
            $rootScope.newRegistration = {
                "fullName": $scope.fullName,
                "email": $scope.email,
                "username": $scope.username,
                "password": $scope.password,
                "phoneNumber": $scope.phoneNumber,
                "aboutMe": $scope.aboutMe,
                "interestedInvestments": $scope.interestedInvestments
            };
            //console.log($rootScope.newRegistration);
            UserService.createUser($rootScope.newRegistration, function (response) {
                UserService.setCurrentUser(response);
                console.log(response);
            });
            $location.url("/portfolio");
        }
    }
})();