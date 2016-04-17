/**
 * Created by Nitish on 3/4/2016.
 */
(function () {
    angular
        .module("PortfolioManager")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {

        var vm = this;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function init() {
            UserService.findAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                }, function (error) {
                    console.log("Error");
                });
        }

        init();

        function addUser(user) {
            var new_user = {
                "username": user.username,
                "password": "",
                "fullName": user.fullName,
                "email": "",
                "phone": "",
                "aboutMe": "",
                "interestedInvestments": "",
                "followUsers": [],
                "followStocks": [],
                "roles": roles(user.roles)
            };
            UserService.createUser(new_user)
                .then(function (response) {
                    vm.user = {};
                    vm.users.push(response);
                }, function (error) {
                    console.log("Error");
                });
        }

        function roles(roles) {
            if (roles.indexOf(",") > 0) {
                return roles.split(",");
            }
            else {
                return [roles];
            }
        }

        function updateUser(user) {
            var role = roles(user.roles);
            user.roles = null;
            user.roles = role;
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    vm.user = {};
                    init();
                }, function (error) {
                    console.log("Error");
                });
        }

        function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id)
                .then(function (response) {
                    init();
                }, function (error) {
                    console.log("Error");
                });
        }

        function selectUser(index) {
            vm.user = vm.users[index];
        }
    }
})();