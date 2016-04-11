/**
 * Created by Nitish on 2/16/2016.
 */
angular
    .module("FormBuilderApp")
    .factory('UserService', UserService);

function UserService($http, $rootScope) {

    var api = {
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        logOut: logOut,
        login: login,
        adminCreateUser: adminCreateUser,
        adminUpdateUser: adminUpdateUser,
        findUserById: findUserById
    };

    return api;

    function findUserByUsername(username) {
        return $http.get("/api/assignment/user?username=" + username);
    }

    function findUserByCredentials(username, password) {
        return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
    }

    function findAllUsers() {
        return $http.get("/api/assignment/admin/user");
    }

    function createUser(user) {
        return $http.post("/api/assignment/user", user);
    }

    function deleteUserById(userId) {
        return $http.delete("/api/assignment/admin/user/" + userId);
    }

    function setCurrentUser(user) {
        $rootScope.currentUser = user;
    }

    function getCurrentUser() {
        return $http.get("/api/assignment/loggedIn");
    }

    function updateUser(userId, user) {
        return $http.put("/api/assignment/user/" + userId, user);
    }

    function login(user){
        return $http.post("/api/assignment/login", user);
    }
    function logOut() {
        setCurrentUser(null);
        return $http.get("/api/assignment/logout");
    }

    function adminCreateUser(user){
        return $http.post("/api/assignment/admin/user", user);
    }

    function adminUpdateUser(userId, user){
        return $http.put("/api/assignment/admin/user/" + userId, user);
    }

    function findUserById(userId){
        return $http.get("/api/assignment/admin/user/" + userId);
    }
}

