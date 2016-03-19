/**
 * Created by Nitish on 2/16/2016.
 */
angular
    .module("FormBuilderApp")
    .factory('UserService', UserService);

function UserService($http,$rootScope) {

    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser
    };

    return api;

    function findUserByUsername(username){
        return $http.get("/api/assignment/user?username=" + username);
    }

    function findUserByCredentials(username, password) {
        //console.log("User SErvice");
        return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
    }

    function findAllUsers() {
        return $http.get("/api/assignment/user");
    }

    function createUser (user) {
        //console.log("Create-User: " );
        return $http.post("/api/assignment/user", user);
    }

    function deleteUserById(userId) {
        return $http.delete("/api/assignment/user/" + userId);
    }

    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }
    function updateUser(userId, user) {
        return $http.put("/api/assignment/user/" + userId, user);
    }
}

