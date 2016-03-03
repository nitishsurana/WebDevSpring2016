/**
 * Created by Nitish on 3/3/2016.
 */
/**
 * Created by Nitish on 2/16/2016.
 */
angular
    .module("PortfolioManager")
    .factory('UserService', UserService);

function UserService($rootScope) {
    var fakeData = [];
    fakeData = [
        { "_id":123, "fullName":"Alice Wonderland", "email":"alice@outlook.com", "username":"alice", "password":"alice",
            "phoneNumber": 999999999, "aboutMe":"nothing", "interestedInvestments":"bonds, stocks"},
        { "_id":234, "fullName":"Bob Wills", "email":"bob@outlook.com", "username":"bob", "password":"bob",
            "phoneNumber": 8888888888, "aboutMe":"trader", "interestedInvestments":"stocks"},
        { "_id":345, "fullName":"John Hopkins", "email":"john@outlook.com", "username":"john", "password":"john",
            "phoneNumber":999999999, "aboutMe":"accountant", "interestedInvestments":"mutual funds"}
    ];

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser
    };

    return api;



    function findUserByCredentials(username, password, callback) {
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                callback(fakeData[i]);
            }
        }
        callback(null);
    }

    function findAllUsers(callback) {
        callback(fakeData);
    }

    function createUser (user, callback) {
        var temp = {
            "_id": (new Date()).getTime(),
            "fullName": user.fullName,
            "email": user.email,
            "username": user.username,
            "password": user.password,
            "phoneNumber": user.phoneNumber,
            "aboutMe": user.aboutMe,
            "interestedInvestments": user.interestedInvestments
        };
        fakeData.push(temp);
        callback(temp);
    }

    function deleteUserById(userId, callback) {
        fakeData = fakeData.filter(function (user) {
            return user.username !== userId;
        });
        callback(fakeData);
    }

    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }
    function updateUser(userId, user, callback) {
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].username === userId) {
                fakeData[i] = user;
            }
        }
        callback(fakeData);
    }
}

