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
        getCurrentUser: getCurrentUser,
        followStock: followStock,
        checkIfUserFollowStock: checkIfUserFollowStock,
        followInvestor: followInvestor,
        checkIfUserFollowInvestor: checkIfUserFollowInvestor,
        logOut: logOut,
        stocksFollowedByUser: stocksFollowedByUser
    };

    return api;

    function findUser(searchText) {
        return $http.get("/api/project/search/user?username=" + searchText);
    }

    function findUserByCredentials(username, password) {
        return $http.get("/api/project/user?username=" + username + "&password=" + password);
    }

    function findUserById(userId) {
        return $http.get("/api/project/userId?id=" + userId);
    }

    function findAllUsers() {
        return $http.get("/api/project/admin/");
    }

    function createUser(user) {
        return $http.post("/api/project/user", user);
    }

    function deleteUserById(userId) {
        return $http.delete("/api/project/user/" + userId);
    }

    function setCurrentUser(user) {
        $rootScope.currentUser = user;
    }

    function getCurrentUser() {
        return $http.get("/api/project/loggedin");
    }

    function updateUser(userId, user) {
        return $http.put("/api/project/user/" + userId, user);
    }

    function followStock(userId, stock) {
        return $http.post("/api/project/user/" + userId + "/stock", stock);
    }

    function checkIfUserFollowStock(userId, symbol) {
        return $http.get("/api/project/user/" + userId + "/stock/" + symbol);
    }

    function followInvestor(userId, investor) {
        return $http.post("/api/project/user/" + userId + "/investor", investor);
    }

    function checkIfUserFollowInvestor(userId, username) {
        return $http.get("/api/project/user/" + userId + "/investor/" + username);
    }

    function logOut(){
        setCurrentUser(null);
        return $http.get("/api/project/logout");
    }
    
    function stocksFollowedByUser(username) {
        return $http.get("/api/project/user/" + username + "/stock");
    }
}


