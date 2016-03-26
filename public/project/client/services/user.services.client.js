/**
 * Created by Nitish on 3/3/2016.
 */
/**
 * Created by Nitish on 2/16/2016.
 */


    angular
        .module("PortfolioManager")
        .factory('UserService', UserService);
    
    function UserService($http, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findUser: findUser,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return api;

        function findUser(searchText){
            return $http.get("/api/project/search/user?username=" + searchText);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId){
            return $http.get("/api/project/userId?id=" + userId);
        }

        function findAllUsers() {
            //console.log("Find user service client");
            return $http.get("/api/project/admin/");
        }

        function createUser (user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            console.log(userId);
            return $http.delete("/api/project/user/" + userId);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
            console.log(user);
        }
        
        function getCurrentUser(){
            return $rootScope.currentUser;
        }
        
        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }
    }


