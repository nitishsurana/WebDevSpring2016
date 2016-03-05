/**
 * Created by Nitish on 3/4/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService){
        $scope.addUser= addUser;
        $scope.updateUser= updateUser;
        $scope.deleteUser= deleteUser;
        $scope.selectUser= selectUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        var selectedIndex = -1;

        function addUser(){
            var user = {
                "fullName": $scope.fullName,
                "email": "",
                "username": $scope.username,
                "password": "",
                "phoneNumber": 0,
                "aboutMe": "",
                "interestedInvestments": "",
                "roles": [$scope.role]
            };
            UserService.createUser(user,function(response){
                console.log(response);
            })
        }

        function updateUser(){

        }

        function deleteUser(){

        }

        function selectUser(){

        }
    }
}) ();